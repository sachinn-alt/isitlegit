import { useState } from 'react';
import { useAnalyzer } from '@/hooks/useAnalyzer';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ScanInput } from '@/components/scan/ScanInput';
import { ScanProgress } from '@/components/scan/ScanProgress';
import { FeatureShowcase } from '@/components/scan/FeatureShowcase';
import { VerdictCard } from '@/components/results/VerdictCard';
import { FindingsPanel } from '@/components/results/FindingsPanel';
import { ThreatBreakdown } from '@/components/results/ThreatBreakdown';
import { SourceList } from '@/components/results/SourceList';
import { AdvicePanel } from '@/components/results/AdvicePanel';
import { ShareCard } from '@/components/results/ShareCard';
import { ShieldCheck, Sparkles, AlertOctagon, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/ui/button';
import { ScanType } from '@/types';

export const ScanPage = () => {
  const { isScanning, progressStage, progressPercent, result, error, analyze, reset } = useAnalyzer();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [externalDemo, setExternalDemo] = useState<{ type: ScanType; text: string } | null>(null);

  const scanSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'IsItLegit Threat & Legitimacy Scanner',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'All',
    url: 'https://isitlegit.app/',
    description: 'Zero-click AI and heuristic verification engine detecting phishing links, scams, and authentic security alerts.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const handleSelectSample = (type: ScanType, text: string) => {
    setExternalDemo({ type, text });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-10">
      <SEOHead
        title="IsItLegit — Instant Fact, Scam & Link Checker"
        description="Verify suspicious links, phishing emails, SMS alerts, and screenshots instantly. Differentiates genuine security warnings and bank OTPs from scams with zero server logging."
        canonicalPath="/"
        schema={scanSchema}
      />

      <Breadcrumbs items={[]} />

      {/* Editorial High-Taste Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-slate-900/60 text-xs text-slate-300 font-medium backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Zero-Click Forensic Engine • 100% Client-Side Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Verify before you tap.{' '}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Unmask scams. Confirm real alerts.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Inspect suspicious URLs, phishing emails, smishing texts, and OTP codes without clicking them. Powered by on-device homoglyph heuristics, Shannon entropy analysis, and official bank 2FA validation.
        </p>
      </div>

      {/* Scan Input Console */}
      <ScanInput 
        onScan={analyze} 
        isScanning={isScanning} 
        externalDemo={externalDemo} 
      />

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
      {result && !isScanning ? (
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Inspection Forensic Dossier</span>
            </h2>

            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="text-xs text-slate-300 hover:text-white border-slate-700 bg-slate-900/60 rounded-xl gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan Another Item</span>
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
      ) : (
        /* Feature Showcase (Displayed when idle) */
        !isScanning && <FeatureShowcase onSelectSample={handleSelectSample} />
      )}
    </div>
  );
};
