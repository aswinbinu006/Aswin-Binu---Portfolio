/**
 * Global Lenis Scroll Controller
 * Coordinates smooth scroll pause/resume and body scroll locking
 * across desktop and mobile dialogs/sheets without layout shifts or scroll jumps.
 */

let savedScrollY = 0;

export function pauseScroll() {
  if (typeof window === 'undefined') return;
  savedScrollY = window.scrollY;

  // Signal Lenis instance to stop virtual scroll calculation
  window.dispatchEvent(
    new CustomEvent('lenis-control', { detail: { action: 'pause' } })
  );

  // Compensate for scrollbar removal to prevent layout shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  document.body.style.overflow = 'hidden';
}

export function resumeScroll() {
  if (typeof window === 'undefined') return;

  // Signal Lenis instance to resume virtual scroll calculation
  window.dispatchEvent(
    new CustomEvent('lenis-control', { detail: { action: 'resume' } })
  );

  document.body.style.overflow = '';
  document.body.style.paddingRight = '';

  // Restore scroll position instantly without animation jump
  window.scrollTo({
    top: savedScrollY,
    behavior: 'instant' as ScrollBehavior,
  });
}
