import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track the active section in view as the user scrolls,
 * updating the navbar highlight and keeping the browser URL hash (/#section)
 * in perfect real-time synchronization with the currently visible page content.
 */
export function useActiveSection(sectionIds: string[], defaultSection: string = 'home'): string {
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        return hash;
      }
    }
    return defaultSection;
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    // On initial mount, if URL already has a specific section hash, smoothly scroll to it
    if (isInitialMount.current) {
      const initialHash = window.location.hash.replace('#', '');
      if (initialHash && sectionIds.includes(initialHash)) {
        const targetEl = document.getElementById(initialHash);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }
      isInitialMount.current = false;
    }

    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      let currentId = defaultSection;

      // 1. If user is at the top of the page, highlight and sync to home
      if (scrollY < 120) {
        currentId = sectionIds[0] || defaultSection;
      }
      // 2. If scrolled near the bottom of the page, highlight and sync to the last section (contact)
      else if (scrollY + windowHeight >= docHeight - 100) {
        currentId = sectionIds[sectionIds.length - 1] || defaultSection;
      }
      // 3. Middle sections: find the section intersecting the viewport reading line (35% from top)
      else {
        const focusPoint = windowHeight * 0.35;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= focusPoint && rect.bottom > focusPoint) {
            currentId = id;
            break;
          }
        }
      }

      // Update state for the Navbar active indicator
      setActiveSection((prev) => (prev !== currentId ? currentId : prev));

      // Synchronize the URL address bar in real time (e.g. aswin-binu.vercel.app/#academics)
      // replaceState silently updates the browser URL bar without triggering jumpy scrolls or history bloat
      if (window.location.hash !== `#${currentId}`) {
        window.history.replaceState(null, '', `#${currentId}`);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run initial check
    updateActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, defaultSection]);

  return activeSection;
}
