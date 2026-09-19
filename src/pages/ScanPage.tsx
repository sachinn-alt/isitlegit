import { useState } from 'react';
import { useAnalyzer } from '@/hooks/useAnalyzer';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ScanInput } from '@/components/scan/ScanInput';
import { ScanProgress } from '@/components/scan/ScanProgress';
import { VerdictCard } from '@/components/results/VerdictCard';
import { FindingsPanel } from '@/components/results/FindingsPanel';
import { ThreatBreakdown } from '@/components/results/ThreatBreakdown';
import { SourceList } from '@/components/results/SourceList';
import { AdvicePanel } from '@/components/results/AdvicePanel';
import { ShareCard } from '@/components/results/ShareCard';
import { DecryptedText } from '@/components/reactbits/decrypted-text';
import { ShieldCheck, Sparkles, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';

export const ScanPage = () => {
  const { isScanning, progressStage, progressPercent, result, error, analyze, reset } = useAnalyzer();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const scanSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'IsItLegit Threat & Legitimacy Scanner',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'All',
    url: 'https://isitlegit.app/',
    description: 'Instant AI and heuristic verification platform detecting phishing links, scams, and verifying authentic security alerts.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-8">
      <SEOHead
        title="IsItLegit — Instant Fact, Scam & Link Checker"
        description="Verify suspicious links, phishing emails, SMS alerts, and screenshots instantly. Differentiates genuine security warnings and bank OTPs from scams with zero server logging."
        canonicalPath="/"
        schema={scanSchema}
      />

      <Breadcrumbs items={[]} />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-300 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Multi-Engine Threat & Legitimacy Telemetry</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Is that link, message, or alert{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            actually legit?
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          <DecryptedText
            text="Verify deceptive links, phishing emails, smishing messages, and viral claims. We confirm real bank alerts and unmask scams before you click."
            speed={25}
            maxIterations={8}
          />
        </p>
      </div>

      {/* Scan Input Console */}
      <ScanInput onScan={analyze} isScanning={isScanning} />

      {/* Scanning Progress Monitor */}
      {isScanning && (
        <ScanProgress stage={progressStage} percent={progressPercent} />
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs text-center flex items-center justify-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {result && !isScanning && (
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>Inspection Report</span>
            </h2>

            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-xs text-slate-400 hover:text-white"
            >
              Scan Another Item
            </Button>
          </div>

          {/* Hero Verdict Indicator */}
          <VerdictCard
            result={result}
            onBookmark={() => setIsBookmarked(!isBookmarked)}
            isBookmarked={isBookmarked}
            onShare={() => setIsShareOpen(true)}
          />

          {/* Actionable Advice Panel */}
          <AdvicePanel
            advice={result.advice}
            safeFollowUp={result.safeFollowUp}
            isLegitimate={result.verdictCategory === 'LEGITIMATE'}
          />

          {/* Findings & Diagnostics */}
          <FindingsPanel findings={result.findings} />

          {/* Multi-Vector Threat Breakdown */}
          <ThreatBreakdown breakdown={result.threatBreakdown} />

          {/* Intelligence Sources */}
          <SourceList sources={result.sources} />

          {/* Share Dialog */}
          <ShareCard
            result={result}
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
