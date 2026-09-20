import { useState, useEffect } from 'react';
import { AppSettings } from '@/types';
import { encryptSecret, decryptSecret } from '@/utils/crypto';

const SETTINGS_KEY = 'isitlegit_settings';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  notificationsEnabled: false,
  onboardingCompleted: false,
  useLiveSearchGrounding: true,
  awsRegion: 'us-east-1',
  linkGuardianEnabled: true,
  guardianPermissionGranted: false,
  mlSensitivity: 'standard',
  soundAlertsEnabled: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Load and decrypt settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const decryptedGemini = parsed.geminiApiKeyEnc
            ? await decryptSecret(parsed.geminiApiKeyEnc)
            : '';
          const decryptedVT = parsed.virusTotalApiKeyEnc
            ? await decryptSecret(parsed.virusTotalApiKeyEnc)
            : '';
          const decryptedSB = parsed.safeBrowsingApiKeyEnc
            ? await decryptSecret(parsed.safeBrowsingApiKeyEnc)
            : '';
          const decryptedAwsKey = parsed.awsAccessKeyIdEnc
            ? await decryptSecret(parsed.awsAccessKeyIdEnc)
            : '';
          const decryptedAwsSecret = parsed.awsSecretAccessKeyEnc
            ? await decryptSecret(parsed.awsSecretAccessKeyEnc)
            : '';

          setSettings({
            theme: parsed.theme || 'dark',
            notificationsEnabled: !!parsed.notificationsEnabled,
            onboardingCompleted: !!parsed.onboardingCompleted,
            useLiveSearchGrounding: parsed.useLiveSearchGrounding ?? true,
            linkGuardianEnabled: parsed.linkGuardianEnabled !== undefined ? !!parsed.linkGuardianEnabled : true,
            guardianPermissionGranted: !!parsed.guardianPermissionGranted,
            mlSensitivity: parsed.mlSensitivity || 'standard',
            soundAlertsEnabled: parsed.soundAlertsEnabled !== undefined ? !!parsed.soundAlertsEnabled : true,
            geminiApiKey: decryptedGemini,
            virusTotalApiKey: decryptedVT,
            safeBrowsingApiKey: decryptedSB,
            awsAccessKeyId: decryptedAwsKey,
            awsSecretAccessKey: decryptedAwsSecret,
            awsRegion: parsed.awsRegion || 'us-east-1',
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Update and encrypt settings
  const updateSettings = async (partial: Partial<AppSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);

    try {
      const geminiApiKeyEnc = updated.geminiApiKey
        ? await encryptSecret(updated.geminiApiKey)
        : '';
      const virusTotalApiKeyEnc = updated.virusTotalApiKey
        ? await encryptSecret(updated.virusTotalApiKey)
        : '';
      const safeBrowsingApiKeyEnc = updated.safeBrowsingApiKey
        ? await encryptSecret(updated.safeBrowsingApiKey)
        : '';
      const awsAccessKeyIdEnc = updated.awsAccessKeyId
        ? await encryptSecret(updated.awsAccessKeyId)
        : '';
      const awsSecretAccessKeyEnc = updated.awsSecretAccessKey
        ? await encryptSecret(updated.awsSecretAccessKey)
        : '';

      const payload = {
        theme: updated.theme,
        notificationsEnabled: updated.notificationsEnabled,
        onboardingCompleted: updated.onboardingCompleted,
        useLiveSearchGrounding: updated.useLiveSearchGrounding,
        linkGuardianEnabled: updated.linkGuardianEnabled,
        guardianPermissionGranted: updated.guardianPermissionGranted,
        mlSensitivity: updated.mlSensitivity,
        soundAlertsEnabled: updated.soundAlertsEnabled,
        awsRegion: updated.awsRegion || 'us-east-1',
        geminiApiKeyEnc,
        virusTotalApiKeyEnc,
        safeBrowsingApiKeyEnc,
        awsAccessKeyIdEnc,
        awsSecretAccessKeyEnc,
      };

      localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  return {
    settings,
    loading,
    updateSettings,
  };
}
