"use client";

import React, { useRef, useEffect, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, className, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: "100px" } // Load slightly before it comes into view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isIntersecting) {
        // We only play if it's actually in view and paused
        if (videoRef.current.paused) {
          videoRef.current.play().catch((err) => {
            console.warn("LazyVideo Autoplay prevented:", err);
          });
        }
      } else {
        // Pause when offscreen to save battery and CPU cycles
        videoRef.current.pause();
      }
    }
  }, [isIntersecting]);

  return (
    <video
      ref={videoRef}
      className={`bg-dark-surface object-cover ${className}`}
      preload={isIntersecting ? "auto" : "none"}
      src={src}
      muted
      loop
      playsInline
      {...props}
    />
  );
}
