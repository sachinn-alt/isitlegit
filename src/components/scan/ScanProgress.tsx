import { motion } from 'motion/react';
import { Radio } from 'lucide-react';

interface ScanProgressProps {
  stage: string;
  percent: number;
}

export const ScanProgress = ({ stage, percent }: ScanProgressProps) => {
  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 bg-white border-2 sm:border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-[#F0C020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-[#121212]">
            <Radio className="w-5 h-5 animate-pulse" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-[#121212]">
              HEURISTIC ENGINE PROBE
            </h4>
            <p className="text-xs font-semibold text-[#62666D] uppercase">
              Certificates, Entropy & Sender Reputation
            </p>
          </div>
        </div>
        <span className="text-lg font-black font-mono text-[#D02020]">{percent}%</span>
      </div>

      {/* Bauhaus Progress Bar */}
      <div className="h-4 w-full bg-[#E0E0E0] border-2 border-[#121212] overflow-hidden p-0.5">
        <div
          className="h-full bg-[#D02020] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-mono font-bold uppercase text-[#121212] text-center flex items-center justify-center gap-2"
      >
        <span className="inline-block w-2 h-2 bg-[#D02020] border border-[#121212]" />
        <span>{stage || 'COMPUTING THREAT VECTOR...'}</span>
      </motion.p>
    </div>
  );
};
