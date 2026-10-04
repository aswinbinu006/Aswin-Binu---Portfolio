import React, { useRef, useEffect, lazy, Suspense } from "react";
import type { NebulaControl } from "@/components/effects/nebula/types";
import { useBackgroundAnimation } from "./useBackgroundAnimation";

const CinematicNebula = lazy(() => import("@/components/effects/nebula/CinematicNebula"));

interface BackgroundProps {
  isIntroComplete?: boolean;
}

/**
 * Reusable Living Universe Background System
 *
 * Layer order (inside fixed z-0 wrapper):
 * 1. <CinematicNebula control={control} /> (WebGL fBm warp + real stars overlay - Lazy loaded)
 * 2. Shared subtle film grain overlay
 *
 * Controlled smoothly via useBackgroundAnimation hook with GSAP ScrollTrigger.
 */
export default function Background({ isIntroComplete = true }: BackgroundProps) {
  const control = useRef<NebulaControl>({ reveal: isIntroComplete ? 1 : 0, dissolve: 0 });

  useBackgroundAnimation({ control });

  useEffect(() => {
    if (control.current) {
      control.current.reveal = isIntroComplete ? 1 : 0;
    }
  }, [isIntroComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#020814]">
      {/* 1. Living Universe Cinematic Nebula (WebGL + Canvas real stars - Lazy Loaded with Fallback) */}
      <div className="absolute inset-0 z-[1]">
        <Suspense fallback={<div className="absolute inset-0 bg-[#020814]" />}>
          <CinematicNebula control={control} dim={0.12} vignette={0.3} />
        </Suspense>
      </div>

      {/* 2. Film grain overlay */}
      <div className="grain-overlay z-[2]" />
    </div>
  );
}
