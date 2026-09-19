import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
}

export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-primary/70 font-mono',
  animateOn = 'view',
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    let currentIteration = 0;

    const startScrambling = () => {
      setIsScrambling(true);
      intervalRef.current = setInterval(() => {
        setDisplayText((_) => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (currentIteration >= maxIterations || Math.random() < currentIteration / maxIterations) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        });

        currentIteration++;
        if (currentIteration > maxIterations) {
          clearInterval(intervalRef.current);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    };

    if (animateOn === 'view' || (animateOn === 'hover' && isHovered)) {
      startScrambling();
    }

    return () => clearInterval(intervalRef.current);
  }, [text, isHovered, animateOn]);

  return (
    <span
      className={cn('inline-block whitespace-pre-wrap', parentClassName)}
      onMouseEnter={() => animateOn === 'hover' && setIsHovered(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovered(false)}
    >
      <span className={cn(className, isScrambling && encryptedClassName)}>
        {displayText}
      </span>
    </span>
  );
};
