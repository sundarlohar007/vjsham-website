"use client";

import { useState, useEffect } from "react";

/**
 * Detects mobile viewport for performance scaling.
 * Returns true when viewport width < 768px.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    
    // Defer initial layout set to avoid React cascading render warnings
    requestAnimationFrame(() => setIsMobile(mql.matches));

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
