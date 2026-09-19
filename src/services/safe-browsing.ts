import { Source } from '@/types';

export interface SafeBrowsingReport {
  isThreat: boolean;
  threatTypes: string[];
  source: Source;
}

export async function checkSafeBrowsing(url: string, apiKey?: string): Promise<SafeBrowsingReport | null> {
  if (!apiKey) return null;

  try {
    const payload = {
      client: {
        clientId: 'isitlegit-pwa',
        clientVersion: '1.0.0',
      },
      threatInfo: {
        threatTypes: [
          'MALWARE',
          'SOCIAL_ENGINEERING',
          'UNWANTED_SOFTWARE',
          'POTENTIALLY_HARMFUL_APPLICATION',
        ],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }],
      },
    };

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Safe Browsing API error: ${response.status}`);
    }

    const data = await response.json();
    const matches = data.matches || [];
    const isThreat = matches.length > 0;
    const threatTypes = matches.map((m: any) => m.threatType);

    return {
      isThreat,
      threatTypes,
      source: {
        name: 'Google Safe Browsing',
        status: isThreat ? 'malicious' : 'clean',
        details: isThreat
          ? `Detected threat: ${threatTypes.join(', ')} (Advisory provided by Google)`
          : 'No threats detected in Google Safe Browsing lists',
        url: 'https://transparencyreport.google.com/safe-browsing/search',
      },
    };
  } catch (error) {
    console.warn('Safe Browsing check failed:', error);
    return null;
  }
}
