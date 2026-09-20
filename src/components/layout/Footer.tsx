import { Link } from 'react-router-dom';
import { Shield, Lock, Star } from 'lucide-react';
import { GithubIcon } from '@/components/common/GithubIcon';

export const Footer = () => {
  return (
    <footer className="border-t-4 border-[#121212] bg-[#121212] mt-24 py-16 text-[#E0E0E0] text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#D02020]" />
                <div className="w-3.5 h-3.5 bg-[#F0C020]" />
                <div className="w-3.5 h-3.5 bg-[#1040C0] clip-triangle" />
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-white">
                IsItLegit
              </span>
            </div>

            <p className="text-[#E0E0E0] leading-relaxed max-w-md text-sm">
              Constructivist cybersecurity engine. Pure client-side intelligence built to distinguish authentic transactional alerts from weaponized phishing attacks.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0C020] text-[#121212] border-2 border-white shadow-[3px_3px_0px_0px_white] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Server Telemetry • 100% On-Device Web Crypto</span>
              </div>
            </div>

            {/* Developer Attribution & Star Repo CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/sachinn-alt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1040C0] hover:bg-[#0c3298] text-white border-2 border-white shadow-[3px_3px_0px_0px_white] text-xs font-black uppercase tracking-wider transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>DEVELOPED BY SACHINN-ALT</span>
              </a>

              <a
                href="https://github.com/sachinn-alt/isitlegit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-white shadow-[3px_3px_0px_0px_white] text-xs font-black uppercase tracking-wider transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <Star className="w-4 h-4 text-[#F0C020] fill-[#F0C020]" />
                <span>STAR REPO</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#F0C020] tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-semibold uppercase tracking-wider">
              <li>
                <Link to="/" className="text-white hover:text-[#F0C020] transition-colors">
                  → Scanner Console
                </Link>
              </li>
              <li>
                <Link to="/gym" className="text-white hover:text-[#F0C020] transition-colors">
                  → Scam Gym Simulator
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-white hover:text-[#D02020] transition-colors">
                  → Bank Fraud Hotlines
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-white hover:text-[#F0C020] transition-colors">
                  → Scam Defense Guide
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-white hover:text-[#F0C020] transition-colors">
                  → Encrypted Archive
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-white hover:text-[#F0C020] transition-colors">
                  → Cryptographic Keys
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#D02020] tracking-widest">
              Engine Mechanics
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#E0E0E0]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#D02020]" />
                <span>PWA Offline Cache</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#F0C020]" />
                <span>Shannon Entropy 4.8</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#1040C0]" />
                <span>Web Crypto AES-256</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white" />
                <span>Client-Side RDAP Query</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-[#383B3F] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E0E0E0]">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© 2026 IsItLegit. MIT License.</span>
            <span className="hidden sm:inline text-[#62666D]">•</span>
            <span>
              Developed by{' '}
              <a
                href="https://github.com/sachinn-alt"
                target="_blank"
                rel="noreferrer"
                className="text-[#F0C020] hover:underline font-bold"
              >
                @sachinn-alt
              </a>
            </span>
          </div>

          <div className="flex items-center gap-5 font-bold uppercase tracking-wider">
            <a
              href="https://github.com/sachinn-alt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#F0C020] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://github.com/sachinn-alt/isitlegit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F0C020] hover:underline"
            >
              <Star className="w-3.5 h-3.5 fill-[#F0C020] text-[#F0C020]" />
              <span>Star Repo</span>
            </a>
            <a
              href="https://sachinn-alt.github.io/isitlegit/"
              target="_blank"
              rel="noreferrer"
              className="text-[#D02020] hover:underline"
            >
              Live Site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
