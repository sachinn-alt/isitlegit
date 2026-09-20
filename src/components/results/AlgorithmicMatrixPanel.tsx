import { AlgorithmicTelemetry } from '@/types';
import {
  Cpu,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  Binary,
  Compass,
  Network,
  Code2,
} from 'lucide-react';

interface AlgorithmicMatrixPanelProps {
  telemetry?: AlgorithmicTelemetry;
}

export const AlgorithmicMatrixPanel = ({ telemetry }: AlgorithmicMatrixPanelProps) => {
  if (!telemetry || !telemetry.algorithms || telemetry.algorithms.length === 0) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FFF9C4] text-[#121212] border border-[#121212]">
            <CheckCircle2 className="w-3 h-3 text-[#1040C0]" strokeWidth={2.5} />
            <span>VERIFIED BASELINE</span>
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#D02020] text-white border border-[#121212] animate-pulse">
            <AlertOctagon className="w-3 h-3" strokeWidth={2.5} />
            <span>ANOMALY TRAPPED</span>
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
            <AlertOctagon className="w-3 h-3" strokeWidth={2.5} />
            <span>ELEVATED SIGNAL</span>
          </span>
        );
      case 'passed':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-white text-[#121212] border border-[#121212]">
            <CheckCircle2 className="w-3 h-3 text-[#40C020]" strokeWidth={2.5} />
            <span>PASSED CLEAN</span>
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network':
        return <Network className="w-4 h-4 text-[#1040C0]" />;
      case 'ml':
        return <Cpu className="w-4 h-4 text-[#D02020]" />;
      case 'cryptographic':
        return <Binary className="w-4 h-4 text-[#F0C020]" />;
      case 'lexical':
        return <Compass className="w-4 h-4 text-[#121212]" />;
      case 'identity':
      default:
        return <ShieldCheck className="w-4 h-4 text-[#40C020]" />;
    }
  };

  return (
    <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D02020] border border-[#121212]" />
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
              ALGORITHMIC VERIFICATION MATRIX
            </h4>
          </div>
          <p className="text-xs font-bold uppercase text-[#62666D] mt-1">
            Mathematical models, protocol evasion traps & machine learning probes evaluated
          </p>
        </div>

        {/* Telemetry Metrics */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-2.5 py-1 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-mono font-bold text-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <span>ALGORITHMS: </span>
            <strong className="text-[#1040C0]">{telemetry.totalAlgorithmsRun} RUN</strong>
          </div>

          <div className={`px-2.5 py-1 border-2 border-[#121212] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#121212] ${
            telemetry.anomaliesTrapped > 0 ? 'bg-[#D02020] text-white' : 'bg-[#FFF9C4] text-[#121212]'
          }`}>
            <span>ANOMALIES: </span>
            <strong>{telemetry.anomaliesTrapped} TRAPPED</strong>
          </div>

          <div className="px-2.5 py-1 bg-[#121212] text-[#F0C020] border-2 border-[#121212] text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#121212]">
            <span>RESISTANCE: </span>
            <strong>{telemetry.loopholeResistanceScore}%</strong>
          </div>
        </div>
      </div>

      {/* Grid of Algorithms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {telemetry.algorithms.map((algo) => (
          <div
            key={algo.id}
            className="flex flex-col justify-between bg-[#F0F0F0] border-2 border-[#121212] p-4 shadow-[3px_3px_0px_0px_#121212] space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white border border-[#121212]">
                    {getCategoryIcon(algo.category)}
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#62666D] tracking-wider">
                    {algo.category.toUpperCase()} ENGINE
                  </span>
                </div>
                {getStatusBadge(algo.status)}
              </div>

              <h5 className="text-sm font-black uppercase tracking-tight text-[#121212]">
                {algo.name}
              </h5>

              <p className="text-xs text-[#383B3F] font-medium leading-relaxed">
                {algo.details}
              </p>
            </div>

            {algo.metric && (
              <div className="pt-2 border-t border-[#121212]/30 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase font-bold text-[#62666D]">Telemetry Output</span>
                <span className="font-black text-[#121212] bg-white px-2 py-0.5 border border-[#121212] text-[11px]">
                  {algo.metric}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
