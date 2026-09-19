import { describe, it, expect } from 'vitest';
import { analyzeUrlStructure } from '@/engine/url-analyzer';
import { parseUrl } from '@/utils/url';

describe('URL Parser & Security Analyzer', () => {
  it('correctly validates and recognizes authentic Chase domain', () => {
    const analysis = analyzeUrlStructure('https://www.chase.com/personal/banking');
    expect(analysis.isVerifiedEntity).toBe(true);
    expect(analysis.officialEntityName).toContain('JPMorgan Chase');
    expect(analysis.threatMultiplier).toBeLessThan(0.5);
  });

  it('detects brand impersonation in subdomains (e.g. chase.com.evil-portal.xyz)', () => {
    const analysis = analyzeUrlStructure('http://chase.com.security-verify.xyz/login');
    expect(analysis.isVerifiedEntity).toBe(false);
    expect(analysis.findings.some(f => f.category === 'domain' && f.severity === 'critical')).toBe(true);
  });

  it('detects raw numeric IP addresses', () => {
    const analysis = analyzeUrlStructure('http://192.168.1.100/admin/login');
    expect(analysis.findings.some(f => f.id === 'raw-ip-host')).toBe(true);
  });

  it('identifies URL shortening services', () => {
    const parsed = parseUrl('https://bit.ly/3xY7zQw');
    expect(parsed.isShortener).toBe(true);
  });

  it('flags high-abuse TLDs', () => {
    const parsed = parseUrl('https://urgent-verification-center.xyz');
    expect(parsed.isHighRiskTld).toBe(true);
  });
});
