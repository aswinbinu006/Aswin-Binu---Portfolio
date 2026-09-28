import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const darknessRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const hasFinishedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsTransitioning(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !overlayRef.current) {
      setIsVisible(false);
      resumeScroll();
      onComplete?.();
      return;
    }

    // Smooth forward camera movement & dissolve into Hero
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        resumeScroll();
        onComplete?.();
      },
    });

    // 1. Text fades out smoothly
    if (introContentRef.current) {
      tl.to(introContentRef.current, {
        opacity: 0,
        y: -20,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0);
    }

    // 2. Camera scales forward into the universe
    if (cameraRef.current) {
      tl.to(cameraRef.current, {
        scale: 1.25,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0);
    }

    // 3. Overlay dissolves smoothly into the main portfolio
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    }, 0.2);

  }, [onComplete]);

  // Click & Keyboard interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      finishIntro();
    };

    const handleClick = () => {
      finishIntro();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [finishIntro]);

  useEffect(() => {
    if (!isVisible) return;

    window.scrollTo(0, 0);
    pauseScroll();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const timer = setTimeout(() => {
        finishIntro();
      }, 2500);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      // Initial states
      if (darknessRef.current) gsap.set(darknessRef.current, { opacity: 1 });
      if (cameraRef.current) gsap.set(cameraRef.current, { scale: 0.96, opacity: 1 });
      gsap.set(".pov-intro-eyebrow", { opacity: 0, y: 10 });
      gsap.set(".pov-intro-headline", { opacity: 0, y: 15 });
      gsap.set(".pov-intro-copy", { opacity: 0, y: 12 });
      gsap.set(".pov-intro-markers", { opacity: 0, y: 8 });
      gsap.set(".pov-intro-btn", { opacity: 0, y: 10, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // 0.4s -> 1.4s: Blackness lifts as eyes adjust to deep space
      if (darknessRef.current) {
        tl.to(darknessRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power1.inOut",
        }, 0.4);
      }

      // 0.8s -> 1.8s: Camera reaches rest scale
      if (cameraRef.current) {
        tl.to(cameraRef.current, {
          scale: 1.0,
          duration: 1.2,
          ease: "power1.out",
        }, 0.8);
      }

      // 1.8s: Eyebrow appears
      tl.to(".pov-intro-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }, 1.8);

      // 2.2s: Suspense Headline appears
      tl.to(".pov-intro-headline", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 2.2);

      // 2.8s: Philosophy Sub-statement
      tl.to(".pov-intro-copy", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 2.8);

      // 3.4s: Environmental markers
      tl.to(".pov-intro-markers", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      }, 3.4);

      // 3.8s: Action button emerges
      tl.to(".pov-intro-btn", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      }, 3.8);

      // 6.5s: Auto-transition if user hasn't clicked
      tl.add(() => {
        finishIntro();
      }, 6.5);

      timelineRef.current = tl;
    }, overlayRef);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
      resumeScroll();
    };
  }, [isVisible, finishIntro]);

  return {
    isVisible,
    isTransitioning,
    overlayRef,
    darknessRef,
    cameraRef,
    introContentRef,
    finishIntro,
  };
}
