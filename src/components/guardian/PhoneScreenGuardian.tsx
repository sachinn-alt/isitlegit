import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { classifyPayloadML, MLClassificationResult } from '@/engine/ml-phishing-classifier';
import { parseUrl } from '@/utils/url';
import { Shield, ShieldAlert, ShieldCheck, ExternalLink, X, AlertTriangle, Clipboard, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { toast } from 'sonner';

export const PhoneScreenGuardian = () => {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [mlResult, setMlResult] = useState<MLClassificationResult | null>(null);
  const [inspectedUrl, setInspectedUrl] = useState<string | null>(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [showOverrideConfirm, setShowOverrideConfirm] = useState(false);

  // If user disabled link guardian in settings, don't show the floating widget
  if (settings.linkGuardianEnabled === false) {
    return null;
  }

  const playThreatSound = () => {
    if (!settings.soundAlertsEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.3); // drop to A3
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handleOpenGuardian = () => {
    if (!settings.guardianPermissionGranted) {
      setShowPermissionPrompt(true);
    }
    setIsOpen(true);
  };

  const handleGrantPermission = async () => {
    try {
      if ('Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    } catch {
      // Ignore if permission prompt is not supported
    }

    await updateSettings({
      guardianPermissionGranted: true,
    });
    setShowPermissionPrompt(false);
    toast.success('Link Guardian Active! All links will be pre-screened with ML.');
  };

  const handleCheckClipboard = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        toast.error('Clipboard reading not supported in this browser. Please paste the link manually.');
        return;
      }
      const text = await navigator.clipboard.readText();
      const trimmed = text.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.includes('.')) {
        setInputUrl(trimmed);
        evaluateLink(trimmed);
      } else {
        toast.info('Clipboard does not contain a recognizable link.');
      }
    } catch {
      toast.error('Clipboard access was denied. Please paste your link into the box.');
    }
  };

  const evaluateLink = (target: string) => {
    const clean = target.trim();
    if (!clean) {
      toast.error('Please enter a link to inspect.');
      return;
    }

    setIsEvaluating(true);
    setMlResult(null);
    setShowOverrideConfirm(false);

    // Run real client-side ML classification
    setTimeout(() => {
      const result = classifyPayloadML(clean, clean);
      setMlResult(result);
      setInspectedUrl(clean);
      setIsEvaluating(false);

      if (result.classification === 'MALICIOUS') {
        playThreatSound();
        toast.error('Malicious link blocked by ML Guardian!');
      } else if (result.classification === 'SUSPICIOUS') {
        playThreatSound();
        toast.warning('Caution: Link has suspicious machine learning markers.');
      } else {
        toast.success('Link passed ML safety evaluation!');
      }
    }, 250);
  };

  const handleProceedSafe = (url: string) => {
    let dest = url;
    if (!dest.startsWith('http://') && !dest.startsWith('https://')) {
      dest = 'https://' + dest;
    }
    window.open(dest, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const parsed = inspectedUrl ? parseUrl(inspectedUrl) : null;

  return (
    <>
      {/* Floating On-Screen Bauhaus Trigger */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={handleOpenGuardian}
          aria-label="Open Link Guardian Safety Gate"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1040C0] hover:bg-[#0c3298] text-white border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-black text-xs uppercase tracking-wider"
        >
          <div className="relative">
            <Shield className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#40C020] border-2 border-[#121212] rounded-full animate-pulse" />
          </div>
          <span className="hidden xs:inline">LINK GUARDIAN</span>
        </button>
      </div>

      {/* Safety Gate Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#121212]/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-[#F0F0F0] border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-5 sm:p-7 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-[#121212] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#121212] text-white border border-[#121212]">
                  <ShieldCheck className="w-5 h-5 text-[#F0C020]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase text-[#121212] tracking-tight">
                    PRE-CLICK LINK GUARDIAN
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold uppercase text-[#62666D]">
                    Real-time Client-side Machine Learning Safety Gate
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-white border-2 border-[#121212] hover:bg-[#D02020] hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Permission Request Card (shown if not yet granted) */}
            {showPermissionPrompt && (
              <div className="bg-[#FFF9C4] border-2 border-[#121212] p-4 shadow-[4px_4px_0px_0px_#121212] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#121212] text-[#F0C020]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-black uppercase text-[#121212]">
                      USER PERMISSION REQUIRED
                    </h4>
                    <p className="font-medium text-[#121212] leading-relaxed">
                      Link Guardian safeguards your phone before you open unverified links from SMS, WhatsApp, or emails.
                      Allowing permission lets the app evaluate links and sound warnings before your browser navigates.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={handleGrantPermission}
                    className="flex-1 py-2 px-3 bg-[#1040C0] hover:bg-[#0c3298] text-white border-2 border-[#121212] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                  >
                    GRANT PERMISSION & ACTIVATE
                  </button>
                  <button
                    onClick={() => setShowPermissionPrompt(false)}
                    className="py-2 px-3 bg-white hover:bg-[#E0E0E0] text-[#121212] border-2 border-[#121212] text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    MANUAL ONLY
                  </button>
                </div>
              </div>
            )}

            {/* URL Input Form */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#121212] block">
                PASTE LINK TO CHECK BEFORE ENTERING:
              </label>

              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="https://example-link.com/verify..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && evaluateLink(inputUrl)}
                  className="w-full h-11 px-3 bg-white border-2 border-[#121212] text-xs font-mono text-[#121212] rounded-none focus:outline-none focus:ring-2 focus:ring-[#1040C0] shadow-inner"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCheckClipboard}
                    className="flex-1 h-10 bg-white hover:bg-[#E0E0E0] text-[#121212] border-2 border-[#121212] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Clipboard className="w-4 h-4 text-[#1040C0]" />
                    <span>PASTE CLIPBOARD</span>
                  </button>

                  <button
                    type="button"
                    disabled={isEvaluating}
                    onClick={() => evaluateLink(inputUrl)}
                    className="flex-1 h-10 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center gap-1.5 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    {isEvaluating ? (
                      <span>ML INFERENCE...</span>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>INSPECT LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ML Evaluation Verdict Banner */}
            {mlResult && inspectedUrl && (
              <div className="space-y-4 pt-2 border-t-2 border-[#121212]">
                {/* Result Card: MALICIOUS */}
                {mlResult.classification === 'MALICIOUS' && (
                  <div className="bg-[#FFEBEE] border-2 sm:border-4 border-[#D02020] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#121212] space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#D02020] text-white border-2 border-[#121212] shrink-0">
                        <ShieldAlert className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 bg-[#D02020] text-white font-mono text-[10px] font-black uppercase">
                          BLOCKED: ML PHISHING RISK {Math.round(mlResult.probability * 100)}%
                        </span>
                        <h4 className="text-sm sm:text-base font-black uppercase text-[#D02020] tracking-tight">
                          DO NOT ENTER THIS WEBSITE!
                        </h4>
                        <p className="text-xs font-bold text-[#121212] break-all font-mono">
                          {parsed?.hostname || inspectedUrl}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-[#121212] leading-relaxed">
                      Our statistical classifier detected strong indicators of credential phishing, domain spoofing, or deceptive social engineering.
                    </p>

                    {/* Top Contributing ML Features */}
                    {mlResult.topFeatures.length > 0 && (
                      <div className="bg-white border-2 border-[#121212] p-2.5 space-y-1.5">
                        <span className="text-[10px] font-black uppercase text-[#62666D] tracking-wider block">
                          DETECTED ALGORITHMIC RED FLAGS:
                        </span>
                        {mlResult.topFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs font-bold text-[#D02020]">
                            <span>• {feat.name}</span>
                            <span className="font-mono text-[10px] text-[#121212]">{feat.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Warning Actions */}
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          toast.success('Threat avoided safely!');
                        }}
                        className="w-full py-2.5 bg-[#121212] hover:bg-[#222222] text-white text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
                      >
                        CLOSE & STAY PROTECTED
                      </button>

                      {!showOverrideConfirm ? (
                        <button
                          onClick={() => setShowOverrideConfirm(true)}
                          className="w-full text-center text-[10px] font-black uppercase text-[#62666D] hover:text-[#D02020] underline cursor-pointer py-1"
                        >
                          I understand the risks, let me proceed anyway
                        </button>
                      ) : (
                        <div className="p-2 bg-white border border-[#D02020] space-y-1 text-center">
                          <p className="text-[10px] font-bold text-[#D02020]">
                            Warning: Your passwords or personal data may be stolen.
                          </p>
                          <button
                            onClick={() => handleProceedSafe(inspectedUrl)}
                            className="py-1 px-3 bg-[#D02020] text-white text-[10px] font-black uppercase tracking-wider border border-[#121212]"
                          >
                            CONFIRM: PROCEED REGARDLESS
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Result Card: SUSPICIOUS */}
                {mlResult.classification === 'SUSPICIOUS' && (
                  <div className="bg-[#FFF8E1] border-2 sm:border-4 border-[#F0C020] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#121212] space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#F0C020] text-[#121212] border-2 border-[#121212] shrink-0">
                        <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 bg-[#121212] text-[#F0C020] font-mono text-[10px] font-black uppercase">
                          SUSPICIOUS: ML PROBABILITY {Math.round(mlResult.probability * 100)}%
                        </span>
                        <h4 className="text-sm sm:text-base font-black uppercase text-[#121212] tracking-tight">
                          CAUTION ADVISED BEFORE VISITING
                        </h4>
                        <p className="text-xs font-bold text-[#121212] break-all font-mono">
                          {parsed?.hostname || inspectedUrl}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-[#121212] leading-relaxed">
                      This address exhibits irregular structures or unknown reputations. Do not enter passwords or card numbers on this destination.
                    </p>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-2 bg-[#121212] text-white text-xs font-black uppercase tracking-wider border-2 border-[#121212] cursor-pointer"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={() => handleProceedSafe(inspectedUrl)}
                        className="flex-1 py-2 bg-[#F0C020] hover:bg-[#d4a810] text-[#121212] text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>VISIT WITH CAUTION</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Result Card: LEGITIMATE / SAFE */}
                {mlResult.classification === 'LEGITIMATE' && (
                  <div className="bg-[#E8F5E9] border-2 sm:border-4 border-[#2E7D32] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#121212] space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#2E7D32] text-white border-2 border-[#121212] shrink-0">
                        <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 bg-[#2E7D32] text-white font-mono text-[10px] font-black uppercase">
                          VERIFIED SAFE (ML RISK: {Math.round(mlResult.probability * 100)}%)
                        </span>
                        <h4 className="text-sm sm:text-base font-black uppercase text-[#2E7D32] tracking-tight">
                          SAFE TO ENTER DESTINATION
                        </h4>
                        <p className="text-xs font-bold text-[#121212] break-all font-mono">
                          {parsed?.hostname || inspectedUrl}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-[#121212] leading-relaxed">
                      Zero deceptive homoglyphs, authentic host architecture, and clean statistical entropy confirmed.
                    </p>

                    <button
                      onClick={() => handleProceedSafe(inspectedUrl)}
                      className="w-full py-3 bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>PROCEED TO LINK SAFELY</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
