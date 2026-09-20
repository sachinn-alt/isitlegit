import { describe, it, expect } from 'vitest';
import { classifyPayloadML } from '@/engine/ml-phishing-classifier';

describe('Machine Learning Phishing Classifier (Client-side Ensemble)', () => {
  it('classifies deceptive multi-subdomain phishing links on high-abuse TLDs as MALICIOUS', () => {
    const maliciousUrl = 'http://secure-paypal-account-recovery.billing-update.xyz/verify-login';
    const result = classifyPayloadML(maliciousUrl, maliciousUrl);

    expect(result.classification).toBe('MALICIOUS');
    expect(result.probability).toBeGreaterThanOrEqual(0.7);
    expect(result.topFeatures.length).toBeGreaterThan(0);
    expect(result.inferenceTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('classifies official corporate websites as LEGITIMATE with low probability', () => {
    const safeUrl = 'https://www.paypal.com/myaccount/summary';
    const result = classifyPayloadML(safeUrl, safeUrl);

    expect(result.classification).toBe('LEGITIMATE');
    expect(result.probability).toBeLessThan(0.3);
  });

  it('detects brand typosquatting targeting financial institutions', () => {
    const typosquatUrl = 'http://paypa1-security.com/login';
    const result = classifyPayloadML(typosquatUrl, typosquatUrl);

    expect(result.probability).toBeGreaterThan(0.4);
    const brandFeature = result.topFeatures.find((f) => f.name.includes('Brand') || f.name.includes('Typo-Squatting'));
    expect(brandFeature).toBeDefined();
  });

  it('identifies urgency fear extortion and gift card demands in text', () => {
    const scamText = 'URGENT: Your account will be terminated in 24 hours unless you pay $500 in Apple gift card immediately!';
    const result = classifyPayloadML(scamText);

    expect(result.probability).toBeGreaterThanOrEqual(0.6);
    expect(result.isMalicious).toBe(true);
  });
});
