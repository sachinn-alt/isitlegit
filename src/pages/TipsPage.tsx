import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProtectionTipsCard } from '@/components/tips/ProtectionTipsCard';
import { BookOpen, Globe, Mail, QrCode } from 'lucide-react';

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
    <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title="Scam Prevention Guide & Emergency Damage Control"
        description="Comprehensive scam identification handbook: learn to recognize homograph links, bank fraud smishing, fake courier messages, QR traps, and emergency recovery steps."
        canonicalPath="/tips"
        schema={tipsSchema}
      />

      <Breadcrumbs items={[{ label: 'Prevention Guide', path: '/tips' }]} />

      {/* Page Header in Bauhaus Style */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>CYBER DEFENSE & VERIFICATION HANDBOOK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212] leading-[0.95]">
          SCAM PREVENTION & DECONSTRUCTION
        </h1>

        <p className="text-sm sm:text-base font-medium text-[#121212] leading-relaxed max-w-2xl">
          Learn how to spot deceptive digital vectors, distinguish genuine urgent security alerts from extortion schemes, and protect your digital footprint.
        </p>
      </div>

      {/* Interactive Checklist & Damage Control */}
      <ProtectionTipsCard />

      {/* Deep Dive Knowledge Sections */}
      <div className="space-y-8 pt-6">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212] border-b-4 border-[#121212] pb-3">
          PRIMARY THREAT VECTORS & FORENSIC ANATOMY
        </h2>

        {/* 1. Lookalike & Homoglyph Domains */}
        <section className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#D02020] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
              <Globe className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#121212]">
                1. Lookalike Domains & Homoglyph Spoofing
              </h3>
              <p className="text-xs font-bold uppercase text-[#62666D]">
                How scammers impersonate real brands in the address bar
              </p>
            </div>
          </div>

          <div className="text-sm font-medium text-[#121212] space-y-3 leading-relaxed">
            <p>
              Scammers often register internationalized domain names (IDNs) using non-Latin characters. For instance, the Cyrillic letter <code className="bg-[#F0F0F0] px-1.5 py-0.5 border border-[#121212] font-bold">а</code> (U+0430) looks identical to Latin <code className="bg-[#F0F0F0] px-1.5 py-0.5 border border-[#121212] font-bold">a</code> (U+0061). To a human eye on a mobile phone, <code className="font-bold">apple.com</code> looks correct, but it resolves to an entirely different attacker server (<code className="font-bold">xn--pple-43d.com</code>).
            </p>
            <div className="border-2 border-[#121212] bg-[#F0F0F0] p-4 font-mono text-xs space-y-1.5 shadow-inner">
              <div className="text-[#D02020] font-bold">✗ Fake: https://chase.com.account-verify-login.xyz/portal</div>
              <div className="text-[#1040C0] font-bold">✓ Real: https://www.chase.com/personal/banking</div>
            </div>
            <p className="text-xs font-bold uppercase text-[#62666D]">
              <strong>Rule of thumb:</strong> Inspect the domain label immediately preceding the first single slash (<code>/</code>). If extra words precede the root, it is an attack.
            </p>
          </div>
        </section>

        {/* 2. Package Delivery Phishing */}
        <section className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
              <Mail className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#121212]">
                2. Courier Smishing (USPS, FedEx, DHL)
              </h3>
              <p className="text-xs font-bold uppercase text-[#62666D]">
                The "Package held due to incomplete address" trap
              </p>
            </div>
          </div>

          <div className="text-sm font-medium text-[#121212] space-y-3 leading-relaxed">
            <p>
              Millions of automated SMS messages are dispatched daily claiming: <em>"USPS: Package cannot be delivered due to missing house number. Update details within 12h: http://fedx-pkg-status.link"</em>.
            </p>
            <p>
              These lead to replica tracking portals asking for an innocent-sounding "$0.35 redelivery fee". Entering your card hands credit card credentials directly to carding cartels.
            </p>
            <p className="text-xs font-bold uppercase text-[#62666D]">
              <strong>Institutional reality:</strong> Official logistics entities only use verified domains like <code>usps.com</code> or <code>fedex.com</code>.
            </p>
          </div>
        </section>

        {/* 3. QR Code Quishing */}
        <section className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#1040C0] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
              <QrCode className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#121212]">
                3. Quishing (QR Code Phishing)
              </h3>
              <p className="text-xs font-bold uppercase text-[#62666D]">
                Physical adhesive stickers overlaid on parking meters and kiosks
              </p>
            </div>
          </div>

          <div className="text-sm font-medium text-[#121212] space-y-3 leading-relaxed">
            <p>
              Attackers print adhesive QR codes and stick them directly over public parking payment meters, restaurant menus, and charging stations.
            </p>
            <p>
              Scanning sends your phone to an imitation checkout that collects card numbers while failing to pay the actual municipal meter.
            </p>
            <p className="text-xs font-bold uppercase text-[#62666D]">
              <strong>Physical inspection:</strong> Feel the physical QR code with your finger. If it is an adhesive sticker layered over the metal sign, avoid scanning.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
