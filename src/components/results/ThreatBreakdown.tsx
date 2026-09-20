import { ScanResult } from '@/types';
import { Shield, Lock, Eye, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface ThreatBreakdownProps {
  breakdown: ScanResult['threatBreakdown'];
}

export const ThreatBreakdown = ({ breakdown }: ThreatBreakdownProps) => {
  const metrics = [
    {
      label: 'Domain & Infrastructure Integrity',
      score: breakdown.domainReputation,
      icon: Shield,
      description: 'Domain age, ICANN registrar, SSL encryption & TLD abuse ratings',
    },
    {
      label: 'Social Engineering Resistance',
      score: breakdown.socialEngineering,
      icon: Eye,
      description: 'Absence of urgency traps, fear extortion, or fake reward baiting',
    },
    {
      label: 'Content & Link Integrity',
      score: breakdown.contentSafety,
      icon: Lock,
      description: 'Absence of credential harvesting forms, weaponized drops & homoglyphs',
    },
    {
      label: 'Impersonation Defense',
      score: breakdown.impersonationRisk,
      icon: AlertOctagon,
      description: 'Header alignment, SPF/DMARC status & brand spoof heuristics',
    },
    {
      label: 'Authenticity Verification Index',
      score: breakdown.authenticity,
      icon: CheckCircle2,
      description: 'Matches against authenticated corporate & banking root directories',
    },
  ];

  const getBarBg = (val: number) => {
    if (val >= 80) return 'bg-[#1040C0] text-white';
    if (val >= 50) return 'bg-[#F0C020] text-[#121212]';
    return 'bg-[#D02020] text-white';
  };

  return (
    <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
      <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
          MULTI-VECTOR SECURITY BREAKDOWN
        </h4>
        <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
          Safety ratings calculated across independent threat intelligence vectors (100 = Optimal Safety)
        </p>
      </div>

      <div className="space-y-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const barStyle = getBarBg(m.score);
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-black uppercase text-[#121212]">
                  <Icon className="w-4 h-4 text-[#121212]" strokeWidth={2.5} />
                  <span>{m.label}</span>
                </div>
                <span className={`font-mono font-black px-2 py-0.5 border border-[#121212] text-xs ${barStyle}`}>
                  {m.score}/100
                </span>
              </div>

              {/* Bauhaus Segmented Hard Progress Bar */}
              <div className="h-3 w-full bg-[#E0E0E0] border-2 border-[#121212] overflow-hidden p-0.5">
                <div
                  className={`h-full ${barStyle.split(' ')[0]} transition-all duration-500`}
                  style={{ width: `${m.score}%` }}
                />
              </div>

              <p className="text-xs font-medium text-[#62666D]">{m.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
