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
} from 'lucide-react';
import { toast } from 'sonner';

interface ScanInputProps {
  onScan: (input: string, type: ScanType, file?: File) => void;
  isScanning: boolean;
}

export const ScanInput = ({ onScan, isScanning }: ScanInputProps) => {
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
        toast.success('Pasted link from clipboard and started inspection!');
      } else {
        setActiveTab('email');
        setTextInput(trimmed);
        onScan(trimmed, 'email');
        toast.success('Pasted message from clipboard and started inspection!');
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
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Messaging App Protection Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl border border-blue-500/20 bg-blue-500/10 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            <strong>Received a link on WhatsApp, Telegram, or SMS?</strong> Paste it without clicking to preview the real destination safely.
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleClipboardPaste}
          className="h-8 gap-1.5 text-xs text-blue-300 border-blue-500/30 hover:bg-blue-500/20 shrink-0"
        >
          <ClipboardPaste className="w-3.5 h-3.5" />
          <span>Paste from Clipboard</span>
        </Button>
      </div>

      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 via-slate-800/50 to-slate-900/80 shadow-2xl backdrop-blur-xl">
        <div className="rounded-[22px] bg-slate-950/90 p-6 sm:p-8 border border-slate-800">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as ScanType)}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="url" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  <span>Link / URL</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email / SMS</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="gap-2">
                  <QrCode className="w-4 h-4" />
                  <span>Upload / QR</span>
                </TabsTrigger>
              </TabsList>

              {/* Live Camera Button */}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setIsCameraOpen(true)}
                className="gap-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-cyan-300 text-xs rounded-xl self-start sm:self-auto"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Live Camera QR Scan</span>
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="url" className="space-y-4 mt-0">
                <div className="relative">
                  <Input
                    type="text"
                    id="scan-url-input"
                    placeholder="Paste suspicious link (from WhatsApp, Telegram, email, or SMS)..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="h-14 pl-4 pr-12 text-base rounded-2xl bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Link2 className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-0">
                <Textarea
                  id="scan-text-input"
                  placeholder="Paste email headers & body, suspicious SMS text message, OTP notification, or viral WhatsApp forward..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[140px] text-base rounded-2xl bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50"
                />
              </TabsContent>

              <TabsContent value="image" className="space-y-4 mt-0">
                <ImageDropzone
                  onFileSelect={(file) => setSelectedFile(file)}
                  selectedFile={selectedFile}
                  onClear={() => setSelectedFile(null)}
                />
              </TabsContent>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Quick Test:</span>
                  <button
                    type="button"
                    onClick={() =>
                      loadDemo(
                        'email',
                        'Chase Fraud Alert: We declined an unverified purchase of $184.20 at BESTBUY.COM on card ending in 4920. Did you attempt this charge? Reply YES or NO. (Do NOT share your card PIN with anyone).'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Real Chase SMS (Legit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      loadDemo(
                        'url',
                        'http://chase-security-verify-online.com.xyz/login/auth.php'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>Bank Phishing Link (Fake)</span>
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isScanning}
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  <Search className="w-4 h-4 mr-2" />
                  <span>{isScanning ? 'Inspecting...' : 'Analyze Threat & Legitimacy'}</span>
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
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
