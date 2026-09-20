import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScanType } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import { ImageDropzone } from './ImageDropzone';
import { CameraScannerModal } from './CameraScannerModal';
import {
  Link2,
  Mail,
  QrCode,
  Search,
  Camera,
  ClipboardPaste,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Package,
  Coins,
  CornerDownLeft,
  Sparkles,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface ScanInputProps {
  onScan: (input: string, type: ScanType, file?: File) => void;
  isScanning: boolean;
  externalDemo?: { type: ScanType; text: string } | null;
}

export const ScanInput = ({ onScan, isScanning, externalDemo }: ScanInputProps) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ScanType>('url');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Ingest shared URLs from WhatsApp / Telegram via PWA Web Share Target
  useEffect(() => {
    const sharedUrl = searchParams.get('url');
    const sharedText = searchParams.get('text');

    if (sharedUrl) {
      setActiveTab('url');
      setUrlInput(sharedUrl);
      onScan(sharedUrl, 'url');
      toast.info('Ingested shared link from messaging app');
    } else if (sharedText) {
      if (/^https?:\/\//i.test(sharedText.trim())) {
        setActiveTab('url');
        setUrlInput(sharedText.trim());
        onScan(sharedText.trim(), 'url');
      } else {
        setActiveTab('email');
        setTextInput(sharedText);
        onScan(sharedText, 'email');
      }
      toast.info('Ingested shared message from app');
    }
  }, [searchParams]);

  // Handle external demo triggers (from showcase cards)
  useEffect(() => {
    if (externalDemo) {
      setActiveTab(externalDemo.type);
      if (externalDemo.type === 'url') {
        setUrlInput(externalDemo.text);
      } else {
        setTextInput(externalDemo.text);
      }
      onScan(externalDemo.text, externalDemo.type);
    }
  }, [externalDemo]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (activeTab === 'url') {
      if (!urlInput.trim()) return;
      onScan(urlInput.trim(), 'url');
    } else if (activeTab === 'email' || activeTab === 'text') {
      if (!textInput.trim()) return;
      onScan(textInput.trim(), 'email');
    } else if (activeTab === 'image') {
      if (!selectedFile) return;
      onScan('[Image Upload]', 'image', selectedFile);
    }
  };

  const handleClipboardPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text || !text.trim()) {
        toast.error('Clipboard is empty.');
        return;
      }

      const trimmed = text.trim();
      if (/^https?:\/\//i.test(trimmed) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
        setActiveTab('url');
        setUrlInput(trimmed);
        onScan(trimmed, 'url');
        toast.success('Pasted link from clipboard & initiated inspection');
      } else {
        setActiveTab('email');
        setTextInput(trimmed);
        onScan(trimmed, 'email');
        toast.success('Pasted text from clipboard & initiated inspection');
      }
    } catch {
      toast.error('Clipboard access denied. Please paste directly into the box.');
    }
  };

  const handleCameraDecoded = (decodedText: string) => {
    toast.success('QR Code decoded successfully via Computer Vision!');
    if (/^https?:\/\//i.test(decodedText.trim())) {
      setActiveTab('url');
      setUrlInput(decodedText.trim());
      onScan(decodedText.trim(), 'url');
    } else {
      setActiveTab('email');
      setTextInput(decodedText.trim());
      onScan(decodedText.trim(), 'email');
    }
  };

  const loadDemo = (type: ScanType, text: string) => {
    setActiveTab(type);
    if (type === 'url') {
      setUrlInput(text);
    } else {
      setTextInput(text);
    }
    onScan(text, type);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Sleek Context Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-slate-900/60 backdrop-blur-xl text-xs text-slate-300 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-300">
            <strong>Suspicious link on WhatsApp, SMS, or Telegram?</strong> Paste it without opening to preview the true destination safely.
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleClipboardPaste}
          className="h-8 gap-1.5 text-xs text-cyan-300 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 shrink-0 rounded-xl"
        >
          <ClipboardPaste className="w-3.5 h-3.5" />
          <span>Paste Clipboard</span>
        </Button>
      </div>

      {/* Main High-Taste Console Box */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ScanType)}
          className="w-full"
        >
          {/* Segmented Navigation Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto p-1 bg-slate-950/80 border border-white/[0.08] rounded-xl">
              <TabsTrigger value="url" className="gap-2 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                <Link2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Link / URL</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-2 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>Message / SMS</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-2 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upload / QR</span>
              </TabsTrigger>
            </TabsList>

            {/* Live Camera Scanner Trigger */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsCameraOpen(true)}
              className="gap-2 border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30 text-cyan-300 text-xs rounded-xl self-start sm:self-auto h-9"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>Camera QR Scanner</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tab 1: URL Input */}
            <TabsContent value="url" className="space-y-4 mt-0">
              <div className="relative group">
                <Input
                  type="text"
                  id="scan-url-input"
                  placeholder="https://example.com/verify-account?token=..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-14 pl-4 pr-24 text-sm sm:text-base font-mono rounded-2xl bg-slate-950/80 border-white/[0.08] text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                      title="Clear input"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 rounded-md">
                    <span>↵</span>
                  </kbd>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Message/SMS/Email Textarea */}
            <TabsContent value="email" className="space-y-4 mt-0">
              <div className="relative">
                <Textarea
                  id="scan-text-input"
                  placeholder="Paste suspicious text message, bank 2FA alert, OTP notification, email headers & body, or viral WhatsApp forward..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[140px] text-sm sm:text-base rounded-2xl bg-slate-950/80 border-white/[0.08] text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] leading-relaxed"
                />
                {textInput && (
                  <button
                    type="button"
                    onClick={() => setTextInput('')}
                    className="absolute top-3 right-3 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                    title="Clear text"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </TabsContent>

            {/* Tab 3: Image / QR Upload */}
            <TabsContent value="image" className="space-y-4 mt-0">
              <ImageDropzone
                onFileSelect={(file) => setSelectedFile(file)}
                selectedFile={selectedFile}
                onClear={() => setSelectedFile(null)}
              />
            </TabsContent>

            {/* Curated Interactive Sample Scenarios */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Instant Test Scenarios:
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Click any pill to test the engine live
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Sample 1: Chase Legit 2FA */}
                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'Chase Fraud Alert: We declined an unverified purchase of $184.20 at BESTBUY.COM on card ending in 4920. Did you attempt this charge? Reply YES or NO. (Do NOT share your one-time PIN or password over the phone).'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/40 hover:bg-emerald-500/15 text-emerald-300 text-xs transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-300">Chase 2FA Alert</div>
                      <div className="text-[10px] text-emerald-400/80">Authentic Bank Security Check</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400/70 border border-emerald-500/30 px-1.5 py-0.5 rounded">Safe</span>
                </button>

                {/* Sample 2: PayPal Homoglyph */}
                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'url',
                      'http://раураl.com-verify.account-security.xyz/login?session=928a'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/25 hover:border-rose-500/40 hover:bg-rose-500/15 text-rose-300 text-xs transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-rose-300">PayPal Cyrillic Spoof</div>
                      <div className="text-[10px] text-rose-400/80">Homoglyph Lookalike Attack</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-rose-400/70 border border-rose-500/30 px-1.5 py-0.5 rounded">Phish</span>
                </button>

                {/* Sample 3: FedEx Smishing */}
                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'FEDEX: Your parcel #US-88219 is on delivery hold due to unpaid customs fee of $1.85. Settle fee within 12 hours or package will be returned: http://fedx-pkg-status-881.link/pay'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 hover:border-amber-500/40 hover:bg-amber-500/15 text-amber-300 text-xs transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300">FedEx Smishing SMS</div>
                      <div className="text-[10px] text-amber-400/80">Urgent Fee Delivery Scam</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-amber-400/70 border border-amber-500/30 px-1.5 py-0.5 rounded">Fraud</span>
                </button>

                {/* Sample 4: Crypto Giveaway */}
                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'Tesla Crypto Airdrop! To celebrate the new AI launch, send 0.1 BTC to verify your wallet and receive 0.2 BTC automatically. Limited to first 500 participants: http://tesla-btc-airdrop-live.xyz'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/25 hover:border-purple-500/40 hover:bg-purple-500/15 text-purple-300 text-xs transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-purple-300">Telegram Crypto Scam</div>
                      <div className="text-[10px] text-purple-400/80">Double-Your-Coins Trick</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-purple-400/70 border border-purple-500/30 px-1.5 py-0.5 rounded">Scam</span>
                </button>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={isScanning}
                  size="lg"
                  className="w-full h-13 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>{isScanning ? 'Dissecting Threat & Legitimacy Vectors...' : 'Analyze Threat & Legitimacy'}</span>
                </Button>
              </div>
            </div>
          </form>
        </Tabs>
      </div>

      {/* Live Camera Scanner Modal */}
      <CameraScannerModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onDecoded={handleCameraDecoded}
      />
    </div>
  );
};
