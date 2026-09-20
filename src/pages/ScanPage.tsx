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
import { GithubIcon } from '@/components/common/GithubIcon';
import { ScanType } from '@/types';

export const ScanPage = () => {
  const { isScanning, progressStage, progressPercent, result, error, analyze, reset } = useAnalyzer();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [externalDemo, setExternalDemo] = useState<{ type: ScanType; text: string } | null>(null);

  const scanSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'IsItLegit Bauhaus Security Engine',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'All',
    url: 'https://isitlegit.app/',
    description: 'Constructivist security intelligence engine differentiating authentic alerts from phishing scams.',
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
    <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12 space-y-12">
      <SEOHead
        title="IsItLegit — Instant Fact, Scam & Link Checker"
        description="Verify suspicious links, phishing emails, SMS alerts, and screenshots instantly. Differentiates genuine security warnings and bank OTPs from scams with zero server logging."
        canonicalPath="/"
        schema={scanSchema}
      />

      <Breadcrumbs items={[]} />

      {/* Bauhaus Constructivist Poster Hero */}
      <div className="relative max-w-5xl mx-auto text-center space-y-6 pt-4 pb-4">
        
        {/* Decorative Geometric Trio Accent */}
        {/* Decorative Geometric Trio Accent & Developer Link */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#D02020] text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#D02020]" />
            <span>FORM FOLLOWS FUNCTION</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F0F0] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#40C020] text-xs font-black uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-[#121212]" />
            <span>ZERO DATA STORAGE • VANISHES AFTER CHECK</span>
          </div>

          <a
            href="https://github.com/sachinn-alt"
            target="_blank"
            rel="noopener noreferrer"
            title="Developed by sachinn-alt on GitHub"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1040C0] hover:bg-[#0c3298] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-widest transition-transform hover:-translate-y-0.5"
          >
            <GithubIcon className="w-3.5 h-3.5 text-white" />
            <span>DEV: @SACHINN-ALT</span>
          </a>
        </div>

        {/* Massive Constructivist Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-[#121212] uppercase leading-[0.92]">
          INSPECT BEFORE <span className="bg-[#D02020] text-white px-2 py-0.5 inline-block -rotate-1 border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">YOU CLICK.</span>
        </h1>

        {/* Subhead with geometric punch */}
        <p className="text-base sm:text-xl font-medium text-[#121212] leading-relaxed max-w-2xl mx-auto">
          Dissect weaponized links, fake bank SMS alerts, homoglyph lookalikes, and OTP smishing. 100% private — zero info is ever stored; everything vanishes immediately after check.
        </p>
      </div>

      {/* Bauhaus Console Input */}
      <ScanInput 
        onScan={analyze} 
        isScanning={isScanning} 
        externalDemo={externalDemo} 
      />

      {/* Scanning Progress Bar in Bauhaus */}
      {isScanning && (
        <div className="max-w-4xl mx-auto">
          <ScanProgress stage={progressStage} percent={progressPercent} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto p-4 bg-[#D02020] text-white border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
          <AlertOctagon className="w-5 h-5 shrink-0" strokeWidth={3} />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {result && !isScanning ? (
        <div className="space-y-8 max-w-4xl mx-auto pt-4">
          <div className="flex items-center justify-between border-b-4 border-[#121212] pb-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-[#D02020] border-2 border-[#121212]" />
              <span>DIAGNOSTIC DOSSIER</span>
            </h2>

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-white hover:bg-[#F0C020] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>NEW INSPECTION</span>
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
