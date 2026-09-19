import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Camera, X, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { Badge } from '@/ui/badge';

interface CameraScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDecoded: (decodedText: string) => void;
}

export const CameraScannerModal = ({
  isOpen,
  onClose,
  onDecoded,
}: CameraScannerModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    stopCamera();
    setErrorMsg(null);
    setIsScanning(true);

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        requestAnimationFrame(tick);
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setErrorMsg(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in your browser.'
          : 'Unable to access camera device. Please ensure no other app is using it.'
      );
      setIsScanning(false);
    }
  };

  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code && code.data) {
            // QR Code successfully decoded!
            if ('vibrate' in navigator) {
              navigator.vibrate([100, 50, 100]);
            }
            stopCamera();
            onDecoded(code.data);
            onClose();
            return;
          }
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, facingMode]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-slate-950 border-slate-800 text-white rounded-3xl p-6 sm:p-8 overflow-hidden">
        <DialogHeader className="border-b border-slate-800 pb-3">
          <DialogTitle className="text-lg font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-400" />
              <span>Live Camera QR Scanner</span>
            </div>
            <Badge variant="safe" className="text-[10px] uppercase font-mono">
              Computer Vision
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-square flex items-center justify-center mt-2">
          {/* Video Stream Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Hidden Canvas for Frame Processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Cybernetic HUD Overlay with Scanline & Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Viewfinder Target Box */}
            <div className="relative w-64 h-64 border-2 border-blue-500/40 rounded-2xl">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />

              {/* Animated Laser Scanline */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-[bounce_2s_infinite]" />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="absolute inset-0 bg-slate-950/90 p-6 flex flex-col items-center justify-center text-center space-y-3 z-10">
              <p className="text-xs text-rose-300 leading-relaxed">{errorMsg}</p>
              <Button size="sm" variant="outline" onClick={startCamera} className="text-xs">
                Retry Camera
              </Button>
            </div>
          )}

          {/* Top Status Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Align QR code inside box</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFacingMode}
            className="text-xs gap-1.5 border-slate-700 hover:bg-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Camera</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
