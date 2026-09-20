import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, History, Settings as SettingsIcon, Download, KeyRound } from 'lucide-react';
import { Button } from '@/ui/button';
import { usePWA } from '@/hooks/usePWA';
import { useSettings } from '@/hooks/useSettings';

export const Header = () => {
  const location = useLocation();
  const { isInstallable, installPwa } = usePWA();
  const { settings } = useSettings();

  const navItems = [
    { label: 'Scanner', path: '/', icon: Shield },
    { label: 'Scam Guide', path: '/tips', icon: BookOpen },
    { label: 'History', path: '/history', icon: History },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const hasCustomApi = !!(settings.geminiApiKey || settings.virusTotalApiKey);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#23252a] bg-[#08090a]/95 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0f1011] border border-[#23252a] text-white">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-[510] tracking-[-0.015em] text-[#ffffff]">
              IsItLegit
            </span>
            <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-[4px] bg-[#161718] border border-[#23252a] text-[11px] font-mono text-[#8a8f98]">
              v4.2
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-[6px] text-[13px] font-normal transition-colors ${
                  isActive
                    ? 'bg-[#0f1011] text-[#ffffff] border border-[#23252a]'
                    : 'text-[#8a8f98] hover:text-[#d0d6e0] hover:bg-[#0f1011]/50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[4px] bg-[#0f1011] border border-[#23252a] text-[11px] text-[#8a8f98]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27a644]" />
            <span className="font-mono">Client-First</span>
          </div>

          {hasCustomApi && (
            <Link to="/settings" title="Custom AI Key Active">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#161718] border border-[#23252a] text-[11px] text-[#02b8cc]">
                <KeyRound className="w-3 h-3" />
                <span className="font-mono">AI Active</span>
              </span>
            </Link>
          )}

          {isInstallable && (
            <button
              onClick={installPwa}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-[#23252a] text-[12px] text-[#d0d6e0] transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Install PWA</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
