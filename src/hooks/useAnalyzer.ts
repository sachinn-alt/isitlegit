import { useState, useCallback } from 'react';
import { ScanResult, ScanType } from '@/types';
import { runThreatAnalysis } from '@/engine/orchestrator';
import { db } from '@/db/database';
import { useSettings } from './useSettings';

export function useAnalyzer() {
  const { settings } = useSettings();
  const [isScanning, setIsScanning] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (input: string, type: ScanType, file?: File) => {
      if (!input && !file) {
        setError('Please provide a URL, message text, or image to scan.');
        return;
      }

      setIsScanning(true);
      setError(null);
      setProgressStage('Initializing multi-engine security probe...');
      setProgressPercent(5);

      try {
        const scanResult = await runThreatAnalysis({
          input,
          type,
          file,
          geminiApiKey: settings.geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY,
          virusTotalApiKey: settings.virusTotalApiKey || import.meta.env.VITE_VT_API_KEY,
          safeBrowsingApiKey: settings.safeBrowsingApiKey || import.meta.env.VITE_SB_API_KEY,
          awsCredentials:
            settings.awsAccessKeyId && settings.awsSecretAccessKey
              ? {
                  accessKeyId: settings.awsAccessKeyId,
                  secretAccessKey: settings.awsSecretAccessKey,
                  region: settings.awsRegion || 'us-east-1',
                }
              : undefined,
          onProgress: (stage, percent) => {
            setProgressStage(stage);
            setProgressPercent(percent);
          },
        });

        setResult(scanResult);

        // Auto-save into Dexie DB
        await db.scans.add({
          id: scanResult.id,
          type: scanResult.type,
          input: scanResult.input,
          inputPreview: scanResult.inputPreview,
          result: scanResult,
          threatScore: scanResult.threatScore,
          verdict: scanResult.verdict,
          bookmarked: false,
          createdAt: new Date(),
        });
      } catch (err: any) {
        console.error('Scan execution error:', err);
        setError(err.message || 'An unexpected error occurred during analysis.');
      } finally {
        setIsScanning(false);
      }
    },
    [settings]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgressPercent(0);
    setProgressStage('');
  }, []);

  return {
    isScanning,
    progressStage,
    progressPercent,
    result,
    error,
    analyze,
    reset,
  };
}
