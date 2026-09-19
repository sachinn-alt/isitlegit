import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/ui/button';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, GIF).');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect(file);
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
    onClear();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
        isDragOver
          ? 'border-primary bg-primary/10 scale-[0.99]'
          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/40'
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
        <div className="relative w-full max-w-sm flex flex-col items-center">
          <img
            src={previewUrl}
            alt={`Uploaded screenshot or QR preview for threat analysis: ${selectedFile.name}`}
            className="max-h-56 rounded-xl object-contain border border-slate-700/80 shadow-lg"
          />
          <div className="mt-3 flex items-center justify-between w-full text-xs text-slate-300 px-2">
            <span className="truncate max-w-[200px] font-medium">{selectedFile.name}</span>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleClear}
              className="h-7 px-2.5 text-xs gap-1 rounded-lg"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-blue-400">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">
              Drag and drop an image or screenshot here, or click to browse
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports QR codes, suspicious SMS screenshots, invoice images, or emails (PNG, JPG, WEBP)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
