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
import { Button } from '@/ui/button';

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
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-8">
      <SEOHead
        title="Saved Scans & Threat History Archive"
        description="Review, search, and export your previous threat scans, verified legitimate links, and security findings saved securely on your local device."
        canonicalPath="/history"
        schema={historySchema}
      />

      <Breadcrumbs items={[{ label: 'History Archive', path: '/history' }]} />

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-300 font-medium">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Local Device Storage Sandbox</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Saved Scans & Verification History
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Access your past scan diagnoses, bookmarked suspicious messages, and export records for threat audits.
          Data is preserved locally in IndexedDB and never uploaded to cloud servers.
        </p>
      </div>

      {/* History Filter and List */}
      <HistoryList onSelectScan={(rec) => setSelectedRecord(rec)} />

      {/* Selected Scan Detail Modal */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="max-w-3xl bg-slate-950 border-slate-800 text-white rounded-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader className="border-b border-slate-800 pb-4 mb-4">
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>Historical Scan Inspection</span>
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

            <div className="pt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecord(null)}
                className="border-slate-700"
              >
                Close Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
