import { useRef } from "react";
import CinematicNebula from "@/components/effects/nebula/CinematicNebula";
import type { NebulaControl } from "@/components/effects/nebula/types";
import { useBackgroundAnimation } from "./useBackgroundAnimation";

/**
 * Reusable Living Universe Background System
 *
 * Layer order (inside fixed z-0 wrapper):
 * 1. <CinematicNebula control={control} /> (WebGL fBm warp + real stars overlay)
 * 2. Shared subtle film grain overlay
 *
 * Controlled smoothly via useBackgroundAnimation hook with GSAP ScrollTrigger.
 */
export default function Background() {
  const control = useRef<NebulaControl>({ reveal: 1, dissolve: 0 });

  useBackgroundAnimation({ control });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Cinematic Nebula (WebGL + Canvas real stars) */}
      <div className="absolute inset-0 z-[1]">
        <CinematicNebula control={control} />
      </div>

      {/* 2. Film grain overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
