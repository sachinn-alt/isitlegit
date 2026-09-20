import { useState } from 'react';
import { ScanResult } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { Copy, Check, Share2, ShieldCheck, ShieldAlert } from 'lucide-react';

interface ShareCardProps {
  result: ScanResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareCard = ({ result, isOpen, onClose }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);
  if (!result) return null;

  const isLegit = result.verdictCategory === 'LEGITIMATE';

  const shareText = `🛡️ IsItLegit Diagnostic Report:
Verdict: ${result.isLegitimateConfirmed ? 'VERIFIED AUTHENTIC' : result.verdict}
Input: ${result.inputPreview}
Summary: ${result.summary}
Inspected on IsItLegit — On-Device Threat Forensics: https://isitlegit.app`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `IsItLegit Security Report: ${result.verdict}`,
          text: shareText,
          url: 'https://isitlegit.app',
        });
      } catch (err) {
        console.warn('Share cancelled or failed:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] text-[#121212] rounded-none p-6 sm:p-8">
        <DialogHeader className="border-b-2 border-[#121212] pb-3">
          <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#1040C0]" strokeWidth={3} />
            <span>DISPATCH REPORT</span>
          </DialogTitle>
          <DialogDescription className="text-xs font-bold uppercase text-[#62666D]">
            Export verified diagnosis to messaging apps or security response teams
          </DialogDescription>
        </DialogHeader>

        {/* Share preview badge card */}
        <div className="border-2 border-[#121212] bg-[#F0F0F0] p-5 space-y-3 mt-4 shadow-[3px_3px_0px_0px_#121212]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLegit ? (
                <ShieldCheck className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
              ) : (
                <ShieldAlert className="w-5 h-5 text-[#D02020]" strokeWidth={2.5} />
              )}
              <span className="font-black text-sm uppercase text-[#121212]">ISITLEGIT FORENSICS</span>
            </div>
            <span className={`text-xs font-black uppercase px-2 py-0.5 border border-[#121212] ${
              isLegit ? 'bg-[#FFF9C4] text-[#121212]' : 'bg-[#D02020] text-white'
            }`}>
              {result.verdict}
            </span>
          </div>

          <p className="text-xs font-mono text-[#121212] truncate bg-white p-2 border border-[#121212]">
            {result.inputPreview}
          </p>

          <p className="text-xs font-medium text-[#121212] leading-relaxed">
            {result.summary}
          </p>

          <div className="text-[10px] font-mono font-bold uppercase text-[#62666D] pt-2 border-t border-[#121212] flex items-center justify-between">
            <span>STATIC CRYPTO VERIFICATION</span>
            <span>ISITLEGIT.APP</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <button
            onClick={handleCopy}
            className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {copied ? <Check className="w-4 h-4 text-[#1040C0]" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={2.5} />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY SUMMARY'}</span>
          </button>

          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Share2 className="w-4 h-4 text-white" strokeWidth={2.5} />
              <span>SHARE VIA APP</span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
