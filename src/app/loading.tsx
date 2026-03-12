import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-dark">
      {/* Container */}
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Animated Rings */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border border-neon-cyan/20 border-t-neon-cyan duration-1000" />
          <div className="absolute inset-2 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border border-magenta/20 border-b-magenta" />
          
          {/* Inner pulsating core */}
          <div className="h-6 w-6 animate-pulse rounded-full bg-neon-cyan" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-sm font-semibold uppercase tracking-[0.4em] text-neon-cyan">
            VJ SHAM
          </h1>
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              Initializing
            </span>
            <span className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-magenta animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1 w-1 rounded-full bg-magenta animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1 w-1 rounded-full bg-magenta animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
