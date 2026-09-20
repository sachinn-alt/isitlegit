import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
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
      <DialogContent className="max-w-md bg-white border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] text-[#121212] rounded-none p-6 sm:p-8">
        <DialogHeader className="text-center sm:text-center border-b-2 sm:border-b-4 border-[#121212] pb-4 mb-4">
          <div className="mx-auto flex items-center justify-center gap-1.5 mb-3">
            <div className="w-5 h-5 rounded-full bg-[#D02020] border-2 border-[#121212]" />
            <div className="w-5 h-5 bg-[#F0C020] border-2 border-[#121212]" />
            <div className="w-5 h-5 bg-[#1040C0] clip-triangle border-2 border-[#121212]" />
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-[#121212]">
            ISITLEGIT BAUHAUS
          </DialogTitle>
          <DialogDescription className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Constructivist threat engine & authenticity verifier
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 text-xs text-[#121212]">
          <div className="flex items-start gap-3 border-2 border-[#121212] bg-[#F0F0F0] p-3.5 shadow-[2px_2px_0px_0px_#121212]">
            <CheckCircle2 className="w-4 h-4 text-[#D02020] mt-0.5 shrink-0" strokeWidth={2.5} />
            <div>
              <strong className="text-[#121212] font-black uppercase block mb-0.5">Payload Dissection</strong>
              Unmasks lookalikes, homoglyphs, fake SMS notifications, and QR quishing.
            </div>
          </div>

          <div className="flex items-start gap-3 border-2 border-[#121212] bg-[#FFF9C4] p-3.5 shadow-[2px_2px_0px_0px_#121212]">
            <CheckCircle2 className="w-4 h-4 text-[#1040C0] mt-0.5 shrink-0" strokeWidth={2.5} />
            <div>
              <strong className="text-[#121212] font-black uppercase block mb-0.5">Authenticity Verification</strong>
              Validates legitimate bank fraud alerts and OTPs against 140+ institutional roots.
            </div>
          </div>

          <div className="flex items-start gap-3 border-2 border-[#121212] bg-[#F0F0F0] p-3.5 shadow-[2px_2px_0px_0px_#121212]">
            <Lock className="w-4 h-4 text-[#121212] mt-0.5 shrink-0" strokeWidth={2.5} />
            <div>
              <strong className="text-[#121212] font-black uppercase block mb-0.5">Client-Side Isolation</strong>
              Zero server logging, zero telemetry. 100% on-device Web Crypto sandboxing.
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleComplete}
            className="w-full h-12 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            ENTER CONSOLE →
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
