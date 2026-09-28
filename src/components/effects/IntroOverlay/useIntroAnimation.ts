import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { INTRO_TIMINGS } from "./types";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<"initial" | "line1" | "line2" | "cta" | "warp">("initial");

  const overlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (!isVisible) return;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
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

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        const tl = gsap.timeline({ onComplete: finishIntro });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.5 })
          .to(overlayRef.current, { opacity: 0, duration: 0.5, delay: 1.5 });
        timelineRef.current = tl;
        return;
      }

      // Initial states
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(".intro-telemetry", { opacity: 0, y: -8 });
      gsap.set(terminalRef.current, { opacity: 0, scale: 0.9, y: 12 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 0.15s: Telemetry & HUD Aperture bars fade in
      tl.to(".intro-telemetry", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
      }, 0.15);

      // 0.35s: System initialization badge
      tl.to(
        terminalRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        0.35
      );

      // 0.6s: Trigger Line 1 decyphering
      tl.add(() => setStage("line1"), 0.6);

      // 1.8s: Trigger Line 2 decyphering
      tl.add(() => setStage("line2"), 1.8);

      // 2.8s: CTA button entrance with bounce
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.3)",
          onStart: () => setStage("cta"),
        },
        2.8
      );

      // 5.2s: Auto-transition into Hero
      tl.add(() => {
        setStage("warp");
        finishIntro();
      }, 5.2);

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
    stage,
    overlayRef,
    terminalRef,
    ctaRef,
    handleExplore,
  };
}
