import { describe, it, expect } from 'vitest';
import { analyzeEmailContent } from '@/engine/email-analyzer';

describe('Email & Message Heuristic Analyzer', () => {
  it('detects reply-to discrepancy between From and Reply-To headers', () => {
    const rawEmail = `From: support@paypal.com
Reply-To: phisher99@gmail.com
Subject: Account Suspended

Your account is suspended. Update immediately.`;

    const result = analyzeEmailContent(rawEmail);
    expect(result.findings.some(f => f.id === 'reply-to-mismatch')).toBe(true);
  });

  it('detects urgency psychological triggers', () => {
    const text = 'Immediate action required! Your account will be locked within 24 hours.';
    const result = analyzeEmailContent(text);
    expect(result.findings.some(f => f.id.includes('trigger-'))).toBe(true);
  });

  it('validates passing SPF and DMARC alignment', () => {
    const rawEmail = `From: alerts@chase.com
Authentication-Results: spf=pass dkim=pass dmarc=pass
Subject: Your monthly statement is ready`;

    const result = analyzeEmailContent(rawEmail);
    expect(result.senderAuthentic).toBe(true);
    expect(result.findings.some(f => f.isLegitimacyIndicator)).toBe(true);
  });
});
