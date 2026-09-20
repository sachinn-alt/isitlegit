import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-[#23252a] bg-[#08090a] mt-20 py-12 text-[#8a8f98] text-[13px]">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#0f1011] border border-[#23252a]">
                <Shield className="h-3 w-3 text-[#ffffff]" />
              </div>
              <span className="text-[14px] font-[510] text-[#ffffff] tracking-[-0.012em]">
                IsItLegit
              </span>
            </div>
            <p className="text-[#8a8f98] leading-relaxed max-w-sm text-[13px]">
              Privacy-first cybersecurity scanner and authenticity verification engine. Distinguishing deceptive phishing from authentic banking alerts.
            </p>
            <div className="flex items-center gap-1.5 text-[#27a644] text-[12px] pt-1">
              <Lock className="w-3 h-3" />
              <span>Zero server logging. 100% on-device local execution.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-[12px] font-mono uppercase text-[#62666d] tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <Link to="/" className="text-[#8a8f98] hover:text-[#ffffff] transition-colors">
                  Scanner
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-[#8a8f98] hover:text-[#ffffff] transition-colors">
                  Scam Guide
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-[#8a8f98] hover:text-[#ffffff] transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-[#8a8f98] hover:text-[#ffffff] transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="space-y-2">
            <h4 className="text-[12px] font-mono uppercase text-[#62666d] tracking-wider">Architecture</h4>
            <ul className="space-y-1.5 text-[13px] text-[#8a8f98] font-mono">
              <li>PWA Offline Cache</li>
              <li>Shannon Entropy 4.8</li>
              <li>Web Crypto AES-GCM</li>
              <li>RDAP Day-Zero Query</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#23252a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#62666d]">
          <span>© 2026 IsItLegit. Built for Bharat Builds Tour. MIT License.</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sachinn-alt/isitlegit" target="_blank" rel="noreferrer" className="hover:text-[#d0d6e0] transition-colors">
              GitHub
            </a>
            <a href="https://sachinn-alt.github.io/isitlegit/" target="_blank" rel="noreferrer" className="hover:text-[#d0d6e0] transition-colors">
              Live Mirror
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
