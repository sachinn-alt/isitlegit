import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-none border-2 border-[#121212] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_0px_#121212]',
  {
    variants: {
      variant: {
        default:
          'bg-[#D02020] text-white',
        secondary:
          'bg-[#1040C0] text-white',
        destructive:
          'bg-[#D02020] text-white',
        outline: 'bg-white text-[#121212]',
        safe: 'bg-[#FFF9C4] text-[#121212]',
        suspicious: 'bg-[#F0C020] text-[#121212]',
        malicious: 'bg-[#D02020] text-white',
        legitimate: 'bg-[#1040C0] text-white',
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
