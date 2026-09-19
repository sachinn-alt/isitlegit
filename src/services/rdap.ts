import { Source } from '@/types';

export interface RdapDomainReport {
  domain: string;
  registrationDate?: string;
  domainAgeDays?: number;
  registrar?: string;
  country?: string;
  isRecentlyRegistered: boolean;
  source: Source;
}

export async function checkRdap(domain: string): Promise<RdapDomainReport | null> {
  if (!domain || domain.includes(':') || /^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://rdap.org/domain/${domain}`, {
      signal: controller.signal,
      headers: { Accept: 'application/rdap+json' },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    let registrationDate: string | undefined;
    let registrar: string | undefined;

    // Events array contains registration / creation date
    if (Array.isArray(data.events)) {
      const regEvent = data.events.find((e: any) => e.eventAction === 'registration');
      if (regEvent && regEvent.eventDate) {
        registrationDate = regEvent.eventDate;
      }
    }

    // Entities contains registrar info
    if (Array.isArray(data.entities)) {
      const regEntity = data.entities.find((e: any) =>
        Array.isArray(e.roles) && e.roles.includes('registrar')
      );
      if (regEntity && regEntity.vcardArray) {
        const vcard = regEntity.vcardArray[1];
        const fn = vcard?.find((item: any) => item[0] === 'fn');
        if (fn) registrar = fn[3];
      }
    }

    let domainAgeDays: number | undefined;
    let isRecentlyRegistered = false;

    if (registrationDate) {
      const regTime = new Date(registrationDate).getTime();
      const diffMs = Date.now() - regTime;
      domainAgeDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      // Domains registered less than 30 days ago are high risk for phishing campaigns
      if (domainAgeDays < 30) {
        isRecentlyRegistered = true;
      }
    }

    return {
      domain,
      registrationDate,
      domainAgeDays,
      registrar,
      isRecentlyRegistered,
      source: {
        name: 'ICANN RDAP Registry',
        status: isRecentlyRegistered ? 'suspicious' : 'clean',
        details: domainAgeDays !== undefined
          ? `Domain age: ${domainAgeDays} days old (${registrar || 'Registered'})`
          : `Registered via ${registrar || 'ICANN registrar'}`,
        url: `https://rdap.org/domain/${domain}`,
      },
    };
  } catch {
    // RDAP servers may have CORS restrictions or rate limits
    return null;
  }
}
