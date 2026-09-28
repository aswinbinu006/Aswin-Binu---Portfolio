import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import type { NebulaControl } from "@/components/effects/nebula/types";

interface UseBackgroundAnimationProps {
  control: RefObject<NebulaControl>;
}

const SECTION_IDS = ["hero", "about", "skills", "projects", "events", "contact"];

/**
 * Coordinates living universe background states across chapters:
 * - Tracks chapter transitions and calculates smooth section progression
 * - Dissolves nebula seamlessly across chapters while maintaining active starlight
 * - Feeds section progression to the WebGL/Canvas renderer for subtle cosmic color shifting
 */
export function useBackgroundAnimation({ control }: UseBackgroundAnimationProps) {
  useEffect(() => {
    if (control.current) {
      control.current.reveal = 1;
      control.current.dissolve = 0;
      control.current.sectionIndex = 0;
      control.current.sectionProgress = 0;
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
