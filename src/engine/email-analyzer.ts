import { parseEmailOrMessage } from '@/utils/email-parser';
import { Finding } from '@/types';
import { VERIFIED_ENTITIES } from '@/utils/constants';

export interface EmailAnalysisOutput {
  findings: Finding[];
  extractedUrls: string[];
  isSmsOrText: boolean;
  senderAuthentic?: boolean;
}

const FREE_EMAIL_PROVIDERS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'proton.me', 'protonmail.com'
]);

export function analyzeEmailContent(rawText: string): EmailAnalysisOutput {
  const parsed = parseEmailOrMessage(rawText);
  const findings: Finding[] = [];

  // 1. Reply-to mismatch (major phishing red flag)
  if (parsed.hasReplyToMismatch) {
    findings.push({
      id: 'reply-to-mismatch',
      title: 'Sender & Reply-To Address Discrepancy',
      description: `The message claims to originate from "${parsed.fromDomain}", but any reply is configured to route silently to "${parsed.replyToDomain}".`,
      severity: 'critical',
      category: 'headers',
      evidence: `From: ${parsed.from} | Reply-To: ${parsed.replyTo}`,
      whySuspicious: 'Phishing operations often spoof reputable headers in the visible "From" field, while secretly harvesting victim replies at an attacker-controlled mailbox.',
    });
  }

  // 2. Free email provider claiming corporate identity
  if (parsed.fromDomain && FREE_EMAIL_PROVIDERS.has(parsed.fromDomain)) {
    // Check if the subject, sender name, or body claims to be a bank, courier, or tech firm
    const lowerText = `${parsed.from || ''} ${parsed.subject || ''} ${parsed.body}`.toLowerCase();
    for (const [domain, entity] of Object.entries(VERIFIED_ENTITIES)) {
      const brand = domain.split('.')[0];
      if (lowerText.includes(brand)) {
        findings.push({
          id: 'free-mail-corporate-spoof',
          title: `Corporate Claim Sent from Free Webmail (@${parsed.fromDomain})`,
          description: `The communication mentions ${entity.name}, but was dispatched using a free public mail provider (${parsed.fromDomain}) rather than official corporate infrastructure (@${domain}).`,
          severity: 'critical',
          category: 'headers',
          whySuspicious: `Official communications from ${entity.name} are sent exclusively through verified servers at ${domain}, never free public webmail.`,
        });
        break;
      }
    }
  }

  // 3. Email Authentication results (SPF / DKIM / DMARC)
  if (parsed.spfStatus === 'fail') {
    findings.push({
      id: 'spf-fail',
      title: 'SPF (Sender Policy Framework) Validation Failed',
      description: 'The transmitting mail server is not authorized by the claimed domain owner to send messages.',
      severity: 'high',
      category: 'headers',
      whySuspicious: 'Failed SPF indicates the sender is likely masquerading as another entity.',
    });
  } else if (parsed.spfStatus === 'pass') {
    findings.push({
      id: 'spf-pass',
      title: 'SPF Authentication Passed',
      description: 'The transmitting mail server is verified and authorized by the sending domain.',
      severity: 'info',
      category: 'legitimacy',
      isLegitimacyIndicator: true,
      whyLegit: 'The message genuinely originated from an authorized corporate mail gateway.',
    });
  }

  if (parsed.dmarcStatus === 'pass') {
    findings.push({
      id: 'dmarc-pass',
      title: 'DMARC Domain Alignment Verified',
      description: 'The email passed DMARC cryptographic alignment checks confirming the sender identity.',
      severity: 'info',
      category: 'legitimacy',
      isLegitimacyIndicator: true,
      whyLegit: 'DMARC alignment is extremely difficult for scammers to forge.',
    });
  }

  // 4. Social Engineering & Urgency Triggers
  for (const trigger of parsed.detectedTriggers) {
    findings.push({
      id: `trigger-${trigger.category.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Social Engineering Cue: ${trigger.category}`,
      description: `The message uses psychological manipulation tactics: "${trigger.match}".`,
      severity: 'medium',
      category: 'content',
      evidence: trigger.match,
      whySuspicious: 'Scammers deliberately fabricate synthetic urgency, account suspension warnings, or unexpected prizes to provoke hurried, uncritical reactions.',
    });
  }

  // 5. Extracted URLs count warning
  if (parsed.extractedUrls.length > 0) {
    findings.push({
      id: 'embedded-links',
      title: `${parsed.extractedUrls.length} Hyperlink(s) Identified in Message`,
      description: `The communication directs the reader to external web destinations.`,
      severity: 'info',
      category: 'content',
      evidence: parsed.extractedUrls.slice(0, 3).join(', ') + (parsed.extractedUrls.length > 3 ? '...' : ''),
    });
  }

  return {
    findings,
    extractedUrls: parsed.extractedUrls,
    isSmsOrText: parsed.isSmsOrText,
    senderAuthentic: parsed.dmarcStatus === 'pass' && parsed.spfStatus === 'pass',
  };
}
