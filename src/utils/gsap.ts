import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register all GSAP plugins once in a single location
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

/**
 * Ensures ScrollTrigger calculations refresh accurately after fonts,
 * stylesheets, and high-res media finish decoding.
 */
export function initScrollTriggerRefresh() {
  if (typeof window === 'undefined') return () => {};

  const handleRefresh = () => {
    ScrollTrigger.refresh();
  };

  // When fonts finish rendering
  if ('fonts' in document) {
    document.fonts.ready.then(handleRefresh);
  }

  // When window load finishes
  window.addEventListener('load', handleRefresh);
  window.addEventListener('resize', handleRefresh);

  return () => {
    window.removeEventListener('load', handleRefresh);
    window.removeEventListener('resize', handleRefresh);
  };
}

/**
 * Pre-configured GSAP matchMedia breakpoints:
 * - isDesktop: (min-width: 1024px)
 * - isTablet: (min-width: 768px) and (max-width: 1023px)
 * - isMobile: (max-width: 767px)
 * - reduceMotion: (prefers-reduced-motion: reduce)
 */
export function createMatchMedia() {
  const mm = gsap.matchMedia();
  return mm;
}

export { gsap, ScrollTrigger, Flip };

