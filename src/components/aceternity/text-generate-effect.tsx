import { useEffect } from 'react';
import { motion, useAnimate, stagger } from 'motion/react';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.12),
      }
    );
  }, [scope.current, words]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0 inline-block mr-1"
              style={{
                filter: filter ? 'blur(8px)' : 'none',
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-medium leading-relaxed', className)}>
      <div className="mt-2">{renderWords()}</div>
    </div>
  );
};
