import { useScans } from '@/hooks/useScans';
import { HistoryCard } from './HistoryCard';
import { Input } from '@/ui/input';
import { Search, Download, Trash2, Bookmark, ShieldCheck } from 'lucide-react';
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
            className="pl-10 h-12 bg-white border-2 border-[#121212] text-sm text-[#121212] rounded-none shadow-[3px_3px_0px_0px_#121212] focus-visible:ring-0 focus-visible:border-[#D02020]"
          />
          <Search className="w-4 h-4 text-[#121212] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ScanType | 'all')}
            className="h-12 px-3 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] focus:outline-none cursor-pointer rounded-none"
          >
            <option value="all">ALL TYPES</option>
            <option value="url">LINKS</option>
            <option value="email">MESSAGES</option>
            <option value="image">IMAGES / QR</option>
          </select>

          <select
            value={filterVerdict}
            onChange={(e) => setFilterVerdict(e.target.value as ThreatLevel | 'all')}
            className="h-12 px-3 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider text-[#121212] focus:outline-none cursor-pointer rounded-none"
          >
            <option value="all">ALL VERDICTS</option>
            <option value="SAFE">AUTHENTIC</option>
            <option value="SUSPICIOUS">SUSPICIOUS</option>
            <option value="HIGH_RISK">HIGH RISK</option>
            <option value="DANGEROUS">MALICIOUS</option>
          </select>

          <button
            type="button"
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`h-12 px-3 text-xs font-bold uppercase tracking-wider gap-1.5 inline-flex items-center border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none ${
              bookmarkedOnly ? 'bg-[#F0C020] text-[#121212]' : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
            }`}
          >
            <Bookmark className="w-4 h-4" strokeWidth={2.5} />
            <span>BOOKMARKS</span>
          </button>

          {totalCount > 0 && (
            <>
              <button
                type="button"
                onClick={exportScansAsJson}
                className="h-12 px-3 text-xs font-bold uppercase tracking-wider gap-1.5 inline-flex items-center bg-white hover:bg-[#F0F0F0] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-[#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none"
                title="Export scan archive as JSON"
              >
                <Download className="w-4 h-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">EXPORT</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="h-12 px-3 text-xs font-bold uppercase tracking-wider gap-1.5 inline-flex items-center bg-white hover:bg-[#D02020] hover:text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-[#D02020] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none"
                title="Delete all records"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">PURGE</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Scans list */}
      {loading ? (
        <div className="py-12 text-center text-[#121212] font-black uppercase text-sm">
          LOADING ON-DEVICE ARCHIVE...
        </div>
      ) : scans.length === 0 ? (
        <div className="bg-white border-2 sm:border-4 border-[#121212] p-12 text-center space-y-3 shadow-[6px_6px_0px_0px_#121212]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#F0F0F0] border-2 border-[#121212] text-[#121212]">
            <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <h4 className="text-lg font-black uppercase tracking-tight text-[#121212]">
            NO HISTORICAL RECORDS STORED
          </h4>
          <p className="text-xs font-bold uppercase text-[#62666D] max-w-sm mx-auto">
            {totalCount === 0
              ? 'Your completed scans will be preserved in this local client-side sandbox.'
              : 'No scans match your current filter parameters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
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
