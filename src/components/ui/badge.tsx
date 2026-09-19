import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/20 text-primary-foreground border-primary/30',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-rose-500/20 text-rose-300 border-rose-500/40',
        outline: 'text-slate-300 border-slate-700',
        safe: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
        suspicious: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
        malicious: 'border-rose-500/40 bg-rose-500/15 text-rose-300',
        legitimate: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
