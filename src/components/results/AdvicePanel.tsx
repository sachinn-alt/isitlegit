import { ShieldCheck, AlertOctagon, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className={`border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6 ${
      isLegitimate ? 'bg-white' : 'bg-white'
    }`}>
      <div className="flex items-center gap-3 border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <div
          className={`flex h-12 w-12 items-center justify-center border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] ${
            isLegitimate
              ? 'bg-[#1040C0] text-white'
              : 'bg-[#D02020] text-white'
          }`}
        >
          {isLegitimate ? (
            <ShieldCheck className="w-7 h-7" strokeWidth={2.5} />
          ) : (
            <AlertOctagon className="w-7 h-7" strokeWidth={2.5} />
          )}
        </div>
        <div>
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
            {isLegitimate ? 'AUTHENTIC PROTOCOL: SAFE ACTION PLAN' : 'URGENT DEFENSIVE COUNTERMEASURES'}
          </h4>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-0.5">
            Step-by-step guidance vetted by cybersecurity standards
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {advice.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-[#F0F0F0] border-2 border-[#121212] p-4 text-xs sm:text-sm text-[#121212] shadow-[2px_2px_0px_0px_#121212]"
          >
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[#121212] text-xs font-black ${
                isLegitimate
                  ? 'bg-[#1040C0] text-white'
                  : 'bg-[#D02020] text-white'
              }`}
            >
              {idx + 1}
            </div>
            <p className="leading-relaxed font-medium">{tip}</p>
          </div>
        ))}
      </div>

      {/* Safe follow up protocol for legitimate items */}
      {safeFollowUp && safeFollowUp.length > 0 && (
        <div className="border-2 sm:border-4 border-[#121212] bg-[#FFF9C4] p-5 space-y-3 shadow-[3px_3px_0px_0px_#121212]">
          <h5 className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1040C0]" strokeWidth={3} />
            <span>HOW TO PROCEED WITHOUT EXPOSING CREDENTIALS</span>
          </h5>
          <ul className="space-y-2 text-xs sm:text-sm text-[#121212] font-medium">
            {safeFollowUp.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[#D02020] mt-0.5 shrink-0" strokeWidth={3} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
