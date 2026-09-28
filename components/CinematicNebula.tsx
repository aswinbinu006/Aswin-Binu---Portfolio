'use client';

/**
 * CinematicNebula — hybrid WebGL + Canvas background.
 *
 *  WebGL (OGL)  : the JWST photo as a full-screen texture. A fragment shader warps
 *                 it with low-frequency fBm UV displacement (4–8 px) and breathes
 *                 the luminance (±4 %) of the bright, whitish gas only. Stars are
 *                 masked out of the warp so they stay rigid and overlays stay aligned.
 *  Canvas 2D    : dust (3 depth bands), hero-star spikes, rare shooting stars and
 *                 click-only constellations. Everything is drawn from pre-rendered
 *                 sprites and positioned in IMAGE space, so it tracks the photo
 *                 through cover-fit, resize and scroll parallax.
 *
 * Setup:  npm i ogl
 * Assets: /public/nebula.webp (+ /public/nebula.jpg as fallback)
 *
 * Opt an element out of click-constellations with data-no-constellation.
 */

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import { ScrollTrigger } from '@/lib/gsap';

export interface NebulaControl {
  reveal: number;
  dissolve: number;
}

/* ────────────────────────────── tuning ────────────────────────────── */

const IMAGE_SOURCES = ['/nebula.webp', '/nebula.jpg'];
const ZOOM = 1.06; // slight over-scan so displacement + parallax never expose an edge
const BREATH = 0.04; // ±4 % luminance on bright gas
const BREATH_HZ = 0.7; // rad/s → ~9 s per breath
const WARP_SPEED = 0.04; // noise-time units / s → slow, ~25 s per lattice step
const CONSTELLATION_LIFE = 2.5; // seconds
const NEBULA_BG =
  'radial-gradient(900px circle at 50% 45%, rgba(15,76,129,0.45), transparent 65%), #020814';

type TierName = 'high' | 'medium' | 'low';
const TIERS: Record<
  TierName,
  { dpr: number; overlayDpr: number; amp: number; octaves: number; dust: number; stars: number }
> = {
  high: { dpr: 2, overlayDpr: 1.5, amp: 6, octaves: 3, dust: 130, stars: 360 },
  medium: { dpr: 1.5, overlayDpr: 1.25, amp: 5, octaves: 3, dust: 90, stars: 260 },
  low: { dpr: 1.25, overlayDpr: 1, amp: 4, octaves: 2, dust: 50, stars: 170 },
};

function detectTier(): TierName {
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse && w < 768) return 'low';
  if (coarse || w < 1100 || cores <= 4) return 'medium';
  return 'high';
}

/**
 * The five brightest stars, in normalised IMAGE coordinates (0–1, origin top-left)
 * measured on the 1200×694 export. `snap` = px radius (on the 640-wide analysis grid)
 * within which the seed is pulled onto the nearest detected luminance peak, so a
 * higher-res crop of the same image still lines up. `len` = spike length as a fraction
 * of the drawn image width. `spikes` = per-spike length/brightness variation, in the
 * order [90°, 150°, 210°, 270°, 330°, 30°].
 */
const HERO_SEEDS = [
  { nx: 0.483, ny: 0.464, snap: 8, len: 0.05, strength: 0.85, rgb: [255, 232, 190], spikes: [1, 0.9, 0.8, 0.95, 0.74, 0.86] },
  { nx: 0.973, ny: 0.461, snap: 8, len: 0.04, strength: 0.75, rgb: [200, 224, 255], spikes: [0.95, 0.78, 0.88, 1, 0.82, 0.7] },
  { nx: 0.821, ny: 0.007, snap: 5, len: 0.035, strength: 0.7, rgb: [235, 240, 255], spikes: [0.9, 0.85, 0.72, 1, 0.8, 0.9] },
  { nx: 0.575, ny: 0.55, snap: 0, len: 0.028, strength: 0.55, rgb: [190, 215, 255], spikes: [0.85, 0.7, 0.8, 0.9, 0.66, 0.75] },
  { nx: 0.397, ny: 0.631, snap: 8, len: 0.022, strength: 0.65, rgb: [210, 230, 255], spikes: [1, 0.72, 0.84, 0.9, 0.7, 0.8] },
] as const;

/* ───────────────────────────── shaders ───────────────────────────── */

const VERTEX = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const buildFragment = (octaves: number) => /* glsl */ `
precision highp float;
#define OCTAVES ${octaves}
uniform sampler2D tMap;
uniform sampler2D tMask;   // r = bright-gas weight, g = star protection
uniform vec2  uRes;        // CSS px
uniform float uImgAspect;
uniform float uZoom;
uniform vec2  uCenter;     // image centre in screen uv (parallax)
uniform float uTime;
uniform float uAmp;        // displacement amplitude, CSS px
uniform float uBreath;
uniform float uDim;
uniform float uVignette;
uniform float uPhoto;
varying vec2 vUv;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float v = 0.0, a = 0.5, n = 0.0;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    n += a;
    p = p * 2.02 + vec3(17.1, 3.7, 9.2);
    a *= 0.5;
  }
  return v / n;
}

// cover-fit (no distortion) + parallax centre
vec2 coverUv(vec2 p, float screenAspect) {
  vec2 sc = vec2(1.0);
  if (screenAspect > uImgAspect) sc.y = uImgAspect / screenAspect;
  else sc.x = screenAspect / uImgAspect;
  sc /= uZoom;
  return (p - uCenter) * sc + 0.5;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 pa = vUv * vec2(aspect, 1.0);

  vec4 m = texture2D(tMask, coverUv(vUv, aspect));
  float gas = m.r;
  float protect = m.g;

  // stars stay rigid; gas moves fully, the rest a little
  float w = (0.35 + 0.65 * gas) * (1.0 - protect);
  vec3 q = vec3(pa * 1.6, uTime * ${WARP_SPEED.toFixed(3)});
  vec2 d = (vec2(fbm(q), fbm(q + vec3(5.2, 1.3, 7.7))) - 0.5) * 3.2;
  vec2 uv = coverUv(vUv + (d * uAmp * w) / uRes, aspect);

  vec3 col = texture2D(tMap, uv).rgb;

  // luminance breathing on bright gas only, phase varies across the nebula
  float phase = fbm(vec3(pa * 1.1, 3.0 + uTime * 0.015)) * 6.2831853;
  col *= 1.0 + uBreath * sin(uTime * ${BREATH_HZ.toFixed(2)} + phase) * gas;

  float vig = smoothstep(0.35, 0.85, length(vUv - 0.5) * 1.4142);
  col *= (1.0 - uDim) * (1.0 - uVignette * vig);
  col *= uPhoto;
  gl_FragColor = vec4(col, 1.0);
}`;

/* ─────────────────────── image analysis (one-time) ─────────────────────── */

interface Star {
  nx: number;
  ny: number;
  s: number;
}

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function boxBlur(src: Float32Array, w: number, h: number, r: number): Float32Array {
  const tmp = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  const k = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0;
    for (let i = -r; i <= r; i++) sum += src[row + Math.min(w - 1, Math.max(0, i))];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = sum / k;
      sum += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let i = -r; i <= r; i++) sum += tmp[Math.min(h - 1, Math.max(0, i)) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / k;
      sum += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
  return out;
}

/**
 * Finds the real stars in the photo (sharp luminance peaks) and builds the mask
 * texture: R = bright whitish gas, G = star protection. Runs once at load on a
 * 640 px downsample (~15 ms).
 */
function analyzeImage(img: HTMLImageElement, maxStars: number) {
  const AW = 640;
  const AH = Math.max(1, Math.round((AW * img.naturalHeight) / img.naturalWidth));
  const c = document.createElement('canvas');
  c.width = AW;
  c.height = AH;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, AW, AH);
  let id: ImageData;
  try {
    id = ctx.getImageData(0, 0, AW, AH);
  } catch {
    return null;
  }
  const d = id.data;
  const N = AW * AH;
  const lum = new Float32Array(N);
  const gas = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const p = i * 4;
    const r = d[p] / 255;
    const g = d[p + 1] / 255;
    const b = d[p + 2] / 255;
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    lum[i] = y;
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const sat = maxC > 0 ? (maxC - minC) / maxC : 0;
    // bright, whitish gas: high luminance, low-to-mid saturation
    gas[i] = smooth(0.55, 0.85, y) * (1.0 - smooth(0.45, 0.85, sat));
  }

  // background estimate: wide blur of luminance
  const bg = boxBlur(lum, AW, AH, 8);
  const hp = new Float32Array(N);
  for (let i = 0; i < N; i++) hp[i] = Math.max(0, lum[i] - bg[i]);

  // local maxima = candidate stars
  const cands: Star[] = [];
  const W = AW;
  for (let y = 2; y < AH - 2; y++) {
    for (let x = 2; x < W - 2; x++) {
      const idx = y * W + x;
      const v = hp[idx];
      if (v < 0.08) continue;
      if (
        v >= hp[idx - 1] &&
        v >= hp[idx + 1] &&
        v >= hp[idx - W] &&
        v >= hp[idx + W] &&
        v >= hp[idx - W - 1] &&
        v >= hp[idx - W + 1] &&
        v >= hp[idx + W - 1] &&
        v >= hp[idx + W + 1]
      ) {
        cands.push({ nx: x / AW, ny: y / AH, s: Math.min(1, v * 3.5) });
      }
    }
  }

  // sort by score and apply non-maximum suppression (min distance 6 px on analysis grid)
  cands.sort((a, b) => b.s - a.s);
  const keep: Star[] = [];
  const minD = 6 / AW;
  const minD2 = minD * minD;
  for (const c of cands) {
    if (keep.length >= maxStars) break;
    let ok = true;
    for (const k of keep) {
      const dx = c.nx - k.nx;
      const dy = c.ny - k.ny;
      if (dx * dx + dy * dy < minD2) {
        ok = false;
        break;
      }
    }
    if (ok) keep.push(c);
  }

  // star protection map: sharp peaks painted as soft discs
  const prot = new Float32Array(N);
  const stamp = (cx: number, cy: number, r: number, strength: number) => {
    const r2 = r * r;
    const x0 = Math.max(0, Math.floor(cx - r));
    const x1 = Math.min(AW - 1, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const y1 = Math.min(AH - 1, Math.ceil(cy + r));
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const d2 = (x - cx) ** 2 + (y - cy) ** 2;
        if (d2 < r2) {
          const w = (1 - Math.sqrt(d2) / r) * strength;
          const idx = y * AW + x;
          if (w > prot[idx]) prot[idx] = w;
        }
      }
    }
  };
  for (const s of keep) stamp(s.nx * AW, s.ny * AH, 4 + s.s * 5, 0.85);
  for (const h of HERO_SEEDS) stamp(h.nx * AW, h.ny * AH, 14, 1.0);

  // smooth the gas mask slightly for natural falloff
  const gasSmooth = boxBlur(gas, AW, AH, 3);

  // paint the mask canvas: R = gas, G = star protection
  const maskImg = ctx.createImageData(AW, AH);
  const md = maskImg.data;
  for (let i = 0; i < N; i++) {
    const p = i * 4;
    md[p] = Math.round(Math.min(1, gasSmooth[i]) * 255);
    md[p + 1] = Math.round(Math.min(1, prot[i]) * 255);
    md[p + 2] = 0;
    md[p + 3] = 255;
  }
  ctx.putImageData(maskImg, 0, 0);

  return { stars: keep, cands, maskCanvas: c, aw: AW, ah: AH };
}

/* ────────────────────────── overlay sprite caches ────────────────────────── */

function makeSoftSprite(size: number, innerR: number, rgb: string) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, r * innerR, r, r, r);
  g.addColorStop(0, `rgba(${rgb}, 1)`);
  g.addColorStop(0.35, `rgba(${rgb}, 0.55)`);
  g.addColorStop(0.7, `rgba(${rgb}, 0.15)`);
  g.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

function makeHeroSprite(rgb: readonly [number, number, number], spikeScale: readonly number[]) {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const cx = S / 2;
  const cy = S / 2;
  const [r, g, b] = rgb;

  // core bloom
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
  core.addColorStop(0, `rgba(${r},${g},${b}, 1)`);
  core.addColorStop(0.18, `rgba(${r},${g},${b}, 0.7)`);
  core.addColorStop(0.5, `rgba(${r},${g},${b}, 0.18)`);
  core.addColorStop(1, `rgba(${r},${g},${b}, 0)`);
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, S, S);

  // 6 diffraction spikes
  ctx.save();
  ctx.translate(cx, cy);
  const angles = [90, 150, 210, 270, 330, 30];
  angles.forEach((deg, i) => {
    const sc = spikeScale[i] ?? 1;
    ctx.save();
    ctx.rotate((deg * Math.PI) / 180);
    const grad = ctx.createLinearGradient(0, 0, S * 0.46 * sc, 0);
    grad.addColorStop(0, `rgba(${r},${g},${b}, 0.95)`);
    grad.addColorStop(0.15, `rgba(${r},${g},${b}, 0.5)`);
    grad.addColorStop(0.55, `rgba(${r},${g},${b}, 0.12)`);
    grad.addColorStop(1, `rgba(${r},${g},${b}, 0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(S * 0.46 * sc, 0);
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = `rgba(${r},${g},${b}, 0.08)`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(S * 0.28 * sc, 0);
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
  return c;
}

/* ──────────────────────────────── component ──────────────────────────────── */

interface Dust {
  u: number; // 0–1 normalised screen pos
  v: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  depth: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

interface Hero {
  nx: number;
  ny: number;
  len: number;
  strength: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

interface Constellation {
  pts: { nx: number; ny: number }[];
  born: number;
}

export interface CinematicNebulaProps {
  /** 0–1 global darkening so foreground content stays readable. */
  dim?: number;
  /** 0–1 edge vignette strength. */
  vignette?: number;
  control?: React.MutableRefObject<NebulaControl>;
}

export default function CinematicNebula({ dim = 0.25, vignette = 0.5, control }: CinematicNebulaProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const dimRef = useRef(dim);
  const vigRef = useRef(vignette);
  dimRef.current = dim;
  vigRef.current = vignette;

  useEffect(() => {
    const host = hostRef.current;
    const overlay = overlayRef.current;
    const octx = overlay?.getContext('2d');
    if (!host || !overlay || !octx) return;

    let cancelled = false;
    const tier = TIERS[detectTier()];
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mqReduce.matches;

    // ── state
    let cssW = host.clientWidth || window.innerWidth;
    let cssH = host.clientHeight || window.innerHeight;
    let imgW = 1920;
    let imgH = 1080;
    let drawW = 0;
    let drawH = 0;
    let parallaxRange = 0;
    let parallaxY = 0;
    let scrollSm = window.scrollY;
    let maxScroll = 1;
    let lastMeasure = -1;
    let dprNow = Math.min(window.devicePixelRatio || 1, tier.dpr);
    let time = 0; // shader/motion clock (frozen under reduced motion)
    let wall = 0; // real clock (constellations, scheduling)
    let last = performance.now();
    let avg = 1 / 60;
    let lastAdapt = 0;
    let dirty = true;
    let raf = 0;
    let finalRenderDone = false;

    let stars: Star[] = [];
    let heroes: Hero[] = [];
    const constellations: Constellation[] = [];
    const uni: { renderer?: Renderer; program?: Program; mesh?: Mesh; ready: boolean; lost: boolean; shown: boolean } = {
      ready: false,
      lost: false,
      shown: false,
    };

    // ── sprites + dust (positions normalised → resize-safe)
    const sprites = {
      back: makeSoftSprite(32, 0.5, '205,222,250'),
      mid: makeSoftSprite(64, 0.15, '190,212,245'),
      front: makeSoftSprite(128, 0.0, '170,200,240'),
      glow: makeSoftSprite(64, 0.12, '190,220,255'),
    };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const dust: Dust[] = [];
    const nBack = Math.round(tier.dust * 0.6);
    const nMid = Math.round(tier.dust * 0.28);
    const nFront = tier.dust - nBack - nMid;
    const addDust = (n: number, sprite: HTMLCanvasElement, size: [number, number], alpha: [number, number], depth: [number, number], speed: number) => {
      for (let i = 0; i < n; i++) {
        dust.push({
          u: Math.random(),
          v: Math.random(),
          vx: rnd(-speed, speed),
          vy: rnd(-speed, speed),
          size: rnd(size[0], size[1]),
          alpha: rnd(alpha[0], alpha[1]),
          depth: rnd(depth[0], depth[1]),
          phase: Math.random() * 6.28,
          sprite,
        });
      }
    };
    addDust(nBack, sprites.back, [1.6, 3.2], [0.28, 0.55], [0.04, 0.1], 0.003);
    addDust(nMid, sprites.mid, [5, 10], [0.1, 0.18], [0.12, 0.22], 0.005);
    const backCount = dust.length;
    addDust(nFront, sprites.front, [16, 36], [0.04, 0.08], [0.3, 0.55], 0.008); // foreground haze, drawn above the stars

    // ── layout: MUST mirror coverUv() in the shader
    const layout = () => {
      const cover = Math.max(cssW / imgW, cssH / imgH) * ZOOM;
      drawW = imgW * cover;
      drawH = imgH * cover;
      const slackY = Math.max(0, (drawH - cssH) / 2 - tier.amp * 1.5);
      parallaxRange = Math.min(slackY * 0.9, cssH * 0.04);
    };
    const toScreen = (nx: number, ny: number) => ({
      x: cssW / 2 + (nx - 0.5) * drawW,
      y: cssH / 2 + parallaxY + (ny - 0.5) * drawH,
    });
    // overlay elements get the same dim + vignette the shader applies to the photo
    const gainAt = (x: number, y: number) => {
      const d = Math.hypot(x / cssW - 0.5, y / cssH - 0.5) * 1.4142;
      return (1 - dimRef.current) * (1 - vigRef.current * smooth(0.35, 0.85, d));
    };

    const applySize = () => {
      const { renderer, program } = uni;
      if (renderer) {
        renderer.dpr = dprNow;
        renderer.setSize(cssW, cssH);
        if (program) program.uniforms.uRes.value = [cssW, cssH];
      }
      const odpr = Math.min(window.devicePixelRatio || 1, tier.overlayDpr);
      overlay.width = Math.round(cssW * odpr);
      overlay.height = Math.round(cssH * odpr);
      overlay.style.width = cssW + 'px';
      overlay.style.height = cssH + 'px';
      octx.setTransform(odpr, 0, 0, odpr, 0, 0); // reset, then scale (never stacks)
      layout();
      dirty = true;
    };

    // ── GL init (after the image is decoded)
    const initGL = (img: HTMLImageElement, maskCanvas: HTMLCanvasElement) => {
      const renderer = new Renderer({ alpha: false, antialias: false, depth: false, dpr: dprNow, powerPreference: 'high-performance' });
      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity 1.4s ease';
      canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        uni.lost = true;
      });
      host.insertBefore(canvas, overlay);

      const gl2 = renderer.isWebgl2;
      const map = new Texture(gl, {
        image: img,
        generateMipmaps: gl2,
        minFilter: gl2 ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
      });
      const mask = new Texture(gl, {
        image: maskCanvas,
        generateMipmaps: false,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
      });
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: buildFragment(tier.octaves),
        depthTest: false,
        depthWrite: false,
        uniforms: {
          tMap: { value: map },
          tMask: { value: mask },
          uRes: { value: [cssW, cssH] },
          uImgAspect: { value: imgW / imgH },
          uZoom: { value: ZOOM },
          uCenter: { value: [0.5, 0.5] },
          uTime: { value: 0 },
          uAmp: { value: tier.amp },
          uBreath: { value: BREATH },
          uDim: { value: dimRef.current },
          uVignette: { value: vigRef.current },
          uPhoto: { value: 1.0 },
        },
      });
      uni.renderer = renderer;
      uni.program = program;
      uni.mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      uni.ready = true;
    };

    // ── hero stars: snap seeds onto the nearest detected peak
    const buildHeroes = (cands: Star[], aw: number, ah: number): Hero[] =>
      HERO_SEEDS.map((seed, i) => {
        let nx: number = seed.nx;
        let ny: number = seed.ny;
        if (seed.snap > 0) {
          let best: Star | null = null;
          for (const c of cands) {
            if (Math.hypot((c.nx - seed.nx) * aw, (c.ny - seed.ny) * ah) <= seed.snap && (!best || c.s > best.s)) best = c;
          }
          if (best) {
            nx = best.nx;
            ny = best.ny;
          }
        }
        return { nx, ny, len: seed.len, strength: seed.strength, phase: i * 1.7, sprite: makeHeroSprite(seed.rgb, seed.spikes) };
      });

    // ── load
    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.decoding = 'async';
        i.onload = () => res(i);
        i.onerror = () => rej(new Error(src));
        i.src = src;
      });
    const loadFirst = async (srcs: string[]) => {
      for (const s of srcs) {
        try {
          return await loadImage(s);
        } catch {
          /* try next source */
        }
      }
      throw new Error('CinematicNebula: no image could be loaded');
    };

    loadFirst(IMAGE_SOURCES)
      .then((img) => {
        if (cancelled) return;
        imgW = img.naturalWidth;
        imgH = img.naturalHeight;
        const a = analyzeImage(img, tier.stars);
        if (a) {
          stars = a.stars;
          heroes = buildHeroes(a.cands, a.aw, a.ah);
        } else {
          heroes = buildHeroes([], 640, 370);
        }
        try {
          const fallbackMask = document.createElement('canvas');
          fallbackMask.width = fallbackMask.height = 1;
          initGL(img, a ? a.maskCanvas : fallbackMask);
        } catch (err) {
          console.warn('CinematicNebula: WebGL unavailable, using static fallback.', err);
        }
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      })
      .catch(() => {
        if (cancelled) return;
        // no photo: keep the gradient backdrop, give constellations something to connect
        stars = Array.from({ length: tier.stars }, () => ({ nx: Math.random(), ny: Math.random(), s: 1 }));
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });

    // ── click-only constellations
    const spawnConstellation = (px: number, py: number) => {
      if (!stars.length) return;
      const k = 4 + Math.floor(Math.random() * 5); // 4–8
      const scr = stars
        .map((s) => ({ s, ...toScreen(s.nx, s.ny) }))
        .filter((o) => o.x > 8 && o.x < cssW - 8 && o.y > 8 && o.y < cssH - 8)
        .sort((a, b) => (a.x - px) ** 2 + (a.y - py) ** 2 - ((b.x - px) ** 2 + (b.y - py) ** 2));
      const picked: typeof scr = [];
      for (const o of scr) {
        if (picked.length >= k) break;
        if (picked.every((p) => Math.hypot(p.x - o.x, p.y - o.y) >= 30)) picked.push(o);
      }
      if (picked.length < 3) return;
      const chain = [picked.shift()!];
      while (picked.length) {
        const tail = chain[chain.length - 1];
        let bi = 0;
        let bd = Infinity;
        picked.forEach((p, i) => {
          const d = Math.hypot(p.x - tail.x, p.y - tail.y);
          if (d < bd) {
            bd = d;
            bi = i;
          }
        });
        chain.push(picked.splice(bi, 1)[0]);
      }
      constellations.push({ pts: chain.map((o) => ({ nx: o.s.nx, ny: o.s.ny })), born: wall });
      if (constellations.length > 3) constellations.shift();
      dirty = true;
    };
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const ctrl = control ? control.current : { reveal: 1, dissolve: 0 };
      if (ctrl.reveal < 0.5) return;
      const t = e.target as Element | null;
      if (t?.closest?.('a,button,input,textarea,select,summary,[role="button"],[data-no-constellation]')) return;
      spawnConstellation(e.clientX, e.clientY);
    };
    window.addEventListener('click', onClick);

    // ── shooting star
    const shoot = { active: false, age: 0, dur: 1, dx: 1, dy: 0, speed: 900, len: 160, x: 0, y: 0 };
    let nextShoot = 20 + Math.random() * 25;
    const spawnShoot = () => {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const ang = (rnd(25, 45) * Math.PI) / 180;
      Object.assign(shoot, {
        active: true,
        age: 0,
        dur: rnd(0.8, 1.2),
        dx: Math.cos(ang) * dir,
        dy: Math.sin(ang),
        speed: rnd(800, 1200),
        len: rnd(140, 240),
        x: dir > 0 ? rnd(0, cssW * 0.5) : rnd(cssW * 0.5, cssW),
        y: rnd(0, cssH * 0.4),
      });
    };

    // ── overlay drawing
    const drawDust = (from: number, to: number, dt: number, motion: number, sc: number) => {
      for (let i = from; i < to; i++) {
        const d = dust[i];
        d.u = (d.u + d.vx * dt * motion + 1) % 1;
        d.v = (d.v + d.vy * dt * motion + 1) % 1;
        const x = d.u * cssW;
        const y = (((d.v * cssH - sc * d.depth) % cssH) + cssH) % cssH;
        octx.globalAlpha = d.alpha * (0.7 + 0.3 * Math.sin(time * 0.6 + d.phase)) * gainAt(x, y);
        octx.drawImage(d.sprite, x - d.size / 2, y - d.size / 2, d.size, d.size);
      }
    };

    const drawHeroes = (dissolve: number) => {
      const heroSpikeAlpha = Math.max(0.4, 1.0 - 0.88 * dissolve);
      for (const h of heroes) {
        const p = toScreen(h.nx, h.ny);
        const len = h.len * drawW;
        if (p.x < -len || p.x > cssW + len || p.y < -len || p.y > cssH + len) continue;
        octx.globalAlpha = h.strength * heroSpikeAlpha * (0.82 + 0.18 * Math.sin(time * BREATH_HZ + h.phase)) * gainAt(p.x, p.y);
        octx.drawImage(h.sprite, p.x - len, p.y - len, len * 2, len * 2);
      }
    };

    const drawStars = (dissolve: number) => {
      const baseAlpha = smooth(0.15, 0.85, dissolve);
      if (baseAlpha <= 0.001) return;
      octx.fillStyle = 'rgb(247, 251, 255)';
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const p = toScreen(s.nx, s.ny);
        if (p.x < -10 || p.x > cssW + 10 || p.y < -10 || p.y > cssH + 10) continue;
        const twinkle = 0.75 + 0.25 * Math.sin(time * 1.5 + i * 2.37);
        const alpha = baseAlpha * twinkle * gainAt(p.x, p.y);
        const size = 0.8 + 1.4 * s.s; // 0.8 to 2.2 px scaled by star score
        octx.globalAlpha = Math.min(1, alpha);
        octx.beginPath();
        octx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
        octx.fill();
      }
    };

    const drawConstellations = () => {
      octx.lineCap = 'round';
      octx.lineJoin = 'round';
      for (let i = constellations.length - 1; i >= 0; i--) {
        const c = constellations[i];
        const age = wall - c.born;
        if (age >= CONSTELLATION_LIFE) {
          constellations.splice(i, 1);
          dirty = true;
          continue;
        }
        const fadeIn = reduced ? 1 : Math.min(1, age / 0.25);
        const fadeOut = age > CONSTELLATION_LIFE - 0.8 ? (CONSTELLATION_LIFE - age) / 0.8 : 1;
        const a = fadeIn * fadeOut;
        const last = c.pts.length - 1;
        const reveal = reduced ? last : Math.min(last, (age / 0.6) * last);
        const P = c.pts.map((p) => toScreen(p.nx, p.ny));

        const trace = () => {
          octx.beginPath();
          octx.moveTo(P[0].x, P[0].y);
          const full = Math.floor(reveal);
          for (let j = 1; j <= full; j++) octx.lineTo(P[j].x, P[j].y);
          const frac = reveal - full;
          if (frac > 0 && full + 1 <= last) {
            octx.lineTo(P[full].x + (P[full + 1].x - P[full].x) * frac, P[full].y + (P[full + 1].y - P[full].y) * frac);
          }
        };
        trace();
        octx.lineWidth = 4;
        octx.strokeStyle = `rgba(95,168,255,${0.1 * a})`;
        octx.stroke();
        trace();
        octx.lineWidth = 1;
        octx.strokeStyle = `rgba(190,220,255,${0.6 * a})`;
        octx.stroke();

        P.forEach((p, j) => {
          if (j > reveal + 0.001) return;
          octx.globalAlpha = a * 0.9;
          octx.drawImage(sprites.glow, p.x - 14, p.y - 14, 28, 28);
          octx.globalAlpha = a;
          octx.fillStyle = 'rgb(247,251,255)';
          octx.beginPath();
          octx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          octx.fill();
        });
        octx.globalAlpha = 1;
      }
    };

    const drawShoot = (dt: number) => {
      if (!shoot.active) {
        if (!reduced && wall >= nextShoot) spawnShoot();
        return;
      }
      shoot.age += dt;
      const t = shoot.age / shoot.dur;
      if (t >= 1) {
        shoot.active = false;
        nextShoot = wall + 25 + Math.random() * 35;
        return;
      }
      shoot.x += shoot.dx * shoot.speed * dt;
      shoot.y += shoot.dy * shoot.speed * dt;
      const a = Math.sin(Math.PI * t);
      const tx = shoot.x - shoot.dx * shoot.len;
      const ty = shoot.y - shoot.dy * shoot.len;
      const grad = octx.createLinearGradient(shoot.x, shoot.y, tx, ty);
      grad.addColorStop(0, `rgba(255,255,255,${0.9 * a})`);
      grad.addColorStop(1, 'rgba(95,168,255,0)');
      octx.strokeStyle = grad;
      octx.lineWidth = 1.4;
      octx.beginPath();
      octx.moveTo(shoot.x, shoot.y);
      octx.lineTo(tx, ty);
      octx.stroke();
    };

    // ── frame loop (time-based)
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      wall += dt;
      const motion = reduced ? 0 : 1;
      time += dt * motion;

      const ctrl = control ? control.current : { reveal: 1, dissolve: 0 };
      const reveal = typeof ctrl.reveal === 'number' ? Math.max(0, Math.min(1, ctrl.reveal)) : 1;
      const dissolve = typeof ctrl.dissolve === 'number' ? Math.max(0, Math.min(1, ctrl.dissolve)) : 0;

      // Set host element opacity to reveal each frame
      host.style.opacity = String(reveal);

      // If reveal < 0.01, skip WebGL and overlay rendering but keep loop scheduled
      if (reveal < 0.01) {
        return;
      }

      // reduced motion: the scene is static, so only redraw when something changed
      if (reduced && !dirty && constellations.length === 0) return;
      dirty = false;

      if (wall - lastMeasure > 0.5) {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        lastMeasure = wall;
      }
      scrollSm += (window.scrollY - scrollSm) * (1 - Math.exp(-dt * 6));
      parallaxY = reduced ? 0 : (0.5 - Math.min(1, Math.max(0, scrollSm / maxScroll))) * 2 * parallaxRange;

      // adaptive quality: shed resolution if frames run long
      if (!reduced) {
        avg += (dt - avg) * 0.05;
        if (uni.ready && wall > 3 && wall - lastAdapt > 4 && avg > 0.024 && dprNow > 1) {
          dprNow = Math.max(1, dprNow - 0.25);
          lastAdapt = wall;
          applySize();
        }
      }

      // WebGL layer: stop calling renderer.render when dissolve >= 0.999
      const { renderer, program, mesh } = uni;
      if (dissolve >= 0.999) {
        if (!finalRenderDone && uni.ready && renderer && program && mesh && !uni.lost) {
          const u = program.uniforms;
          u.uTime.value = time;
          u.uCenter.value = [0.5, 0.5 - parallaxY / cssH];
          u.uDim.value = dimRef.current;
          u.uVignette.value = vigRef.current;
          u.uPhoto.value = 1.0 - 0.88;
          u.uAmp.value = 0;
          u.uBreath.value = 0;
          renderer.render({ scene: mesh });
          finalRenderDone = true;
        }
      } else {
        finalRenderDone = false;
        if (uni.ready && renderer && program && mesh && !uni.lost) {
          const u = program.uniforms;
          u.uTime.value = time;
          u.uCenter.value = [0.5, 0.5 - parallaxY / cssH];
          u.uDim.value = dimRef.current;
          u.uVignette.value = vigRef.current;
          u.uPhoto.value = 1.0 - 0.88 * dissolve;
          u.uAmp.value = tier.amp * (1.0 - dissolve);
          u.uBreath.value = BREATH * (1.0 - dissolve);
          renderer.render({ scene: mesh });
          if (!uni.shown) {
            (renderer.gl.canvas as HTMLCanvasElement).style.opacity = '1';
            uni.shown = true;
          }
        }
      }

      // Canvas overlay
      octx.clearRect(0, 0, cssW, cssH);
      octx.globalCompositeOperation = 'lighter';
      const sc = reduced ? 0 : scrollSm;
      drawDust(0, backCount, dt, motion, sc);
      drawHeroes(dissolve);
      drawStars(dissolve);
      drawDust(backCount, dust.length, dt, motion, sc);
      octx.globalAlpha = 1;
      drawConstellations();
      drawShoot(dt);
      octx.globalAlpha = 1;
      octx.globalCompositeOperation = 'source-over';
    };
    raf = requestAnimationFrame(frame);

    // ── observers
    const ro = new ResizeObserver(() => {
      cssW = host.clientWidth || window.innerWidth;
      cssH = host.clientHeight || window.innerHeight;
      applySize();
    });
    ro.observe(host);
    const onMq = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      dirty = true;
    };
    mqReduce.addEventListener('change', onMq);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('click', onClick);
      mqReduce.removeEventListener('change', onMq);
      if (uni.renderer) {
        const gl = uni.renderer.gl;
        (gl.canvas as HTMLCanvasElement).remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: NEBULA_BG }}
    >
      {/* the WebGL canvas is inserted here by the effect, beneath the overlay */}
      <canvas ref={overlayRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
