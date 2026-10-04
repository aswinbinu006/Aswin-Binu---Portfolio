import React, { useRef, useEffect, useState } from "react";
import type { NebulaControl } from "@/components/effects/nebula/types";
import { useBackgroundAnimation } from "./useBackgroundAnimation";
import CinematicNebula from "@/components/effects/nebula/CinematicNebula";

interface BackgroundProps {
  isIntroComplete?: boolean;
}

/**
 * Reusable Living Universe Background System
 *
 * Layer order (inside fixed z-0 wrapper):
 * 1. Desktop/Laptop: <CinematicNebula control={control} /> (WebGL fBm warp + real stars overlay)
 * 2. Mobile: Ultra-lightweight static cosmic gradient backdrop (zero GPU strain, instant 60/120fps)
 * 3. Shared subtle film grain overlay
 *
 * Controlled smoothly via useBackgroundAnimation hook with GSAP ScrollTrigger.
 */
export default function Background({ isIntroComplete = true }: BackgroundProps) {
  const control = useRef<NebulaControl>({ reveal: isIntroComplete ? 1 : 0, dissolve: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useBackgroundAnimation({ control });

  useEffect(() => {
    if (control.current) {
      control.current.reveal = isIntroComplete ? 1 : 0;
    }
  }, [isIntroComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#020814]">
      {/* 1. Living Universe Cinematic Nebula (WebGL + Canvas real stars) - Desktop & Tablet */}
      {!isMobile && (
        <div className="absolute inset-0 z-[1]">
          <CinematicNebula control={control} dim={0.12} vignette={0.3} />
        </div>
      )}

      {/* 2. Ultra-lightweight static cosmic gradient backdrop - Mobile only */}
      {isMobile && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030914] via-[#050e20] to-[#020712]">
          {/* Subtle static ambient glows (zero CPU/GPU overhead) */}
          <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-cyan-900/15 blur-[100px] pointer-events-none" />
          <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-900/15 blur-[100px] pointer-events-none" />
        </div>
      )}

      {/* 3. Film grain overlay */}
      <div className="grain-overlay z-[2]" />
    </div>
  );
}

