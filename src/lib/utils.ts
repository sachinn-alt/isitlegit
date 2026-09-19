import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function getThreatColor(verdict: string): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
} {
  switch (verdict) {
    case 'SAFE':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        glow: 'rgba(16, 185, 129, 0.25)',
      };
    case 'LOW_RISK':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        glow: 'rgba(59, 130, 246, 0.25)',
      };
    case 'SUSPICIOUS':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        glow: 'rgba(245, 158, 11, 0.25)',
      };
    case 'HIGH_RISK':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        glow: 'rgba(249, 115, 22, 0.25)',
      };
    case 'DANGEROUS':
    default:
      return {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        glow: 'rgba(244, 63, 94, 0.25)',
      };
  }
}
