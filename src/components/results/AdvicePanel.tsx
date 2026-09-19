import { ScanResult } from '@/types';
import { ShieldCheck, AlertOctagon, CheckCircle, ArrowRight, PhoneCall } from 'lucide-react';

interface AdvicePanelProps {
  advice: string[];
  safeFollowUp?: string[];
  isLegitimate?: boolean;
}

export const AdvicePanel = ({
  advice,
  safeFollowUp,
  isLegitimate,
}: AdvicePanelProps) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
            isLegitimate
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/20 text-rose-400'
          }`}
        >
          {isLegitimate ? (
            <ShieldCheck className="w-6 h-6" />
          ) : (
            <AlertOctagon className="w-6 h-6" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">
            {isLegitimate ? 'Recommended Safe Action Plan' : 'Urgent Defensive Actions'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step guidance vetted by cybersecurity standards
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {advice.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 text-xs text-slate-200"
          >
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                isLegitimate
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {idx + 1}
            </div>
            <p className="leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>

      {/* Safe follow up protocol for legitimate items */}
      {safeFollowUp && safeFollowUp.length > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>How to Handle This Safely Without Risk</span>
          </h5>
          <ul className="space-y-2 text-xs text-slate-300">
            {safeFollowUp.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
