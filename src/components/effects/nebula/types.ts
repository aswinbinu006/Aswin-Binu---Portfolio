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
  satellites: number;
  paperTraces: number;
  clusterPulse: boolean;
  isMobile: boolean;
}

export const TIERS: Record<TierName, TierConfig> = {
  high: { dpr: 1.25, overlayDpr: 1.0, amp: 4, octaves: 2, dust: 40, stars: 420, meteors: 1, satellites: 1, paperTraces: 0, clusterPulse: false, isMobile: false },
  medium: { dpr: 1.0, overlayDpr: 0.85, amp: 3, octaves: 1, dust: 25, stars: 280, meteors: 1, satellites: 0, paperTraces: 0, clusterPulse: false, isMobile: false },
  low: { dpr: 0.75, overlayDpr: 0.75, amp: 2, octaves: 1, dust: 15, stars: 150, meteors: 0, satellites: 0, paperTraces: 0, clusterPulse: false, isMobile: true },
};

export function detectTier(): TierName {
  if (typeof window === 'undefined') return 'high';
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse || w < 768) return 'low';
  if (w < 1200 || cores <= 4) return 'medium';
  return 'high';
}

export interface Star {
  nx: number;
  ny: number;
  s: number;
  layer?: 1 | 2 | 3;
  twinkleSpeed?: number;
  twinkleOffset?: number;
  clusterId?: number;
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
  pts: { nx: number; ny: number; layer?: 1 | 2 | 3 }[];
  born: number;
  type?: 'standard' | 'extended' | 'neural' | 'graduation';
  duration?: number;
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

export interface Satellite {
  active: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  age: number;
  dur: number;
}

export interface PaperTrace {
  active: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  age: number;
  dur: number;
  pathHistory: { x: number; y: number }[];
}

export interface ClusterPulse {
  clusterId: number;
  active: boolean;
  born: number;
  duration: number;
}

export const HERO_SEEDS = [
  { nx: 0.483, ny: 0.464, snap: 8, len: 0.016, strength: 0.22, rgb: [255, 255, 255], spikes: [1, 0.9, 0.8, 0.95, 0.74, 0.86] },
  { nx: 0.973, ny: 0.461, snap: 8, len: 0.014, strength: 0.2, rgb: [255, 255, 255], spikes: [0.95, 0.78, 0.88, 1, 0.82, 0.7] },
  { nx: 0.22, ny: 0.78, snap: 0, len: 0.014, strength: 0.2, rgb: [255, 255, 255], spikes: [1, 0.85, 0.9, 0.75, 0.88, 0.8] },
] as const;

export const IMAGE_SOURCES = ['/nebula.webp', '/nebula.jpg'];
export const ZOOM = 1.06;
export const BREATH = 0.04;
export const BREATH_HZ = 0.7;
export const WARP_SPEED = 0.04;
export const CONSTELLATION_LIFE = 2.5;

// Full-bleed dark grey space background with upper and lower atmospheric cosmic glows
export const NEBULA_BG =
  'radial-gradient(1300px circle at 50% 38%, rgba(45, 52, 65, 0.28) 0%, rgba(20, 24, 32, 0.6) 55%, transparent 85%), radial-gradient(1000px circle at 50% 88%, rgba(38, 46, 58, 0.24) 0%, rgba(16, 20, 28, 0.55) 60%, transparent 85%), #090a0f';
