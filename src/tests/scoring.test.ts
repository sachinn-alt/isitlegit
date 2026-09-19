import { describe, it, expect } from 'vitest';
import { calculateThreatScore } from '@/engine/scoring';
import { Finding } from '@/types';

describe('Threat & Legitimacy Scoring Engine', () => {
  it('assigns SAFE and high legitimacy to confirmed authentic findings', () => {
    const findings: Finding[] = [
      {
        id: '1',
        title: 'Official Verified Domain: Chase',
        description: 'Primary verified banking domain',
        severity: 'info',
        category: 'legitimacy',
        isLegitimacyIndicator: true,
      },
    ];

    const result = calculateThreatScore(findings, true, 1.0);
    expect(result.verdict).toBe('SAFE');
    expect(result.verdictCategory).toBe('LEGITIMATE');
    expect(result.legitimacyScore).toBeGreaterThanOrEqual(90);
  });

  it('assigns DANGEROUS to critical phishing indicators', () => {
    const findings: Finding[] = [
      {
        id: '1',
        title: 'Brand Impersonation Detected',
        description: 'Impersonating PayPal on fake domain',
        severity: 'critical',
        category: 'domain',
      },
      {
        id: '2',
        title: 'Reply-To Mismatch',
        description: 'Secretly routing replies to external webmail',
        severity: 'critical',
        category: 'headers',
      },
    ];

    const result = calculateThreatScore(findings, false, 1.2);
    expect(result.threatScore).toBeGreaterThanOrEqual(80);
    expect(result.verdictCategory).toBe('MALICIOUS');
    expect(result.advice.length).toBeGreaterThan(0);
  });
});
