import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const CardSpotlight = ({
  children,
  radius = 350,
  color = '#262626',
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [, setRerender] = useState({});

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.current = clientX - left;
    mouseY.current = clientY - top;
    setRerender({});
  }

  return (
    <div
      className={cn(
        'group/spotlight p-6 rounded-2xl relative border border-slate-800 bg-slate-900/60 overflow-hidden',
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at ${mouseX.current}px ${mouseY.current}px, ${color}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
