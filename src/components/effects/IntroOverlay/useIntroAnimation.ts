import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFastMoving, setIsFastMoving] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visorMaskRef = useRef<SVGSVGElement>(null);
  const hasFinishedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFastMoving(true);

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

    // High-speed simultaneous fast exit for content and astronaut visor mask
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        resumeScroll();
        onComplete?.();
      },
    });

    const exitDuration = 0.35;

    // 1. Manifesto text accelerates and fades out rapidly
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          scale: 2.6,
          opacity: 0,
          filter: "blur(8px)",
          duration: exitDuration,
          ease: "power2.inOut",
        },
        0
      );
    }

    // 2. Visor frame zooms rapidly outwards and fades out at the EXACT same time
    if (visorMaskRef.current) {
      tl.to(
        visorMaskRef.current,
        {
          scale: 6.0,
          opacity: 0,
          duration: exitDuration,
          ease: "power2.inOut",
          transformOrigin: "center center",
        },
        0
      );
    }

    // 3. Overlay fades out simultaneously
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: exitDuration,
        ease: "power2.inOut",
      },
      0
    );
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
      if (visorMaskRef.current) gsap.set(visorMaskRef.current, { scale: 1, opacity: 1 });

      const tl = gsap.timeline();

      // 0.3s: Content reveals inside the visor
      tl.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }, 0.3);

      // Hold for 3.6 seconds then automatically trigger the fast-moving plunge
      tl.add(() => {
        finishIntro();
      }, 4.0);

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
    isFastMoving,
    overlayRef,
    contentRef,
    visorMaskRef,
    finishIntro,
  };
}
