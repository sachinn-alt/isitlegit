import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay / 1000 },
    },
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -15 : 15,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.p
      className={cn('inline-flex flex-wrap gap-x-1.5', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {elements.map((element, index) => (
        <motion.span key={index} variants={itemVariants} className="inline-block">
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </motion.p>
  );
};
