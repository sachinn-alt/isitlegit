import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { ShieldCheck, Undo, Check, X, Square } from 'lucide-react';

interface ImageRedactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
  onSaveRedacted: (redactedFile: File) => void;
}

export const ImageRedactorModal = ({
  isOpen,
  onClose,
  file,
  onSaveRedacted,
}: ImageRedactorModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!file || !isOpen) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      setImageObj(img);
      const canvas = canvasRef.current;
      if (canvas) {
        // Fit within 600px width while preserving aspect ratio
        const maxWidth = Math.min(window.innerWidth - 64, 700);
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
        }
      }
    };
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, isOpen]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !canvasRef.current || history.length === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Restore last saved image state
    ctx.putImageData(history[history.length - 1], 0, 0);

    const currentPos = getCanvasCoords(e);
    const width = currentPos.x - startPos.x;
    const height = currentPos.y - startPos.y;

    // Draw temporary preview rectangle
    ctx.fillStyle = 'rgba(18, 18, 18, 0.85)';
    ctx.fillRect(startPos.x, startPos.y, width, height);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !canvasRef.current || history.length === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.putImageData(history[history.length - 1], 0, 0);

    const currentPos = getCanvasCoords(e);
    const width = currentPos.x - startPos.x;
    const height = currentPos.y - startPos.y;

    // Permanent solid black blackout bar
    ctx.fillStyle = '#121212';
    ctx.fillRect(startPos.x, startPos.y, width, height);

    // Save new state to history for Undo support
    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)]);
    setIsDrawing(false);
    setStartPos(null);
  };

  const handleUndo = () => {
    if (history.length <= 1 || !canvasRef.current) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const redactedFile = new File([blob], `redacted_${file.name}`, { type: 'image/png' });
        onSaveRedacted(redactedFile);
        onClose();
      }
    }, 'image/png');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] text-[#121212] rounded-none p-6">
        <DialogHeader className="border-b-2 sm:border-b-4 border-[#121212] pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Square className="w-5 h-5 text-[#D02020] fill-current" />
              <span>BLACKOUT / PRIVACY REDACTION TOOL</span>
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Drag your mouse or finger across sensitive information (account numbers, names, addresses) to redact them before inspection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase text-[#121212]">
              Drag to draw blackout box
            </span>

            <button
              type="button"
              disabled={history.length <= 1}
              onClick={handleUndo}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] font-bold uppercase text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Undo className="w-3.5 h-3.5" />
              <span>Undo Last Redaction</span>
            </button>
          </div>

          <div className="relative border-2 sm:border-4 border-[#121212] bg-[#F0F0F0] overflow-hidden flex items-center justify-center p-2 select-none shadow-inner max-h-[60vh]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="cursor-crosshair max-w-full max-h-[55vh] object-contain"
            />
          </div>
        </div>

        <div className="pt-2 border-t-2 border-[#121212] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-[#F0F0F0] text-[#121212] border-2 border-[#121212] text-xs font-bold uppercase tracking-wider"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#1040C0] hover:bg-[#0c3196] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
            <span>SAVE REDACTED PHOTO</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
