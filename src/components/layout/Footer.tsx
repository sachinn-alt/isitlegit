import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Cpu, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 mt-16 py-12 text-slate-400 text-xs">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <span className="text-base font-bold text-white tracking-wide">
                IsItLegit
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              The privacy-first cybersecurity scanner and authenticity verification platform.
              Distinguishing dangerous phishing attacks, smishing scams, and fake websites from
              authentic corporate notifications and genuine security alerts.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero server logging. All scan data stored locally on your device.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-sm mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Threat & Legitimacy Scanner
                </Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-white transition-colors">
                  Scam Prevention & Emergency Guide
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  Saved Scans & History Archive
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-white transition-colors">
                  API Keys & Encryption Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Engine Credits */}
          <div>
            <h4 className="font-semibold text-slate-200 text-sm mb-3">Threat Engines</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Gemini 2.0 Flash</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>VirusTotal Global Intelligence</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Safe Browsing v4</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>ICANN RDAP Protocol</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} IsItLegit. All rights reserved. Free & open educational security tool.</p>
          <div className="flex items-center gap-4">
            <Link to="/tips" className="hover:text-slate-400">Scam Checklist</Link>
            <Link to="/settings" className="hover:text-slate-400">Privacy & Keys</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
