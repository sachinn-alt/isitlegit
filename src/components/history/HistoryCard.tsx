import { ScanRecord } from '@/types';
import { Bookmark, Trash2, ExternalLink, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface HistoryCardProps {
  record: ScanRecord;
  onSelect: (record: ScanRecord) => void;
  onToggleBookmark: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HistoryCard = ({
  record,
  onSelect,
  onToggleBookmark,
  onDelete,
}: HistoryCardProps) => {
  const isLegit = record.result.verdictCategory === 'LEGITIMATE';
  const isMalicious = record.result.verdictCategory === 'MALICIOUS';

  const getCardIconBg = () => {
    if (isLegit) return 'bg-[#1040C0] text-white';
    if (isMalicious) return 'bg-[#D02020] text-white';
    return 'bg-[#F0C020] text-[#121212]';
  };

  const getVerdictBadgeStyle = () => {
    if (isLegit) return 'bg-[#FFF9C4] text-[#121212]';
    if (isMalicious) return 'bg-[#D02020] text-white';
    return 'bg-[#F0C020] text-[#121212]';
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:-translate-y-0.5 transition-transform">
      <div
        onClick={() => onSelect(record)}
        className="flex items-start gap-4 cursor-pointer flex-1 min-w-0"
      >
        <div
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] ${getCardIconBg()}`}
        >
          {isLegit ? (
            <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
          ) : isMalicious ? (
            <ShieldAlert className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
          )}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] uppercase font-black py-0.5 px-2 border border-[#121212] ${getVerdictBadgeStyle()}`}>
              {record.result.isLegitimateConfirmed ? 'AUTHENTIC' : record.verdict}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#62666D] uppercase">
              {record.type}
            </span>
            <span className="text-[11px] text-[#62666D]">•</span>
            <span className="text-[11px] font-mono font-bold text-[#62666D]">
              {formatDate(record.createdAt)}
            </span>
          </div>

          <h4 className="text-sm font-black uppercase text-[#121212] truncate">
            {record.inputPreview}
          </h4>

          <p className="text-xs font-medium text-[#62666D] line-clamp-1">
            {record.result.summary}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#121212] w-full sm:w-auto justify-end">
        <button
          onClick={() => onToggleBookmark(record.id)}
          className={`h-9 w-9 flex items-center justify-center border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
            record.bookmarked ? 'bg-[#F0C020] text-[#121212]' : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
          }`}
          title={record.bookmarked ? 'Remove Bookmark' : 'Bookmark Scan'}
        >
          <Bookmark className="w-4 h-4" strokeWidth={2.5} fill={record.bookmarked ? '#121212' : 'none'} />
        </button>

        <button
          onClick={() => onDelete(record.id)}
          className="h-9 w-9 flex items-center justify-center bg-white hover:bg-[#D02020] hover:text-white text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          title="Delete Scan Record"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <button
          onClick={() => onSelect(record)}
          className="h-9 px-3 bg-white hover:bg-[#1040C0] hover:text-white text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <span>VIEW</span>
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
