import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { detectTier, type NebulaControl } from "@/components/effects/nebula/types";

interface UseBackgroundAnimationProps {
  control: RefObject<NebulaControl>;
}

const SECTION_IDS = [
  "hero",
  "about",
  "projects",
  "skills",
  "certificates",
  "academics",
  "contact",
];

/**
 * Coordinates living universe background states across chapters:
 * - Smoothly and progressively darkens the cosmic background across the entire scroll height
 * - Eliminates abrupt transitions or sudden 2-scroll cliffs
 * - Feeds continuous progress to WebGL/Canvas renderer
 */
export function useBackgroundAnimation({ control }: UseBackgroundAnimationProps) {
  const isMobile = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);

  useEffect(() => {
    if (control.current) {
      control.current.reveal = 1;
      control.current.dissolve = 0;
      control.current.sectionIndex = 0;
      control.current.sectionProgress = 0;
    }

    const tier = detectTier();
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || reducedMotion) {
      if (control.current) {
        control.current.reveal = reducedMotion ? 1 : 0;
        control.current.dissolve = 0;
        control.current.sectionIndex = 0;
        control.current.sectionProgress = 0;
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Global continuous scroll tracking across the whole page (smooth progressive darkening)
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (control.current) {
            control.current.sectionProgress = self.progress;
            control.current.dissolve = self.progress;
          }
        },
      });

      // Individual section index tracking
      SECTION_IDS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              if (control.current) control.current.sectionIndex = index;
            },
            onEnterBack: () => {
              if (control.current) control.current.sectionIndex = index;
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, [control]);
}
