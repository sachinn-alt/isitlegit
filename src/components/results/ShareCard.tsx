import React, { useState } from 'react';
import { ScanResult } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Copy, Check, Share2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Badge } from '@/ui/badge';

interface ShareCardProps {
  result: ScanResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareCard = ({ result, isOpen, onClose }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);
  if (!result) return null;

  const isLegit = result.verdictCategory === 'LEGITIMATE';

  const shareText = `🛡️ IsItLegit Security Scan Report:
Verdict: ${result.isLegitimateConfirmed ? 'VERIFIED AUTHENTIC' : result.verdict}
Input: ${result.inputPreview}
Summary: ${result.summary}
Scanned on IsItLegit — Instant Fact, Scam & Link Checker: https://isitlegit.app`;

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
      <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <span>Share Security Report</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Share this verification summary with family, colleagues, or social communities
          </DialogDescription>
        </DialogHeader>

        {/* Share preview badge card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLegit ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              )}
              <span className="font-bold text-sm text-slate-200">IsItLegit Verification</span>
            </div>
            <Badge variant={isLegit ? 'safe' : 'destructive'} className="text-xs">
              {result.verdict}
            </Badge>
          </div>

          <p className="text-xs font-mono text-slate-400 truncate bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            {result.inputPreview}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            {result.summary}
          </p>

          <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span>Verified via 4 security engines</span>
            <span>https://isitlegit.app</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full gap-2 text-xs border-slate-700 hover:bg-slate-800"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text Summary'}</span>
          </Button>

          {'share' in navigator && (
            <Button
              onClick={handleNativeShare}
              className="w-full gap-2 text-xs bg-primary hover:bg-primary/90"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via App...</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
