import React, { useEffect } from "react";
import { initLenis, destroyLenis } from "@/utils/lenis";
import { initScrollTriggerRefresh } from "@/utils/gsap";

export interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Reusable Lenis Smooth Scroll Provider with GSAP ScrollTrigger Integration.
 * Drives smooth scrolling from gsap.ticker, updates ScrollTrigger,
 * handles refresh after font and asset load, and honors prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize unified Lenis instance
    initLenis();

    // Refresh ScrollTrigger when fonts and window finishes loading
    const cleanupRefresh = initScrollTriggerRefresh();

    return () => {
      cleanupRefresh();
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}

