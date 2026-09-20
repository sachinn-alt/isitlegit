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
import { Shield, AlertOctagon, RotateCcw } from 'lucide-react';
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
    description: 'Zero-click security intelligence engine differentiating authentic alerts from phishing scams.',
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
    <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 py-10 space-y-12 bg-[#08090a]">
      <SEOHead
        title="IsItLegit — Instant Fact, Scam & Link Checker"
        description="Verify suspicious links, phishing emails, SMS alerts, and screenshots instantly. Differentiates genuine security warnings and bank OTPs from scams with zero server logging."
        canonicalPath="/"
        schema={scanSchema}
      />

      <Breadcrumbs items={[]} />

      {/* Linear Precision Hero Block */}
      <div className="space-y-3 max-w-2xl mx-auto text-center pt-2 pb-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#0f1011] border border-[#23252a] text-[11px] font-mono text-[#8a8f98]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27a644]" />
          <span>CYBERNETIC PAYLOAD INSPECTION</span>
        </div>

        <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-[510] tracking-[-0.022em] text-[#ffffff] leading-[1.05]">
          Inspect threats before you click.
        </h1>

        <p className="text-[15px] sm:text-[16px] text-[#8a8f98] leading-[1.5] max-w-xl mx-auto">
          Dissect deceptive links, phishing emails, smishing texts, and OTP alerts. Run homoglyph forensics, entropy analysis, and bank legitimacy validation on-device.
        </p>
      </div>

      {/* Precision Input Console */}
      <ScanInput 
        onScan={analyze} 
        isScanning={isScanning} 
        externalDemo={externalDemo} 
      />

      {/* Scanning Progress Bar */}
      {isScanning && (
        <div className="max-w-[840px] mx-auto">
          <ScanProgress stage={progressStage} percent={progressPercent} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-[840px] mx-auto p-3 rounded-[6px] border border-[#eb5757]/40 bg-[#eb5757]/10 text-[#eb5757] text-[13px] text-center flex items-center justify-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {result && !isScanning ? (
        <div className="space-y-6 max-w-[840px] mx-auto pt-2">
          <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
            <h2 className="text-[17px] font-[510] text-[#ffffff] flex items-center gap-2 tracking-[-0.012em]">
              <Shield className="w-4 h-4 text-[#ffffff]" />
              <span>Inspection Dossier</span>
            </h2>

            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#0f1011] hover:bg-[#161718] border border-[#23252a] text-[12px] text-[#d0d6e0] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#8a8f98]" />
              <span>New Scan</span>
            </button>
          </div>

          <VerdictCard
            result={result}
            onBookmark={() => setIsBookmarked(!isBookmarked)}
            isBookmarked={isBookmarked}
            onShare={() => setIsShareOpen(true)}
          />

          <AdvicePanel
            advice={result.advice}
            safeFollowUp={result.safeFollowUp}
            isLegitimate={result.verdictCategory === 'LEGITIMATE'}
          />

          <FindingsPanel findings={result.findings} />

          <ThreatBreakdown breakdown={result.threatBreakdown} />

          <SourceList sources={result.sources} />

          <ShareCard
            result={result}
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
          />
        </div>
      ) : (
        !isScanning && <FeatureShowcase onSelectSample={handleSelectSample} />
      )}
    </div>
  );
};
