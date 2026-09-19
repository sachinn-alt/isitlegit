import { ScanResult } from '@/types';
import { Shield, Lock, Eye, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/ui/progress';

interface ThreatBreakdownProps {
  breakdown: ScanResult['threatBreakdown'];
}

export const ThreatBreakdown = ({ breakdown }: ThreatBreakdownProps) => {
  const metrics = [
    {
      label: 'Domain & Infrastructure Reputation',
      score: breakdown.domainReputation,
      icon: Shield,
      description: 'Domain age, ICANN registrar, SSL encryption & TLD abuse scores',
    },
    {
      label: 'Social Engineering Resistance',
      score: breakdown.socialEngineering,
      icon: Eye,
      description: 'Absence of urgency traps, fear tactics, or fake prize baiting',
    },
    {
      label: 'Content & Link Safety',
      score: breakdown.contentSafety,
      icon: Lock,
      description: 'Absence of phishing forms, malware drop-sites & homoglyphs',
    },
    {
      label: 'Impersonation Defense',
      score: breakdown.impersonationRisk,
      icon: AlertOctagon,
      description: 'Header alignment, SPF/DMARC status & brand spoof checks',
    },
    {
      label: 'Authenticity Verification Index',
      score: breakdown.authenticity,
      icon: CheckCircle2,
      description: 'Direct matches against authenticated corporate & banking directories',
    },
  ];

  const getColorClass = (val: number) => {
    if (val >= 80) return 'text-emerald-400 bg-emerald-500';
    if (val >= 50) return 'text-amber-400 bg-amber-500';
    return 'text-rose-400 bg-rose-500';
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
      <div>
        <h4 className="text-lg font-bold text-white">Multi-Vector Security Breakdown</h4>
        <p className="text-xs text-slate-400 mt-1">
          Safety ratings calculated across independent threat intelligence vectors (100 = Optimal Safety)
        </p>
      </div>

      <div className="space-y-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const colorClass = getColorClass(m.score);
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-200">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{m.label}</span>
                </div>
                <span className={`font-mono font-bold ${colorClass.split(' ')[0]}`}>
                  {m.score}/100
                </span>
              </div>
              <Progress
                value={m.score}
                className="h-2 bg-slate-950"
                indicatorClassName={colorClass.split(' ')[1]}
              />
              <p className="text-[11px] text-slate-500">{m.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
