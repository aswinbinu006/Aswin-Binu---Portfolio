import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsap";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { INTRO_TIMINGS } from "./types";

const SESSION_STORAGE_KEY = "space_os_intro_seen";

interface UseIntroAnimationProps {
  onComplete?: () => void;
}

export function useIntroAnimation({ onComplete }: UseIntroAnimationProps = {}) {
  // Always visible on page load so user can experience it on reload
  const [isVisible, setIsVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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
    if (!isVisible) {
      return;
    }

    // Lock scrolling on entry and ensure at top of page
    window.scrollTo(0, 0);
    pauseScroll();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Simple subtle fade for reduced motion
        const tl = gsap.timeline({
          onComplete: finishIntro,
        });

        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 1.2,
        }).to(overlayRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 1.5,
        });

        timelineRef.current = tl;
        return;
      }

      // Initial state: Pure black background (#000000), elements hidden
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(nebulaRef.current, { opacity: 0 });
      gsap.set(".intro-char", { opacity: 0, y: 22 });
      gsap.set(".intro-sub-line", { opacity: 0, y: 14 });
      gsap.set(ctaRef.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 0–0.8s: Pure darkness (nothing visible)
      // 0.8–2.2s: Reveal "ASWIN BINU" letter-by-letter with ~20px upward motion
      tl.to(
        ".intro-char",
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.055,
          ease: "power3.out",
        },
        INTRO_TIMINGS.nameStart
      );

      // 2.2–3.8s: Keep name centered, fade in subtitle with slight upward motion
      tl.to(
        ".intro-sub-line",
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power2.out",
        },
        INTRO_TIMINGS.subtitleStart
      );

      // 3.8–5.5s: Fade in JWST Tarantula Nebula & Star background gradually behind text
      tl.to(
        nebulaRef.current,
        {
          opacity: 0.85,
          duration: INTRO_TIMINGS.nebulaDuration,
          ease: "power2.inOut",
        },
        INTRO_TIMINGS.nebulaStart
      );

      // 3.8–5.5s: Reveal glass CTA button
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        INTRO_TIMINGS.nebulaStart + 0.3
      );

      // 5.5s+: Seamless fade out and transition to Hero
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
    nebulaRef,
    nameRef,
    subtitleRef,
    ctaRef,
    handleExplore,
  };
}
