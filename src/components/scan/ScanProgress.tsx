import { motion } from 'motion/react';
import { Progress } from '@/ui/progress';
import { Shield, Radio } from 'lucide-react';

interface ScanProgressProps {
  stage: string;
  percent: number;
}

export const ScanProgress = ({ stage, percent }: ScanProgressProps) => {
  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Multi-Engine Security Probe</h4>
            <p className="text-xs text-slate-400">Inspecting heuristics, certificates & threat feeds</p>
          </div>
        </div>
        <span className="text-sm font-bold font-mono text-blue-400">{percent}%</span>
      </div>

      <Progress value={percent} className="h-2 bg-slate-950" />

      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-mono text-slate-300 text-center flex items-center justify-center gap-1.5"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        <span>{stage || 'Scanning...'}</span>
      </motion.p>
    </div>
  );
};
