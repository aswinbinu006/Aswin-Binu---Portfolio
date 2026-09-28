import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

/**
 * Nakula-inspired Hero Animation Hook:
 * 1. On page load: Letters of "ASWIN BINU" slide up from an overflow mask,
 *    followed by the Space OS badge, subtitle, and telemetry strip.
 * 2. On scroll: The name lifts upward, blurs, and dissolves into space,
 *    seamlessly introducing the introduction section.
 */
export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-char", { yPercent: 0, opacity: 1 });
        gsap.set("#hero-badge, #hero-subtitle, #hero-telemetry, #scroll-prompt", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Initial state: hidden below overflow baseline
      gsap.set(".hero-char", { yPercent: 130, opacity: 0 });
      gsap.set("#hero-badge", { opacity: 0, y: -20 });
      gsap.set("#hero-subtitle", { opacity: 0, y: 25 });
      gsap.set("#hero-telemetry", { opacity: 0, y: 20 });
      gsap.set("#scroll-prompt", { opacity: 0, y: 15 });

      // 1. Entrance timeline on page load (The Nakula Name Reveal)
      const entranceTl = gsap.timeline({ delay: 0.25 });

      entranceTl
        .to(".hero-char", {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.045,
          ease: "power4.out",
        })
        .to(
          "#hero-badge",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          "#hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          "#hero-telemetry",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          "#scroll-prompt",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // 2. Scroll-driven Nakula exit into Introduction section (#about)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to("#hero-badge", { opacity: 0, y: -40, duration: 0.3, ease: "power2.out" }, 0)
        .to(
          "#hero-title",
          {
            opacity: 0,
            y: -140,
            scale: 0.9,
            filter: "blur(14px)",
            duration: 0.7,
            ease: "power2.out",
          },
          0.05
        )
        .to(
          "#hero-subtitle",
          {
            opacity: 0,
            y: -70,
            filter: "blur(8px)",
            duration: 0.5,
            ease: "power2.out",
          },
          0.1
        )
        .to("#hero-telemetry", { opacity: 0, y: -30, duration: 0.3, ease: "power2.out" }, 0.1)
        .to("#scroll-prompt", { opacity: 0, duration: 0.15, ease: "power1.out" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
}
