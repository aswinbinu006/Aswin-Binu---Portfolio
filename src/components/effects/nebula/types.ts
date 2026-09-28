export interface NebulaControl {
  reveal: number;
  dissolve: number;
}

export type TierName = 'high' | 'medium' | 'low';

export interface TierConfig {
  dpr: number;
  overlayDpr: number;
  amp: number;
  octaves: number;
  dust: number;
  stars: number;
}

export const TIERS: Record<TierName, TierConfig> = {
  high: { dpr: 2, overlayDpr: 1.5, amp: 6, octaves: 3, dust: 130, stars: 360 },
  medium: { dpr: 1.5, overlayDpr: 1.25, amp: 5, octaves: 3, dust: 90, stars: 260 },
  low: { dpr: 1.25, overlayDpr: 1, amp: 4, octaves: 2, dust: 50, stars: 170 },
};

export function detectTier(): TierName {
  if (typeof window === 'undefined') return 'high';
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse && w < 768) return 'low';
  if (coarse || w < 1100 || cores <= 4) return 'medium';
  return 'high';
}

export interface Star {
  nx: number;
  ny: number;
  s: number;
}

export interface Hero {
  nx: number;
  ny: number;
  len: number;
  strength: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

export interface Dust {
  u: number;
  v: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  depth: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

export interface Constellation {
  pts: { nx: number; ny: number }[];
  born: number;
}

export const HERO_SEEDS = [
  { nx: 0.483, ny: 0.464, snap: 8, len: 0.05, strength: 0.85, rgb: [255, 205, 100], spikes: [1, 0.9, 0.8, 0.95, 0.74, 0.86] },
  { nx: 0.973, ny: 0.461, snap: 8, len: 0.04, strength: 0.75, rgb: [255, 180, 60], spikes: [0.95, 0.78, 0.88, 1, 0.82, 0.7] },
  { nx: 0.821, ny: 0.007, snap: 5, len: 0.035, strength: 0.7, rgb: [255, 220, 120], spikes: [0.9, 0.85, 0.72, 1, 0.8, 0.9] },
  { nx: 0.575, ny: 0.55, snap: 0, len: 0.028, strength: 0.55, rgb: [255, 170, 40], spikes: [0.85, 0.7, 0.8, 0.9, 0.66, 0.75] },
  { nx: 0.397, ny: 0.631, snap: 8, len: 0.022, strength: 0.65, rgb: [255, 210, 80], spikes: [1, 0.72, 0.84, 0.9, 0.7, 0.8] },
] as const;

export const IMAGE_SOURCES = ['/nebula.webp', '/nebula.jpg'];
export const ZOOM = 1.06;
export const BREATH = 0.04;
export const BREATH_HZ = 0.7;
export const WARP_SPEED = 0.04;
export const CONSTELLATION_LIFE = 2.5;
// Updated nebula background to warm gold/amber palette with black-void base
export const NEBULA_BG =
  'radial-gradient(900px circle at 50% 45%, rgba(246, 195, 67, 0.12), transparent 70%), #090a0d';
