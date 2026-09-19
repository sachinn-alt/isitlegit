import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useNotification } from '@/hooks/useNotification';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Switch } from '@/ui/switch';
import { KeyRound, Shield, ShieldCheck, Bell, Lock, ExternalLink, Cpu, Cloud } from 'lucide-react';
import { Badge } from '@/ui/badge';
import { toast } from 'sonner';

export const SettingsPanel = () => {
  const { settings, updateSettings } = useSettings();
  const { permission, requestPermission } = useNotification();

  const [geminiKey, setGeminiKey] = useState(settings.geminiApiKey || '');
  const [vtKey, setVtKey] = useState(settings.virusTotalApiKey || '');
  const [sbKey, setSbKey] = useState(settings.safeBrowsingApiKey || '');
  const [awsKey, setAwsKey] = useState(settings.awsAccessKeyId || '');
  const [awsSecret, setAwsSecret] = useState(settings.awsSecretAccessKey || '');
  const [awsRegion, setAwsRegion] = useState(settings.awsRegion || 'us-east-1');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      geminiApiKey: geminiKey.trim(),
      virusTotalApiKey: vtKey.trim(),
      safeBrowsingApiKey: sbKey.trim(),
      awsAccessKeyId: awsKey.trim(),
      awsSecretAccessKey: awsSecret.trim(),
      awsRegion: awsRegion.trim(),
    });
    setIsSaving(false);
    toast.success('Credentials encrypted with AES-GCM and saved locally!');
  };

  const handleToggleNotifications = async (checked: boolean) => {
    if (checked) {
      const granted = await requestPermission();
      if (granted) {
        await updateSettings({ notificationsEnabled: true });
        toast.success('Scan notifications enabled!');
      } else {
        toast.error('Notification permission was declined by your browser.');
      }
    } else {
      await updateSettings({ notificationsEnabled: false });
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Privacy & Zero-Config Notice Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-emerald-300 text-sm">
              Hardware Encryption (AES-GCM 256)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Keys are encrypted with Web Crypto API PBKDF2 keys in local IndexedDB. Zero telemetry or server storage.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-blue-300 text-sm">
              Zero-Config Offline Engine Active
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Homoglyphs, RDAP, brand impersonation, and Bank 2FA verifier work 100% free out of the box with no API keys.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys Configuration Form */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-400" />
            <span>Optional AI & Threat Intelligence Credentials</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            The app works completely free offline. Adding keys below enables deep multimodal vision and global threat feeds.
          </p>
        </div>

        <form onSubmit={handleSaveKeys} className="space-y-5">
          {/* AWS Bedrock Section */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-amber-400" />
                <span>Amazon Bedrock (Optional AWS Cloud Engine)</span>
              </label>
              <Badge variant="outline" className="text-[10px] text-amber-300 border-amber-500/30 font-mono">
                Optional
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              If you or hackathon judges have AWS Bedrock credits/access, enter IAM keys here. Otherwise, leave blank to use the free local engine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">AWS Access Key ID</span>
                <Input
                  type="password"
                  placeholder="AKIA..."
                  value={awsKey}
                  onChange={(e) => setAwsKey(e.target.value)}
                  className="font-mono text-xs bg-slate-950/70"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">AWS Secret Access Key</span>
                <Input
                  type="password"
                  placeholder="wJalrXUtn..."
                  value={awsSecret}
                  onChange={(e) => setAwsSecret(e.target.value)}
                  className="font-mono text-xs bg-slate-950/70"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">AWS Bedrock Region</span>
              <select
                value={awsRegion}
                onChange={(e) => setAwsRegion(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="us-east-1">US East (N. Virginia) - us-east-1</option>
                <option value="us-west-2">US West (Oregon) - us-west-2</option>
                <option value="ap-south-1">Asia Pacific (Mumbai) - ap-south-1</option>
                <option value="eu-central-1">Europe (Frankfurt) - eu-central-1</option>
              </select>
            </div>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Gemini API Key (Multimodal Vision & Fallback)</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="font-mono text-xs bg-slate-950/70"
            />
            <p className="text-[11px] text-slate-500">
              Powers deep scam deconstruction and screenshot optical recognition.
            </p>
          </div>

          {/* VirusTotal API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>VirusTotal API Key (Optional)</span>
              </label>
              <a
                href="https://www.virustotal.com/gui/my-apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
              >
                <span>Get Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="VirusTotal v3 API Key"
              value={vtKey}
              onChange={(e) => setVtKey(e.target.value)}
              className="font-mono text-xs bg-slate-950/70"
            />
          </div>

          {/* Google Safe Browsing Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Safe Browsing API Key (Optional)</span>
              </label>
              <a
                href="https://console.cloud.google.com/apis/library/safebrowsing.googleapis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
              >
                <span>Get Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="Google Safe Browsing v4 Key"
              value={sbKey}
              onChange={(e) => setSbKey(e.target.value)}
              className="font-mono text-xs bg-slate-950/70"
            />
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 text-xs font-semibold cursor-pointer"
          >
            {isSaving ? 'Encrypting & Saving...' : 'Save & Encrypt Credentials'}
          </Button>
        </form>
      </div>

      {/* Notifications & Preferences */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <span>Alerts & Notifications</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-800/80 bg-slate-950/40">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-slate-200">
              Browser Scan Completion Alerts
            </span>
            <p className="text-xs text-slate-400">
              Notify when intensive multi-engine background scans finish.
            </p>
          </div>
          <Switch
            checked={settings.notificationsEnabled && permission === 'granted'}
            onCheckedChange={handleToggleNotifications}
          />
        </div>
      </div>
    </div>
  );
};
