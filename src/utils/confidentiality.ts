/**
 * Confidential Data & Photo Safety Guard
 * Prevents inadvertent upload of government IDs, payment cards, and sensitive credentials.
 */

export const SENSITIVE_FILENAME_REGEX =
  /(passport|aadhaar|aadhar|ssn|social_security|pan_card|pancard|driving_licen|driver_licen|dl_front|dl_back|credit_card|debit_card|bank_statement|cvv|tax_return|id_card|voter_id|identity_card|confidential|private_photo|intimate|salary_slip|w2_form|paystub)/i;

export const SENSITIVE_TEXT_PATTERNS = [
  {
    name: 'Credit / Debit Card Number (13-16 digits)',
    regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b/,
  },
  {
    name: 'US Social Security Number (SSN)',
    regex: /\b\d{3}-\d{2}-\d{4}\b/,
  },
  {
    name: 'Indian Aadhaar Number (12 digits)',
    regex: /\b\d{4}\s\d{4}\s\d{4}\b/,
  },
  {
    name: 'Indian Permanent Account Number (PAN)',
    regex: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/,
  },
];

export interface ConfidentialityCheckResult {
  isBlocked: boolean;
  reason?: string;
  detectedPattern?: string;
}

export function checkFileConfidentiality(file: File): ConfidentialityCheckResult {
  // 1. Filename keyword check
  if (SENSITIVE_FILENAME_REGEX.test(file.name)) {
    return {
      isBlocked: true,
      reason: `The filename "${file.name}" indicates a confidential document or government ID. For your privacy, please upload only suspicious SMS messages, phishing email headers, or QR codes.`,
      detectedPattern: 'Confidential Document Filename',
    };
  }

  return { isBlocked: false };
}

export function checkTextConfidentiality(text: string): ConfidentialityCheckResult {
  for (const pattern of SENSITIVE_TEXT_PATTERNS) {
    if (pattern.regex.test(text)) {
      return {
        isBlocked: true,
        reason: `Detected sensitive pattern: ${pattern.name}. For your security, do not submit unredacted personal credentials.`,
        detectedPattern: pattern.name,
      };
    }
  }

  return { isBlocked: false };
}
