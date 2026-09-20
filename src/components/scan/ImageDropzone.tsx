import React, { useRef, useState } from 'react';
import { UploadCloud, X, AlertTriangle, ShieldCheck, Square, Lock, Scissors } from 'lucide-react';
import { checkFileConfidentiality } from '@/utils/confidentiality';
import { ImageRedactorModal } from './ImageRedactorModal';
import { toast } from 'sonner';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const ImageDropzone = ({
  onFileSelect,
  selectedFile,
  onClear,
}: ImageDropzoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRedactorOpen, setIsRedactorOpen] = useState(false);
  const [hasConfirmedSafety, setHasConfirmedSafety] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    // Confidentiality safety check
    const safetyCheck = checkFileConfidentiality(file);
    if (safetyCheck.isBlocked) {
      toast.error(safetyCheck.reason, { duration: 6000 });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setHasConfirmedSafety(false);
    onFileSelect(file);
    toast.info('Image uploaded. Please ensure no confidential details are visible.');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setHasConfirmedSafety(false);
    onClear();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveRedacted = (redactedFile: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const newUrl = URL.createObjectURL(redactedFile);
    setPreviewUrl(newUrl);
    onFileSelect(redactedFile);
    toast.success('Redacted photo saved! Sensitive areas blacked out.');
  };

  return (
    <div className="space-y-4">
      {/* High-Visibility Confidential Photo Warning Banner */}
      <div className="bg-[#D02020] text-white border-2 border-[#121212] p-4 shadow-[3px_3px_0px_0px_#121212] flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />
        <div className="space-y-1 text-xs">
          <span className="font-black uppercase tracking-wider block text-sm">
            STRICT CONFIDENTIALITY MANDATE
          </span>
          <p className="font-medium text-[#FFF9C4] leading-relaxed">
            DO NOT upload photos containing Government IDs (Passports, Aadhaar, Driver's Licenses), Credit Cards with visible CVV/PINs, or Private Personal Photos.
          </p>
          <p className="font-bold text-white uppercase text-[10px]">
            ✓ ALLOWED: Suspicious SMS notifications, phishing email headers, or public QR codes.
          </p>
        </div>
      </div>

      {/* Zero Storage Badge */}
      <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-bold text-[#121212]">
        <span className="w-2 h-2 rounded-full bg-[#40C020] shrink-0" />
        <span className="uppercase font-black text-[#121212]">Zero Data Storage:</span>
        <span className="text-[#44474E] font-medium">Uploaded images are processed 100% in browser memory and vanish completely after check.</span>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-6 border-2 sm:border-4 border-[#121212] transition-all cursor-pointer ${
          isDragOver
            ? 'bg-[#FFF9C4] border-dashed shadow-[4px_4px_0px_0px_#121212]'
            : 'bg-[#F0F0F0] hover:bg-white shadow-[4px_4px_0px_0px_#121212]'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />

        {selectedFile && previewUrl ? (
          <div className="relative w-full max-w-md flex flex-col items-center space-y-4">
            <div className="relative border-2 border-[#121212] bg-white p-2 shadow-[4px_4px_0px_0px_#121212]">
              <img
                src={previewUrl}
                alt={`Uploaded artifact: ${selectedFile.name}`}
                className="max-h-60 object-contain mx-auto"
              />
            </div>

            {/* Quick Redact & Remove Actions */}
            <div className="flex flex-wrap items-center justify-between w-full gap-2 pt-2 border-t-2 border-[#121212]">
              <span className="truncate max-w-[180px] font-mono font-bold text-xs text-[#121212]">
                {selectedFile.name}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRedactorOpen(true);
                  }}
                  className="h-8 px-3 bg-[#1040C0] hover:bg-[#0c3196] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Blackout Sensitive Data</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="h-8 px-3 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-black uppercase tracking-wider inline-flex items-center gap-1 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>

            {/* Mandatory User Safety Checkbox */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setHasConfirmedSafety(!hasConfirmedSafety);
              }}
              className="w-full flex items-start gap-2.5 p-3 bg-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={hasConfirmedSafety}
                onChange={() => {}}
                className="w-4 h-4 mt-0.5 accent-[#D02020] cursor-pointer"
              />
              <span className="text-xs font-bold uppercase text-[#121212] leading-snug">
                I verify that this photo contains NO confidential government IDs, bank credentials, or CVVs.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-3 py-6">
            <div className="flex h-14 w-14 items-center justify-center bg-[#F0C020] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-[#121212]">
              <UploadCloud className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-base font-black uppercase tracking-tight text-[#121212]">
                DRAG & DROP SUSPICIOUS SCREENSHOT OR QR CODE
              </p>
              <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
                Supports PNG, JPG, WEBP • Pure client-side parsing • Zero remote image archiving
              </p>
            </div>
          </div>
        )}
      </div>

      {/* In-Browser Privacy Blackout Modal */}
      <ImageRedactorModal
        isOpen={isRedactorOpen}
        onClose={() => setIsRedactorOpen(false)}
        file={selectedFile}
        onSaveRedacted={handleSaveRedacted}
      />
    </div>
  );
};
