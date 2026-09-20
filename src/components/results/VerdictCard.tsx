import { motion } from 'motion/react';
import { ScanResult } from '@/types';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, Bookmark, Share2 } from 'lucide-react';

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

  // SVG Gauge calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const displayScore = isLegit ? result.legitimacyScore : result.threatScore;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getVerdictBg = () => {
    if (isLegit) return 'bg-[#FFF9C4] text-[#121212]';
    if (isMalicious) return 'bg-[#D02020] text-white';
    return 'bg-[#F0C020] text-[#121212]';
  };

  const getStrokeColor = () => {
    if (isLegit) return '#1040C0';
    if (isMalicious) return '#D02020';
    return '#F0C020';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6"
    >
      {/* Top right geometric shape */}
      <div className="absolute top-4 right-4 flex items-center gap-1">
        <div className={`w-3 h-3 ${isMalicious ? 'bg-[#D02020]' : isLegit ? 'bg-[#1040C0]' : 'bg-[#F0C020]'} border border-[#121212]`} />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Score Gauge & Description */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          
          {/* Bauhaus Circular Meter */}
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0 border-4 border-[#121212] bg-[#F0F0F0] shadow-[3px_3px_0px_0px_#121212]">
            <svg className="w-full h-full -rotate-90 transform p-1" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-[#E0E0E0]"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="70"
                cy="70"
                r={radius}
                stroke={getStrokeColor()}
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-mono text-[#121212]">
                {displayScore}
              </span>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#62666D]">
                {isLegit ? 'GENUINE' : 'THREAT'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] ${getVerdictBg()}`}
              >
                {isLegit ? (
                  <CheckCircle className="w-4 h-4" strokeWidth={3} />
                ) : isMalicious ? (
                  <ShieldAlert className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <AlertTriangle className="w-4 h-4" strokeWidth={3} />
                )}
                <span>
                  {result.isLegitimateConfirmed
                    ? 'VERIFIED AUTHENTIC'
                    : result.verdict.replace('_', ' ')}
                </span>
              </div>

              {result.scamType && (
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-white border-2 border-[#121212] text-[#D02020] shadow-[2px_2px_0px_0px_#121212]">
                  {result.scamType}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212] leading-tight">
              {result.summary}
            </h3>

            <p className="text-sm font-medium text-[#121212] leading-relaxed max-w-xl">
              {result.explanation}
            </p>

            {result.officialEntity && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF9C4] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] mt-1">
                <ShieldCheck className="w-4 h-4 text-[#1040C0]" strokeWidth={2.5} />
                <span>Matches official registry: <strong>{result.officialEntity.name}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
          {onShare && (
            <button
              onClick={onShare}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-36 h-10 px-3 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Share2 className="w-4 h-4" strokeWidth={2.5} />
              <span>SHARE DOSSIER</span>
            </button>
          )}

          {onBookmark && (
            <button
              onClick={onBookmark}
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-36 h-10 px-3 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                isBookmarked 
                  ? 'bg-[#F0C020] text-[#121212]' 
                  : 'bg-white text-[#121212] hover:bg-[#E0E0E0]'
              }`}
            >
              <Bookmark className="w-4 h-4" strokeWidth={2.5} />
              <span>{isBookmarked ? 'SAVED' : 'ARCHIVE'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
