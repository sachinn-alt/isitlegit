import jsQR from 'jsqr';
import { Finding } from '@/types';
import { checkFileConfidentiality, checkTextConfidentiality } from '@/utils/confidentiality';

export interface ImageAnalysisOutput {
  qrDecodedText?: string;
  findings: Finding[];
  hasQrCode: boolean;
  isConfidentialBlocked?: boolean;
}

export async function analyzeImageFile(file: File): Promise<ImageAnalysisOutput> {
  const findings: Finding[] = [];

  // Guard: Pre-scan filename check
  const fileCheck = checkFileConfidentiality(file);
  if (fileCheck.isBlocked) {
    findings.push({
      id: 'confidential-photo-blocked',
      title: 'Confidential Document Upload Prevented',
      description: fileCheck.reason || 'The uploaded file matches keywords associated with personal identification or sensitive financial documents.',
      severity: 'critical',
      category: 'visual',
      whySuspicious: 'Sensitive identification documents should never be submitted to web tools without local redaction.',
    });
    return { findings, hasQrCode: false, isConfidentialBlocked: true };
  }

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
          const textCheck = checkTextConfidentiality(code.data);
          if (textCheck.isBlocked) {
            findings.push({
              id: 'qr-confidential-blocked',
              title: 'Confidential Identification Pattern Detected in QR',
              description: textCheck.reason || 'The decoded QR payload matches a confidential pattern (credit card or national ID).',
              severity: 'critical',
              category: 'visual',
              whySuspicious: 'Sensitive identification documents or raw card numbers should not be encoded into public QR codes.',
            });
          }

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
