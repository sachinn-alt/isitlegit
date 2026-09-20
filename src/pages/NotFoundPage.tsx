import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { ShieldAlert, Home, BookOpen, History } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center space-y-6">
      <SEOHead
        title="Page Not Found (404) — IsItLegit"
        description="The requested destination does not exist or has moved. Return to the IsItLegit scanner to verify links, emails, and alerts."
        canonicalPath="/404"
      />

      <div className="mx-auto flex h-20 w-20 items-center justify-center bg-[#D02020] border-2 sm:border-4 border-[#121212] text-white shadow-[6px_6px_0px_0px_#121212]">
        <ShieldAlert className="h-10 w-10" strokeWidth={2.5} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-black text-[#D02020] uppercase tracking-widest bg-white px-2 py-1 border border-[#121212]">
          ERROR 404 — UNKNOWN ROUTE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212]">
          DESTINATION NOT FOUND
        </h1>
        <p className="text-sm font-medium text-[#121212] max-w-md mx-auto leading-relaxed">
          The link or address you entered does not exist in the IsItLegit catalog. Use the recovery paths below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link to="/" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Home className="w-4 h-4" strokeWidth={2.5} />
            <span>RETURN TO CONSOLE</span>
          </button>
        </Link>

        <Link to="/tips" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <BookOpen className="w-4 h-4" strokeWidth={2.5} />
            <span>SCAM GUIDE</span>
          </button>
        </Link>

        <Link to="/history" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-[#1040C0] hover:text-white text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <History className="w-4 h-4" strokeWidth={2.5} />
            <span>SAVED ARCHIVE</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
