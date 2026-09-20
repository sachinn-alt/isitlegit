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
  ArrowRight,
  X,
  Sparkles
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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Bauhaus Constructivist Surface */}
      <div className="relative bg-white border-2 sm:border-4 border-[#121212] p-5 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] rounded-none">
        
        {/* Geometric Corner Accent (Bauhaus Tri-corner mark) */}
        <div className="absolute -top-3.5 right-6 hidden sm:flex items-center gap-1.5 bg-white px-2 py-0.5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D02020]" />
          <div className="w-2.5 h-2.5 bg-[#F0C020]" />
          <div className="w-2.5 h-2.5 bg-[#1040C0] clip-triangle" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#121212]">
            SECURITY MODULE
          </span>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ScanType)}
          className="w-full"
        >
          {/* Bauhaus Mode Switcher & Tools */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto p-1 bg-[#F0F0F0] border-2 border-[#121212] rounded-none h-11">
              <TabsTrigger 
                value="url" 
                className="gap-2 text-xs font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#D02020] data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-[#121212] data-[state=active]:shadow-[2px_2px_0px_0px_#121212] transition-all h-8 px-4"
              >
                <Link2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Link URL</span>
              </TabsTrigger>

              <TabsTrigger 
                value="email" 
                className="gap-2 text-xs font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#1040C0] data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-[#121212] data-[state=active]:shadow-[2px_2px_0px_0px_#121212] transition-all h-8 px-4"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Message</span>
              </TabsTrigger>

              <TabsTrigger 
                value="image" 
                className="gap-2 text-xs font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#F0C020] data-[state=active]:text-[#121212] data-[state=active]:border-2 data-[state=active]:border-[#121212] data-[state=active]:shadow-[2px_2px_0px_0px_#121212] transition-all h-8 px-4"
              >
                <QrCode className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Image/QR</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClipboardPaste}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-none bg-white hover:bg-[#F0C020] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none h-11"
              >
                <ClipboardPaste className="w-4 h-4" strokeWidth={2.5} />
                <span>Paste</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-none bg-white hover:bg-[#1040C0] hover:text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none h-11"
              >
                <Camera className="w-4 h-4" strokeWidth={2.5} />
                <span>Camera QR</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Link Input */}
            <TabsContent value="url" className="mt-0">
              <div className="relative">
                <Input
                  type="text"
                  id="scan-url-input"
                  placeholder="Paste URL (e.g. https://paypal.com or https://verify-bank.com)..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-14 pl-4 pr-14 text-base font-mono rounded-none bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] placeholder:text-[#62666D] focus-visible:ring-0 focus-visible:border-[#D02020] focus-visible:bg-white shadow-inner"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="p-1.5 text-[#121212] hover:bg-[#D02020] hover:text-white border border-[#121212] rounded-none transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-mono font-bold text-[#121212] bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                    ENTER ↵
                  </kbd>
                </div>
              </div>
            </TabsContent>

            {/* Message/Email Input */}
            <TabsContent value="email" className="mt-0">
              <div className="relative">
                <Textarea
                  id="scan-text-input"
                  placeholder="Paste unexpected SMS alerts, bank OTP notifications, phishing emails, or suspicious messages..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[140px] text-base leading-relaxed rounded-none bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] placeholder:text-[#62666D] focus-visible:ring-0 focus-visible:border-[#1040C0] focus-visible:bg-white shadow-inner p-4"
                />
                {textInput && (
                  <button
                    type="button"
                    onClick={() => setTextInput('')}
                    className="absolute top-3 right-3 p-1.5 text-[#121212] hover:bg-[#D02020] hover:text-white border border-[#121212] rounded-none transition-colors"
                  >
                    <X className="w-4 h-4" />
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

            {/* Bottom Actions & Bauhaus Sample Triggers */}
            <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t-2 sm:border-t-4 border-[#121212]">
              {/* Quick test pills (Binary: rounded-full) */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#121212] mr-1">
                  DEMO:
                </span>

                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'Chase Fraud Alert: We declined an unverified purchase of $184.20 at BESTBUY.COM on card ending in 4920. Did you attempt this charge? Reply YES or NO. (Do NOT share your card PIN with anyone).'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF9C4] hover:bg-[#F0C020] border-2 border-[#121212] text-[#121212] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <span className="w-2 h-2 rounded-full bg-[#121212]" />
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F0F0] hover:bg-[#D02020] hover:text-white border-2 border-[#121212] text-[#121212] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D02020]" />
                  <span>PayPal Homoglyph</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    loadDemo(
                      'email',
                      'FEDEX: Package #US-8812 is on hold due to $1.85 unpaid fee. Pay within 12h: http://fedx-pkg-status.link'
                    )
                  }
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F0F0] hover:bg-[#1040C0] hover:text-white border-2 border-[#121212] text-[#121212] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1040C0]" />
                  <span>FedEx Smish</span>
                </button>
              </div>

              {/* Bauhaus Primary Action Button: Red, 4px Black Border, Hard Shadow */}
              <button
                type="submit"
                disabled={isScanning}
                className="h-12 px-6 rounded-none font-black text-sm uppercase tracking-wider bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
              >
                <span>{isScanning ? 'ANALYZING…' : 'INSPECT THREAT'}</span>
                {!isScanning && <ArrowRight className="w-4 h-4 text-white" strokeWidth={3} />}
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
