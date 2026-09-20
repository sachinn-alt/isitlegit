import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useNotification } from '@/hooks/useNotification';
import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';
import { KeyRound, Shield, ShieldCheck, Bell, Lock, ExternalLink, Cpu, Cloud } from 'lucide-react';
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
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Privacy & Zero-Config Notice Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#FFF9C4] border-2 sm:border-4 border-[#121212] p-5 shadow-[4px_4px_0px_0px_#121212] flex items-start gap-3.5">
          <div className="p-2 bg-[#121212] text-[#F0C020] border border-[#121212] shrink-0">
            <Lock className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-black uppercase text-[#121212] text-sm">
              Hardware Encryption (AES-GCM 256)
            </h4>
            <p className="font-medium text-[#121212] leading-relaxed">
              Keys are encrypted with Web Crypto API PBKDF2 keys in local IndexedDB. Zero remote storage.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 sm:border-4 border-[#121212] p-5 shadow-[4px_4px_0px_0px_#121212] flex items-start gap-3.5">
          <div className="p-2 bg-[#1040C0] text-white border border-[#121212] shrink-0">
            <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-black uppercase text-[#121212] text-sm">
              Offline Engine Active (Free)
            </h4>
            <p className="font-medium text-[#121212] leading-relaxed">
              Homoglyphs, RDAP, and Bank 2FA verifier work 100% free out of the box with zero keys.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys Configuration Form */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
        <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
            <span>OPTIONAL AI & INTELLIGENCE CREDENTIALS</span>
          </h3>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Adding keys below enables multimodal vision and external global threat feeds.
          </p>
        </div>

        <form onSubmit={handleSaveKeys} className="space-y-6">
          {/* AWS Bedrock Section */}
          <div className="bg-[#F0F0F0] border-2 border-[#121212] p-5 space-y-4 shadow-[3px_3px_0px_0px_#121212]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-[#1040C0]" strokeWidth={2.5} />
                <span>Amazon Bedrock (Optional AWS Cloud Engine)</span>
              </label>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
                OPTIONAL
              </span>
            </div>
            <p className="text-xs font-medium text-[#62666D]">
              If you have AWS Bedrock credits/access, enter IAM keys here. Otherwise, leave blank to use the free local engine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#121212]">AWS Access Key ID</span>
                <Input
                  type="password"
                  placeholder="AKIA..."
                  value={awsKey}
                  onChange={(e) => setAwsKey(e.target.value)}
                  className="font-mono text-xs bg-white border-2 border-[#121212] rounded-none h-11"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#121212]">AWS Secret Access Key</span>
                <Input
                  type="password"
                  placeholder="wJalrXUtn..."
                  value={awsSecret}
                  onChange={(e) => setAwsSecret(e.target.value)}
                  className="font-mono text-xs bg-white border-2 border-[#121212] rounded-none h-11"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-[#121212]">AWS Bedrock Region</span>
              <select
                value={awsRegion}
                onChange={(e) => setAwsRegion(e.target.value)}
                className="w-full h-11 px-3 bg-white border-2 border-[#121212] text-xs font-bold text-[#121212] focus:outline-none rounded-none cursor-pointer"
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
              <label className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#D02020]" strokeWidth={2.5} />
                <span>Google Gemini API Key (Multimodal Vision)</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1040C0] hover:underline"
              >
                <span>GET FREE KEY</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="font-mono text-xs bg-white border-2 border-[#121212] rounded-none h-11 shadow-inner"
            />
            <p className="text-xs font-medium text-[#62666D]">
              Powers deep scam deconstruction and screenshot optical recognition.
            </p>
          </div>

          {/* VirusTotal API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#1040C0]" strokeWidth={2.5} />
                <span>VirusTotal API Key (Optional)</span>
              </label>
              <a
                href="https://www.virustotal.com/gui/my-apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1040C0] hover:underline"
              >
                <span>GET KEY</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="VirusTotal v3 API Key"
              value={vtKey}
              onChange={(e) => setVtKey(e.target.value)}
              className="font-mono text-xs bg-white border-2 border-[#121212] rounded-none h-11 shadow-inner"
            />
          </div>

          {/* Google Safe Browsing Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#F0C020]" strokeWidth={2.5} />
                <span>Google Safe Browsing API Key (Optional)</span>
              </label>
              <a
                href="https://console.cloud.google.com/apis/library/safebrowsing.googleapis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1040C0] hover:underline"
              >
                <span>GET KEY</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <Input
              type="password"
              placeholder="Google Safe Browsing v4 Key"
              value={sbKey}
              onChange={(e) => setSbKey(e.target.value)}
              className="font-mono text-xs bg-white border-2 border-[#121212] rounded-none h-11 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full h-12 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {isSaving ? 'ENCRYPTING & PERSISTING...' : 'SAVE & ENCRYPT CREDENTIALS'}
          </button>
        </form>
      </div>

      {/* Notifications & Preferences */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4">
        <h3 className="text-xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2 border-b-2 border-[#121212] pb-3">
          <Bell className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
          <span>SYSTEM NOTIFICATIONS</span>
        </h3>

        <div className="flex items-center justify-between p-4 bg-[#F0F0F0] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
          <div className="space-y-0.5">
            <span className="text-sm font-black uppercase text-[#121212]">
              Browser Scan Completion Alerts
            </span>
            <p className="text-xs font-medium text-[#62666D]">
              Notify when multi-engine background scans finish.
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
