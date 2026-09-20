import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, History, Settings as SettingsIcon, Download, KeyRound } from 'lucide-react';
import { GithubIcon } from '@/components/common/GithubIcon';
import { usePWA } from '@/hooks/usePWA';
import { useSettings } from '@/hooks/useSettings';

export const Header = () => {
  const location = useLocation();
  const { isInstallable, installPwa } = usePWA();
  const { settings } = useSettings();

  const navItems = [
    { label: 'SCANNER', path: '/', icon: Shield },
    { label: 'SCAM GYM', path: '/gym', icon: Shield },
    { label: 'EMERGENCY', path: '/emergency', icon: Shield },
    { label: 'GUIDE', path: '/tips', icon: BookOpen },
    { label: 'HISTORY', path: '/history', icon: History },
    { label: 'SETTINGS', path: '/settings', icon: SettingsIcon },
  ];

  const hasCustomApi = !!(settings.geminiApiKey || settings.virusTotalApiKey);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 sm:border-b-4 border-[#121212] bg-[#F0F0F0] pt-safe">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand Logo & Bauhaus Geometric Trio Mark */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-1">
            {/* Bauhaus Circle (Red) */}
            <div className="w-5 h-5 rounded-full bg-[#D02020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] group-hover:-translate-y-0.5 transition-transform" />
            {/* Bauhaus Square (Yellow) */}
            <div className="w-5 h-5 rounded-none bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] group-hover:-translate-y-0.5 transition-transform delay-75" />
            {/* Bauhaus Triangle (Blue) */}
            <div className="w-5 h-5 rounded-none bg-[#1040C0] clip-triangle border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] group-hover:-translate-y-0.5 transition-transform delay-150" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#121212]">
              IsItLegit
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-none border-2 border-[#121212] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#121212] text-white shadow-[3px_3px_0px_0px_#D02020] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white text-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-[11px] font-bold uppercase tracking-wider text-[#121212]">
            <span className="w-2 h-2 rounded-full bg-[#121212]" />
            <span>ZERO-LOGGING</span>
          </div>

          {hasCustomApi && (
            <Link to="/settings" title="Custom AI Key Active">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-[#1040C0] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-[11px] font-bold uppercase tracking-wider">
                <KeyRound className="w-3 h-3" />
                <span>AI KEY</span>
              </span>
            </Link>
          )}

          {isInstallable && (
            <button
              onClick={installPwa}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>INSTALL APP</span>
            </button>
          )}

          {/* GitHub Link */}
          <a
            href="https://github.com/sachinn-alt/isitlegit"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#121212]" />
            <span className="hidden xs:inline">GITHUB</span>
          </a>
        </div>
      </div>
    </header>
  );
};
