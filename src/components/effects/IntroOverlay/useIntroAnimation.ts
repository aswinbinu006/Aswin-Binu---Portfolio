import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { INTRO_TIMINGS } from "./types";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isForwardMoving, setIsForwardMoving] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const darknessRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const startForwardTransition = useCallback(() => {
    if (!isVisible || isForwardMoving) return;
    setIsForwardMoving(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setIsVisible(false);
      resumeScroll();
      onComplete?.();
      return;
    }

    // Cinematic Forward Camera Rush & Universe Expansion
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        resumeScroll();
        onComplete?.();
      },
    });

    // 1. Text becomes quieter and dissolves
    tl.to(introContentRef.current, {
      opacity: 0,
      scale: 1.08,
      duration: 0.6,
      ease: "power2.inOut",
    }, 0);

    // 2. Camera accelerates forward into the universe
    tl.to(cameraRef.current, {
      scale: 1.35,
      opacity: 0,
      duration: INTRO_TIMINGS.forwardTransitDuration,
      ease: "power2.inOut",
    }, 0.1);

    // 3. Complete fade of the intro overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, INTRO_TIMINGS.forwardTransitDuration - 0.4);

  }, [isVisible, isForwardMoving, onComplete]);

  // Keyboard shortcut & Click interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible && !isForwardMoving) {
        startForwardTransition();
      }
    };

    const handleClick = () => {
      if (isVisible && !isForwardMoving) {
        startForwardTransition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [isVisible, isForwardMoving, startForwardTransition]);

  useEffect(() => {
    if (!isVisible) return;

    window.scrollTo(0, 0);
    pauseScroll();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(darknessRef.current, { opacity: 0 });
        gsap.set(introContentRef.current, { opacity: 1 });
        const timer = setTimeout(() => {
          startForwardTransition();
        }, 3000);
        return () => clearTimeout(timer);
      }

      // Initial state: Pure blackness
      gsap.set(darknessRef.current, { opacity: 1 });
      gsap.set(cameraRef.current, { scale: 0.96, opacity: 1 });
      gsap.set(".pov-intro-eyebrow", { opacity: 0, y: 12 });
      gsap.set(".pov-intro-name", { opacity: 0, y: 16, scale: 0.98 });
      gsap.set(".pov-intro-copy", { opacity: 0, y: 14 });
      gsap.set(".pov-intro-portrait", { opacity: 0, scale: 0.95 });
      gsap.set(".pov-intro-markers", { opacity: 0, y: 10 });
      gsap.set(".pov-intro-prompt", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // 0ms -> 500ms: Complete pure blackness
      // 500ms -> 1500ms: Vision comes online (eyes adjusting to darkness)
      tl.to(darknessRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut",
      }, INTRO_TIMINGS.starsAdjustStart);

      // 1.0s -> 2.0s: Camera reaches resting observation depth
      tl.to(cameraRef.current, {
        scale: 1.0,
        duration: 1.5,
        ease: "power1.out",
      }, INTRO_TIMINGS.nebulaRevealStart);

      // 2.3s: Introduction begins floating inside the astronaut's field of vision
      tl.to(".pov-intro-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, INTRO_TIMINGS.introContentStart);

      tl.to(".pov-intro-name", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }, INTRO_TIMINGS.introContentStart + 0.2);

      tl.to(".pov-intro-copy", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, INTRO_TIMINGS.introContentStart + 0.45);

      tl.to(".pov-intro-portrait", {
        opacity: 0.85,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
      }, INTRO_TIMINGS.introContentStart + 0.6);

      tl.to(".pov-intro-markers", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
      }, INTRO_TIMINGS.introContentStart + 0.75);

      tl.to(".pov-intro-prompt", {
        opacity: 0.65,
        duration: 1.0,
        ease: "power1.out",
      }, INTRO_TIMINGS.introContentStart + 1.2);

      // 6.8s: Automatic forward movement into the universe
      tl.add(() => {
        startForwardTransition();
      }, INTRO_TIMINGS.autoForwardAt);

      timelineRef.current = tl;
    }, overlayRef);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
      resumeScroll();
    };
  }, [isVisible, startForwardTransition]);

  return {
    isVisible,
    isForwardMoving,
    overlayRef,
    darknessRef,
    cameraRef,
    introContentRef,
    startForwardTransition,
  };
}
