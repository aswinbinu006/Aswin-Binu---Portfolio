import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasFinishedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (!overlayRef.current) {
      setIsVisible(false);
      resumeScroll();
      onComplete?.();
      return;
    }

    // Smooth fade away into the main Hero portfolio
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setIsVisible(false);
        resumeScroll();
        onComplete?.();
      },
    });
  }, [onComplete]);

  // Click & Keyboard interactions (Escape, Space, Enter, or any key)
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
      // Content enters with gentle focus in the astronaut's visor viewport
      gsap.set(contentRef.current, { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline();

      // 0.4s: Content reveals inside the visor
      tl.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      }, 0.4);

      // Hold for 3.5 seconds then automatically fade away into main hero
      tl.add(() => {
        finishIntro();
      }, 4.2);

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
    overlayRef,
    contentRef,
    finishIntro,
  };
}
