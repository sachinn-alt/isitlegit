import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  EyeOff, 
  Fingerprint, 
  Binary, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';
import { ScanType } from '@/types';

interface FeatureShowcaseProps {
  onSelectSample: (type: ScanType, text: string) => void;
}

export const FeatureShowcase = ({ onSelectSample }: FeatureShowcaseProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-16 pt-12 pb-16">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Vector Intelligence Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Engineered for zero-click defense
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Phishing attacks have evolved past crude spelling errors. IsItLegit deconstructs psychological urgency, cryptographic entropy, and character impersonation before your browser ever navigates.
        </p>
      </div>

      {/* 4-Pillar Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bento 1: Homoglyph Attack Forensics */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-blue-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Binary className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md">
              Heuristic Layer 1
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            Homoglyph & Punycode De-cloaker
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
            Catches deceptive Cyrillic, Greek, and Unicode lookalike characters designed to fool the human eye into seeing trusted domains.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-rose-400 bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-500/20">
              <span>Spoofed: <strong className="underline decoration-rose-400">р</strong>аурal.com</span>
              <span className="text-[10px] uppercase font-bold text-rose-300">Cyrillic U+0440</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
              <span>Legitimate: paypal.com</span>
              <span className="text-[10px] uppercase font-bold text-emerald-300">Latin U+0070</span>
            </div>
          </div>
        </motion.div>

        {/* Bento 2: Authentic 2FA & Bank Alert Verifier */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md">
              Differentiator
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
            Genuine 2FA & Alert Classifier
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
            Real bank fraud alerts and OTPs look alarming to regular users. IsItLegit verifies official sender channels without causing panic or leaking codes.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2 text-xs">
            <div className="flex items-start gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Validates official transactional phrasing from 140+ financial institutions.</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Flags phone-takeover attacks instructing users to read OTPs out loud.</span>
            </div>
          </div>
        </motion.div>

        {/* Bento 3: Shannon Entropy & Subdomain Traps */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-cyan-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Fingerprint className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md">
              Entropy Forensics
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            Algorithmic Entropy Probe
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
            Phishing toolkits deploy automated randomized domains. Our Shannon entropy analyzer detects machine-generated randomness in URL strings and subdomains.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 font-mono text-xs text-slate-400 space-y-1.5">
            <div className="flex justify-between items-center">
              <span>Entropy Score:</span>
              <span className="text-rose-400 font-bold">4.82 bits (High Risk)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-[85%] h-full rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Bento 4: Zero-Knowledge Privacy Architecture */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-indigo-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md">
              100% Client-Side
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
            Zero Server Logging Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
            Your scanned messages, links, and credentials are never stored on any remote cloud server. All scans execute in-memory inside your local browser sandbox.
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-300 bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl">
            <EyeOff className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Web Crypto AES-GCM 256-bit with PBKDF2 local key derivation in IndexedDB.</span>
          </div>
        </motion.div>
      </div>

      {/* Comparison Table: Traditional Tools vs IsItLegit */}
      <div className="rounded-3xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center sm:text-left mb-6 space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Why traditional antivirus falls short against modern scams
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Blacklists take hours or days to discover newly registered phishing domains. IsItLegit analyzes intent and structure in real time.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Defense Capability</th>
                <th className="py-3 px-3 text-slate-500">Standard Antivirus / Blacklists</th>
                <th className="py-3 px-3 text-blue-400">IsItLegit Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3.5 px-3 font-medium text-white">Inspect without clicking</td>
                <td className="py-3.5 px-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Usually requires clicking URL first
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zero-click offline dissection
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-medium text-white">Genuine Bank Alert Recognition</td>
                <td className="py-3.5 px-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Flags all security alerts as suspicious
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Confirms official bank root domains
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-medium text-white">Day-Zero Domain Detection</td>
                <td className="py-3.5 px-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Blind until domain is reported
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> RDAP registration age heuristics
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-medium text-white">Share Target from WhatsApp / SMS</td>
                <td className="py-3.5 px-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Not integrated into messaging apps
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Native PWA Web Share Target
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-medium text-white">Camera QR Code HUD Scanner</td>
                <td className="py-3.5 px-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Camera opens link automatically
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Inspects payload before navigation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Quick-Test Demo Banner */}
      <div className="relative rounded-3xl p-8 border border-blue-500/20 bg-gradient-to-r from-blue-900/30 via-indigo-950/40 to-slate-900/60 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">
              Want to see the engine in action right now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Select one of our simulated test cases above or paste any SMS, email, or suspicious link into the console.
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
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Try Phishing Test Case</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
