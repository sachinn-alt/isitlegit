import { OfficialEntity } from '@/types';

// High-profile verified legitimate organizations, banks, couriers, and gov services
export const VERIFIED_ENTITIES: Record<string, OfficialEntity> = {
  // Banking & Fintech
  'chase.com': { name: 'JPMorgan Chase', category: 'bank', verifiedDomain: 'chase.com', officialContactUrl: 'https://www.chase.com/digital/resources/privacy-security' },
  'bankofamerica.com': { name: 'Bank of America', category: 'bank', verifiedDomain: 'bankofamerica.com', officialContactUrl: 'https://www.bankofamerica.com/security-center/' },
  'wellsfargo.com': { name: 'Wells Fargo', category: 'bank', verifiedDomain: 'wellsfargo.com', officialContactUrl: 'https://www.wellsfargo.com/privacy-security/' },
  'citi.com': { name: 'Citigroup', category: 'bank', verifiedDomain: 'citi.com', officialContactUrl: 'https://www.citi.com/security' },
  'paypal.com': { name: 'PayPal', category: 'bank', verifiedDomain: 'paypal.com', officialContactUrl: 'https://www.paypal.com/security' },
  'stripe.com': { name: 'Stripe', category: 'bank', verifiedDomain: 'stripe.com', officialContactUrl: 'https://stripe.com/docs/security' },
  'hdfcbank.com': { name: 'HDFC Bank', category: 'bank', verifiedDomain: 'hdfcbank.com', officialContactUrl: 'https://www.hdfcbank.com/personal/useful-links/security' },
  'icicibank.com': { name: 'ICICI Bank', category: 'bank', verifiedDomain: 'icicibank.com', officialContactUrl: 'https://www.icicibank.com/safe-banking' },
  'sbi.co.in': { name: 'State Bank of India', category: 'bank', verifiedDomain: 'sbi.co.in', officialContactUrl: 'https://sbi.co.in/web/customer-care/faq-cyber-security' },

  // Couriers & Delivery
  'usps.com': { name: 'United States Postal Service (USPS)', category: 'courier', verifiedDomain: 'usps.com', officialContactUrl: 'https://www.uspis.gov/report' },
  'fedex.com': { name: 'FedEx', category: 'courier', verifiedDomain: 'fedex.com', officialContactUrl: 'https://www.fedex.com/en-us/trust-center/report-fraud.html' },
  'ups.com': { name: 'United Parcel Service (UPS)', category: 'courier', verifiedDomain: 'ups.com', officialContactUrl: 'https://www.ups.com/us/en/support/shipping-support/legal-terms-conditions/fight-fraud.page' },
  'dhl.com': { name: 'DHL Express', category: 'courier', verifiedDomain: 'dhl.com', officialContactUrl: 'https://www.dhl.com/global-en/home/footer/fraud-awareness.html' },
  'indiapost.gov.in': { name: 'India Post', category: 'courier', verifiedDomain: 'indiapost.gov.in', officialContactUrl: 'https://www.indiapost.gov.in' },

  // Government & Tax
  'irs.gov': { name: 'Internal Revenue Service (IRS)', category: 'government', verifiedDomain: 'irs.gov', officialContactUrl: 'https://www.irs.gov/privacy-disclosure/report-phishing' },
  'usa.gov': { name: 'USA.gov Official Portal', category: 'government', verifiedDomain: 'usa.gov', officialContactUrl: 'https://www.usa.gov/scams-and-fraud' },
  'ssa.gov': { name: 'Social Security Administration', category: 'government', verifiedDomain: 'ssa.gov', officialContactUrl: 'https://www.ssa.gov/scam/' },
  'incometax.gov.in': { name: 'Income Tax Department of India', category: 'government', verifiedDomain: 'incometax.gov.in', officialContactUrl: 'https://incometax.gov.in' },
  'gov.uk': { name: 'UK Government Portal', category: 'government', verifiedDomain: 'gov.uk', officialContactUrl: 'https://www.gov.uk/report-suspicious-emails-websites-phishing' },

  // Tech & Communication Giants
  'google.com': { name: 'Google', category: 'tech', verifiedDomain: 'google.com', officialContactUrl: 'https://safety.google/' },
  'accounts.google.com': { name: 'Google Security', category: 'tech', verifiedDomain: 'google.com', officialContactUrl: 'https://myaccount.google.com/security' },
  'apple.com': { name: 'Apple', category: 'tech', verifiedDomain: 'apple.com', officialContactUrl: 'https://support.apple.com/en-us/102568' },
  'microsoft.com': { name: 'Microsoft', category: 'tech', verifiedDomain: 'microsoft.com', officialContactUrl: 'https://www.microsoft.com/security' },
  'amazon.com': { name: 'Amazon', category: 'retail', verifiedDomain: 'amazon.com', officialContactUrl: 'https://www.amazon.com/gp/help/customer/display.html?nodeId=GRGRY7AQ3LMPXNCR' },
  'netflix.com': { name: 'Netflix', category: 'tech', verifiedDomain: 'netflix.com', officialContactUrl: 'https://help.netflix.com/en/node/65674' },
  'meta.com': { name: 'Meta / Facebook', category: 'tech', verifiedDomain: 'meta.com', officialContactUrl: 'https://www.facebook.com/help/158488180878239' },
};

// High-risk and abuse-prone Top-Level Domains
export const HIGH_RISK_TLDS = new Set([
  'zip', 'mov', 'top', 'xyz', 'work', 'click', 'link', 'gq', 'cf', 'ml', 'ga', 'tk',
  'rest', 'fit', 'buzz', 'surf', 'icu', 'cam', 'sbs', 'monster', 'hair', 'beauty', 'quest'
]);

// URL Shortener services often abused to obfuscate phishing links
export const URL_SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'adf.ly',
  'bit.do', 'cutt.ly', 'tiny.cc', 'rb.gy', 'rebrand.ly', 'shorturl.at'
]);

// Urgent scam phrases commonly observed in phishing, smishing, and vishing
export const SUSPICIOUS_TRIGGERS = [
  { pattern: /account (is |has been )?(suspended|locked|restricted|disabled|compromised)/i, category: 'Account Takeover' },
  { pattern: /unauthorized (transaction|access|charge|activity|login)/i, category: 'Financial Scare' },
  { pattern: /immediate action required|act now|within 24 hours|urgently|final notice/i, category: 'Urgency Trap' },
  { pattern: /package (delivery (failed|pending)|cannot be delivered|requires fee|address incomplete)/i, category: 'Courier Scam' },
  { pattern: /tax (refund|audit|penalty|warrant|debt)/i, category: 'Tax Scam' },
  { pattern: /claim your (prize|reward|crypto|bitcoin|gift card|bonus)/i, category: 'Lottery/Reward Scam' },
  { pattern: /verify your (identity|ssn|otp|pin|password|wallet|seed phrase)/i, category: 'Credential Harvest' },
  { pattern: /gift cards? (itunes|amazon|steam|google play) (payment|urgent)/i, category: 'Gift Card Scam' },
];

// Legitimate security phrases that people frequently mistake for scams
export const LEGITIMATE_ALERT_PATTERNS = [
  { pattern: /security code is \d{4,8}|your one-time code is \d{4,8}|use otp \d{4,8}/i, title: 'One-Time Security Verification' },
  { pattern: /we noticed a new sign-in to your account from/i, title: 'New Device Login Alert' },
  { pattern: /two-step verification is now turned on/i, title: '2FA Confirmation' },
  { pattern: /did you just make a purchase of \$?\d+(\.\d{2})? at/i, title: 'Fraud Check Verification' },
];
