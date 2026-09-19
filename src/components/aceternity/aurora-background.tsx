import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 transition-bg',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,rgba(15,23,42,0.8)_0%,rgba(15,23,42,0.8)_7%,transparent_10%,transparent_12%,rgba(15,23,42,0.8)_16%)]
            [--aurora:repeating-linear-gradient(100deg,rgba(59,130,246,0.15)_10%,rgba(99,102,241,0.15)_15%,rgba(56,189,248,0.15)_20%,rgba(168,85,247,0.15)_25%,rgba(59,130,246,0.15)_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[20px] invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-40 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};
