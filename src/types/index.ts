export type ScanType = 'url' | 'email' | 'image' | 'qr' | 'text';

export type ThreatLevel = 'SAFE' | 'LOW_RISK' | 'SUSPICIOUS' | 'HIGH_RISK' | 'DANGEROUS';

export type VerdictCategory = 'LEGITIMATE' | 'SUSPICIOUS' | 'MALICIOUS' | 'UNVERIFIED';

export type FindingSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export type FindingCategory =
  | 'domain'
  | 'headers'
  | 'content'
  | 'legitimacy'
  | 'reputation'
  | 'ai_analysis'
  | 'visual';

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  category: FindingCategory;
  evidence?: string;
  isLegitimacyIndicator?: boolean;
  whySuspicious?: string;
  whyLegit?: string;
}

export interface Source {
  name: string;
  status: 'clean' | 'suspicious' | 'malicious' | 'error' | 'skipped' | 'verified_legit';
  details: string;
  url?: string;
  icon?: string;
}

export interface OfficialEntity {
  name: string;
  category: 'bank' | 'courier' | 'government' | 'tech' | 'retail' | 'utility' | 'telecom';
  verifiedDomain: string;
  officialContactUrl?: string;
}

export interface ScanResult {
  id: string;
  type: ScanType;
  input: string;
  inputPreview: string;
  threatScore: number; // 0 = safe, 100 = malicious
  legitimacyScore: number; // 0 = fake/unknown, 100 = verified authentic
  verdict: ThreatLevel;
  verdictCategory: VerdictCategory;
  summary: string;
  explanation: string;
  scamType?: string;
  isLegitimateConfirmed?: boolean;
  officialEntity?: OfficialEntity;
  findings: Finding[];
  sources: Source[];
  threatBreakdown: {
    domainReputation: number;
    socialEngineering: number;
    contentSafety: number;
    impersonationRisk: number;
    authenticity: number;
  };
  advice: string[];
  safeFollowUp?: string[];
  timestamp: number;
  durationMs: number;
  enginesUsed: string[];
}

export interface ScanRecord {
  id: string;
  type: ScanType;
  input: string;
  inputPreview: string;
  result: ScanResult;
  threatScore: number;
  verdict: ThreatLevel;
  bookmarked: boolean;
  createdAt: Date;
}

export interface AppSettings {
  geminiApiKey?: string;
  virusTotalApiKey?: string;
  safeBrowsingApiKey?: string;
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsRegion?: string;
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
  useLiveSearchGrounding: boolean;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}
