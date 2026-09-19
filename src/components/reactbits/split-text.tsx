import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
}

export const SplitText = ({
  text,
  className = '',
  delay = 30,
}: SplitTextProps) => {
  const letters = text.split('');

  return (
    <p className={cn('inline-block overflow-hidden', className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: (index * delay) / 1000,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </p>
  );
};
