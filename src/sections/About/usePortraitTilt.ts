import { useEffect, type RefObject } from "react";
import { gsap } from "@/utils/gsap";

interface UsePortraitTiltProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cardRef: RefObject<HTMLDivElement | null>;
}

/**
 * 3D perspective subtle tilt hook (desktop mouse + mobile touch/device orientation fallback)
 * Now applies to the glow element behind the silhouette
 */
export function usePortraitTilt({
  containerRef,
  cardRef,
}: UsePortraitTiltProps) {
  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = container;
    const elCard = card;

    const ctx = gsap.context(() => {
      function handlePointerMove(e: PointerEvent) {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(elCard, {
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 900,
        });
      }

      function handlePointerLeave() {
        gsap.to(elCard, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Mobile device orientation fallback (gamma: left/right tilt, beta: front/back tilt)
      function handleOrientation(e: DeviceOrientationEvent) {
        if (e.gamma == null || e.beta == null) return;
        const gamma = Math.max(-20, Math.min(20, e.gamma)); // clamp to ±20 deg
        const beta = Math.max(20, Math.min(60, e.beta)) - 40; // baseline 40 deg viewing angle
        gsap.to(elCard, {
          rotateY: (gamma / 20) * 4,
          rotateX: (-beta / 20) * 4,
          duration: 0.8,
          ease: "power1.out",
          transformPerspective: 900,
        });
      }

      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }, el);

    return () => ctx.revert();
  }, [containerRef, cardRef]);
}