'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: 'glitch' | 'flash' | 'randomize' | 'reset';
}

export default function Button({ 
  label, 
  active = false, 
  onClick,
  variant = 'glitch' 
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);
  
  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    onClick?.();
  }, [onClick]);
  
  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);
  
  const variantStyles = {
    glitch: {
      base: "border-accent-primary/40 hover:border-accent-primary",
      active: "bg-accent-primary/20 border-accent-primary shadow-[0_0_20px_rgba(167,139,250,0.4)]",
      label: "text-accent-primary",
    },
    flash: {
      base: "border-accent-secondary/40 hover:border-accent-secondary",
      active: "bg-accent-secondary/20 border-accent-secondary shadow-[0_0_20px_rgba(125,211,252,0.4)]",
      label: "text-accent-secondary",
    },
    randomize: {
      base: "border-accent-highlight/30 hover:border-accent-highlight",
      active: "bg-accent-highlight/20 border-accent-highlight shadow-[0_0_20px_rgba(254,243,199,0.4)]",
      label: "text-accent-highlight",
    },
    reset: {
      base: "border-foreground-muted/40 hover:border-foreground",
      active: "bg-foreground/10 border-foreground",
      label: "text-foreground-muted",
    },
  };
  
  const styles = variantStyles[variant];
  
  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={cn(
          "relative w-14 md:w-20 h-10 md:h-14 rounded-lg",
          "border-2 bg-surface",
          "transition-all duration-100",
          "flex items-center justify-center",
          "touch-manipulation select-none",
          "active:scale-95",
          styles.base,
          (active || isPressed) && styles.active,
          isPressed && "scale-95"
        )}
      >
        <div 
          className={cn(
            "absolute inset-1 rounded-md bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
          )}
        />
        
        <div className={cn(
          "w-2.5 md:w-3 h-2.5 md:h-3 rounded-full",
          "transition-all duration-150",
          active || isPressed 
            ? "bg-current shadow-lg scale-110" 
            : "bg-foreground-muted/50",
          styles.label
        )} />
      </button>
      
      <span className={cn(
        "font-mono text-[10px] md:text-xs uppercase tracking-wider",
        styles.label
      )}>
        {label}
      </span>
    </div>
  );
}
