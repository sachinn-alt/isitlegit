import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const updateStyles = () => {
    if (refElement.current) {
      const { rotate, glare } = state.current;
      refElement.current.style.setProperty('--r-x', `${rotate.x}deg`);
      refElement.current.style.setProperty('--r-y', `${rotate.y}deg`);
      refElement.current.style.setProperty('--glare-x', `${glare.x}%`);
      refElement.current.style.setProperty('--glare-y', `${glare.y}%`);
    }
  };

  return (
    <div
      style={{
        perspective: '1000px',
      }}
      className="inline-block"
    >
      <div
        ref={refElement}
        onPointerMove={(event) => {
          const rotateFactor = 0.4;
          const rect = event.currentTarget.getBoundingClientRect();
          const position = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          };
          const percentage = {
            x: (100 / rect.width) * position.x,
            y: (100 / rect.height) * position.y,
          };
          const delta = {
            x: percentage.x - 50,
            y: percentage.y - 50,
          };

          const { background, rotate, glare } = state.current;
          background.x = 50 + percentage.x / 4 - 12.5;
          background.y = 50 + percentage.y / 4 - 12.5;
          rotate.x = -(delta.y / 3.5) * rotateFactor;
          rotate.y = (delta.x / 3.5) * rotateFactor;
          glare.x = percentage.x;
          glare.y = percentage.y;

          updateStyles();
        }}
        onPointerEnter={() => {
          isPointerInside.current = true;
          if (refElement.current) {
            setTimeout(() => {
              if (isPointerInside.current) {
                refElement.current?.style.setProperty('--duration', '0s');
              }
            }, 300);
          }
        }}
        onPointerLeave={() => {
          isPointerInside.current = false;
          if (refElement.current) {
            refElement.current.style.removeProperty('--duration');
            refElement.current.style.setProperty('--r-x', '0deg');
            refElement.current.style.setProperty('--r-y', '0deg');
          }
        }}
        className={cn(
          'relative isolate [contain:layout_style] [will-change:transform] [transition:transform_[var(--duration,0.6s)_ease]]',
          '[transform:rotateY(var(--r-y,0deg))_rotateX(var(--r-x,0deg))]',
          'rounded-2xl border border-slate-800 bg-slate-900/80 p-5',
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.12) 0%, transparent 65%)',
          }}
        />
        {children}
      </div>
    </div>
  );
};
