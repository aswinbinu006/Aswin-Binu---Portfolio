import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import type { NebulaControl } from "@/components/effects/nebula/types";

interface UseBackgroundAnimationProps {
  control: RefObject<NebulaControl>;
}

/**
 * Hook managing living universe background states:
 * 1. Nebula is fully revealed (reveal = 1) from the moment the site opens.
 * 2. Dissolves seamlessly between Introduction (#about) and Projects (#projects).
 */
export function useBackgroundAnimation({
  control,
}: UseBackgroundAnimationProps) {
  useEffect(() => {
    if (control.current) {
      control.current.reveal = 1;
    }

    const ctx = gsap.context(() => {
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
