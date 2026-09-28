export interface NebulaControl {
  reveal: number;
  dissolve: number;
  sectionIndex?: number;
  sectionProgress?: number;
}

export type TierName = 'high' | 'medium' | 'low';

export interface TierConfig {
  dpr: number;
  overlayDpr: number;
  amp: number;
  octaves: number;
  dust: number;
  stars: number;
  meteors: number;
  isMobile: boolean;
}

export const TIERS: Record<TierName, TierConfig> = {
  high: { dpr: 2, overlayDpr: 1.5, amp: 6, octaves: 3, dust: 140, stars: 360, meteors: 3, isMobile: false },
  medium: { dpr: 1.5, overlayDpr: 1.25, amp: 5, octaves: 3, dust: 90, stars: 220, meteors: 2, isMobile: false },
  low: { dpr: 1.25, overlayDpr: 1, amp: 4, octaves: 2, dust: 45, stars: 120, meteors: 1, isMobile: true },
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
  layer?: 1 | 2 | 3;
  twinkleSpeed?: number;
  twinkleOffset?: number;
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
  glintTime?: number;
  sprite: HTMLCanvasElement;
}

export interface Constellation {
  pts: { nx: number; ny: number }[];
  born: number;
}

export interface Meteor {
  active: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  len: number;
  age: number;
  dur: number;
  headRgb: string;
  tailRgb: string;
}

export const HERO_SEEDS = [
  { nx: 0.483, ny: 0.464, snap: 8, len: 0.05, strength: 0.9, rgb: [255, 255, 255], spikes: [1, 0.9, 0.8, 0.95, 0.74, 0.86] },
  { nx: 0.973, ny: 0.461, snap: 8, len: 0.04, strength: 0.8, rgb: [225, 232, 240], spikes: [0.95, 0.78, 0.88, 1, 0.82, 0.7] },
  { nx: 0.821, ny: 0.007, snap: 5, len: 0.035, strength: 0.75, rgb: [245, 248, 252], spikes: [0.9, 0.85, 0.72, 1, 0.8, 0.9] },
  { nx: 0.575, ny: 0.55, snap: 0, len: 0.028, strength: 0.6, rgb: [175, 185, 200], spikes: [0.85, 0.7, 0.8, 0.9, 0.66, 0.75] },
  { nx: 0.397, ny: 0.631, snap: 8, len: 0.022, strength: 0.7, rgb: [230, 235, 245], spikes: [1, 0.72, 0.84, 0.9, 0.7, 0.8] },
] as const;

export const IMAGE_SOURCES = ['/nebula.webp', '/nebula.jpg'];
export const ZOOM = 1.06;
export const BREATH = 0.04;
export const BREATH_HZ = 0.7;
export const WARP_SPEED = 0.04;
export const CONSTELLATION_LIFE = 2.5;

// Pure dark grey space background adhering to user's grey/neutral theme
export const NEBULA_BG =
  'radial-gradient(1100px circle at 50% 45%, rgba(40, 45, 55, 0.25), rgba(18, 20, 26, 0.6) 60%, transparent 85%), #090a0d';

