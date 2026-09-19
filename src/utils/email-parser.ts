import { SUSPICIOUS_TRIGGERS } from './constants';

export interface ParsedEmail {
  from?: string;
  fromDomain?: string;
  replyTo?: string;
  replyToDomain?: string;
  subject?: string;
  body: string;
  spfStatus?: 'pass' | 'fail' | 'softfail' | 'neutral' | 'none';
  dkimStatus?: 'pass' | 'fail' | 'none';
  dmarcStatus?: 'pass' | 'fail' | 'none';
  hasReplyToMismatch: boolean;
  extractedUrls: string[];
  detectedTriggers: Array<{ category: string; match: string }>;
  isSmsOrText: boolean;
}

export function parseEmailOrMessage(rawText: string): ParsedEmail {
  const lines = rawText.split('\n');
  const headers: Record<string, string> = {};
  let isHeaderSection = true;
  const bodyLines: string[] = [];

  // Check if this is a structured email with headers
  const hasStandardHeaders = /^(From|Subject|To|Date|Received|Reply-To):/im.test(rawText);

  if (hasStandardHeaders) {
    let currentHeader = '';
    for (const line of lines) {
      if (isHeaderSection) {
        if (line.trim() === '') {
          isHeaderSection = false;
          continue;
        }
        const match = line.match(/^([\w-]+):\s*(.*)$/);
        if (match) {
          currentHeader = match[1].toLowerCase();
          headers[currentHeader] = match[2].trim();
        } else if (currentHeader && /^\s+/.test(line)) {
          // Folded header line
          headers[currentHeader] += ' ' + line.trim();
        } else {
          isHeaderSection = false;
          bodyLines.push(line);
        }
      } else {
        bodyLines.push(line);
      }
    }
  } else {
    bodyLines.push(rawText);
  }

  const body = bodyLines.join('\n').trim();

  // Extract from & reply-to domains
  const extractEmail = (text?: string): string | undefined => {
    if (!text) return undefined;
    const match = text.match(/<([^>]+)>/) || text.match(/[\w.-]+@[\w.-]+\.\w+/);
    return match ? match[1] || match[0] : undefined;
  };

  const fromEmail = extractEmail(headers['from']);
  const replyToEmail = extractEmail(headers['reply-to']);

  const fromDomain = fromEmail?.split('@')[1]?.toLowerCase();
  const replyToDomain = replyToEmail?.split('@')[1]?.toLowerCase();

  const hasReplyToMismatch = !!(fromDomain && replyToDomain && fromDomain !== replyToDomain);

  // Authentication parsing
  const authResults = (headers['authentication-results'] || '').toLowerCase();
  const receivedSpf = (headers['received-spf'] || '').toLowerCase();

  let spfStatus: ParsedEmail['spfStatus'] = 'none';
  if (authResults.includes('spf=pass') || receivedSpf.startsWith('pass')) spfStatus = 'pass';
  else if (authResults.includes('spf=fail') || receivedSpf.startsWith('fail')) spfStatus = 'fail';
  else if (authResults.includes('spf=softfail') || receivedSpf.startsWith('softfail')) spfStatus = 'softfail';

  let dkimStatus: ParsedEmail['dkimStatus'] = 'none';
  if (authResults.includes('dkim=pass')) dkimStatus = 'pass';
  else if (authResults.includes('dkim=fail')) dkimStatus = 'fail';

  let dmarcStatus: ParsedEmail['dmarcStatus'] = 'none';
  if (authResults.includes('dmarc=pass')) dmarcStatus = 'pass';
  else if (authResults.includes('dmarc=fail')) dmarcStatus = 'fail';

  // Extract URLs
  const urlRegex = /(https?:\/\/[^\s<>"'{}|\\^`]+)/gi;
  const extractedUrls: string[] = [];
  let match;
  while ((match = urlRegex.exec(rawText)) !== null) {
    if (!extractedUrls.includes(match[1])) {
      extractedUrls.push(match[1]);
    }
  }

  // Scan triggers in subject & body
  const combinedContent = `${headers['subject'] || ''} ${body}`;
  const detectedTriggers: Array<{ category: string; match: string }> = [];

  for (const trigger of SUSPICIOUS_TRIGGERS) {
    const triggerMatch = combinedContent.match(trigger.pattern);
    if (triggerMatch) {
      detectedTriggers.push({
        category: trigger.category,
        match: triggerMatch[0],
      });
    }
  }

  return {
    from: headers['from'],
    fromDomain,
    replyTo: headers['reply-to'],
    replyToDomain,
    subject: headers['subject'],
    body: body || rawText,
    spfStatus,
    dkimStatus,
    dmarcStatus,
    hasReplyToMismatch,
    extractedUrls,
    detectedTriggers,
    isSmsOrText: !hasStandardHeaders,
  };
}
