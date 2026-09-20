import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsPage = () => {
  const settingsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Settings & Security Credentials',
    description: 'Manage encrypted API keys, browser notifications, and local storage controls for IsItLegit.',
    url: 'https://isitlegit.app/settings',
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title="Settings & Security Credentials"
        description="Configure client-side AES-GCM encrypted API keys for Gemini and VirusTotal, manage scan notifications, and control device storage settings."
        canonicalPath="/settings"
        schema={settingsSchema}
      />

      <Breadcrumbs items={[{ label: 'Settings', path: '/settings' }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-widest">
          <SettingsIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>CONFIGURATION & HARDWARE CRYPTOGRAPHY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212] leading-[0.95]">
          ENGINE KEYS & PREFERENCES
        </h1>

        <p className="text-sm sm:text-base font-medium text-[#121212] max-w-xl leading-relaxed">
          Configure optional vision and threat intelligence keys, manage browser notifications, and inspect AES-GCM 256 storage locks.
        </p>
      </div>

      <SettingsPanel />
    </div>
  );
};
