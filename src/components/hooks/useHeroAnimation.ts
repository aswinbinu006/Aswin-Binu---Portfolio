import { useRef, useEffect } from "react";
import { gsap } from "@/utils/gsap";

/**
 * Enhanced animation hooks for the Hero section
 * Returns refs and animation utilities for advanced scroll-driven effects
 */
export function useHeroAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Magnetic hero badge effect
    const heroBadge = containerRef.current.querySelector("#hero-badge");
    if (heroBadge) {
      gsap.utils.toArray<HTMLDivElement>(heroBadge).forEach((badge) => {
        badge.addEventListener("mousemove", handleMouseMove);
        badge.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    // Magnetic telemetry strip
    const telemetry = containerRef.current.querySelector("#hero-telemetry");
    if (telemetry) {
      gsap.utils.toArray<HTMLDivElement>(telemetry).forEach((strip) => {
        strip.addEventListener("mousemove", handleMouseMove);
        strip.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    // Parallax glow effect reaction
    const heroBadgeStrip = containerRef.current.querySelector("#hero-badge")?.parentElement;
    if (heroBadgeStrip) {
      setInterval(() => {
        heroBadgeStrip.style.transform = `translateX(${Math.random() * 2 - 1}px) translateY(${Math.random() * 2 - 1}px)`;
      }, 1000);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to((e.currentTarget as HTMLElement), {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    function handleMouseLeave(e: MouseEvent) {
      gsap.to((e.currentTarget as HTMLElement), {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    return () => {
      gsap.utils.toArray<HTMLElement>(containerRef.current?.querySelectorAll(".magnetic") || []).forEach(el => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return { containerRef, titleRef };
}