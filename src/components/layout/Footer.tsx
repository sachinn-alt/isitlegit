import { Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  ExternalLink,
  Globe,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { GithubIcon } from '@/components/common/GithubIcon';
import { LinkedinIcon, InstagramIcon } from '@/components/common/SocialIcons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-4 border-[#121212] bg-[#121212] mt-24 text-[#E0E0E0] text-sm">
      {/* Top Status & Fast Action Bar */}
      <div className="border-b-2 border-[#2A2D32] bg-[#1A1D21] py-3.5 px-4 sm:px-8">
        <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#40C020] border border-[#121212] animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-[#FFFFFF]">
              SYSTEM STATUS: ALL 6 DETECTION ENGINES OPERATIONAL
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
            <a
              href="https://github.com/sachinn-alt/isitlegit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C0C0C0] hover:text-white hover:underline"
            >
              SOURCE CODE
            </a>

            <span className="text-[#62666D]">•</span>

            <a
              href="https://github.com/sachinn-alt/isitlegit/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C0C0C0] hover:text-white hover:underline"
            >
              REPORT THREAT / BUG
            </a>

            <span className="text-[#62666D]">•</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#C0C0C0] hover:text-[#F0C020] cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-16">
        {/* Main 4-Column Bauhaus Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
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

            <p className="text-[#C0C0C0] leading-relaxed text-xs">
              Constructivist cybersecurity engine. Pure client-side intelligence engineered to differentiate authentic transactional alerts from weaponized phishing scams.
            </p>

            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0C020] text-[#121212] border-2 border-[#121212] font-bold text-xs uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>100% On-Device Web Crypto</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#A0A0A0]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#40C020]" />
                <span>Zero Server Logging Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#F0C020] tracking-widest border-b border-[#2A2D32] pb-1.5">
              PLATFORM NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/" className="text-white hover:text-[#F0C020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Scanner Console</span>
                </Link>
              </li>
              <li>
                <Link to="/gym" className="text-white hover:text-[#F0C020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Scam Gym Simulator</span>
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-white hover:text-[#D02020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Bank Fraud Hotlines</span>
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-white hover:text-[#F0C020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Scam Defense Guide</span>
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-white hover:text-[#F0C020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Encrypted Scan Log</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-white hover:text-[#F0C020] transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>Platform Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer & Social Profiles (WORKABLE LINKS) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#1040C0] tracking-widest border-b border-[#2A2D32] pb-1.5 flex items-center justify-between">
              <span className="text-[#64B5F6]">DEVELOPER PROFILE</span>
              <span className="px-1.5 py-0.5 bg-[#1040C0] text-white text-[9px] font-mono">AUTHOR</span>
            </h4>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-white block">
                Sachin Kumar Singh
              </span>
              <span className="text-[11px] font-mono text-[#F0C020] block">
                @sachinn-alt
              </span>
            </div>

            <ul className="space-y-2 pt-1 text-xs font-medium">
              {/* GitHub Profile */}
              <li>
                <a
                  href="https://github.com/sachinn-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E0E0E0] hover:text-[#F0C020] transition-colors group"
                >
                  <div className="p-1 bg-[#2A2D32] group-hover:bg-[#F0C020] group-hover:text-[#121212] transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>GitHub: sachinn-alt</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>

              {/* LinkedIn Profile */}
              <li>
                <a
                  href="https://www.linkedin.com/in/heyitsachin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E0E0E0] hover:text-[#64B5F6] transition-colors group"
                >
                  <div className="p-1 bg-[#2A2D32] group-hover:bg-[#1040C0] group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>LinkedIn: in/heyitsachin</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href="https://www.instagram.com/sac._.hinn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E0E0E0] hover:text-[#E1306C] transition-colors group"
                >
                  <div className="p-1 bg-[#2A2D32] group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>Instagram: @sac._.hinn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>

              {/* Email Contact */}
              <li>
                <a
                  href="mailto:sachinsingh13112004@gmail.com"
                  className="inline-flex items-center gap-2 text-[#E0E0E0] hover:text-[#D02020] transition-colors group"
                >
                  <div className="p-1 bg-[#2A2D32] group-hover:bg-[#D02020] group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>sachinsingh13112004@gmail.com</span>
                </a>
              </li>

              {/* Portfolio / Personal Website */}
              <li>
                <a
                  href="https://sachinn-alt.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E0E0E0] hover:text-[#40C020] transition-colors group"
                >
                  <div className="p-1 bg-[#2A2D32] group-hover:bg-[#40C020] group-hover:text-[#121212] transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span>Developer Portfolio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Engine Mechanics & Security Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#D02020] tracking-widest border-b border-[#2A2D32] pb-1.5">
              SECURITY & SPECS
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#C0C0C0]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D02020] shrink-0" />
                <span>Ensemble ML Classifier v4.2</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#F0C020] shrink-0" />
                <span>Shannon Entropy Algorithmic Probe</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#1040C0] shrink-0" />
                <span>Levenshtein Distance Brand Radar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#40C020] shrink-0" />
                <span>Pre-Click Link Guardian Gate</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white shrink-0" />
                <span>Confidential ID Photo Shield</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C0C0C0] shrink-0" />
                <span>Client-Side ICANN RDAP Query</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://github.com/sachinn-alt/isitlegit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#1A1D21] hover:bg-[#2A2D32] text-white font-bold text-xs uppercase tracking-wider border border-[#383B3F] transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>REPOSITORY (MIT)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="border-t-2 border-[#2A2D32] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A0A0A0]">
          <p className="text-center sm:text-left">
            © 2026 IsItLegit • Engineered by{' '}
            <a
              href="https://github.com/sachinn-alt"
              target="_blank"
              rel="noreferrer"
              className="text-[#F0C020] hover:underline font-bold"
            >
              Sachin Kumar Singh (@sachinn-alt)
            </a>{' '}
            • MIT License
          </p>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/sachinn-alt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#383B3F]">•</span>
            <a
              href="https://www.linkedin.com/in/heyitsachin/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#64B5F6] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#383B3F]">•</span>
            <a
              href="https://www.instagram.com/sac._.hinn/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E1306C] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
