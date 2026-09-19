import { Finding, ThreatLevel, VerdictCategory } from '@/types';

export interface ScoreOutput {
  threatScore: number;
  legitimacyScore: number;
  verdict: ThreatLevel;
  verdictCategory: VerdictCategory;
  breakdown: {
    domainReputation: number;
    socialEngineering: number;
    contentSafety: number;
    impersonationRisk: number;
    authenticity: number;
  };
  advice: string[];
}

export function calculateThreatScore(
  findings: Finding[],
  isLegitimateConfirmed: boolean = false,
  baseMultiplier: number = 1.0
): ScoreOutput {
  let threatScore = 0;
  let legitimacyScore = 0;

  let domainDeduction = 0;
  let socialEngDeduction = 0;
  let contentDeduction = 0;
  let impersonationDeduction = 0;

  for (const f of findings) {
    if (f.isLegitimacyIndicator) {
      legitimacyScore += 35;
      continue;
    }

    let weight = 0;
    switch (f.severity) {
      case 'critical':
        weight = 40;
        break;
      case 'high':
        weight = 25;
        break;
      case 'medium':
        weight = 15;
        break;
      case 'low':
        weight = 8;
        break;
      case 'info':
      default:
        weight = 2;
        break;
    }

    threatScore += weight;

    if (f.category === 'domain') domainDeduction += weight * 1.5;
    if (f.category === 'headers') impersonationDeduction += weight * 1.4;
    if (f.category === 'content') socialEngDeduction += weight * 1.2;
    if (f.category === 'reputation') domainDeduction += weight * 1.5;
    if (f.category === 'visual') contentDeduction += weight;
  }

  threatScore = Math.min(100, Math.round(threatScore * baseMultiplier));

  if (isLegitimateConfirmed) {
    // If cryptographically or officially verified as legitimate
    threatScore = Math.min(threatScore, 10);
    legitimacyScore = Math.max(legitimacyScore, 92);
  } else {
    legitimacyScore = Math.max(0, Math.min(100, 100 - threatScore));
  }

  // Determine categorical verdict
  let verdict: ThreatLevel;
  let verdictCategory: VerdictCategory;

  if (threatScore <= 15) {
    verdict = 'SAFE';
    verdictCategory = 'LEGITIMATE';
  } else if (threatScore <= 35) {
    verdict = 'LOW_RISK';
    verdictCategory = 'LEGITIMATE';
  } else if (threatScore <= 65) {
    verdict = 'SUSPICIOUS';
    verdictCategory = 'SUSPICIOUS';
  } else if (threatScore <= 85) {
    verdict = 'HIGH_RISK';
    verdictCategory = 'MALICIOUS';
  } else {
    verdict = 'DANGEROUS';
    verdictCategory = 'MALICIOUS';
  }

  // Calculate categorical scores (0 to 100 health/safety rating)
  const breakdown = {
    domainReputation: Math.max(5, Math.min(100, Math.round(100 - domainDeduction))),
    socialEngineering: Math.max(5, Math.min(100, Math.round(100 - socialEngDeduction))),
    contentSafety: Math.max(5, Math.min(100, Math.round(100 - contentDeduction))),
    impersonationRisk: Math.max(5, Math.min(100, Math.round(100 - impersonationDeduction))),
    authenticity: legitimacyScore,
  };

  // Generate tailored security advice
  const advice: string[] = [];
  if (verdictCategory === 'MALICIOUS') {
    advice.push('DO NOT click any links, open attachments, or download files from this message.');
    advice.push('DO NOT provide login passwords, credit card numbers, OTP codes, or Social Security numbers.');
    advice.push('Delete or report this message as phishing immediately.');
    advice.push('If you already entered passwords on this link, reset your account passwords from a clean device right now.');
  } else if (verdictCategory === 'SUSPICIOUS') {
    advice.push('Proceed with caution. Several suspicious markers or unverified origins were flagged.');
    advice.push('Do NOT input sensitive banking or personal information until verified through independent channels.');
    advice.push('Contact the service directly through their official app or verified homepage rather than following this link.');
  } else {
    advice.push('This communication appears authentic and aligned with legitimate corporate security protocols.');
    advice.push('Remember: Legitimate customer support representatives will NEVER ask for your password, PIN, or one-time passcode over the phone.');
    advice.push('When in doubt, always bookmark and visit your financial institutions directly.');
  }

  return {
    threatScore,
    legitimacyScore,
    verdict,
    verdictCategory,
    breakdown,
    advice,
  };
}
