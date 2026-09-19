import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, BookOpen, History, Settings as SettingsIcon, Download, KeyRound } from 'lucide-react';
import { Button } from '@/ui/button';
import { usePWA } from '@/hooks/usePWA';
import { useSettings } from '@/hooks/useSettings';
import { Badge } from '@/ui/badge';

export const Header = () => {
  const location = useLocation();
  const { isInstallable, installPwa } = usePWA();
  const { settings } = useSettings();

  const navItems = [
    { label: 'Scanner', path: '/', icon: ShieldCheck },
    { label: 'Scam Guide & Tips', path: '/tips', icon: BookOpen },
    { label: 'History', path: '/history', icon: History },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const hasCustomApi = !!(settings.geminiApiKey || settings.virusTotalApiKey);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all">
            <ShieldCheck className="h-6 w-6 text-white transition-transform group-hover:scale-105" />
            <div className="absolute -inset-0.5 rounded-xl bg-blue-400/20 blur-sm -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                IsItLegit
              </span>
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-blue-500/40 text-blue-400 font-mono hidden sm:inline-flex">
                v4.0 PROD
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
              Scam, Phishing & Legitimacy Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {hasCustomApi && (
            <Link to="/settings" title="Custom API configured">
              <Badge variant="safe" className="gap-1 hidden sm:inline-flex py-1 px-2.5">
                <KeyRound className="w-3 h-3 text-emerald-400" />
                <span>AI Active</span>
              </Badge>
            </Link>
          )}

          {isInstallable && (
            <Button
              size="sm"
              variant="outline"
              onClick={installPwa}
              className="gap-1.5 text-xs text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install App</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
