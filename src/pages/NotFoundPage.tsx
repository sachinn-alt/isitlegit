import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/ui/button';
import { ShieldAlert, Home, BookOpen, History } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center space-y-6">
      <SEOHead
        title="Page Not Found (404) — IsItLegit"
        description="The requested destination does not exist or has moved. Return to the IsItLegit scanner to verify links, emails, and alerts."
        canonicalPath="/404"
      />

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-2xl">
        <ShieldAlert className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
          Error 404 — Missing Route
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Destination Page Not Found
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The link or address you navigated to does not exist in the IsItLegit security catalog.
          Use the recovery pathways below to return to safety.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link to="/" className="w-full sm:w-auto">
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Home className="w-4 h-4" />
            <span>Return to Scanner</span>
          </Button>
        </Link>

        <Link to="/tips" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full gap-2 border-slate-700 text-slate-200 hover:text-white rounded-xl">
            <BookOpen className="w-4 h-4" />
            <span>Browse Scam Guide</span>
          </Button>
        </Link>

        <Link to="/history" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full gap-2 border-slate-700 text-slate-200 hover:text-white rounded-xl">
            <History className="w-4 h-4" />
            <span>View Saved Scans</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
