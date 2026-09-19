import { Source } from '@/types';

export interface VirusTotalReport {
  positives: number;
  total: number;
  maliciousCount: number;
  suspiciousCount: number;
  harmlessCount: number;
  scanDate: string;
  source: Source;
}

export async function checkVirusTotal(url: string, apiKey?: string): Promise<VirusTotalReport | null> {
  if (!apiKey) return null;

  try {
    // Generate URL identifier: base64 of URL without trailing padding '='
    const urlId = btoa(url).replace(/=+$/, '');
    
    const response = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
      method: 'GET',
      headers: {
        'x-apikey': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          positives: 0,
          total: 0,
          maliciousCount: 0,
          suspiciousCount: 0,
          harmlessCount: 0,
          scanDate: new Date().toISOString(),
          source: {
            name: 'VirusTotal v3',
            status: 'clean',
            details: 'URL not currently cataloged in VirusTotal database',
            url: `https://www.virustotal.com/gui/url/${urlId}`,
          },
        };
      }
      throw new Error(`VirusTotal API error: ${response.status}`);
    }

    const data = await response.json();
    const stats = data?.data?.attributes?.last_analysis_stats || {};
    const malicious = stats.malicious || 0;
    const suspicious = stats.suspicious || 0;
    const harmless = stats.harmless || 0;
    const total = malicious + suspicious + harmless + (stats.undetected || 0);

    const isMalicious = malicious > 0;
    const isSuspicious = suspicious > 1 && !isMalicious;

    return {
      positives: malicious + suspicious,
      total,
      maliciousCount: malicious,
      suspiciousCount: suspicious,
      harmlessCount: harmless,
      scanDate: new Date(data?.data?.attributes?.last_analysis_date * 1000 || Date.now()).toISOString(),
      source: {
        name: 'VirusTotal Intelligence',
        status: isMalicious ? 'malicious' : isSuspicious ? 'suspicious' : 'clean',
        details: `${malicious}/${total} security vendors flagged this destination as malicious`,
        url: `https://www.virustotal.com/gui/url/${urlId}`,
      },
    };
  } catch (error) {
    console.warn('VirusTotal check skipped or encountered network issue:', error);
    return null;
  }
}
