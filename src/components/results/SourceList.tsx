import { Source } from '@/types';
import { GlareCard } from '@/components/aceternity/glare-card';
import { Badge } from '@/ui/badge';
import { ExternalLink, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface SourceListProps {
  sources: Source[];
}

export const SourceList = ({ sources }: SourceListProps) => {
  if (!sources || sources.length === 0) return null;

  const getStatusBadge = (status: Source['status']) => {
    switch (status) {
      case 'verified_legit':
      case 'clean':
        return (
          <Badge variant="safe" className="gap-1 text-[11px]">
            <CheckCircle2 className="w-3 h-3" />
            <span>Passed Clean</span>
          </Badge>
        );
      case 'suspicious':
        return (
          <Badge variant="suspicious" className="gap-1 text-[11px]">
            <AlertTriangle className="w-3 h-3" />
            <span>Flagged Suspicious</span>
          </Badge>
        );
      case 'malicious':
        return (
          <Badge variant="destructive" className="gap-1 text-[11px]">
            <XCircle className="w-3 h-3" />
            <span>Threat Confirmed</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Checked</span>
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-bold text-white">Verified Intelligence Sources</h4>
        <p className="text-xs text-slate-400">Data repositories and reputation feeds queried during this scan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <GlareCard key={index} className="flex flex-col justify-between h-40">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-sm">{source.name}</span>
                {getStatusBadge(source.status)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {source.details}
              </p>
            </div>

            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors pt-2 border-t border-slate-800"
              >
                <span>View Full Telemetry</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </GlareCard>
        ))}
      </div>
    </div>
  );
};
