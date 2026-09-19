import { ScanResult, ScanType, Finding, Source } from '@/types';
import { analyzeUrlStructure } from './url-analyzer';
import { analyzeEmailContent } from './email-analyzer';
import { analyzeImageFile } from './image-analyzer';
import { evaluateLegitimacy } from './legitimacy-verifier';
import { calculateThreatScore } from './scoring';
import { analyzeWithGemini } from '@/services/gemini';
import { checkVirusTotal } from '@/services/virustotal';
import { checkSafeBrowsing } from '@/services/safe-browsing';
import { checkRdap } from '@/services/rdap';
import { parseUrl } from '@/utils/url';
import { analyzeWithAmazonBedrock } from '@/services/bedrock';

export interface ScanOptions {
  input: string;
  type: ScanType;
  file?: File;
  geminiApiKey?: string;
  virusTotalApiKey?: string;
  safeBrowsingApiKey?: string;
  awsCredentials?: {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
  };
  onProgress?: (stage: string, percent: number) => void;
}

export async function runThreatAnalysis(options: ScanOptions): Promise<ScanResult> {
  const startTime = Date.now();
  const { input, type, file, geminiApiKey, virusTotalApiKey, safeBrowsingApiKey, onProgress } = options;

  const findings: Finding[] = [];
  const sources: Source[] = [];
  const enginesUsed: string[] = ['Local Heuristics Engine', 'Rule-Based Pattern Matcher'];

  onProgress?.('Parsing input and checking protocol signatures...', 15);

  let targetUrl: string | undefined;
  let textToInspect = input;
  let isImage = false;
  let qrCodeData: string | undefined;

  // 1. Process specific input types
  if (type === 'image' && file) {
    isImage = true;
    onProgress?.('Inspecting image frame and decoding barcodes/QRs...', 25);
    const imgResult = await analyzeImageFile(file);
    findings.push(...imgResult.findings);
    enginesUsed.push('Canvas & jsQR Engine');

    if (imgResult.qrDecodedText) {
      qrCodeData = imgResult.qrDecodedText;
      targetUrl = qrCodeData;
      textToInspect = qrCodeData;
    }
  } else if (type === 'url') {
    targetUrl = input.trim();
  } else if (type === 'email' || type === 'text') {
    onProgress?.('Analyzing message body, headers, and social engineering triggers...', 30);
    const emailResult = analyzeEmailContent(input);
    findings.push(...emailResult.findings);
    enginesUsed.push('MIME & Header Heuristic Parser');

    if (emailResult.extractedUrls.length > 0) {
      targetUrl = emailResult.extractedUrls[0];
    }
  }

  // 2. URL structural analysis if URL detected
  let parsedDomain: string | undefined;
  let isVerifiedEntity = false;
  let threatMultiplier = 1.0;

  if (targetUrl) {
    onProgress?.('Evaluating URL morphology, homoglyphs, and domain reputation...', 45);
    const urlAnalysis = analyzeUrlStructure(targetUrl);
    findings.push(...urlAnalysis.findings);
    isVerifiedEntity = urlAnalysis.isVerifiedEntity;
    threatMultiplier = urlAnalysis.threatMultiplier;

    const parsed = parseUrl(targetUrl);
    if (parsed.isValid) {
      parsedDomain = parsed.rootDomain;
    }
  }

  // 3. Parallel external intelligence lookups
  onProgress?.('Querying threat databases and domain registries in parallel...', 65);
  const parallelPromises: Promise<any>[] = [];

  // VirusTotal lookup
  if (targetUrl && virusTotalApiKey) {
    parallelPromises.push(
      checkVirusTotal(targetUrl, virusTotalApiKey).then((vtReport) => {
        if (vtReport) {
          sources.push(vtReport.source);
          enginesUsed.push('VirusTotal API v3');
          if (vtReport.positives > 0) {
            findings.push({
              id: 'virustotal-detection',
              title: `VirusTotal Flagged Destination (${vtReport.positives} Engines)`,
              description: `Multiple global security vendors categorized this URL as malicious or deceptive.`,
              severity: vtReport.positives >= 3 ? 'critical' : 'high',
              category: 'reputation',
              evidence: `${vtReport.positives}/${vtReport.total} engines`,
            });
          }
        }
      })
    );
  }

  // Google Safe Browsing
  if (targetUrl && safeBrowsingApiKey) {
    parallelPromises.push(
      checkSafeBrowsing(targetUrl, safeBrowsingApiKey).then((sbReport) => {
        if (sbReport) {
          sources.push(sbReport.source);
          enginesUsed.push('Google Safe Browsing v4');
          if (sbReport.isThreat) {
            findings.push({
              id: 'safe-browsing-flag',
              title: 'Google Safe Browsing Blacklist Match',
              description: `Flagged as a known threat: ${sbReport.threatTypes.join(', ')}.`,
              severity: 'critical',
              category: 'reputation',
            });
          }
        }
      })
    );
  }

  // ICANN RDAP domain age
  if (parsedDomain) {
    parallelPromises.push(
      checkRdap(parsedDomain).then((rdapReport) => {
        if (rdapReport) {
          sources.push(rdapReport.source);
          enginesUsed.push('ICANN RDAP Protocol');
          if (rdapReport.isRecentlyRegistered) {
            findings.push({
              id: 'recent-domain-registration',
              title: `Newly Registered Domain (${rdapReport.domainAgeDays} Days Old)`,
              description: `This domain was registered very recently. Over 80% of phishing and disposable scam sites operate on domains less than 30 days old.`,
              severity: 'high',
              category: 'domain',
              evidence: `Registered on ${rdapReport.registrationDate || 'recently'}`,
              whySuspicious: 'Attackers create fresh domains in bulk because old ones get blocked quickly.',
            });
          }
        }
      })
    );
  }

  // Gemini AI multimodal and search intelligence
  let geminiExplanation = '';
  let geminiSummary = '';
  let geminiScamType: string | undefined;
  let geminiLegitConfirmed: boolean | undefined;

  if (geminiApiKey) {
    let imageData: { base64: string; mimeType: string } | undefined;
    if (file && isImage) {
      imageData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            base64: reader.result as string,
            mimeType: file.type || 'image/png',
          });
        };
        reader.readAsDataURL(file);
      });
    }

    parallelPromises.push(
      analyzeWithGemini(textToInspect, geminiApiKey, imageData).then((aiResult) => {
        if (aiResult) {
          enginesUsed.push('Gemini AI Multimodal Intelligence');
          geminiExplanation = aiResult.explanation;
          geminiSummary = aiResult.summary;
          geminiScamType = aiResult.scamType;
          geminiLegitConfirmed = aiResult.isLegitimateConfirmed;
          findings.push(...aiResult.findings);
          sources.push(...aiResult.sources);
        }
      })
    );
  }

  // Amazon Bedrock AI intelligence (AWS)
  if (options.awsCredentials?.accessKeyId && options.awsCredentials?.secretAccessKey) {
    parallelPromises.push(
      analyzeWithAmazonBedrock(textToInspect, options.awsCredentials).then((bedrockResult) => {
        if (bedrockResult) {
          enginesUsed.push('Amazon Bedrock (Claude 3.5 Sonnet)');
          if (!geminiSummary) geminiSummary = bedrockResult.summary;
          if (!geminiExplanation) geminiExplanation = bedrockResult.explanation;
          if (!geminiScamType) geminiScamType = bedrockResult.scamType;
          if (bedrockResult.isLegitimateConfirmed) geminiLegitConfirmed = true;
          findings.push(...bedrockResult.findings);
          sources.push(...bedrockResult.sources);
        }
      })
    );
  }

  await Promise.allSettled(parallelPromises);

  // 4. Legitimacy Verification Engine (Core Differentiator)
  onProgress?.('Verifying authentic credentials against official directories...', 85);
  const hasCriticalMaliciousFinding = findings.some(
    f => f.severity === 'critical' && !f.isLegitimacyIndicator
  );
  const legitimacyResult = evaluateLegitimacy(
    textToInspect,
    parsedDomain,
    hasCriticalMaliciousFinding
  );
  findings.push(...legitimacyResult.findings);

  const isLegitimateConfirmed =
    (legitimacyResult.isLikelyLegitimate || isVerifiedEntity || geminiLegitConfirmed === true) &&
    !hasCriticalMaliciousFinding;

  // 5. Final deterministic threat scoring
  onProgress?.('Synthesizing verdicts and generating actionable guidance...', 95);
  const scoringOutput = calculateThreatScore(
    findings,
    isLegitimateConfirmed,
    threatMultiplier
  );

  const durationMs = Date.now() - startTime;
  onProgress?.('Analysis finalized.', 100);

  // Build input preview
  let inputPreview = input.trim();
  if (type === 'image') {
    inputPreview = file ? `[Image: ${file.name}]` : '[Uploaded Screenshot]';
    if (qrCodeData) inputPreview += ` (QR: ${qrCodeData})`;
  } else if (inputPreview.length > 80) {
    inputPreview = inputPreview.slice(0, 80) + '...';
  }

  // Fallback summary if AI was not invoked
  const finalSummary =
    geminiSummary ||
    (isLegitimateConfirmed
      ? `Verified as legitimate and authentic. Standard security indicators confirmed.`
      : scoringOutput.verdict === 'DANGEROUS' || scoringOutput.verdict === 'HIGH_RISK'
      ? `High-risk threat detected! Multiple indicators of phishing or deception found.`
      : scoringOutput.verdict === 'SUSPICIOUS'
      ? `Caution advised: unverified markers and potential deception patterns identified.`
      : `No known security risks detected. Safe to browse.`);

  const finalExplanation =
    geminiExplanation ||
    (isLegitimateConfirmed
      ? `This request matches authenticated corporate signatures for ${legitimacyResult.officialEntity?.name || parsedDomain || 'the verified provider'}. While urgency or fraud alerts can feel unsettling, this communication follows valid security protocols.`
      : `Our multi-engine analysis inspected ${enginesUsed.length} detection layers. Review the specific findings below to understand all identified signals.`);

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `scan-${Date.now()}`,
    type,
    input,
    inputPreview,
    threatScore: scoringOutput.threatScore,
    legitimacyScore: scoringOutput.legitimacyScore,
    verdict: scoringOutput.verdict,
    verdictCategory: scoringOutput.verdictCategory,
    summary: finalSummary,
    explanation: finalExplanation,
    scamType: geminiScamType,
    isLegitimateConfirmed,
    officialEntity: legitimacyResult.officialEntity,
    findings,
    sources,
    threatBreakdown: scoringOutput.breakdown,
    advice: scoringOutput.advice,
    safeFollowUp: legitimacyResult.safeFollowUp,
    timestamp: Date.now(),
    durationMs,
    enginesUsed,
  };
}
