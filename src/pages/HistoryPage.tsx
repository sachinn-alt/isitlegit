import { useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { HistoryList } from '@/components/history/HistoryList';
import { VerdictCard } from '@/components/results/VerdictCard';
import { FindingsPanel } from '@/components/results/FindingsPanel';
import { ThreatBreakdown } from '@/components/results/ThreatBreakdown';
import { AdvicePanel } from '@/components/results/AdvicePanel';
import { SourceList } from '@/components/results/SourceList';
import { ScanRecord } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { History as HistoryIcon, ShieldCheck } from 'lucide-react';

export const HistoryPage = () => {
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);

  const historySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Saved Scans & Threat History Archive',
    description: 'Local private historical archive of evaluated websites, messages, and QR codes.',
    url: 'https://isitlegit.app/history',
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title="Saved Scans & Threat History Archive"
        description="Review, search, and export your previous threat scans, verified legitimate links, and security findings saved securely on your local device."
        canonicalPath="/history"
        schema={historySchema}
      />

      <Breadcrumbs items={[{ label: 'History Archive', path: '/history' }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#F0C020] text-xs font-black uppercase tracking-widest">
          <HistoryIcon className="w-3.5 h-3.5 text-[#F0C020]" />
          <span>ON-DEVICE ENCRYPTED SANDBOX</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212] leading-[0.95]">
          SCAN ARCHIVE & AUDIT LOGS
        </h1>

        <p className="text-sm sm:text-base font-medium text-[#121212] max-w-2xl leading-relaxed">
          Access past evaluations, inspect forensic evidence, and export telemetry for audits. All data is saved on this physical device within IndexedDB and never transmitted to remote servers.
        </p>
      </div>

      {/* History Filter and List */}
      <HistoryList onSelectScan={(rec) => setSelectedRecord(rec)} />

      {/* Selected Scan Detail Modal */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="max-w-4xl bg-white border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] text-[#121212] rounded-none max-h-[85vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader className="border-b-4 border-[#121212] pb-4 mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-[#121212]">
                <ShieldCheck className="w-6 h-6 text-[#1040C0]" strokeWidth={2.5} />
                <span>ARCHIVED DIAGNOSTIC DOSSIER</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <VerdictCard result={selectedRecord.result} />
              <AdvicePanel
                advice={selectedRecord.result.advice}
                safeFollowUp={selectedRecord.result.safeFollowUp}
                isLegitimate={selectedRecord.result.verdictCategory === 'LEGITIMATE'}
              />
              <FindingsPanel findings={selectedRecord.result.findings} />
              <ThreatBreakdown breakdown={selectedRecord.result.threatBreakdown} />
              <SourceList sources={selectedRecord.result.sources} />
            </div>

            <div className="pt-6 border-t-2 border-[#121212] flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
