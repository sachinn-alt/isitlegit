import React from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
}: ShinyTextProps) => {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-white to-slate-400 font-semibold',
        !disabled && 'animate-shine',
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(110deg, #94a3b8 25%, #ffffff 50%, #94a3b8 75%)',
        backgroundSize: '200% 100%',
        animationDuration: `${speed}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      }}
    >
      {text}
    </span>
  );
};
