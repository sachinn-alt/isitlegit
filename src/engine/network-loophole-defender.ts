import { Finding, AlgorithmCheck } from '@/types';
import { VERIFIED_ENTITIES } from '@/utils/constants';

export interface LoopholeDefenseResult {
  findings: Finding[];
  algorithmicChecks: AlgorithmCheck[];
  threatMultiplier: number;
  trampolineTargetUrl?: string;
  sanitizedUrl?: string;
  anomaliesDetected: number;
}

// Known free serverless, dynamic DNS, and disposable hosting platforms
const CLOUD_SERVERLESS_HOSTS = new Set([
  'workers.dev',
  'pages.dev',
  'duckdns.org',
  'ngrok-free.app',
  'ngrok.io',
  'vercel.app',
  'netlify.app',
  'firebaseapp.com',
  'web.app',
  'glitch.me',
  'surge.sh',
  'github.io',
  'supabase.co',
  's3.amazonaws.com',
  'blob.core.windows.net',
]);

// Trampoline / Open-Redirect parameters phishers use to launder links
const TRAMPOLINE_PARAMS = [
  'q',
  'url',
  'u',
  'target',
  'dest',
  'destination',
  'redirect',
  'redirect_uri',
  'redirect_url',
  'next',
  'r',
  'link',
  'to',
  'goto',
  'out',
  'forward',
  'return_to',
];

// Invisible Unicode, Zero-Width characters & BiDi overrides
const INVISIBLE_UNICODE_PATTERNS = [
  { regex: /\u200B/g, name: 'Zero-Width Space (U+200B)' },
  { regex: /\u200C/g, name: 'Zero-Width Non-Joiner (U+200C)' },
  { regex: /\u200D/g, name: 'Zero-Width Joiner (U+200D)' },
  { regex: /\uFEFF/g, name: 'Zero-Width No-Break Space / BOM (U+FEFF)' },
  { regex: /\u202E/g, name: 'Right-To-Left Override RTLO (U+202E)' },
  { regex: /\u202D/g, name: 'Left-To-Right Override (U+202D)' },
  { regex: /\u2060/g, name: 'Word Joiner (U+2060)' },
  { regex: /\u00AD/g, name: 'Soft Hyphen (U+00AD)' },
];

/**
 * 1. Obfuscated Alternate-Base IP Address De-cloaker
 * Detects Decimal DWORD, Hexadecimal, Octal, or mixed-base representations
 */
export function evaluateIpObfuscation(hostname: string): {
  isObfuscatedIp: boolean;
  decodedIp?: string;
  type?: 'dword' | 'hex' | 'octal' | 'ipv4_mapped_ipv6';
} {
  const cleanHost = hostname.replace(/^\[|\]$/g, '').trim().toLowerCase();

  // A. IPv4-mapped IPv6 (e.g. ::ffff:192.168.1.1)
  if (cleanHost.startsWith('::ffff:')) {
    const rawTail = cleanHost.replace('::ffff:', '');
    return { isObfuscatedIp: true, decodedIp: rawTail, type: 'ipv4_mapped_ipv6' };
  }

  // B. Single 32-bit Integer / DWORD IP (e.g. 2130706433 = 127.0.0.1)
  if (/^\d{8,10}$/.test(cleanHost)) {
    const intVal = parseInt(cleanHost, 10);
    if (intVal > 0 && intVal <= 4294967295) {
      const p1 = (intVal >>> 24) & 255;
      const p2 = (intVal >>> 16) & 255;
      const p3 = (intVal >>> 8) & 255;
      const p4 = intVal & 255;
      return { isObfuscatedIp: true, decodedIp: `${p1}.${p2}.${p3}.${p4}`, type: 'dword' };
    }
  }

  // C. Single Hexadecimal 32-bit Integer (e.g. 0x7f000001 = 127.0.0.1)
  if (/^0x[0-9a-f]{8}$/i.test(cleanHost)) {
    const intVal = parseInt(cleanHost, 16);
    if (intVal > 0 && intVal <= 4294967295) {
      const p1 = (intVal >>> 24) & 255;
      const p2 = (intVal >>> 16) & 255;
      const p3 = (intVal >>> 8) & 255;
      const p4 = intVal & 255;
      return { isObfuscatedIp: true, decodedIp: `${p1}.${p2}.${p3}.${p4}`, type: 'hex' };
    }
  }

  // D. Dotted Hexadecimal (e.g. 0x7f.0x00.0x00.0x01)
  if (/^0x[0-9a-f]{1,2}(\.0x[0-9a-f]{1,2}){3}$/i.test(cleanHost)) {
    const parts = cleanHost.split('.').map((p) => parseInt(p, 16));
    return { isObfuscatedIp: true, decodedIp: parts.join('.'), type: 'hex' };
  }

  // E. Dotted Octal (e.g. 0177.0000.0000.0001 = 127.0.0.1)
  if (/^0[0-7]{1,3}(\.0[0-7]{1,3}){3}$/.test(cleanHost)) {
    const parts = cleanHost.split('.').map((p) => parseInt(p, 8));
    return { isObfuscatedIp: true, decodedIp: parts.join('.'), type: 'octal' };
  }

  return { isObfuscatedIp: false };
}

/**
 * Main Network Loophole Defender Algorithm Suite
 * Interrogates and defends against advanced protocol evasion mechanisms
 */
export function defendAgainstNetworkLoopholes(rawUrl: string): LoopholeDefenseResult {
  const findings: Finding[] = [];
  const algorithmicChecks: AlgorithmCheck[] = [];
  let threatMultiplier = 1.0;
  let anomaliesDetected = 0;
  let trampolineTargetUrl: string | undefined;

  // -------------------------------------------------------------
  // Algorithm 1: Invisible Unicode & Directional Override Detector
  // -------------------------------------------------------------
  let sanitized = rawUrl;
  const detectedUnicode: string[] = [];

  for (const item of INVISIBLE_UNICODE_PATTERNS) {
    if (item.regex.test(rawUrl)) {
      detectedUnicode.push(item.name);
      sanitized = sanitized.replace(item.regex, '');
    }
  }

  if (detectedUnicode.length > 0) {
    anomaliesDetected++;
    threatMultiplier += 1.6;
    findings.push({
      id: 'loophole-invisible-unicode',
      title: 'Invisible Unicode / BiDi Override Bypass Detected',
      description: `The URL contains hidden or zero-width Unicode characters (${detectedUnicode.join(', ')}) designed to defeat standard blocklist string matching.`,
      severity: 'critical',
      category: 'domain',
      evidence: `Hidden codepoints: ${detectedUnicode.join('; ')}`,
      whySuspicious: 'Zero-width spaces and directional overrides are non-printable characters used strictly in evasion tactics.',
    });
    algorithmicChecks.push({
      id: 'invisible-unicode-radar',
      name: 'Invisible Unicode & BiDi Override Defense',
      category: 'network',
      status: 'critical',
      metric: `${detectedUnicode.length} hidden codepoints`,
      details: `Trapped ${detectedUnicode.join(', ')} evasion attempts.`,
    });
  } else {
    algorithmicChecks.push({
      id: 'invisible-unicode-radar',
      name: 'Invisible Unicode & BiDi Override Defense',
      category: 'network',
      status: 'passed',
      metric: '0 hidden codepoints',
      details: 'Clean character stream with zero non-printable or directional override tampering.',
    });
  }

  // -------------------------------------------------------------
  // Algorithm 2: Multi-Layer Percent-Encoding & Control Evasion
  // -------------------------------------------------------------
  let hasDoubleEncoding = false;
  let hasNullByte = false;
  let hasControlChars = false;

  if (/%25[0-9a-f]{2}/i.test(sanitized)) {
    hasDoubleEncoding = true;
  }
  if (/%00/i.test(sanitized) || sanitized.includes('\0')) {
    hasNullByte = true;
  }
  if (/%0[9ad]/i.test(sanitized) || /[\t\r\n]/.test(sanitized)) {
    hasControlChars = true;
  }

  if (hasDoubleEncoding || hasNullByte || hasControlChars) {
    anomaliesDetected++;
    threatMultiplier += 1.4;
    const evasionDetails: string[] = [];
    if (hasDoubleEncoding) evasionDetails.push('Double Percent-Encoding (%25xx)');
    if (hasNullByte) evasionDetails.push('Null Byte Truncation (%00)');
    if (hasControlChars) evasionDetails.push('Whitespace / CRLF Injection (%09/%0A/%0D)');

    findings.push({
      id: 'loophole-percent-encoding-evasion',
      title: 'Multi-Layer Encoding & Control Character Evasion',
      description: `The link employs URI encoding evasion techniques (${evasionDetails.join(', ')}) to bypass security filters.`,
      severity: 'high',
      category: 'domain',
      evidence: evasionDetails.join(' | '),
      whySuspicious: 'Legitimate web applications do not double-encode URL path delimiters or inject null-bytes.',
    });
    algorithmicChecks.push({
      id: 'percent-encoding-radar',
      name: 'Multi-Layer Percent-Encoding De-obfuscator',
      category: 'network',
      status: 'critical',
      metric: evasionDetails.join(', '),
      details: 'Trapped recursive encoding bypass.',
    });
  } else {
    algorithmicChecks.push({
      id: 'percent-encoding-radar',
      name: 'Multi-Layer Percent-Encoding De-obfuscator',
      category: 'network',
      status: 'passed',
      metric: 'Single-layer canonical',
      details: 'Conforms to canonical single-pass RFC 3986 percent-encoding.',
    });
  }

  // -------------------------------------------------------------
  // Algorithm 3: Userinfo / '@' Authentication Spoofing Loophole
  // -------------------------------------------------------------
  // Matches e.g. https://www.paypal.com@evil-site.com
  let hasUserinfoSpoof = false;
  let spoofedBrand: string | undefined;

  try {
    const rawWithoutScheme = sanitized.replace(/^https?:\/\//i, '');
    const firstSlash = rawWithoutScheme.indexOf('/');
    const authority = firstSlash === -1 ? rawWithoutScheme : rawWithoutScheme.slice(0, firstSlash);

    if (authority.includes('@')) {
      const [userinfo, actualHost] = authority.split('@');
      hasUserinfoSpoof = true;

      // Check if userinfo contains common brands
      for (const [domain, entity] of Object.entries(VERIFIED_ENTITIES)) {
        const brand = domain.split('.')[0];
        if (userinfo.toLowerCase().includes(brand) || userinfo.toLowerCase().includes(domain)) {
          spoofedBrand = entity.name;
          break;
        }
      }

      anomaliesDetected++;
      threatMultiplier += 2.2;
      findings.push({
        id: 'loophole-userinfo-spoof',
        title: 'Credential Injection (@ Authority Loophole) Detected',
        description: `The URL exploits RFC 3986 userinfo syntax. Everything before the '@' ('${userinfo}') is treated as credentials, while the browser actually navigates to '${actualHost}'.${
          spoofedBrand ? ` The attacker is impersonating ${spoofedBrand}.` : ''
        }`,
        severity: 'critical',
        category: 'domain',
        evidence: `Authority: ${authority} -> Real Destination: ${actualHost}`,
        whySuspicious: 'This classic networking loophole is designed to trick users into looking only at the first half of the link.',
      });
      algorithmicChecks.push({
        id: 'userinfo-auth-radar',
        name: 'RFC 3986 Userinfo (@) Authority Radar',
        category: 'network',
        status: 'critical',
        metric: `@ Trap: ${actualHost}`,
        details: `Dissected deceptive userinfo camouflage: '${userinfo}'.`,
      });
    } else {
      algorithmicChecks.push({
        id: 'userinfo-auth-radar',
        name: 'RFC 3986 Userinfo (@) Authority Radar',
        category: 'network',
        status: 'passed',
        metric: 'No @ credential injection',
        details: 'Authority component is clean and free of credential spoofing.',
      });
    }
  } catch {
    // Handled in URL parsing
  }

  // -------------------------------------------------------------
  // Algorithm 4: Obfuscated Alternate-Base IP Address Probe
  // -------------------------------------------------------------
  try {
    const parsedObj = new URL(sanitized.startsWith('http') ? sanitized : `https://${sanitized}`);
    const ipCheck = evaluateIpObfuscation(parsedObj.hostname);

    if (ipCheck.isObfuscatedIp) {
      anomaliesDetected++;
      threatMultiplier += 1.8;
      findings.push({
        id: 'loophole-obfuscated-ip',
        title: `Obfuscated IP Address Evasion (${ipCheck.type?.toUpperCase()} Format)`,
        description: `The web link disguises a numeric IP address (${ipCheck.decodedIp}) using an alternate ${ipCheck.type} base representation (${parsedObj.hostname}) to evade domain blocklists.`,
        severity: 'critical',
        category: 'domain',
        evidence: `Raw Host: ${parsedObj.hostname} -> Resolved IPv4: ${ipCheck.decodedIp}`,
        whySuspicious: 'Legitimate services never use DWORD or hexadecimal numeric IP addresses.',
      });
      algorithmicChecks.push({
        id: 'ip-obfuscation-probe',
        name: 'Alternate-Base IP De-cloaker (DWORD/Hex/Octal)',
        category: 'network',
        status: 'critical',
        metric: `${ipCheck.type?.toUpperCase()} -> ${ipCheck.decodedIp}`,
        details: `Decoded obfuscated numeric host into canonical IPv4 ${ipCheck.decodedIp}.`,
      });
    } else {
      algorithmicChecks.push({
        id: 'ip-obfuscation-probe',
        name: 'Alternate-Base IP De-cloaker (DWORD/Hex/Octal)',
        category: 'network',
        status: 'passed',
        metric: 'Standard FQDN/IP',
        details: 'No alternate-base numeric host obfuscation identified.',
      });
    }

    // -------------------------------------------------------------
    // Algorithm 5: Non-Standard Port Evasion Trap
    // -------------------------------------------------------------
    if (parsedObj.port && parsedObj.port !== '80' && parsedObj.port !== '443') {
      const portNum = parseInt(parsedObj.port, 10);
      const isDangerousPort = [21, 22, 23, 25, 110, 143].includes(portNum);
      const isSuspiciousHighPort = [8080, 8443, 8888, 2082, 2083, 2086, 2087, 3000, 5000, 8000, 10000].includes(portNum);

      anomaliesDetected++;
      threatMultiplier += 0.6;
      findings.push({
        id: 'loophole-non-standard-port',
        title: `Non-Standard Network Port Specified: :${parsedObj.port}`,
        description: `The link routes to port :${parsedObj.port} rather than standard HTTP/HTTPS channels (80/443).${
          isDangerousPort ? ' This port is restricted or associated with non-web services.' : ''
        }`,
        severity: isDangerousPort ? 'critical' : isSuspiciousHighPort ? 'high' : 'medium',
        category: 'domain',
        evidence: `Port: :${parsedObj.port}`,
        whySuspicious: 'Mainstream banking, government, and consumer web applications operate on default ports 80/443.',
      });
      algorithmicChecks.push({
        id: 'port-evasion-trap',
        name: 'Non-Standard Web Port Trap',
        category: 'network',
        status: 'warning',
        metric: `Port :${parsedObj.port}`,
        details: `Flagged abnormal service port :${parsedObj.port}.`,
      });
    } else {
      algorithmicChecks.push({
        id: 'port-evasion-trap',
        name: 'Non-Standard Web Port Trap',
        category: 'network',
        status: 'passed',
        metric: 'Default Web Ports (80/443)',
        details: 'Standard web communication channel verified.',
      });
    }

    // -------------------------------------------------------------
    // Algorithm 6: Open Redirect & Trampoline Link Bypass
    // -------------------------------------------------------------
    for (const param of TRAMPOLINE_PARAMS) {
      const val = parsedObj.searchParams.get(param);
      if (val && (/^https?:\/\//i.test(val) || /^\/\//i.test(val))) {
        try {
          const nestedTarget = new URL(val.startsWith('//') ? `https:${val}` : val);
          if (nestedTarget.hostname !== parsedObj.hostname) {
            trampolineTargetUrl = nestedTarget.href;
            anomaliesDetected++;
            threatMultiplier += 1.5;
            findings.push({
              id: 'loophole-open-redirect-trampoline',
              title: `Open Redirect / Trampoline Bypass Detected via "?${param}="`,
              description: `This link abuses an open redirect trampoline on '${parsedObj.hostname}' to bounce the visitor to an external destination: '${nestedTarget.hostname}'.`,
              severity: 'high',
              category: 'domain',
              evidence: `Intermediate Host: ${parsedObj.hostname} -> Nested Landing: ${nestedTarget.hostname}`,
              whySuspicious: 'Attackers frequently use open redirects on trusted domains (e.g. search engines or social sites) to launder phishing links past automated filters.',
            });
            algorithmicChecks.push({
              id: 'open-redirect-hunter',
              name: 'Open Redirect & Trampoline Hunter',
              category: 'network',
              status: 'critical',
              metric: `Bounces to ${nestedTarget.hostname}`,
              details: `Trapped trampoline parameter "?${param}=". Deep-inspecting nested destination.`,
            });
            break;
          }
        } catch {
          // Invalid nested url
        }
      }
    }

    if (!trampolineTargetUrl) {
      algorithmicChecks.push({
        id: 'open-redirect-hunter',
        name: 'Open Redirect & Trampoline Hunter',
        category: 'network',
        status: 'passed',
        metric: 'Zero trampoline parameters',
        details: 'No open redirect parameter laundering identified in query arguments.',
      });
    }

    // -------------------------------------------------------------
    // Algorithm 7: Disposable Cloud & Free Dynamic DNS Abuse
    // -------------------------------------------------------------
    const lowerHost = parsedObj.hostname.toLowerCase();
    const parts = lowerHost.split('.');
    let matchedCloudHost: string | undefined;

    for (const cloud of CLOUD_SERVERLESS_HOSTS) {
      if (lowerHost.endsWith(cloud) && lowerHost !== cloud) {
        matchedCloudHost = cloud;
        break;
      }
    }

    if (matchedCloudHost) {
      // Check if subdomains or path impersonates brands
      let brandFound: string | undefined;
      for (const [domain, entity] of Object.entries(VERIFIED_ENTITIES)) {
        const brand = domain.split('.')[0];
        if (lowerHost.includes(brand) || parsedObj.pathname.toLowerCase().includes(brand)) {
          brandFound = entity.name;
          break;
        }
      }

      if (brandFound) {
        anomaliesDetected++;
        threatMultiplier += 2.0;
        findings.push({
          id: 'loophole-disposable-cloud-impersonation',
          title: `Disposable Cloud / Serverless Brand Impersonation: ${brandFound}`,
          description: `The destination is hosted on a free/disposable platform (${matchedCloudHost}) with subdomain or path markers mimicking ${brandFound}.`,
          severity: 'critical',
          category: 'domain',
          evidence: `Platform: ${matchedCloudHost} | Impersonating: ${brandFound}`,
          whySuspicious: 'Legitimate corporate organizations and financial institutions do not host transactional customer portals on free serverless domains.',
        });
        algorithmicChecks.push({
          id: 'cloud-serverless-probe',
          name: 'Disposable Cloud & Dynamic DNS Probe',
          category: 'network',
          status: 'critical',
          metric: `${matchedCloudHost} abusing ${brandFound}`,
          details: `Trapped disposable cloud infrastructure masquerading as ${brandFound}.`,
        });
      } else {
        algorithmicChecks.push({
          id: 'cloud-serverless-probe',
          name: 'Disposable Cloud & Dynamic DNS Probe',
          category: 'network',
          status: 'warning',
          metric: `Hosted on ${matchedCloudHost}`,
          details: 'Domain is hosted on a free/disposable cloud tier.',
        });
      }
    } else {
      algorithmicChecks.push({
        id: 'cloud-serverless-probe',
        name: 'Disposable Cloud & Dynamic DNS Probe',
        category: 'network',
        status: 'passed',
        metric: 'Independent domain infrastructure',
        details: 'Hosted on enterprise/independent nameserver infrastructure.',
      });
    }

    // -------------------------------------------------------------
    // Algorithm 8: Subdomain Stacking / Viewport Truncation Trap
    // -------------------------------------------------------------
    if (parts.length >= 5) {
      anomaliesDetected++;
      threatMultiplier += 0.8;
      findings.push({
        id: 'loophole-subdomain-stacking',
        title: `Deep Subdomain Stacking (${parts.length - 2} Subdomain Levels)`,
        description: `The link chains ${parts.length - 2} subdomain levels (${lowerHost}), a common evasion technique aimed at truncating the real root domain in mobile browser address bars.`,
        severity: 'high',
        category: 'domain',
        evidence: `Subdomain count: ${parts.length - 2}`,
        whySuspicious: 'Phishers stack subdomains like "chase.com.security.verify.evil.com" to push the actual domain off-screen.',
      });
      algorithmicChecks.push({
        id: 'subdomain-stacking-probe',
        name: 'Subdomain Stacking & Viewport Truncation Probe',
        category: 'network',
        status: 'critical',
        metric: `${parts.length - 2} levels deep`,
        details: `Trapped excessive subdomain chaining (${parts.length - 2} levels).`,
      });
    } else {
      algorithmicChecks.push({
        id: 'subdomain-stacking-probe',
        name: 'Subdomain Stacking & Viewport Truncation Probe',
        category: 'network',
        status: 'passed',
        metric: `${Math.max(0, parts.length - 2)} subdomain levels`,
        details: 'Normal DNS depth without viewport truncation risks.',
      });
    }
  } catch {
    // Handled in parent analyzer
  }

  // Calculate overall Loophole Resistance Score (0 - 100)
  const loopholeResistanceScore = Math.max(0, 100 - anomaliesDetected * 25);

  return {
    findings,
    algorithmicChecks,
    threatMultiplier,
    trampolineTargetUrl,
    sanitizedUrl: sanitized,
    anomaliesDetected,
  };
}
