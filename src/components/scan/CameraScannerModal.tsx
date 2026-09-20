import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Camera, X, RefreshCw } from 'lucide-react';

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
      <DialogContent className="max-w-md bg-[#F0F0F0] border-2 sm:border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] text-[#121212] rounded-none p-5 sm:p-7 space-y-4 overflow-hidden">
        <DialogHeader className="border-b-2 sm:border-b-4 border-[#121212] pb-3 text-left">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-lg font-black uppercase tracking-tight flex items-center gap-2 text-[#121212]">
              <div className="p-1.5 bg-[#121212] text-[#F0C020] border border-[#121212]">
                <Camera className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span>LIVE QR CAMERA SCANNER</span>
            </DialogTitle>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 mt-1">
            <p className="text-xs font-bold uppercase text-[#62666D]">
              Real-time on-device QR code inspection
            </p>
            <span className="text-[9px] font-mono font-black uppercase text-[#40C020] bg-[#121212] px-2 py-0.5 border border-[#121212]">
              VANISHES AFTER CHECK
            </span>
          </div>
        </DialogHeader>

        {/* Viewfinder Container */}
        <div className="relative border-2 sm:border-4 border-[#121212] bg-[#121212] overflow-hidden aspect-square flex items-center justify-center rounded-none shadow-inner">
          {/* Video Stream Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Hidden Canvas for Frame Processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Bauhaus Constructivist Target Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Viewfinder Target Box */}
            <div className="relative w-56 sm:w-64 h-56 sm:h-64 border-2 border-dashed border-[#F0C020] rounded-none">
              {/* Bauhaus Primary Color Corner brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#D02020] rounded-none" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#1040C0] rounded-none" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#1040C0] rounded-none" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#D02020] rounded-none" />

              {/* Bauhaus Red Laser Scanline */}
              <div className="w-full h-1 bg-[#D02020] shadow-[0_0_8px_#D02020] animate-[bounce_2s_infinite]" />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="absolute inset-0 bg-[#121212]/95 p-6 flex flex-col items-center justify-center text-center space-y-3 z-10">
              <p className="text-xs font-bold text-[#D02020] leading-relaxed uppercase">{errorMsg}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-white text-[#121212] text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                RETRY CAMERA
              </button>
            </div>
          )}

          {/* Top Status Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#121212] border-2 border-white px-3 py-1 rounded-none text-[10px] font-black uppercase text-white font-mono flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#121212] z-10">
            <span className="w-2 h-2 rounded-full bg-[#40C020] animate-pulse" />
            <span>ALIGN QR CODE IN BOX</span>
          </div>
        </div>

        {/* Ephemeral Notice */}
        <p className="text-[10px] font-mono font-bold text-center text-[#62666D] uppercase">
          🔒 Zero-Storage: Camera feed is analyzed locally and vanishes immediately after check
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-[#121212] gap-3">
          <button
            type="button"
            onClick={toggleFacingMode}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-3 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>SWITCH CAMERA</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 h-11 px-5 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <X className="w-4 h-4" />
            <span>CANCEL</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
