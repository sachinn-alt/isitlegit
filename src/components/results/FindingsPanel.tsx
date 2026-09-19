import { useState } from 'react';
import { Finding } from '@/types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/ui/accordion';
import { Badge } from '@/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, HelpCircle } from 'lucide-react';

interface FindingsPanelProps {
  findings: Finding[];
}

export const FindingsPanel = ({ findings }: FindingsPanelProps) => {
  const [filter, setFilter] = useState<'all' | 'legit' | 'threats'>('all');

  const filtered = findings.filter((f) => {
    if (filter === 'legit') return f.isLegitimacyIndicator;
    if (filter === 'threats') return !f.isLegitimacyIndicator;
    return true;
  });

  const getSeverityBadge = (severity: Finding['severity'], isLegit?: boolean) => {
    if (isLegit) {
      return (
        <Badge variant="safe" className="gap-1 text-[11px]">
          <CheckCircle2 className="w-3 h-3" />
          <span>Authentic Proof</span>
        </Badge>
      );
    }
    switch (severity) {
      case 'critical':
        return (
          <Badge variant="destructive" className="gap-1 text-[11px]">
            <AlertCircle className="w-3 h-3" />
            <span>Critical Threat</span>
          </Badge>
        );
      case 'high':
        return (
          <Badge variant="destructive" className="gap-1 text-[11px] bg-rose-500/20 text-rose-300">
            <AlertTriangle className="w-3 h-3" />
            <span>High Risk</span>
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="suspicious" className="gap-1 text-[11px]">
            <AlertTriangle className="w-3 h-3" />
            <span>Suspicious</span>
          </Badge>
        );
      case 'low':
        return <Badge variant="outline" className="text-[11px]">Minor Anomaly</Badge>;
      case 'info':
      default:
        return (
          <Badge variant="outline" className="gap-1 text-[11px] text-blue-400 border-blue-500/30">
            <Info className="w-3 h-3" />
            <span>Informational</span>
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Detailed Diagnostic Findings</span>
            <Badge variant="outline" className="text-xs font-mono">{findings.length}</Badge>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Technical signals evaluated by heuristic engines and AI intelligence
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({findings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('threats')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'threats' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Threat Signals
          </button>
          <button
            type="button"
            onClick={() => setFilter('legit')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'legit' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Legitimacy Proofs
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-sm">
          No findings matching this filter.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full space-y-3">
          {filtered.map((finding) => (
            <AccordionItem
              key={finding.id}
              value={finding.id}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 transition-colors hover:border-slate-700"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  {getSeverityBadge(finding.severity, finding.isLegitimacyIndicator)}
                  <span className="text-sm font-semibold text-slate-200">{finding.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-4 text-xs text-slate-300 space-y-3">
                <p className="leading-relaxed text-slate-300">{finding.description}</p>

                {finding.evidence && (
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-[11px] text-slate-300 break-all">
                    <span className="text-slate-500 font-sans block mb-1">Extracted Evidence:</span>
                    {finding.evidence}
                  </div>
                )}

                {/* The "Why it felt suspicious vs why it is actually legit" breakdown */}
                {(finding.whySuspicious || finding.whyLegit) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {finding.whySuspicious && (
                      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                        <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Why It Looked Suspicious</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{finding.whySuspicious}</p>
                      </div>
                    )}

                    {finding.whyLegit && (
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Why It Is Actually Authentic</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{finding.whyLegit}</p>
                      </div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
