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

    // Cinematic continuous forward camera glide into the universe
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        resumeScroll();
        onComplete?.();
      },
    });

    // 1. Introductory typography dissolves quietly into the scene
    if (introContentRef.current) {
      tl.to(introContentRef.current, {
        opacity: 0,
        y: -24,
        scale: 1.04,
        duration: 0.65,
        ease: "power2.inOut",
      }, 0);
    }

    // 2. Camera glides forward into the celestial depth
    if (cameraRef.current) {
      tl.to(cameraRef.current, {
        scale: 1.35,
        duration: 1.1,
        ease: "power2.inOut",
      }, 0.05);
    }

    // 3. Overlay dissolves smoothly into the main portfolio hero
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut",
    }, 0.35);

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
      }, 2000);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      // Phase 1: Pure Blackness
      if (darknessRef.current) gsap.set(darknessRef.current, { opacity: 1 });
      if (cameraRef.current) gsap.set(cameraRef.current, { scale: 0.96, opacity: 1 });
      gsap.set(".cinematic-intro-portrait", { opacity: 0, scale: 0.95 });
      gsap.set(".cinematic-intro-name", { opacity: 0, y: 16 });
      gsap.set(".cinematic-intro-tagline", { opacity: 0, y: 12 });
      gsap.set(".cinematic-intro-copy", { opacity: 0, y: 12 });
      gsap.set(".cinematic-intro-hint", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Phase 2: Vision comes online (darkness lifts as eyes adjust to deep space)
      if (darknessRef.current) {
        tl.to(darknessRef.current, {
          opacity: 0,
          duration: 1.6,
          ease: "power1.inOut",
        }, 0.6);
      }

      // Phase 3: Camera settles into resting eye-level observation
      if (cameraRef.current) {
        tl.to(cameraRef.current, {
          scale: 1.0,
          duration: 1.6,
          ease: "power1.out",
        }, 0.8);
      }

      // Phase 4: Introduction discovered inside the universe
      tl.to(".cinematic-intro-portrait", {
        opacity: 0.8,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      }, 2.2);

      tl.to(".cinematic-intro-name", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
      }, 2.4);

      tl.to(".cinematic-intro-tagline", {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
      }, 2.7);

      tl.to(".cinematic-intro-copy", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, 3.0);

      tl.to(".cinematic-intro-hint", {
        opacity: 0.55,
        duration: 1.0,
        ease: "power1.out",
      }, 3.6);

      // Automatic forward journey if no interaction
      tl.add(() => {
        finishIntro();
      }, 6.8);

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
