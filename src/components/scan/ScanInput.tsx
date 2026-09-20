import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScanType } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { ImageDropzone } from './ImageDropzone';
import { CameraScannerModal } from './CameraScannerModal';
import {
  Link2,
  Mail,
  QrCode,
  Camera,
  ClipboardPaste,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
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

  useEffect(() => {
    const sharedUrl = searchParams.get('url');
    const sharedText = searchParams.get('text');

    if (sharedUrl) {
      setActiveTab('url');
      setUrlInput(sharedUrl);
      onScan(sharedUrl, 'url');
      toast.info('Ingested shared link from app');
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
      toast.info('Ingested shared message');
    }
  }, [searchParams]);

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
        toast.success('Pasted link from clipboard');
      } else {
        setActiveTab('email');
        setTextInput(trimmed);
        onScan(trimmed, 'email');
        toast.success('Pasted text from clipboard');
      }
    } catch {
      toast.error('Clipboard access denied.');
    }
  };

  const handleCameraDecoded = (decodedText: string) => {
    toast.success('QR Code decoded');
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
    <div className="w-full max-w-[840px] mx-auto space-y-3">
      {/* Precision Input Surface */}
      <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-5 sm:p-6 shadow-[rgba(0,0,0,0.4)_0px_2px_4px_0px]">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ScanType)}
          className="w-full"
        >
          {/* Segmented Switcher & Quick Paste */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto p-0.5 bg-[#161718] border border-[#23252a] rounded-[6px] h-8">
              <TabsTrigger 
                value="url" 
                className="gap-1.5 text-[12px] font-normal tracking-[-0.010em] data-[state=active]:bg-[#0f1011] data-[state=active]:text-[#ffffff] data-[state=active]:border data-[state=active]:border-[#383b3f] rounded-[4px] h-7 px-3"
              >
                <Link2 className="w-3.5 h-3.5 text-[#8a8f98]" />
                <span>Link</span>
              </TabsTrigger>
              <TabsTrigger 
                value="email" 
                className="gap-1.5 text-[12px] font-normal tracking-[-0.010em] data-[state=active]:bg-[#0f1011] data-[state=active]:text-[#ffffff] data-[state=active]:border data-[state=active]:border-[#383b3f] rounded-[4px] h-7 px-3"
              >
                <Mail className="w-3.5 h-3.5 text-[#8a8f98]" />
                <span>Message / SMS</span>
              </TabsTrigger>
              <TabsTrigger 
                value="image" 
                className="gap-1.5 text-[12px] font-normal tracking-[-0.010em] data-[state=active]:bg-[#0f1011] data-[state=active]:text-[#ffffff] data-[state=active]:border data-[state=active]:border-[#383b3f] rounded-[4px] h-7 px-3"
              >
                <QrCode className="w-3.5 h-3.5 text-[#8a8f98]" />
                <span>Image / QR</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClipboardPaste}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[12px] text-[#8a8f98] hover:text-[#d0d6e0] transition-colors cursor-pointer h-8"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[12px] text-[#8a8f98] hover:text-[#d0d6e0] transition-colors cursor-pointer h-8"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan QR</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Link Input */}
            <TabsContent value="url" className="mt-0">
              <div className="relative">
                <Input
                  type="text"
                  id="scan-url-input"
                  placeholder="Paste URL (e.g. https://domain.com/login)..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-11 pl-3.5 pr-14 text-[14px] font-mono rounded-[6px] bg-[#08090a] border-[#23252a] text-[#ffffff] placeholder:text-[#62666d] focus-visible:ring-0 focus-visible:border-[#d0d6e0] transition-colors"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="p-1 text-[#62666d] hover:text-[#d0d6e0]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono text-[#62666d] bg-[#161718] border border-[#23252a] rounded-[4px]">
                    ↵
                  </kbd>
                </div>
              </div>
            </TabsContent>

            {/* Message/Email Input */}
            <TabsContent value="email" className="mt-0">
              <div className="relative">
                <Textarea
                  id="scan-text-input"
                  placeholder="Paste unexpected bank SMS, 2FA alert, OTP notification, email header, or viral forward..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[120px] text-[14px] leading-relaxed rounded-[6px] bg-[#08090a] border-[#23252a] text-[#ffffff] placeholder:text-[#62666d] focus-visible:ring-0 focus-visible:border-[#d0d6e0] transition-colors p-3.5"
                />
                {textInput && (
                  <button
                    type="button"
                    onClick={() => setTextInput('')}
                    className="absolute top-2.5 right-2.5 p-1 text-[#62666d] hover:text-[#d0d6e0]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </TabsContent>

            {/* Image Dropzone */}
            <TabsContent value="image" className="mt-0">
              <ImageDropzone
                onFileSelect={(file) => setSelectedFile(file)}
                selectedFile={selectedFile}
                onClear={() => setSelectedFile(null)}
              />
            </TabsContent>

            {/* Bottom Actions & Curated Test Scenarios */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#23252a]">
              {/* Test scenarios */}
              <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
                <span className="text-[#62666d] font-normal mr-1">Quick test:</span>

                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'Chase Fraud Alert: We declined an unverified purchase of $184.20 at BESTBUY.COM on card ending in 4920. Did you attempt this charge? Reply YES or NO. (Do NOT share your card PIN with anyone).'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[#d0d6e0] transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27a644]" />
                  <span>Chase 2FA (Safe)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'url',
                      'http://раураl.com-verify.account-security.xyz/login?session=928a'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[#d0d6e0] transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eb5757]" />
                  <span>PayPal Cyrillic (Phish)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'FEDEX: Package #US-8812 is on hold due to $1.85 unpaid fee. Pay within 12h: http://fedx-pkg-status.link'
                    )
                  }
                  className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#161718] hover:bg-[#23252a] border border-[#23252a] text-[#d0d6e0] transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eb5757]" />
                  <span>FedEx Smishing</span>
                </button>
              </div>

              {/* Primary Action Button (The single Acid Lime chromatic button) */}
              <button
                type="submit"
                disabled={isScanning}
                className="w-full sm:w-auto h-[38px] px-4 rounded-[6px] font-[510] text-[14px] tracking-[-0.011em] bg-[#e4f222] hover:bg-[#d5e21d] text-[#08090a] transition-all cursor-pointer shadow-[0px_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
              >
                <span>{isScanning ? 'Inspecting…' : 'Inspect Security'}</span>
                {!isScanning && <ArrowRight className="w-3.5 h-3.5 text-[#08090a]" />}
              </button>
            </div>
          </form>
        </Tabs>
      </div>

      <CameraScannerModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onDecoded={handleCameraDecoded}
      />
    </div>
  );
};
