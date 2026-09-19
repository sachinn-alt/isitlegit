import jsQR from 'jsqr';
import { Finding } from '@/types';

export interface ImageAnalysisOutput {
  qrDecodedText?: string;
  findings: Finding[];
  hasQrCode: boolean;
}

export async function analyzeImageFile(file: File): Promise<ImageAnalysisOutput> {
  const findings: Finding[] = [];

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ findings, hasQrCode: false });
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          findings.push({
            id: 'qr-code-extracted',
            title: 'Embedded QR Code Decoded Successfully',
            description: `The image contains an encoded QR destination: "${code.data}".`,
            severity: 'info',
            category: 'visual',
            evidence: code.data,
            whySuspicious: 'Quishing (QR code phishing) is widely used to evade email text scanners and force targets to open malicious sites on mobile phones.',
          });

          resolve({
            qrDecodedText: code.data,
            findings,
            hasQrCode: true,
          });
        } else {
          findings.push({
            id: 'visual-screenshot',
            title: 'Screenshot / Visual Image Ingested',
            description: `Visual artifact (${img.width}×${img.height}px) processed for optical character recognition and multimodal inspection.`,
            severity: 'info',
            category: 'visual',
          });

          resolve({
            findings,
            hasQrCode: false,
          });
        }
      };

      img.onerror = () => {
        findings.push({
          id: 'image-decode-error',
          title: 'Unable to Render Image Asset',
          description: 'The uploaded file could not be parsed as a standard bitmap or vector image.',
          severity: 'low',
          category: 'visual',
        });
        resolve({ findings, hasQrCode: false });
      };

      img.src = reader.result as string;
    };

    reader.onerror = () => {
      resolve({ findings, hasQrCode: false });
    };

    reader.readAsDataURL(file);
  });
}
