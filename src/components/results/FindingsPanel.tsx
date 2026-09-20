import { useState } from 'react';
import { Finding } from '@/types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/ui/accordion';
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
        <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FFF9C4] text-[#121212] border border-[#121212]">
          <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
          <span>AUTHENTIC</span>
        </span>
      );
    }
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#D02020] text-white border border-[#121212]">
            <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
            <span>CRITICAL</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#D02020] text-white border border-[#121212]">
            <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
            <span>HIGH RISK</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
            <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
            <span>SUSPICIOUS</span>
          </span>
        );
      case 'low':
      case 'info':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#1040C0] text-white border border-[#121212]">
            <Info className="w-3 h-3" strokeWidth={2.5} />
            <span>SIGNAL</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <div>
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
            <span>DETAILED DIAGNOSTIC FINDINGS</span>
            <span className="text-xs px-2 py-0.5 bg-[#121212] text-white font-mono">
              {findings.length}
            </span>
          </h4>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Structural & Heuristic Signals Evaluated By Diagnostic Matrix
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center gap-1 bg-[#F0F0F0] p-1 border-2 border-[#121212]">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'all' 
                ? 'bg-[#121212] text-white shadow-[2px_2px_0px_0px_#D02020]' 
                : 'text-[#121212] hover:bg-white'
            }`}
          >
            All ({findings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('threats')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'threats' 
                ? 'bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212]' 
                : 'text-[#121212] hover:bg-white'
            }`}
          >
            Threats
          </button>
          <button
            type="button"
            onClick={() => setFilter('legit')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'legit' 
                ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]' 
                : 'text-[#121212] hover:bg-white'
            }`}
          >
            Proofs
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-[#62666D] text-sm font-bold uppercase tracking-wider">
          No diagnostic signals matching this filter.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full space-y-4">
          {filtered.map((finding) => (
            <AccordionItem
              key={finding.id}
              value={finding.id}
              className="border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] bg-white overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-3.5 data-[state=open]:bg-[#D02020] data-[state=open]:text-white transition-colors">
                <div className="flex items-center gap-3 text-left">
                  {getSeverityBadge(finding.severity, finding.isLegitimacyIndicator)}
                  <span className="text-sm font-black uppercase tracking-tight">
                    {finding.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#FFF9C4] text-[#121212] border-t-2 sm:border-t-4 border-[#121212] p-5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                  {finding.description}
                </p>

                {finding.evidence && (
                  <div className="bg-white border-2 border-[#121212] p-3 font-mono text-xs text-[#121212] break-all shadow-[2px_2px_0px_0px_#121212]">
                    <span className="font-bold uppercase tracking-widest text-[#62666D] block mb-1 text-[10px]">
                      EXTRACTED PAYLOAD EVIDENCE:
                    </span>
                    {finding.evidence}
                  </div>
                )}

                {(finding.whySuspicious || finding.whyLegit) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {finding.whySuspicious && (
                      <div className="bg-white border-2 border-[#121212] p-3.5 shadow-[2px_2px_0px_0px_#121212]">
                        <div className="flex items-center gap-1.5 font-black uppercase text-xs text-[#D02020] mb-1">
                          <HelpCircle className="w-4 h-4" strokeWidth={2.5} />
                          <span>Why It Looked Deceptive</span>
                        </div>
                        <p className="text-xs font-medium text-[#121212] leading-relaxed">
                          {finding.whySuspicious}
                        </p>
                      </div>
                    )}

                    {finding.whyLegit && (
                      <div className="bg-white border-2 border-[#121212] p-3.5 shadow-[2px_2px_0px_0px_#121212]">
                        <div className="flex items-center gap-1.5 font-black uppercase text-xs text-[#1040C0] mb-1">
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                          <span>Authentic Cryptographic Root</span>
                        </div>
                        <p className="text-xs font-medium text-[#121212] leading-relaxed">
                          {finding.whyLegit}
                        </p>
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
