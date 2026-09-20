import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
  {
    variants: {
      variant: {
        default:
          'bg-[#D02020] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#b01818]',
        secondary:
          'bg-[#1040C0] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#0c3196]',
        yellow:
          'bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#d6a917]',
        outline:
          'bg-white text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0F0F0]',
        ghost: 'border-none text-[#121212] hover:bg-[#E0E0E0] shadow-none active:translate-none',
        destructive:
          'bg-[#D02020] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#b01818]',
        safe:
          'bg-[#FFF9C4] text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020]',
        pill:
          'rounded-full bg-[#D02020] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#b01818]',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-13 px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
