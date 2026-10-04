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

    const handleScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, scrollY / max));
      if (control.current) {
        control.current.reveal = 1;
        control.current.dissolve = progress;
        control.current.sectionProgress = progress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    const ctx = gsap.context(() => {
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      ctx.revert();
    };
  }, [control]);
}
