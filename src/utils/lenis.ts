import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/**
 * Central Lenis + GSAP Integration
 *
 * Requirements satisfied:
 * - Singleton Lenis instance driven by gsap.ticker
 * - gsap.ticker.add((t) => lenis.raf(t * 1000))
 * - gsap.ticker.lagSmoothing(0)
 * - lenis.on('scroll', ScrollTrigger.update)
 * - Clean pause/resume without layout shifts
 * - Programmatic smooth scrollTo helper
 */

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Drive Lenis virtual scroll calculation from GSAP ticker
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function pauseScroll() {
  if (lenisInstance) {
    lenisInstance.stop();
  }
  document.documentElement.classList.add('lenis-stopped');
  document.body.style.overflow = 'hidden';
}

export function resumeScroll() {
  if (lenisInstance) {
    lenisInstance.start();
  }
  document.documentElement.classList.remove('lenis-stopped');
  document.body.style.overflow = '';
}

export function scrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; immediate?: boolean; duration?: number }
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

