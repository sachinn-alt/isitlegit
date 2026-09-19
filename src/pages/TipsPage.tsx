import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProtectionTipsCard } from '@/components/tips/ProtectionTipsCard';
import { BookOpen, ShieldAlert, CheckCircle2, Globe, Mail, QrCode, Cpu, AlertTriangle } from 'lucide-react';
import { Badge } from '@/ui/badge';

export const TipsPage = () => {
  const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I know if a bank fraud alert is real or a scam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Legitimate bank fraud SMS alerts typically ask for a simple YES or NO reply regarding a specific dollar charge and never ask you to click an unverified web link or provide your card PIN, password, or full Social Security number.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a homoglyph or lookalike domain attack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A homoglyph attack uses non-Latin characters (like Cyrillic or Greek) that look identical to standard letters to create deceptive web addresses that mimic trusted brands.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I do if I entered my password on a suspicious website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Immediately navigate to the genuine website from a separate browser or app, change your password, choose "Sign out of all devices", and freeze your payment cards if financial data was entered.',
        },
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-10">
      <SEOHead
        title="Scam Prevention Guide & Emergency Damage Control"
        description="Comprehensive scam identification handbook: learn to recognize homograph links, bank fraud smishing, fake courier messages, QR traps, and emergency recovery steps."
        canonicalPath="/tips"
        schema={tipsSchema}
      />

      <Breadcrumbs items={[{ label: 'Prevention Guide', path: '/tips' }]} />

      {/* Page Header with single H1 */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-300 font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cyber Defense & Verification Handbook</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Scam Prevention & Verification Guide
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
          Learn how to spot deceptive digital traps, distinguish genuine urgent security alerts from extortion schemes, and protect your digital footprint.
        </p>
      </div>

      {/* Interactive Checklist & Damage Control */}
      <ProtectionTipsCard />

      {/* Deep Dive Knowledge Sections */}
      <div className="space-y-8 pt-4">
        <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-3">
          Top Scam Vectors & How to Deconstruct Them
        </h2>

        {/* 1. Lookalike & Homoglyph Domains */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">1. Lookalike Domains & Homoglyph Spoofing</h3>
              <p className="text-xs text-slate-400">How scammers impersonate real brands in the address bar</p>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <p>
              Scammers often register internationalized domain names (IDNs) using non-Latin characters. For instance, the Cyrillic letter <code>а</code> (U+0430) looks identical to Latin <code>a</code> (U+0061). To a human eye on a mobile phone, <code>apple.com</code> looks correct, but it resolves to an entirely different attacker server (<code>xn--pple-43d.com</code>).
            </p>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono space-y-1">
              <div className="text-rose-400">✗ Fake: https://chase.com.account-verify-login.xyz/portal</div>
              <div className="text-emerald-400">✓ Real: https://www.chase.com/personal/banking</div>
            </div>
            <p className="text-slate-400">
              <strong>Rule of thumb:</strong> Look at the segment immediately preceding the first single slash (<code>/</code>). If there are extra words after the brand name before the slash, it is an impersonation.
            </p>
          </div>
        </section>

        {/* 2. Package Delivery Phishing */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">2. Courier Smishing (USPS, FedEx, DHL)</h3>
              <p className="text-xs text-slate-400">The "Package held due to incomplete address" trap</p>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <p>
              Millions of SMS messages are sent daily claiming: <em>"USPS: Your package cannot be delivered due to missing house number. Update your details within 12 hours at usps-redelivery-fees.link"</em>.
            </p>
            <p>
              These lead to replica tracking portals asking for an innocent-sounding "$0.35 redelivery fee". Entering your card hands credit card numbers directly to international cyber syndicates.
            </p>
            <p className="text-slate-400">
              <strong>Verification reality:</strong> USPS only uses <code>usps.com</code>, FedEx only uses <code>fedex.com</code>. Neither will ever text you from random Hotmail or Gmail accounts asking for small redelivery fees.
            </p>
          </div>
        </section>

        {/* 3. QR Code Quishing */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">3. Quishing (QR Code Phishing)</h3>
              <p className="text-xs text-slate-400">Physical stickers placed over parking meters and restaurant menus</p>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <p>
              Malicious actors print realistic adhesive QR code stickers and paste them directly on public parking meters, EV charging kiosks, and bike rental stations.
            </p>
            <p>
              Scanning the fake code sends your phone to an imitation payment gateway that charges your card while failing to actually pay the city meter, leading to both financial theft and parking fines.
            </p>
            <p className="text-slate-400">
              <strong>Safety habit:</strong> Feel the physical QR code on meters. If it is a peelable sticker overlaid on top of the permanent sign, do not scan it.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
