'use client';

import { useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { useVisualizerStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface FaderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Fader({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 1 
}: FaderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const handleGesture = useCallback(({ delta: [, dy], first, last }: { delta: [number, number], first: boolean, last: boolean }) => {
    const range = max - min;
    const sensitivity = 0.008;
    const newValue = Math.max(min, Math.min(max, value - dy * sensitivity * range));
    onChange(newValue);
  }, [value, onChange, min, max]);
  
  useGesture({
    onDrag: handleGesture,
    onDragStart: () => { isDragging.current = true; },
    onDragEnd: () => { isDragging.current = false; },
  }, {
    target: trackRef,
    drag: { from: () => [0, value * 100] },
  });
  
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);
  
  const fillHeight = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <span className="font-mono text-[10px] md:text-xs text-accent-highlight">
        {Math.round(value * 100)}%
      </span>
      
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="relative w-6 md:w-8 h-20 md:h-28 rounded-full bg-surface border-2 border-surface-elevated overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent-primary/80 to-accent-primary/40 transition-all duration-75"
          style={{ height: `${fillHeight}%` }}
        />
        
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-4 md:w-6 h-2 md:h-3 rounded-sm",
            "bg-gradient-to-b from-foreground to-foreground-muted",
            "transition-transform duration-75",
            isDragging.current && "scale-110 bg-accent-highlight"
          )}
          style={{ 
            bottom: `calc(${fillHeight}% - 4px)`,
            transform: `translateX(-50%) ${isDragging.current ? 'scale(1.1)' : 'scale(1)'}`
          }}
        >
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 md:w-2 h-0.5 rounded-full bg-surface" />
        </div>
        
        <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 md:h-2 rounded-full bg-foreground-muted/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 md:h-2 rounded-full bg-foreground-muted/30" />
        <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 md:h-2 rounded-full bg-foreground-muted/30" />
      </div>
      
      <span className="font-mono text-[10px] md:text-xs text-foreground-muted uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
