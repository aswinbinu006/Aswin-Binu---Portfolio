import React, { useRef, useEffect, useState, Suspense } from "react";
import type { NebulaControl } from "@/components/effects/nebula/types";
import { useBackgroundAnimation } from "./useBackgroundAnimation";

const CinematicNebula = React.lazy(() => import("@/components/effects/nebula/CinematicNebula"));

interface BackgroundProps {
  isIntroComplete?: boolean;
}

/**
 * Reusable Living Universe Background System
 *
 * Layer order (inside fixed z-0 wrapper):
 * 1. Desktop/Laptop: <CinematicNebula /> (WebGL fBm warp + real stars overlay, lazy-loaded only when Hero is visible)
 * 2. Mobile: Ultra-lightweight static cosmic nebula image (zero GPU strain, instant 60/120fps)
 * 3. Shared subtle film grain overlay
 *
 * Controlled smoothly via useBackgroundAnimation hook with GSAP ScrollTrigger.
 */
export default function Background({ isIntroComplete = true }: BackgroundProps) {
  const control = useRef<NebulaControl>({ reveal: isIntroComplete ? 1 : 0, dissolve: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(true);
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

  // IntersectionObserver to only execute WebGL shaders when Hero is in viewport
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "100px" }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isMobile]);

  useBackgroundAnimation({ control });

  useEffect(() => {
    if (control.current) {
      control.current.reveal = isIntroComplete ? 1 : 0;
    }
  }, [isIntroComplete]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] min-h-screen z-0 overflow-hidden select-none bg-[#020814]">
      {/* 1. Living Universe Cinematic Nebula (WebGL + Canvas real stars) - Lazy loaded only on Hero on Desktop */}
      {!isMobile && isHeroVisible && (
        <div className="absolute inset-0 w-full h-full z-[1]">
          <Suspense fallback={null}>
            <CinematicNebula control={control} dim={0.12} vignette={0.3} />
          </Suspense>
        </div>
      )}

      {/* 2. Static Nebula Image - Mobile (or desktop fallback when hero is scrolled past) */}
      {(isMobile || !isHeroVisible) && (
        <div className="absolute inset-0 w-full h-full z-[1] overflow-hidden">
          <picture className="w-full h-full block">
            <source srcSet="/nebula.webp" type="image/webp" />
            <img
              src="/nebula.jpg"
              alt=""
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
              decoding="sync"
            />
          </picture>
          {/* Subtle cosmic tint overlay to enhance card and text contrast */}
          <div className="absolute inset-0 bg-[#020814]/30 pointer-events-none" />
        </div>
      )}

      {/* 3. Film grain overlay */}
      <div className="grain-overlay z-[2]" />
    </div>
  );
}

