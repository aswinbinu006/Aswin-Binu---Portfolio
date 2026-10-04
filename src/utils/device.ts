/**
 * Device detection utilities for adaptive rendering
 * Centralizes all device/media query checks to avoid duplication
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  hasCoarsePointer: boolean;
  dpr: number;
  width: number;
  height: number;
}

/**
 * Get comprehensive device information
 * Should only be called client-side
 */
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      prefersReducedMotion: false,
      hasCoarsePointer: false,
      dpr: 1,
      width: 1920,
      height: 1080,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile: touch + small screen
  const isMobile = hasCoarsePointer && width < 768;
  // Tablet: touch + medium screen
  const isTablet = hasCoarsePointer && width >= 768 && width < 1024;
  // Desktop: everything else
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    prefersReducedMotion,
    hasCoarsePointer,
    dpr,
    width,
    height,
  };
}

/**
 * Check if we should use reduced animations
 * Combines prefers-reduced-motion with mobile detection
 */
export function shouldReduceAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768)
  );
}

/**
 * Check if Lenis smooth scroll should be enabled
 * Disabled on mobile/touch devices for performance
 */
export function shouldUseLenis(): boolean {
  if (typeof window === 'undefined') return false;
  const info = getDeviceInfo();
  return info.isDesktop && !info.prefersReducedMotion;
}

/**
 * Get optimal nebula tier for current device
 * Returns a simplified tier config for mobile
 */
export function getNebulaTier(): {
  useWebGL: boolean;
  useCanvas2D: boolean;
  stars: number;
  dust: number;
  meteors: number;
  satellites: number;
  paperTraces: number;
  clusterPulse: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      useWebGL: true,
      useCanvas2D: false,
      stars: 360,
      dust: 140,
      meteors: 3,
      satellites: 2,
      paperTraces: 1,
      clusterPulse: true,
    };
  }

  const info = getDeviceInfo();

  if (info.isMobile) {
    return {
      useWebGL: true,
      useCanvas2D: true,
      stars: 60,
      dust: 20,
      meteors: 1,
      satellites: 0,
      paperTraces: 0,
      clusterPulse: false,
    };
  }

  if (info.isTablet) {
    return {
      useWebGL: true,
      useCanvas2D: true,
      stars: 120,
      dust: 40,
      meteors: 1,
      satellites: 1,
      paperTraces: 0,
      clusterPulse: false,
    };
  }

  // Desktop - use detectTier from nebula types
  return {
    useWebGL: true,
    useCanvas2D: true,
    stars: 360,
    dust: 140,
    meteors: 3,
    satellites: 2,
    paperTraces: 1,
    clusterPulse: true,
  };
}

/**
 * React hook for device info with reactive updates
 */
import { useEffect, useState } from 'react';

export function useDeviceInfo(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(() => getDeviceInfo());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateInfo = () => setInfo(getDeviceInfo());

    // Listen for resize
    window.addEventListener('resize', updateInfo);
    // Listen for prefers-reduced-motion changes
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', updateInfo);
    // Listen for pointer changes
    const pq = window.matchMedia('(pointer: coarse)');
    pq.addEventListener('change', updateInfo);

    return () => {
      window.removeEventListener('resize', updateInfo);
      mq.removeEventListener('change', updateInfo);
      pq.removeEventListener('change', updateInfo);
    };
  }, []);

  return info;
}