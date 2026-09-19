import { ScanRecord } from '@/types';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Bookmark, Trash2, ExternalLink, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { formatDate, getThreatColor } from '@/lib/utils';

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
  const colors = getThreatColor(record.verdict);
  const isLegit = record.result.verdictCategory === 'LEGITIMATE';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition-all hover:border-slate-700 backdrop-blur-md">
      <div
        onClick={() => onSelect(record)}
        className="flex items-start gap-3.5 cursor-pointer flex-1 min-w-0"
      >
        <div
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text} border ${colors.border}`}
        >
          {isLegit ? (
            <ShieldCheck className="w-5 h-5" />
          ) : record.verdict === 'DANGEROUS' || record.verdict === 'HIGH_RISK' ? (
            <ShieldAlert className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`text-[10px] uppercase font-bold py-0.5 px-2 ${colors.badge}`}>
              {record.result.isLegitimateConfirmed ? 'Authentic' : record.verdict}
            </Badge>
            <span className="text-[11px] font-mono text-slate-500 uppercase">
              {record.type}
            </span>
            <span className="text-[11px] text-slate-500">•</span>
            <span className="text-[11px] text-slate-500">
              {formatDate(record.createdAt)}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-slate-200 truncate">
            {record.inputPreview}
          </h4>

          <p className="text-xs text-slate-400 line-clamp-1">
            {record.result.summary}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/80 w-full sm:w-auto justify-end">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onToggleBookmark(record.id)}
          className={`h-8 w-8 p-0 rounded-lg ${
            record.bookmarked ? 'text-amber-400 hover:text-amber-300' : 'text-slate-400 hover:text-white'
          }`}
          title={record.bookmarked ? 'Remove Bookmark' : 'Bookmark Scan'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(record.id)}
          className="h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
          title="Delete Scan Record"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onSelect(record)}
          className="h-8 px-3 text-xs gap-1 rounded-lg border-slate-700 ml-1"
        >
          <span>View</span>
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
