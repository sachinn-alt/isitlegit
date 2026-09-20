import { GoogleGenerativeAI } from '@google/generative-ai';
import { Finding, Source } from '@/types';

export interface GeminiAnalysisOutput {
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

const SYSTEM_INSTRUCTION = `
You are IsItLegit, the world's leading cybersecurity intelligence and fact-checking specialist.
Your goal is to inspect user-provided content (URLs, emails, SMS, screenshots, QR codes, or viral claims) and answer:
1. Is this legitimately authentic, or is it a phishing attempt/scam/fraud?
2. Note that many genuine security alerts (e.g. real bank 2FA OTP codes, official Chase fraud alerts, real FedEx delivery reschedule emails) can LOOK alarming to people. You must distinguish actual authentic alerts from deceptive impersonations.
3. Look for technical indicators: mismatched domains, urgency pressure, fake login forms, lookalike characters, unauthorized payment requests.
4. If it is genuine, explain why it felt suspicious vs why it is actually legitimate, and provide safe steps to confirm.

Return ONLY valid JSON matching this schema:
{
  "verdict": "SAFE" | "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK" | "DANGEROUS",
  "threatScore": number (0 to 100),
  "legitimacyScore": number (0 to 100),
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
      "category": "domain" | "headers" | "content" | "legitimacy" | "reputation" | "ai_analysis" | "visual",
      "isLegitimacyIndicator": boolean,
      "whySuspicious": string | null,
      "whyLegit": string | null
    }
  ],
  "sources": [
    {
      "name": string,
      "status": "clean" | "suspicious" | "malicious" | "verified_legit",
      "details": string,
      "url": string
    }
  ],
  "advice": [string]
}
`;

export async function analyzeWithGemini(
  content: string,
  apiKey: string,
  imageData?: { base64: string; mimeType: string }
): Promise<GeminiAnalysisOutput | null> {
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const parts: any[] = [];
    if (imageData) {
      parts.push({
        inlineData: {
          data: imageData.base64.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: imageData.mimeType,
        },
      });
    }

    parts.push({
      text: `Analyze this content thoroughly for legitimacy and scam risk:\n\n${content}`,
    });

    const result = await model.generateContent(parts);
    const text = result.response.text();

    const parsed = JSON.parse(text);
    return {
      threatScore: typeof parsed.threatScore === 'number' ? parsed.threatScore : 50,
      legitimacyScore: typeof parsed.legitimacyScore === 'number' ? parsed.legitimacyScore : 50,
      verdict: parsed.verdict || 'SUSPICIOUS',
      summary: parsed.summary || 'Analysis complete.',
      explanation: parsed.explanation || '',
      scamType: parsed.scamType || undefined,
      isLegitimateConfirmed: parsed.isLegitimateConfirmed,
      findings: (parsed.findings || []).map((f: any, i: number) => ({
        ...f,
        id: f.id || `gemini-${i}`,
      })),
      sources: parsed.sources || [],
      advice: parsed.advice || [],
    };
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    return null;
  }
}
