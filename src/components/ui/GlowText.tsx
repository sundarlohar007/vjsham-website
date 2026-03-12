"use client";

import React from "react";

interface GlowTextProps {
  children: React.ReactNode;
  color?: "cyan" | "magenta";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

export default function GlowText({
  children,
  color = "cyan",
  className = "",
  as = "span",
}: GlowTextProps) {
  const colorClasses =
    color === "cyan"
      ? "text-neon-cyan text-glow-cyan"
      : "text-magenta text-glow-magenta";

  const combinedClassName = `${colorClasses} ${className}`;

  switch (as) {
    case "h1":
      return <h1 className={combinedClassName}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClassName}>{children}</h2>;
    case "h3":
      return <h3 className={combinedClassName}>{children}</h3>;
    case "p":
      return <p className={combinedClassName}>{children}</p>;
    case "div":
      return <div className={combinedClassName}>{children}</div>;
    default:
      return <span className={combinedClassName}>{children}</span>;
  }
}
