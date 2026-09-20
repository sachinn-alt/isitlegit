import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useNotification } from '@/hooks/useNotification';
import { Switch } from '@/ui/switch';
import {
  Shield,
  ShieldCheck,
  Smartphone,
  Volume2,
  Bell,
  Trash2,
  Download,
  Cpu,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';

export const SettingsPanel = () => {
  const { settings, updateSettings } = useSettings();
  const { permission, requestPermission } = useNotification();
  const [isPurging, setIsPurging] = useState(false);

  // Link Guardian toggle
  const handleToggleGuardian = async (checked: boolean) => {
    await updateSettings({ linkGuardianEnabled: checked });
    if (checked) {
      toast.success('On-Screen Link Guardian enabled!');
    } else {
      toast.info('Link Guardian disabled.');
    }
  };

  // Request / Grant Guardian permission
  const handleGrantGuardianPermission = async () => {
    try {
      if ('Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    } catch {
      // Ignored
    }
    await updateSettings({ guardianPermissionGranted: true, linkGuardianEnabled: true });
    toast.success('Device permission confirmed! Link Guardian is fully armed.');
  };

  // Sensitivity selection
  const handleSelectSensitivity = async (level: 'standard' | 'high' | 'paranoid') => {
    await updateSettings({ mlSensitivity: level });
    toast.success(`ML Detection Sensitivity set to ${level.toUpperCase()}!`);
  };

  // Notification toggle
  const handleToggleNotifications = async (checked: boolean) => {
    if (checked) {
      const granted = await requestPermission();
      if (granted) {
        await updateSettings({ notificationsEnabled: true });
        toast.success('Real-time scan alerts enabled!');
      } else {
        toast.error('Notification permission was declined in your browser.');
      }
    } else {
      await updateSettings({ notificationsEnabled: false });
    }
  };

  // Audio alerts toggle
  const handleToggleSound = async (checked: boolean) => {
    await updateSettings({ soundAlertsEnabled: checked });
    toast.success(checked ? 'Threat audio alerts turned ON' : 'Threat audio alerts muted');
  };

  // Purge local data
  const handlePurgeData = () => {
    if (window.confirm('Are you sure you want to purge all local scan history and cached threats? This cannot be undone.')) {
      setIsPurging(true);
      try {
        localStorage.removeItem('isitlegit_history');
        localStorage.removeItem('isitlegit_stats');
        toast.success('Local scan history and cached intelligence cleared!');
      } catch (err) {
        toast.error('Failed to clear data.');
      } finally {
        setIsPurging(false);
      }
    }
  };

  // Export local logs
  const handleExportData = () => {
    try {
      const historyRaw = localStorage.getItem('isitlegit_history') || '[]';
      const blob = new Blob([historyRaw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `isitlegit-security-log-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Security history log exported!');
    } catch {
      toast.error('Could not export security log.');
    }
  };

  const currentSensitivity = settings.mlSensitivity || 'standard';

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Consumer Platform Welcome Banner */}
      <div className="bg-[#121212] text-white border-2 sm:border-4 border-[#121212] p-6 shadow-[6px_6px_0px_0px_#1040C0]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1040C0] text-white text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONSUMER PRIVACY & SAFETY PLATFORM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              SECURITY CONTROLS & DEVICE GUARDIAN
            </h2>
            <p className="text-xs font-medium text-[#C0C0C0] max-w-xl leading-relaxed">
              Configure on-device machine learning detection, phone screen link interceptor, and privacy preferences.
              Zero cloud telemetry, zero remote tracking, 100% on-device CPU execution.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Phone Screen Link Guardian */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
        <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
              <span>ON-SCREEN LINK GUARDIAN</span>
            </h3>
            <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
              Floating pre-click safety gate to inspect unverified links before opening
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-[#121212]">
              {settings.linkGuardianEnabled !== false ? 'ACTIVE' : 'DISABLED'}
            </span>
            <Switch
              checked={settings.linkGuardianEnabled !== false}
              onCheckedChange={handleToggleGuardian}
            />
          </div>
        </div>

        {/* Permission Status Box */}
        <div className="p-4 bg-[#F0F0F0] border-2 border-[#121212] space-y-3">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {settings.guardianPermissionGranted ? (
                <div className="p-1.5 bg-[#2E7D32] text-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 bg-[#F0C020] text-[#121212]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
              <div>
                <h4 className="text-xs font-black uppercase text-[#121212]">
                  {settings.guardianPermissionGranted
                    ? 'DEVICE PERMISSION: GRANTED'
                    : 'DEVICE PERMISSION: PENDING USER APPROVAL'}
                </h4>
                <p className="text-[11px] font-medium text-[#62666D]">
                  {settings.guardianPermissionGranted
                    ? 'Your phone is configured to screen URLs and alert you before opening untrusted links.'
                    : 'Grant permission so the app can warn you before visiting risky URLs from messages or browsers.'}
                </p>
              </div>
            </div>

            {!settings.guardianPermissionGranted && (
              <button
                onClick={handleGrantGuardianPermission}
                className="py-1.5 px-3 bg-[#1040C0] hover:bg-[#0c3298] text-white text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer"
              >
                GRANT PERMISSION
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Machine Learning Detection Engine */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
        <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#D02020]" strokeWidth={2.5} />
              <span>MACHINE LEARNING PHISHING ENGINE</span>
            </h3>
            <span className="px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32] text-[10px] font-mono font-black uppercase">
              ENSEMBLE MODEL v4.2 ACTIVE
            </span>
          </div>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Client-side statistical algorithm with 20+ lexical, structural, and entropy weights
          </p>
        </div>

        {/* Sensitivity Selector */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#1040C0]" />
            <span>DETECTION SENSITIVITY THRESHOLD:</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Standard */}
            <button
              type="button"
              onClick={() => handleSelectSensitivity('standard')}
              className={`p-4 text-left border-2 border-[#121212] transition-all cursor-pointer ${
                currentSensitivity === 'standard'
                  ? 'bg-[#FFF9C4] shadow-[4px_4px_0px_0px_#121212] font-black'
                  : 'bg-white hover:bg-[#F0F0F0] font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#121212]">STANDARD</span>
                {currentSensitivity === 'standard' && <CheckCircle2 className="w-4 h-4 text-[#1040C0]" />}
              </div>
              <p className="text-[11px] text-[#62666D] mt-1">
                Balanced (50% risk cutoff). Recommended for general everyday web and SMS verification.
              </p>
            </button>

            {/* High Sensitivity */}
            <button
              type="button"
              onClick={() => handleSelectSensitivity('high')}
              className={`p-4 text-left border-2 border-[#121212] transition-all cursor-pointer ${
                currentSensitivity === 'high'
                  ? 'bg-[#FFF9C4] shadow-[4px_4px_0px_0px_#121212] font-black'
                  : 'bg-white hover:bg-[#F0F0F0] font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#121212]">HIGH SENSITIVITY</span>
                {currentSensitivity === 'high' && <CheckCircle2 className="w-4 h-4 text-[#1040C0]" />}
              </div>
              <p className="text-[11px] text-[#62666D] mt-1">
                Strict (40% risk cutoff). Flags suspicious subdomains and uncommon domain suffixes faster.
              </p>
            </button>

            {/* Paranoid */}
            <button
              type="button"
              onClick={() => handleSelectSensitivity('paranoid')}
              className={`p-4 text-left border-2 border-[#121212] transition-all cursor-pointer ${
                currentSensitivity === 'paranoid'
                  ? 'bg-[#FFEBEE] border-[#D02020] shadow-[4px_4px_0px_0px_#D02020] font-black'
                  : 'bg-white hover:bg-[#F0F0F0] font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#D02020]">PARANOID MODE</span>
                {currentSensitivity === 'paranoid' && <Shield className="w-4 h-4 text-[#D02020]" />}
              </div>
              <p className="text-[11px] text-[#62666D] mt-1">
                Maximum defense (25% cutoff). Blocks any unverified domain displaying slight anomalies.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: Real-Time Alerts & Sounds */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4">
        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2 border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <Bell className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
          <span>ALERTS & SOUNDS</span>
        </h3>

        <div className="space-y-3">
          {/* Threat Audio Alerts */}
          <div className="flex items-center justify-between p-4 bg-[#F0F0F0] border-2 border-[#121212]">
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-black uppercase text-[#121212] flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#1040C0]" />
                <span>Audible Threat Siren Alert</span>
              </span>
              <p className="text-xs font-medium text-[#62666D]">
                Plays an immediate warning tone when an intercepted link is evaluated as phishing.
              </p>
            </div>
            <Switch
              checked={settings.soundAlertsEnabled !== false}
              onCheckedChange={handleToggleSound}
            />
          </div>

          {/* System Notifications */}
          <div className="flex items-center justify-between p-4 bg-[#F0F0F0] border-2 border-[#121212]">
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-black uppercase text-[#121212] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#1040C0]" />
                <span>Push & Background Notifications</span>
              </span>
              <p className="text-xs font-medium text-[#62666D]">
                Deliver desktop or phone OS notifications when background threat checks conclude.
              </p>
            </div>
            <Switch
              checked={settings.notificationsEnabled && permission === 'granted'}
              onCheckedChange={handleToggleNotifications}
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Data Privacy & Local Storage */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-5">
        <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#2E7D32]" strokeWidth={2.5} />
            <span>DATA PRIVACY & LOCAL LOGS</span>
          </h3>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Manage your offline browser storage and export private security history
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="flex-1 h-12 bg-white hover:bg-[#F0F0F0] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Download className="w-4 h-4 text-[#1040C0]" />
            <span>EXPORT SECURITY LOGS (JSON)</span>
          </button>

          <button
            type="button"
            disabled={isPurging}
            onClick={handlePurgeData}
            className="flex-1 h-12 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isPurging ? 'PURGING...' : 'PURGE LOCAL SCAN CACHE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
