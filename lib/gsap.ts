import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register all GSAP plugins once in a single location
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export { gsap, ScrollTrigger, Flip };
