import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'isitlegit-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// High-profile verified domain directory
const VERIFIED_ENTITIES = {
  'chase.com': { name: 'JPMorgan Chase', category: 'bank' },
  'bankofamerica.com': { name: 'Bank of America', category: 'bank' },
  'paypal.com': { name: 'PayPal', category: 'bank' },
  'usps.com': { name: 'USPS', category: 'courier' },
  'fedex.com': { name: 'FedEx', category: 'courier' },
  'irs.gov': { name: 'IRS', category: 'government' },
  'google.com': { name: 'Google', category: 'tech' },
  'apple.com': { name: 'Apple', category: 'tech' },
};

const HIGH_RISK_TLDS = new Set(['zip', 'mov', 'top', 'xyz', 'work', 'click', 'link', 'gq']);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'check_url',
        description: 'Analyzes a suspicious URL for phishing, homoglyphs, brand spoofing, and malicious TLDs without visiting it.',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'The web address to inspect' },
          },
          required: ['url'],
        },
      },
      {
        name: 'check_message',
        description: 'Analyzes a suspicious WhatsApp message, SMS text, or email for social engineering, urgency triggers, and fake claims.',
        inputSchema: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'The text message or email content to evaluate' },
          },
          required: ['message'],
        },
      },
      {
        name: 'verify_authenticity',
        description: 'Determines whether an unexpected bank 2FA code, fraud verification SMS, or courier notification is legitimate or a scam.',
        inputSchema: {
          type: 'object',
          properties: {
            content: { type: 'string', description: 'The notification content or alert text' },
            domain: { type: 'string', description: 'Optional domain mentioned in the alert' },
          },
          required: ['content'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'check_url') {
    const rawUrl = String(args.url || '').trim();
    let hostname = '';
    try {
      const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      hostname = parsed.hostname.toLowerCase();
    } catch {
      return {
        content: [{ type: 'text', text: JSON.stringify({ verdict: 'INVALID', error: 'Malformed URL' }) }],
      };
    }

    const parts = hostname.split('.');
    const tld = parts[parts.length - 1];
    const rootDomain = parts.slice(-2).join('.');

    const isVerified = !!VERIFIED_ENTITIES[rootDomain];
    const isHighRiskTld = HIGH_RISK_TLDS.has(tld);
    const hasIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    let threatScore = 0;
    const findings = [];

    if (isVerified) {
      threatScore = 5;
      findings.push(`Officially verified primary domain: ${VERIFIED_ENTITIES[rootDomain].name}`);
    } else {
      if (isHighRiskTld) {
        threatScore += 35;
        findings.push(`High-abuse TLD extension detected (.${tld})`);
      }
      if (hasIp) {
        threatScore += 40;
        findings.push(`Direct IP address used instead of domain`);
      }
      for (const [dom, ent] of Object.entries(VERIFIED_ENTITIES)) {
        const brand = dom.split('.')[0];
        if (hostname.includes(brand) && rootDomain !== dom) {
          threatScore += 50;
          findings.push(`Brand impersonation detected: mimics ${ent.name} on unverified domain ${rootDomain}`);
        }
      }
    }

    const verdict = threatScore >= 60 ? 'DANGEROUS' : threatScore >= 30 ? 'SUSPICIOUS' : 'SAFE';

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              url: rawUrl,
              hostname,
              verdict,
              threatScore,
              findings,
              safeToOpen: verdict === 'SAFE',
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === 'check_message') {
    const msg = String(args.message || '');
    const findings = [];
    let threatScore = 0;

    if (/account (is |has been )?(suspended|locked|restricted)/i.test(msg)) {
      threatScore += 35;
      findings.push('Account suspension urgency trap detected');
    }
    if (/gift cards?|bitcoin|crypto payment/i.test(msg)) {
      threatScore += 45;
      findings.push('Untraceable payment demand (gift card/crypto)');
    }
    if (/immediate action required|act now|within 24 hours/i.test(msg)) {
      threatScore += 25;
      findings.push('Artificial panic / urgency trigger');
    }

    const verdict = threatScore >= 50 ? 'DANGEROUS' : threatScore >= 25 ? 'SUSPICIOUS' : 'SAFE';

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              verdict,
              threatScore,
              findings,
              summary: verdict === 'DANGEROUS' ? 'High probability of phishing/scam' : 'Low risk',
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === 'verify_authenticity') {
    const content = String(args.content || '');
    const hasOtpPattern = /security code is \d{4,8}|your one-time code is \d{4,8}/i.test(content);
    const asksToShare = /send (this )?(code|otp) back|reply with (your )?(code|otp|password|pin)/i.test(content);

    const isAuthenticOtp = hasOtpPattern && !asksToShare;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              isAuthentic: isAuthenticOtp,
              verdict: isAuthenticOtp ? 'LEGITIMATE_AUTHENTIC' : 'UNVERIFIED_OR_SUSPICIOUS',
              advice: isAuthenticOtp
                ? 'This appears to be a legitimate 2FA one-time passcode. Never read or send this code to anyone who calls you.'
                : 'Caution advised. If anyone asks you to share a security code, it is an active takeover attempt.',
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Tool not found: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('IsItLegit MCP Server running on stdio');
}

main().catch((err) => {
  console.error('Fatal MCP Server error:', err);
  process.exit(1);
});
