"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Reusable Lenis Smooth Scroll Integration with GSAP ScrollTrigger
 * Respects prefers-reduced-motion by falling back to native scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    const handleLenisControl = (e: Event) => {
      const ce = e as CustomEvent<{ action: "pause" | "resume" }>;
      if (ce.detail?.action === "pause") {
        lenis.stop();
      } else if (ce.detail?.action === "resume") {
        lenis.start();
      }
    };

    window.addEventListener("lenis-control", handleLenisControl);

    return () => {
      window.removeEventListener("lenis-control", handleLenisControl);
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
