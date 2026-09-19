import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { Finding, Source } from '@/types';

export interface BedrockAnalysisOutput {
  threatScore: number;
  legitimacyScore: number;
  verdict: 'SAFE' | 'LOW_RISK' | 'SUSPICIOUS' | 'HIGH_RISK' | 'DANGEROUS';
  summary: string;
  explanation: string;
  scamType?: string;
  isLegitimateConfirmed?: boolean;
  findings: Finding[];
  sources: Source[];
  advice: string[];
}

const BEDROCK_SYSTEM_PROMPT = `You are IsItLegit, an advanced cybersecurity and fraud intelligence agent powered by Amazon Bedrock.
Analyze the user-submitted content (link, message, WhatsApp text, OTP, or screenshot text) and determine:
1. Is it legitimately authentic, or is it a phishing attempt/scam?
2. Note that genuine bank OTPs, real Chase/HDFC fraud alerts, and authentic courier delivery notices can look alarming to users. Distinguish genuine notices from deceptive impersonations.
3. Return ONLY valid JSON with keys:
{
  "verdict": "SAFE" | "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK" | "DANGEROUS",
  "threatScore": number (0-100),
  "legitimacyScore": number (0-100),
  "isLegitimateConfirmed": boolean,
  "scamType": string | null,
  "summary": string,
  "explanation": string,
  "findings": [
    {
      "id": string,
      "title": string,
      "description": string,
      "severity": "info" | "low" | "medium" | "high" | "critical",
      "category": "domain" | "headers" | "content" | "legitimacy" | "reputation" | "ai_analysis",
      "isLegitimacyIndicator": boolean,
      "whySuspicious": string | null,
      "whyLegit": string | null
    }
  ],
  "advice": [string]
}`;

export async function analyzeWithAmazonBedrock(
  content: string,
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
  }
): Promise<BedrockAnalysisOutput | null> {
  if (!credentials || !credentials.accessKeyId || !credentials.secretAccessKey) {
    return null;
  }

  try {
    const region = credentials.region || 'us-east-1';
    const client = new BedrockRuntimeClient({
      region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });

    // Invoke Anthropic Claude 3.5 Sonnet on Amazon Bedrock
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1500,
      system: BEDROCK_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this content thoroughly for scam risk and authenticity:\n\n${content}`,
            },
          ],
        },
      ],
      temperature: 0.1,
    };

    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);
    const parsedRes = JSON.parse(decoded);
    const responseText = parsedRes.content?.[0]?.text || '';

    const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      threatScore: typeof parsed.threatScore === 'number' ? parsed.threatScore : 50,
      legitimacyScore: typeof parsed.legitimacyScore === 'number' ? parsed.legitimacyScore : 50,
      verdict: parsed.verdict || 'SUSPICIOUS',
      summary: parsed.summary || 'Amazon Bedrock analysis complete.',
      explanation: parsed.explanation || '',
      scamType: parsed.scamType || undefined,
      isLegitimateConfirmed: parsed.isLegitimateConfirmed,
      findings: (parsed.findings || []).map((f: any, i: number) => ({
        ...f,
        id: f.id || `bedrock-${i}`,
      })),
      sources: [
        {
          name: 'Amazon Bedrock (Claude 3.5 Sonnet)',
          status: parsed.verdict === 'SAFE' ? 'clean' : 'suspicious',
          details: 'High-precision threat and legitimacy reasoning deployed on AWS infrastructure',
          url: 'https://aws.amazon.com/bedrock/',
        },
      ],
      advice: parsed.advice || [],
    };
  } catch (error) {
    console.warn('Amazon Bedrock direct analysis unavailable or credentials error:', error);
    return null;
  }
}
