import { HIGH_RISK_TLDS, URL_SHORTENERS, VERIFIED_ENTITIES } from './constants';

export interface ParsedUrlDetails {
  isValid: boolean;
  normalizedUrl: string;
  protocol: string;
  hostname: string;
  pathname: string;
  rootDomain: string;
  subdomain: string;
  tld: string;
  isIpAddress: boolean;
  isShortener: boolean;
  isHighRiskTld: boolean;
  hasHomograph: boolean;
  homographDetails?: string;
  impersonatedEntity?: string;
}

// Common Cyrillic and Greek homoglyphs used in spoofing attacks
const HOMOGLYPHS: Record<string, string> = {
  '\u0430': 'a', '\u0435': 'e', '\u043E': 'o', '\u0440': 'p', '\u0441': 'c',
  '\u0443': 'y', '\u0445': 'x', '\u0456': 'i', '\u0458': 'j', '\u0455': 's',
  '\u03BF': 'o', '\u03C1': 'p', '\u03B1': 'a', '\u03BD': 'v',
};

export function normalizeUrl(input: string): string {
  let cleaned = input.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }
  return cleaned;
}

export function parseUrl(rawInput: string): ParsedUrlDetails {
  try {
    const normalized = normalizeUrl(rawInput);
    const urlObj = new URL(normalized);

    const hostname = urlObj.hostname.toLowerCase();
    const parts = hostname.split('.');

    // Check IP address
    const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.startsWith('[');

    // Extract root domain & TLD
    let rootDomain = hostname;
    let subdomain = '';
    let tld = '';

    if (!isIpAddress && parts.length >= 2) {
      // Handle country code double extensions e.g. .co.uk, .gov.in, .ac.uk
      const isMultiPartTld = ['co.uk', 'gov.in', 'org.uk', 'com.au', 'co.in', 'gov.uk'].some(
        suffix => hostname.endsWith('.' + suffix)
      );

      if (isMultiPartTld && parts.length >= 3) {
        tld = parts.slice(-2).join('.');
        rootDomain = parts.slice(-3).join('.');
        subdomain = parts.slice(0, -3).join('.');
      } else {
        tld = parts[parts.length - 1];
        rootDomain = parts.slice(-2).join('.');
        subdomain = parts.slice(0, -2).join('.');
      }
    }

    // Check Homograph
    let hasHomograph = hostname.startsWith('xn--');
    let homographDetails = hasHomograph ? 'Punycode internationalized domain detected' : undefined;

    for (const [char, latin] of Object.entries(HOMOGLYPHS)) {
      if (hostname.includes(char)) {
        hasHomograph = true;
        homographDetails = `Contains deceptive unicode character '${char}' mimicking Latin '${latin}'`;
        break;
      }
    }

    // Check brand impersonation in subdomain or misleading path (e.g. login-paypal.com or chase.bank.com.xyz)
    let impersonatedEntity: string | undefined;
    for (const [domain, entity] of Object.entries(VERIFIED_ENTITIES)) {
      const brandName = domain.split('.')[0];
      if (rootDomain !== domain) {
        if (
          hostname.includes(brandName) ||
          subdomain.includes(brandName) ||
          urlObj.pathname.includes(brandName)
        ) {
          impersonatedEntity = `${entity.name} (${domain})`;
          break;
        }
      }
    }

    return {
      isValid: true,
      normalizedUrl: urlObj.href,
      protocol: urlObj.protocol,
      hostname,
      pathname: urlObj.pathname,
      rootDomain,
      subdomain,
      tld,
      isIpAddress,
      isShortener: URL_SHORTENERS.has(rootDomain),
      isHighRiskTld: HIGH_RISK_TLDS.has(tld),
      hasHomograph,
      homographDetails,
      impersonatedEntity,
    };
  } catch {
    return {
      isValid: false,
      normalizedUrl: rawInput,
      protocol: '',
      hostname: '',
      pathname: '',
      rootDomain: '',
      subdomain: '',
      tld: '',
      isIpAddress: false,
      isShortener: false,
      isHighRiskTld: false,
      hasHomograph: false,
    };
  }
}
