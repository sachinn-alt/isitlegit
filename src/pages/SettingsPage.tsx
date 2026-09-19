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
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-8">
      <SEOHead
        title="Settings & Security Credentials"
        description="Configure client-side AES-GCM encrypted API keys for Gemini and VirusTotal, manage scan notifications, and control device storage settings."
        canonicalPath="/settings"
        schema={settingsSchema}
      />

      <Breadcrumbs items={[{ label: 'Settings', path: '/settings' }]} />

      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-300 font-medium">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Configuration & Cryptography</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Settings & Security Credentials
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          Manage your personal AI keys, configure browser notification preferences, and inspect encryption protocols.
        </p>
      </div>

      <SettingsPanel />
    </div>
  );
};
