import { Source } from '@/types';
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
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FFF9C4] text-[#121212] border border-[#121212]">
            <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
            <span>PASSED CLEAN</span>
          </span>
        );
      case 'suspicious':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
            <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
            <span>SUSPICIOUS</span>
          </span>
        );
      case 'malicious':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#D02020] text-white border border-[#121212]">
            <XCircle className="w-3 h-3" strokeWidth={2.5} />
            <span>MALICIOUS</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#F0F0F0] text-[#121212] border border-[#121212]">
            <Clock className="w-3 h-3" strokeWidth={2.5} />
            <span>CHECKED</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
          VERIFIED INTELLIGENCE REPOSITORIES
        </h4>
        <p className="text-xs font-bold uppercase text-[#62666D]">
          Data sources and security feeds interrogated during this diagnostic cycle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-between h-44 bg-white border-2 sm:border-4 border-[#121212] p-5 shadow-[4px_4px_0px_0px_#121212] hover:-translate-y-1 transition-transform"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-black text-sm uppercase text-[#121212] truncate">
                  {source.name}
                </span>
                {getStatusBadge(source.status)}
              </div>
              <p className="text-xs font-medium text-[#62666D] leading-relaxed line-clamp-3">
                {source.details}
              </p>
            </div>

            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1040C0] hover:text-[#D02020] pt-2 border-t-2 border-[#121212] transition-colors"
              >
                <span>VIEW TELEMETRY</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
