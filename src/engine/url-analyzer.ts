import { parseUrl } from '@/utils/url';
import { Finding, AlgorithmCheck } from '@/types';
import { VERIFIED_ENTITIES } from '@/utils/constants';
import { defendAgainstNetworkLoopholes } from './network-loophole-defender';

export interface UrlAnalysisOutput {
  findings: Finding[];
  algorithmicChecks: AlgorithmCheck[];
  isVerifiedEntity: boolean;
  officialEntityName?: string;
  impersonatedEntity?: string;
  threatMultiplier: number;
  trampolineTargetUrl?: string;
}

export function analyzeUrlStructure(rawUrl: string): UrlAnalysisOutput {
  const parsed = parseUrl(rawUrl);
  const findings: Finding[] = [];
  const algorithmicChecks: AlgorithmCheck[] = [];
  let threatMultiplier = 1.0;

  if (!parsed.isValid) {
    findings.push({
      id: 'invalid-url',
      title: 'Malformed or Invalid Web Address',
      description: 'The provided address does not conform to standard URL protocols and cannot be safely navigated.',
      severity: 'high',
      category: 'domain',
      whySuspicious: 'Invalid format could be an attempt to trigger browser parsing anomalies or bypass filters.',
    });
    return { findings, algorithmicChecks, isVerifiedEntity: false, threatMultiplier: 2.0 };
  }

  // 1. Run RFC 3986 Network Loophole & Protocol Evasion Defender
  const defense = defendAgainstNetworkLoopholes(rawUrl);
  findings.push(...defense.findings);
  algorithmicChecks.push(...defense.algorithmicChecks);
  threatMultiplier *= defense.threatMultiplier;

  // 2. Check if it is a known official entity (only if NO trampoline bypass was trapped)
  const verifiedEntity = VERIFIED_ENTITIES[parsed.rootDomain];
  if (verifiedEntity && !defense.trampolineTargetUrl && defense.anomaliesDetected === 0) {
    findings.push({
      id: 'official-verified-domain',
      title: `Authentic Official Domain: ${verifiedEntity.name}`,
      description: `The destination domain "${parsed.rootDomain}" is an authenticated, primary domain operated by ${verifiedEntity.name}.`,
      severity: 'info',
      category: 'legitimacy',
      isLegitimacyIndicator: true,
      whyLegit: `This is the real, verified website (${verifiedEntity.verifiedDomain}) rather than an imitation.`,
    });
    return {
      findings,
      algorithmicChecks,
      isVerifiedEntity: true,
      officialEntityName: verifiedEntity.name,
      threatMultiplier: 0.1,
    };
  }

  // 2. Homoglyph / Punycode Check
  if (parsed.hasHomograph) {
    findings.push({
      id: 'homoglyph-spoof',
      title: 'Deceptive Homograph / Character Mimicry Detected',
      description: parsed.homographDetails || 'The web address contains internationalized characters that look visually identical to standard Latin letters.',
      severity: 'critical',
      category: 'domain',
      evidence: parsed.hostname,
      whySuspicious: 'Attackers use visual lookalike letters (e.g. Cyrillic "а" instead of Latin "a") to deceive victims into thinking they are visiting a genuine brand.',
    });
    threatMultiplier += 1.5;
  }

  // 3. Brand Impersonation Check (e.g. paypal.secure-login-portal.com)
  if (parsed.impersonatedEntity) {
    findings.push({
      id: 'brand-impersonation',
      title: `Potential Brand Impersonation: ${parsed.impersonatedEntity}`,
      description: `The domain structure incorporates keywords or names associated with ${parsed.impersonatedEntity}, but is hosted on the unrelated root domain "${parsed.rootDomain}".`,
      severity: 'critical',
      category: 'domain',
      evidence: `Root domain is "${parsed.rootDomain}", not the authentic brand domain.`,
      whySuspicious: 'Phishing kits commonly register subdomains resembling banks or tech companies to trick mobile users who only see the first part of the link.',
    });
    threatMultiplier += 2.0;
  }

  // 4. IP Address Host Check
  if (parsed.isIpAddress) {
    findings.push({
      id: 'raw-ip-host',
      title: 'Direct IP Address Used in Web Link',
      description: `The link points directly to a raw numeric server IP address (${parsed.hostname}) without a registered domain name.`,
      severity: 'high',
      category: 'domain',
      whySuspicious: 'Legitimate businesses virtually always use registered domain names. Raw IP addresses are heavily correlated with temporary malicious drop-sites.',
    });
    threatMultiplier += 0.8;
  }

  // 5. URL Shortener Masking
  if (parsed.isShortener) {
    findings.push({
      id: 'url-shortener',
      title: 'URL Obfuscated Through Shortening Service',
      description: `The link utilizes a redirection or shortening service (${parsed.rootDomain}) which obscures the true destination URL.`,
      severity: 'medium',
      category: 'domain',
      whySuspicious: 'Shortened links prevent you from seeing where you will actually land before clicking.',
    });
    threatMultiplier += 0.4;
  }

  // 6. High Risk TLD
  if (parsed.isHighRiskTld) {
    findings.push({
      id: 'high-risk-tld',
      title: `Uncommon or High-Abuse Top-Level Domain (TLD): .${parsed.tld}`,
      description: `The domain utilizes the .${parsed.tld} extension, which has a statistically elevated frequency of phishing and cybercrime registration due to low cost or lax verification.`,
      severity: 'medium',
      category: 'domain',
      whySuspicious: 'Free or ultra-cheap extensions are favored by automated scam syndicates because they can be discarded quickly.',
    });
    threatMultiplier += 0.5;
  }

  // 7. Suspicious Path Keywords
  const lowerPath = parsed.pathname.toLowerCase();
  const pathKeywords = ['login', 'signin', 'verify', 'update', 'banking', 'secure', 'wallet', 'confirm', 'billing'];
  const matchedKeyword = pathKeywords.find(kw => lowerPath.includes(kw));
  if (matchedKeyword && !verifiedEntity) {
    findings.push({
      id: 'credential-harvest-path',
      title: `Credential Harvest Indicator in Link Path: "${matchedKeyword}"`,
      description: `The address path contains sensitive account action terms ("${matchedKeyword}") on an unverified domain.`,
      severity: 'low',
      category: 'content',
    });
  }

  return {
    findings,
    algorithmicChecks,
    isVerifiedEntity: false,
    impersonatedEntity: parsed.impersonatedEntity,
    threatMultiplier,
    trampolineTargetUrl: defense.trampolineTargetUrl,
  };
}
