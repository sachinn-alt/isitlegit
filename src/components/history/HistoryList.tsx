import { useScans } from '@/hooks/useScans';
import { HistoryCard } from './HistoryCard';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Search, Download, Trash2, Filter, Bookmark, ShieldCheck } from 'lucide-react';
import { ScanRecord, ScanType, ThreatLevel } from '@/types';

interface HistoryListProps {
  onSelectScan: (record: ScanRecord) => void;
}

export const HistoryList = ({ onSelectScan }: HistoryListProps) => {
  const {
    scans,
    totalCount,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterVerdict,
    setFilterVerdict,
    bookmarkedOnly,
    setBookmarkedOnly,
    toggleBookmark,
    deleteScan,
    clearAllScans,
    exportScansAsJson,
  } = useScans();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all saved scan records? This cannot be undone.')) {
      clearAllScans();
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls and filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search past scans by domain, URL, or finding summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-slate-900/80 border-slate-800 text-sm rounded-xl"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ScanType | 'all')}
            className="h-11 px-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="url">Web Links</option>
            <option value="email">Emails / Texts</option>
            <option value="image">Screenshots / QR</option>
          </select>

          <select
            value={filterVerdict}
            onChange={(e) => setFilterVerdict(e.target.value as ThreatLevel | 'all')}
            className="h-11 px-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Verdicts</option>
            <option value="SAFE">Safe / Authentic</option>
            <option value="SUSPICIOUS">Suspicious</option>
            <option value="HIGH_RISK">High Risk</option>
            <option value="DANGEROUS">Dangerous</option>
          </select>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`h-11 text-xs gap-1.5 rounded-xl border-slate-800 ${
              bookmarkedOnly ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarks</span>
          </Button>

          {totalCount > 0 && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={exportScansAsJson}
                className="h-11 text-xs gap-1.5 rounded-xl border-slate-800 text-slate-300 hover:text-white"
                title="Export scan archive as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export JSON</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleClearAll}
                className="h-11 text-xs gap-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                title="Delete all records"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Scans list */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          Loading archive...
        </div>
      ) : scans.length === 0 ? (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-200">No Scan Records Found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {totalCount === 0
              ? 'Your completed scans will be automatically preserved here on your device.'
              : 'No scans match your current filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {scans.map((record) => (
            <HistoryCard
              key={record.id}
              record={record}
              onSelect={onSelectScan}
              onToggleBookmark={toggleBookmark}
              onDelete={deleteScan}
            />
          ))}
        </div>
      )}
    </div>
  );
};
