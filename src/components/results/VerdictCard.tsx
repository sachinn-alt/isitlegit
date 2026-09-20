import { motion } from 'motion/react';
import { ScanResult } from '@/types';
import { Badge } from '@/ui/badge';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, ExternalLink, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/ui/button';
import { ShinyText } from '@/components/reactbits/shiny-text';
import { getThreatColor } from '@/lib/utils';

interface VerdictCardProps {
  result: ScanResult;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  onShare?: () => void;
}

export const VerdictCard = ({
  result,
  onBookmark,
  isBookmarked,
  onShare,
}: VerdictCardProps) => {
  const isLegit = result.verdictCategory === 'LEGITIMATE';
  const isMalicious = result.verdictCategory === 'MALICIOUS';
  const colors = getThreatColor(result.verdict);

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Threat score gauge: score 0 is full safe circle (green), score 100 is full danger circle (red)
  const displayScore = isLegit ? result.legitimacyScore : result.threatScore;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 sm:p-7 shadow-[rgba(0,0,0,0.4)_0px_2px_4px_0px]"
    >

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Score Gauge & Icon */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                className={isLegit ? 'text-emerald-500' : isMalicious ? 'text-rose-500' : 'text-amber-500'}
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold font-mono text-white">
                {displayScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {isLegit ? 'Authenticity' : 'Threat Level'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge
                className={`text-sm px-3 py-1 font-bold uppercase tracking-wider ${colors.badge}`}
              >
                {isLegit ? (
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                ) : isMalicious ? (
                  <ShieldAlert className="w-4 h-4 mr-1.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                )}
                <span>
                  {result.isLegitimateConfirmed
                    ? 'Verified Authentic'
                    : result.verdict.replace('_', ' ')}
                </span>
              </Badge>

              {result.scamType && (
                <Badge variant="outline" className="text-xs text-rose-400 border-rose-500/30">
                  {result.scamType}
                </Badge>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              <ShinyText text={result.summary} />
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {result.explanation}
            </p>

            {result.officialEntity && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-emerald-300 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Matches official records for: <strong>{result.officialEntity.name}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="gap-2 w-full sm:w-36 text-xs border-slate-700 hover:bg-slate-800"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Verdict</span>
            </Button>
          )}

          {onBookmark && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBookmark}
              className={`gap-2 w-full sm:w-36 text-xs ${
                isBookmarked ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' : 'border-slate-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Saved' : 'Save to Archive'}</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
