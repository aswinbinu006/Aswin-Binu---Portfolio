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
  high: { dpr: 2, overlayDpr: 1.5, amp: 6, octaves: 3, dust: 140, stars: 360, meteors: 3, satellites: 1, paperTraces: 1, clusterPulse: true, isMobile: false },
  medium: { dpr: 1.5, overlayDpr: 1.25, amp: 5, octaves: 3, dust: 90, stars: 220, meteors: 2, satellites: 1, paperTraces: 1, clusterPulse: true, isMobile: false },
  low: { dpr: 1, overlayDpr: 0.75, amp: 3, octaves: 1, dust: 20, stars: 60, meteors: 0, satellites: 0, paperTraces: 0, clusterPulse: false, isMobile: true },
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
  pts: { nx: number; ny: number }[];
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
  { nx: 0.483, ny: 0.464, snap: 8, len: 0.05, strength: 0.9, rgb: [255, 255, 255], spikes: [1, 0.9, 0.8, 0.95, 0.74, 0.86] },
  { nx: 0.973, ny: 0.461, snap: 8, len: 0.04, strength: 0.8, rgb: [225, 232, 240], spikes: [0.95, 0.78, 0.88, 1, 0.82, 0.7] },
  { nx: 0.821, ny: 0.007, snap: 5, len: 0.035, strength: 0.75, rgb: [245, 248, 252], spikes: [0.9, 0.85, 0.72, 1, 0.8, 0.9] },
  { nx: 0.575, ny: 0.55, snap: 0, len: 0.028, strength: 0.6, rgb: [175, 185, 200], spikes: [0.85, 0.7, 0.8, 0.9, 0.66, 0.75] },
  { nx: 0.397, ny: 0.631, snap: 8, len: 0.022, strength: 0.7, rgb: [230, 235, 245], spikes: [1, 0.72, 0.84, 0.9, 0.7, 0.8] },
  // Bottom-half hero stars ensuring rich cosmic energy in the lower screen
  { nx: 0.22, ny: 0.78, snap: 0, len: 0.036, strength: 0.85, rgb: [245, 248, 255], spikes: [1, 0.85, 0.9, 0.75, 0.88, 0.8] },
  { nx: 0.76, ny: 0.84, snap: 0, len: 0.032, strength: 0.8, rgb: [230, 238, 250], spikes: [0.9, 0.8, 1, 0.7, 0.85, 0.9] },
  { nx: 0.48, ny: 0.92, snap: 0, len: 0.026, strength: 0.75, rgb: [255, 255, 255], spikes: [0.85, 0.9, 0.75, 0.95, 0.7, 0.8] },
  { nx: 0.88, ny: 0.74, snap: 0, len: 0.028, strength: 0.7, rgb: [215, 225, 240], spikes: [0.8, 0.85, 0.9, 0.75, 0.7, 0.85] },
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
