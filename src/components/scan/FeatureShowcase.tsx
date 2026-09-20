import { 
  ShieldCheck, 
  EyeOff, 
  Fingerprint, 
  Binary, 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';
import { ScanType } from '@/types';

interface FeatureShowcaseProps {
  onSelectSample: (type: ScanType, text: string) => void;
}

export const FeatureShowcase = ({ onSelectSample }: FeatureShowcaseProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-16 pt-10 pb-16">
      {/* Section Header */}
      <div className="space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#161718] border border-[#23252a] text-[11px] font-mono text-[#8a8f98]">
          <span>INTELLIGENCE CORE</span>
        </div>
        <h2 className="text-[28px] sm:text-[32px] font-[510] tracking-[-0.022em] text-[#ffffff] leading-[1.15]">
          Zero-click structural analysis
        </h2>
        <p className="text-[15px] text-[#8a8f98] leading-[1.6] tracking-[-0.011em]">
          Modern phishing exploits urgency, unicode homoglyphs, and lookalike domain registries. IsItLegit inspects the payload structure before browser navigation occurs.
        </p>
      </div>

      {/* 4-Pillar Grid (Linear Cards: 12px radius, #0f1011 background, hairline #23252a border) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 space-y-4 hover:border-[#383b3f] transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-[#161718] border border-[#23252a] flex items-center justify-center text-[#d0d6e0]">
              <Binary className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono text-[#62666d] uppercase">Layer 01</span>
          </div>
          <div>
            <h3 className="text-[16px] font-[510] text-[#ffffff] tracking-[-0.012em]">
              Homoglyph & Punycode De-cloaker
            </h3>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed mt-1">
              Detects Cyrillic, Greek, and Unicode lookalikes crafted to deceive the human eye into perceiving trusted brands.
            </p>
          </div>
          <div className="rounded-[6px] bg-[#161718] border border-[#23252a] p-3 font-mono text-[12px] space-y-2">
            <div className="flex items-center justify-between text-[#eb5757]">
              <span>Spoofed: <strong className="underline">р</strong>аураl.com</span>
              <span className="text-[10px] text-[#8a8f98]">U+0440 (Cyrillic)</span>
            </div>
            <div className="flex items-center justify-between text-[#27a644]">
              <span>Genuine: paypal.com</span>
              <span className="text-[10px] text-[#8a8f98]">U+0070 (Latin)</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 space-y-4 hover:border-[#383b3f] transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-[#161718] border border-[#23252a] flex items-center justify-center text-[#d0d6e0]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono text-[#62666d] uppercase">Layer 02</span>
          </div>
          <div>
            <h3 className="text-[16px] font-[510] text-[#ffffff] tracking-[-0.012em]">
              Authentic 2FA & Bank Alert Classifier
            </h3>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed mt-1">
              Confirms genuine security alerts from 140+ verified root domains, differentiating authentic bank OTPs from credential harvesting.
            </p>
          </div>
          <div className="rounded-[6px] bg-[#161718] border border-[#23252a] p-3 text-[12px] text-[#d0d6e0] space-y-1.5 font-normal">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27a644]" />
              <span>Verifies official transactional alert root domains</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb5757]" />
              <span>Detects social engineering urging phone disclosure</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 space-y-4 hover:border-[#383b3f] transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-[#161718] border border-[#23252a] flex items-center justify-center text-[#d0d6e0]">
              <Fingerprint className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono text-[#62666d] uppercase">Layer 03</span>
          </div>
          <div>
            <h3 className="text-[16px] font-[510] text-[#ffffff] tracking-[-0.012em]">
              Shannon Entropy & Subdomain Probe
            </h3>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed mt-1">
              Phishing kits automatically generate randomized alphanumeric strings. Our entropy engine calculates machine randomness in subdomains.
            </p>
          </div>
          <div className="rounded-[6px] bg-[#161718] border border-[#23252a] p-3 font-mono text-[12px] space-y-1.5">
            <div className="flex justify-between text-[#8a8f98]">
              <span>Randomness index:</span>
              <span className="text-[#eb5757]">4.82 bits / high entropy</span>
            </div>
            <div className="w-full bg-[#08090a] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#eb5757] w-[80%] h-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 space-y-4 hover:border-[#383b3f] transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-[#161718] border border-[#23252a] flex items-center justify-center text-[#d0d6e0]">
              <EyeOff className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono text-[#62666d] uppercase">Layer 04</span>
          </div>
          <div>
            <h3 className="text-[16px] font-[510] text-[#ffffff] tracking-[-0.012em]">
              Hardware Web Crypto Sandbox
            </h3>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed mt-1">
              Zero remote telemetry. User queries and credentials remain local, encrypted in-browser using AES-GCM 256 with PBKDF2 keys.
            </p>
          </div>
          <div className="rounded-[6px] bg-[#161718] border border-[#23252a] p-3 text-[12px] text-[#8a8f98] font-mono">
            <span>Storage: IndexedDB (Client-Side Only)</span>
          </div>
        </div>
      </div>

      {/* Comparison Table (Precision Linear Layout) */}
      <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="text-[18px] font-[510] text-[#ffffff] tracking-[-0.015em]">
            Traditional Blacklists vs IsItLegit
          </h3>
          <p className="text-[14px] text-[#8a8f98]">
            Comparison of architectural capabilities for link and alert inspection.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#23252a] text-[#8a8f98] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3 font-normal">Capability</th>
                <th className="py-2.5 px-3 font-normal">Traditional Antivirus</th>
                <th className="py-2.5 px-3 font-normal text-[#ffffff]">IsItLegit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#23252a]/70 font-normal">
              <tr>
                <td className="py-3 px-3 text-[#ffffff]">Zero-click payload inspection</td>
                <td className="py-3 px-3 text-[#8a8f98]">Usually requires opening link</td>
                <td className="py-3 px-3 text-[#27a644] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Full offline dissection
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-[#ffffff]">Authentic bank 2FA recognition</td>
                <td className="py-3 px-3 text-[#8a8f98]">Flags all alerts as suspicious</td>
                <td className="py-3 px-3 text-[#27a644] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirms official sender roots
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-[#ffffff]">Day-zero registration heuristics</td>
                <td className="py-3 px-3 text-[#8a8f98]">Delayed until feed updates</td>
                <td className="py-3 px-3 text-[#27a644] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Client-side RDAP age query
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-[#ffffff]">WhatsApp / Telegram Share Target</td>
                <td className="py-3 px-3 text-[#8a8f98]">Not integrated</td>
                <td className="py-3 px-3 text-[#27a644] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Native PWA share support
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Trigger Banner */}
      <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-[15px] font-[510] text-[#ffffff] tracking-[-0.011em]">
            Test with a live phishing scenario
          </h4>
          <p className="text-[13px] text-[#8a8f98] mt-0.5">
            Load an automated test case into the engine without risking your personal data.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onSelectSample(
              'url',
              'http://раураl.com-verify.account-security.xyz/login?session=928a'
            );
            window.scrollTo({ top: 80, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[13px] text-[#d0d6e0] transition-colors cursor-pointer shrink-0"
        >
          <span>Run PayPal Homoglyph Test</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8a8f98]" />
        </button>
      </div>
    </div>
  );
};
