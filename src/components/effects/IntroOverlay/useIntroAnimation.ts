import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { INTRO_TIMINGS } from "./types";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (!isVisible) return;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: INTRO_TIMINGS.exitFadeDuration,
        ease: "power2.inOut",
        onComplete: () => {
          setIsVisible(false);
          resumeScroll();
          onComplete?.();
        },
      });
    } else {
      setIsVisible(false);
      resumeScroll();
      onComplete?.();
    }
  }, [isVisible, onComplete]);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, finishIntro]);

  useEffect(() => {
    if (!isVisible) return;

    // Lock scrolling on entry and ensure at top of page
    window.scrollTo(0, 0);
    pauseScroll();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        const tl = gsap.timeline({
          onComplete: finishIntro,
        });

        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.8,
        }).to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 1.2,
        });

        timelineRef.current = tl;
        return;
      }

      // Initial state
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(".intro-telemetry", { opacity: 0 });
      gsap.set(terminalRef.current, { opacity: 0, y: 15 });
      gsap.set(".hook-word-1", { opacity: 0, y: 18, skewX: -6 });
      gsap.set(".hook-word-2", { opacity: 0, y: 18, skewX: -6 });
      gsap.set(ctaRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 0.2s: Corner telemetry & reticles fade in
      tl.to(".intro-telemetry", {
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
      }, INTRO_TIMINGS.pingStart);

      // 0.4s: System initialization terminal badge
      tl.to(
        terminalRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        INTRO_TIMINGS.terminalStart
      );

      // 1.0s: Suspense Line 1 word-by-word reveal
      tl.to(
        ".hook-word-1",
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.65,
          stagger: 0.045,
          ease: "power3.out",
        },
        INTRO_TIMINGS.hookLine1Start
      );

      // 2.0s: Suspense Line 2 word-by-word reveal with specular emphasis
      tl.to(
        ".hook-word-2",
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: "power3.out",
        },
        INTRO_TIMINGS.hookLine2Start
      );

      // 3.2s: CTA button reveals with glow
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        INTRO_TIMINGS.ctaStart
      );

      // 5.4s: Auto-transition into Hero
      tl.add(() => {
        finishIntro();
      }, INTRO_TIMINGS.autoExitAt);

      timelineRef.current = tl;
    }, overlayRef);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
      resumeScroll();
    };
  }, [isVisible, finishIntro]);

  const handleExplore = () => {
    timelineRef.current?.kill();
    finishIntro();
  };

  return {
    isVisible,
    overlayRef,
    terminalRef,
    line1Ref,
    line2Ref,
    ctaRef,
    handleExplore,
  };
}
