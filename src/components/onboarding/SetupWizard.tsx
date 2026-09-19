import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export const SetupWizard = () => {
  const { settings, loading, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show on first load only if settings loaded and onboarding not completed
    if (!loading && !settings.onboardingCompleted) {
      setIsOpen(true);
    }
  }, [loading, settings.onboardingCompleted]);

  const handleComplete = () => {
    updateSettings({ onboardingCompleted: true });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleComplete()}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white rounded-3xl p-6 sm:p-8">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl shadow-blue-500/25 mb-3">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Welcome to IsItLegit
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 mt-1">
            The next-generation scam detector & authenticity verification platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-3 text-xs text-slate-300">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white block mb-0.5">Scam & Phishing Detection</strong>
              Unmasks deceptive lookalike links, homograph spoofs, fake SMS alerts, and quishing QR attacks.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white block mb-0.5">Authenticity Verification</strong>
              Explains why real bank fraud alerts or OTPs feel suspicious while confirming they are 100% legitimate.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
            <Lock className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white block mb-0.5">100% Client-Side Privacy</strong>
              Zero tracking, zero analytics, and zero server logging. Your links and messages stay on your device.
            </div>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl h-11 text-xs font-semibold cursor-pointer shadow-lg shadow-blue-500/25"
        >
          <span>Get Started & Run First Scan</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
