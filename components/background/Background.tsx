"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { NebulaControl } from "../CinematicNebula";

// Dynamic client-only import for WebGL/Canvas hybrid background
const CinematicNebula = dynamic(() => import("../CinematicNebula"), {
  ssr: false,
});

/**
 * Reusable Living Universe Background System
 *
 * Layer order (inside fixed -z-10 wrapper):
 * 1. Black void and moving spotlight
 * 2. <CinematicNebula control={control} /> (WebGL fBm warp + real stars overlay)
 * 3. Crack SVG fracture overlay with blue light emission
 * 4. Shared subtle film grain overlay
 *
 * Controls:
 * - ScrollTrigger #1: Pinned crack transition on #crack-trigger (proxy writes control.current.reveal)
 * - ScrollTrigger #2: Dissolve between #chapter-2 and #chapter-4 (writes control.current.dissolve)
 */
export default function Background() {
  const control = useRef<NebulaControl>({ reveal: 0, dissolve: 0 });
  const voidRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Instant cut: reveal immediately, hide void overlay
        control.current.reveal = 1;
        if (voidRef.current) voidRef.current.style.opacity = "0";
      } else {
        const proxy = { reveal: 0 };
        const tl = gsap.timeline({
          paused: true,
          onUpdate: () => {
            control.current.reveal = proxy.reveal;
          },
        });

        // 1. Spotlight moves from behind the name downward into space
        if (spotlightRef.current) {
          tl.to(
            spotlightRef.current,
            {
              top: "85%",
              width: "720px",
              height: "720px",
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );
        }

        // Nakula-inspired typography fade: name smoothly lifts, blurs, and fades out with scroll
        tl.to(
          "#hero-title",
          {
            opacity: 0,
            autoAlpha: 0,
            y: -90,
            scale: 0.94,
            filter: "blur(8px)",
            duration: 0.45,
            ease: "power2.out",
          },
          0.02
        );
        tl.to("#scroll-prompt", { opacity: 0, autoAlpha: 0, duration: 0.1, ease: "power1.out" }, 0);

        // 2. Reveal the nebula (proxy.reveal from 0 -> 1 smoothly)
        tl.to(
          proxy,
          {
            reveal: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.1
        );

        // 3. Void surface dissolves cleanly into the living nebula
        if (voidRef.current) {
          tl.to(
            voidRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0.25
          );
        }

        // Seamless transition across Chapter 1 scroll directly into Chapter 2
        ScrollTrigger.create({
          trigger: "#crack-trigger",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          animation: tl,
        });
      }

      // Dissolve trigger: from #chapter-2 center top to #chapter-4 top center
      // Stays scroll-scrubbed in both normal and reduced-motion modes
      ScrollTrigger.create({
        trigger: "#chapter-2",
        start: "center top",
        endTrigger: "#chapter-4",
        end: "top center",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          control.current.dissolve = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Void and spotlight (Chapter 1) */}
      <div
        ref={voidRef}
        className="absolute inset-0 z-[1] bg-black-void"
      >
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            width: "580px",
            height: "580px",
            background:
              "radial-gradient(circle, rgba(15, 76, 129, 0.42) 0%, rgba(6, 26, 58, 0.2) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. Cinematic Nebula (WebGL + Canvas real stars) */}
      <div className="absolute inset-0 z-[2]">
        <CinematicNebula control={control} />
      </div>

      {/* 3. Film grain overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
