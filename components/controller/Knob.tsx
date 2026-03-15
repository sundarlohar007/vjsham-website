'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { useVisualizerStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface KnobProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  color?: 'primary' | 'secondary';
}

export default function Knob({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 1,
  color = 'primary' 
}: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const handleGesture = useCallback(({ delta: [, dy] }: { delta: [number, number] }) => {
    const range = max - min;
    const sensitivity = 0.005;
    const newValue = Math.max(min, Math.min(max, value - dy * sensitivity * range));
    onChange(newValue);
  }, [value, onChange, min, max]);
  
  useGesture({
    onDrag: handleGesture,
    onDragStart: () => { isDragging.current = true; },
    onDragEnd: () => { isDragging.current = false; },
  }, {
    target: knobRef,
    drag: { from: () => [0, value * 100] },
  });
  
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);
  
  const rotation = (value - min) / (max - min) * 270 - 135;
  
  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div
        ref={knobRef}
        onPointerDown={handlePointerDown}
        className={cn(
          "relative w-12 h-12 md:w-16 md:h-16 rounded-full cursor-grab active:cursor-grabbing",
          "bg-surface border-2 border-surface-elevated",
          "flex items-center justify-center",
          "transition-all duration-150",
          isDragging.current && "scale-110",
          color === 'primary' && "border-accent-primary/30 hover:border-accent-primary",
          color === 'secondary' && "border-accent-secondary/30 hover:border-accent-secondary"
        )}
        style={{ touchAction: 'none' }}
      >
        <div
          className={cn(
            "absolute w-9 h-9 md:w-12 md:h-12 rounded-full",
            "bg-gradient-to-br from-surface to-surface-elevated",
            "flex items-center justify-center"
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div
            className={cn(
              "absolute w-1 h-3 md:w-1.5 md:h-5 rounded-full -top-0.5",
              color === 'primary' && "bg-accent-primary",
              color === 'secondary' && "bg-accent-secondary"
            )}
          />
        </div>
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
      
      <span className="font-mono text-[10px] md:text-xs text-foreground-muted uppercase tracking-wider">
        {label}
      </span>
      <span className="font-mono text-[10px] md:text-xs text-accent-highlight">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}
