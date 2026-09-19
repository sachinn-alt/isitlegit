import { Finding, OfficialEntity } from '@/types';
import { LEGITIMATE_ALERT_PATTERNS, VERIFIED_ENTITIES } from '@/utils/constants';

export interface LegitimacyCheckResult {
  isLikelyLegitimate: boolean;
  confidence: number;
  officialEntity?: OfficialEntity;
  findings: Finding[];
  safeFollowUp: string[];
}

export function evaluateLegitimacy(
  content: string,
  domain?: string,
  hasMaliciousLinks: boolean = false
): LegitimacyCheckResult {
  const findings: Finding[] = [];
  const safeFollowUp: string[] = [];
  let isLikelyLegitimate = false;
  let confidence = 0;
  let officialEntity: OfficialEntity | undefined;

  // 1. If a verified domain was matched
  if (domain) {
    officialEntity = VERIFIED_ENTITIES[domain.toLowerCase()];
    if (officialEntity && !hasMaliciousLinks) {
      isLikelyLegitimate = true;
      confidence = 95;
      findings.push({
        id: 'verified-entity-match',
        title: `Officially Confirmed Entity: ${officialEntity.name}`,
        description: `This request links directly to the verified primary infrastructure of ${officialEntity.name}.`,
        severity: 'info',
        category: 'legitimacy',
        isLegitimacyIndicator: true,
        whyLegit: `The communication directs solely to ${officialEntity.verifiedDomain}, which is the authentic domain of ${officialEntity.name}.`,
        whySuspicious: 'Important corporate notices often use firm language or urgent deadlines that mimic scam messages.',
      });

      safeFollowUp.push(
        `If you are ever uncertain, navigate directly to ${officialEntity.verifiedDomain} in your browser instead of clicking any link.`
      );
      if (officialEntity.officialContactUrl) {
        safeFollowUp.push(
          `Review the official security policy at: ${officialEntity.officialContactUrl}`
        );
      }
    }
  }

  // 2. Check for legitimate security alert patterns (OTP, Login notifications)
  for (const item of LEGITIMATE_ALERT_PATTERNS) {
    if (item.pattern.test(content) && !hasMaliciousLinks) {
      // Check if it asks for sensitive secrets (OTP asking you to send it back to a person is a scam, but OTP sent to you for login is legit)
      const asksToShareSecret = /send (this )?(code|otp) back|reply with (your )?(code|otp|password|pin)/i.test(content);
      
      if (!asksToShareSecret) {
        isLikelyLegitimate = true;
        confidence = Math.max(confidence, 80);
        findings.push({
          id: `legit-pattern-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
          title: `Standard Security Pattern: ${item.title}`,
          description: `This matches the standard operational format of legitimate multi-factor authentication and fraud alerts.`,
          severity: 'info',
          category: 'legitimacy',
          isLegitimacyIndicator: true,
          whyLegit: 'The message provides a security verification code without requesting your credentials, passwords, or personal identity numbers.',
          whySuspicious: 'Receiving an unexpected one-time code can feel alarming if you did not initiate the login yourself.',
        });

        safeFollowUp.push(
          'Do NOT share this code with anyone claiming to be a customer support agent. Legitimate staff will NEVER ask for your one-time code.'
        );
        safeFollowUp.push(
          'If you did not request this login attempt, change your account password immediately on the official service website.'
        );
      }
    }
  }

  // 3. Bank Fraud Check pattern (e.g. Reply YES/NO to confirm charge)
  const isBankFraudCheck = /reply yes or no to confirm|did you authorize|fraud alert.*reply/i.test(content);
  if (isBankFraudCheck && !hasMaliciousLinks) {
    isLikelyLegitimate = true;
    confidence = Math.max(confidence, 85);
    findings.push({
      id: 'legit-fraud-check',
      title: 'Legitimate Two-Way Fraud Check Protocol',
      description: 'The notification asks for a simple verification confirmation without directing you to enter card details on a web portal.',
      severity: 'info',
      category: 'legitimacy',
      isLegitimacyIndicator: true,
      whyLegit: 'Banks use automated SMS alerts asking for YES or NO to halt suspicious merchant charges before card lock.',
      whySuspicious: 'Any message mentioning unauthorized banking charges naturally triggers anxiety.',
    });

    safeFollowUp.push(
      'To be 100% safe: Call the official phone number printed directly on the physical back of your debit/credit card to confirm the transaction with customer service.'
    );
  }

  return {
    isLikelyLegitimate,
    confidence,
    officialEntity,
    findings,
    safeFollowUp,
  };
}
