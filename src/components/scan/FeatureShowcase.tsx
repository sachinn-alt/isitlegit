import { 
  ShieldCheck, 
  EyeOff, 
  Fingerprint, 
  Binary, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { ScanType } from '@/types';

interface FeatureShowcaseProps {
  onSelectSample: (type: ScanType, text: string) => void;
}

export const FeatureShowcase = ({ onSelectSample }: FeatureShowcaseProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 pt-8 pb-16">
      
      {/* Section Header with Bauhaus Geometry */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>FOUR PILLARS OF DEFENSE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212] leading-[0.95]">
          CONSTRUCTIVIST ARCHITECTURE
        </h2>

        <p className="text-base sm:text-lg font-medium text-[#121212] leading-relaxed">
          Phishing attacks rely on cognitive overload and visual mimicry. IsItLegit decomposes incoming payloads into fundamental mathematical, cryptographic, and lexical structures.
        </p>
      </div>

      {/* 4-Pillar Grid: Bauhaus Cards with Corner Geometric Shapes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Homoglyphs (Red Corner Circle) */}
        <div className="relative bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4 hover:-translate-y-1 transition-transform">
          {/* Bauhaus Top-Right Geometric Mark */}
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#D02020] border-2 border-[#121212]" />

          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#D02020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center text-white">
              <Binary className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#121212] bg-[#F0F0F0] px-2 py-0.5 border border-[#121212]">
              LAYER 01
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
              Homoglyph & Punycode De-cloaker
            </h3>
            <p className="text-sm font-medium text-[#62666D] leading-relaxed mt-2">
              Inspects Cyrillic, Greek, and Unicode lookalikes crafted to deceive the human eye into perceiving trusted brands.
            </p>
          </div>

          <div className="bg-[#F0F0F0] border-2 border-[#121212] p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[#D02020] font-bold">
              <span>Spoofed: <strong className="underline decoration-2">р</strong>аураl.com</span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 border border-[#121212]">U+0440 (CYRILLIC)</span>
            </div>
            <div className="flex items-center justify-between text-[#121212] font-bold">
              <span>Genuine: paypal.com</span>
              <span className="text-[10px] bg-[#F0C020] px-1.5 py-0.5 border border-[#121212]">U+0070 (LATIN)</span>
            </div>
          </div>
        </div>

        {/* Card 2: 2FA Classifier (Yellow Corner Square) */}
        <div className="relative bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4 hover:-translate-y-1 transition-transform">
          {/* Bauhaus Top-Right Geometric Mark */}
          <div className="absolute top-4 right-4 w-4 h-4 rounded-none bg-[#F0C020] border-2 border-[#121212]" />

          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center text-[#121212]">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#121212] bg-[#F0F0F0] px-2 py-0.5 border border-[#121212]">
              LAYER 02
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
              Authentic 2FA & Bank Alert Classifier
            </h3>
            <p className="text-sm font-medium text-[#62666D] leading-relaxed mt-2">
              Confirms genuine security warnings and OTP alerts from 140+ verified root institutions, preventing false positives.
            </p>
          </div>

          <div className="bg-[#FFF9C4] border-2 border-[#121212] p-4 text-xs font-bold text-[#121212] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#121212]" />
              <span>Verifies legitimate institutional shortcode patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D02020]" />
              <span>Detects social engineering urging password disclosure</span>
            </div>
          </div>
        </div>

        {/* Card 3: Shannon Entropy (Blue Corner Triangle) */}
        <div className="relative bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4 hover:-translate-y-1 transition-transform">
          {/* Bauhaus Top-Right Geometric Mark */}
          <div className="absolute top-4 right-4 w-4 h-4 clip-triangle bg-[#1040C0] border-2 border-[#121212]" />

          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#1040C0] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center text-white">
              <Fingerprint className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#121212] bg-[#F0F0F0] px-2 py-0.5 border border-[#121212]">
              LAYER 03
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
              Shannon Entropy & Subdomain Probe
            </h3>
            <p className="text-sm font-medium text-[#62666D] leading-relaxed mt-2">
              Automated phishing toolkits randomize alphanumeric subdomains. Our entropy mathematics flag non-human generation.
            </p>
          </div>

          <div className="bg-[#F0F0F0] border-2 border-[#121212] p-4 font-mono text-xs space-y-2">
            <div className="flex justify-between font-bold text-[#121212]">
              <span>Randomness index:</span>
              <span className="text-[#D02020] bg-white px-2 py-0.5 border border-[#121212]">
                4.82 BITS (HIGH RISK)
              </span>
            </div>
            <div className="w-full bg-white h-3 border-2 border-[#121212] p-0.5">
              <div className="bg-[#D02020] w-[80%] h-full" />
            </div>
          </div>
        </div>

        {/* Card 4: Web Crypto (Yellow Corner Square) */}
        <div className="relative bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4 hover:-translate-y-1 transition-transform">
          {/* Bauhaus Top-Right Geometric Mark */}
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#121212] border-2 border-white" />

          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#F0C020] flex items-center justify-center text-white">
              <EyeOff className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#121212] bg-[#F0F0F0] px-2 py-0.5 border border-[#121212]">
              LAYER 04
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
              Hardware Web Crypto Sandbox
            </h3>
            <p className="text-sm font-medium text-[#62666D] leading-relaxed mt-2">
              Absolute zero remote logging. Scanned passwords, tokens, and payloads are processed in memory and encrypted locally using AES-GCM.
            </p>
          </div>

          <div className="bg-[#F0C020] border-2 border-[#121212] p-4 text-xs font-black uppercase tracking-wider text-[#121212]">
            <span>Storage: IndexedDB Local Sandbox (Offline-First)</span>
          </div>
        </div>
      </div>

      {/* Comparison Table (Constructivist Bauhaus Grid) */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-10 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212]">
            CONSTRUCTIVIST BENCHMARK
          </h3>
          <p className="text-sm font-bold uppercase text-[#62666D] mt-1">
            Traditional cloud blacklists vs IsItLegit local algorithmic forensics
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse border-2 border-[#121212]">
            <thead>
              <tr className="bg-[#121212] text-white font-black uppercase tracking-wider text-xs">
                <th className="py-3 px-4 border-2 border-[#121212]">Capability</th>
                <th className="py-3 px-4 border-2 border-[#121212] text-[#E0E0E0]">Legacy Antivirus</th>
                <th className="py-3 px-4 border-2 border-[#121212] text-[#F0C020] bg-[#1040C0]">IsItLegit Bauhaus</th>
              </tr>
            </thead>
            <tbody className="font-medium text-xs sm:text-sm">
              <tr className="bg-white border-b-2 border-[#121212]">
                <td className="py-3.5 px-4 font-bold text-[#121212] border-r-2 border-[#121212]">
                  Zero-Click Payload Inspection
                </td>
                <td className="py-3.5 px-4 text-[#62666D] border-r-2 border-[#121212]">
                  Requires opening malicious link
                </td>
                <td className="py-3.5 px-4 text-[#121212] font-black bg-[#FFF9C4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#121212]" strokeWidth={3} />
                  <span>100% Offline Static Dissection</span>
                </td>
              </tr>
              <tr className="bg-[#F0F0F0] border-b-2 border-[#121212]">
                <td className="py-3.5 px-4 font-bold text-[#121212] border-r-2 border-[#121212]">
                  Authentic 2FA Recognition
                </td>
                <td className="py-3.5 px-4 text-[#62666D] border-r-2 border-[#121212]">
                  Treats all security alerts as phishing
                </td>
                <td className="py-3.5 px-4 text-[#121212] font-black bg-[#FFF9C4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#121212]" strokeWidth={3} />
                  <span>Whitelists 140+ Banking Roots</span>
                </td>
              </tr>
              <tr className="bg-white border-b-2 border-[#121212]">
                <td className="py-3.5 px-4 font-bold text-[#121212] border-r-2 border-[#121212]">
                  Day-Zero Domain Detection
                </td>
                <td className="py-3.5 px-4 text-[#62666D] border-r-2 border-[#121212]">
                  Delayed hours until cloud database syncs
                </td>
                <td className="py-3.5 px-4 text-[#121212] font-black bg-[#FFF9C4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#121212]" strokeWidth={3} />
                  <span>Real-time RDAP Epoch Analysis</span>
                </td>
              </tr>
              <tr className="bg-[#F0F0F0]">
                <td className="py-3.5 px-4 font-bold text-[#121212] border-r-2 border-[#121212]">
                  PWA Mobile Share Target
                </td>
                <td className="py-3.5 px-4 text-[#62666D] border-r-2 border-[#121212]">
                  Requires desktop extension
                </td>
                <td className="py-3.5 px-4 text-[#121212] font-black bg-[#FFF9C4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#121212]" strokeWidth={3} />
                  <span>Share direct from WhatsApp/SMS</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bauhaus Color-Blocked Callout (Yellow Background) */}
      <div className="bg-[#F0C020] border-2 sm:border-4 border-[#121212] p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-2xl font-black uppercase tracking-tight text-[#121212]">
            TEST A SIMULATED PHISHING PAYLOAD
          </h4>
          <p className="text-sm font-bold text-[#121212]">
            Execute a test scenario safely without risking personal data or credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onSelectSample(
              'url',
              'http://раураl.com-verify.account-security.xyz/login?session=928a'
            );
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-sm font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0"
        >
          <span>RUN HOMOGLYPH TEST</span>
          <ArrowRight className="w-4 h-4 text-white" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
