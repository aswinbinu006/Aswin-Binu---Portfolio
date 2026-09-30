import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { detectTier, type NebulaControl } from "@/components/effects/nebula/types";

interface UseBackgroundAnimationProps {
  control: RefObject<NebulaControl>;
}

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "certifications",
  "academics",
  "contact",
];

/**
 * Coordinates living universe background states across chapters:
 * - Tracks chapter transitions and calculates smooth section progression
 * - Dissolves nebula seamlessly across chapters while maintaining active starlight
 * - Feeds section progression to the WebGL/Canvas renderer for subtle cosmic color shifting
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

    // On mobile, skip ScrollTrigger setup entirely and set initial state
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
      // Global scroll tracking for subtle nebula depth and color shifts
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (control.current) {
            control.current.sectionProgress = self.progress;
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

      // Smooth dissolve between About and Projects
      const about = document.getElementById("about");
      const projects = document.getElementById("projects");

      if (about && projects) {
        ScrollTrigger.create({
          trigger: about,
          start: "center top",
          endTrigger: projects,
          end: "top center",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (control.current) {
              control.current.dissolve = self.progress;
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, [control]);
}
