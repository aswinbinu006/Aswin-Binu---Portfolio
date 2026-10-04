import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import { ScrollTrigger } from '@/utils/gsap';
import {
  NebulaControl,
  TIERS,
  detectTier,
  HERO_SEEDS,
  IMAGE_SOURCES,
  ZOOM,
  BREATH,
  BREATH_HZ,
  CONSTELLATION_LIFE,
  NEBULA_BG,
  Star,
  Hero,
  Dust,
  Constellation,
  Meteor,
  Satellite,
  PaperTrace,
  ClusterPulse,
} from './types';
import { VERTEX, buildFragment } from './shaders';
import { smooth, analyzeImage } from './analyzeImage';
import { makeSoftSprite, makeHeroSprite } from './sprites';
import { getNebulaTier, shouldReduceAnimations } from '@/utils/device';

export type { NebulaControl };

export interface CinematicNebulaProps {
  dim?: number;
  vignette?: number;
  control?: React.MutableRefObject<NebulaControl>;
}

/**
 * CSS-only starfield for mobile/low-end devices
 * Lightweight static background with subtle twinkling via CSS animation
 */
function MobileStarfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        background: NEBULA_BG,
      }}
    >
      {/* Static starfield disabled for clean, non-cluttered cosmic background */}
      <style>{`
        .starfield {
          display: none;
        }
      `}</style>
      <div className="starfield" />
    </div>
  );
}

// Section-dependent ambient cosmic tint palette across 7 chapters:
// [r, g, b, alpha] - Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
const SECTION_TINTS: [number, number, number, number][] = [
  [180, 195, 215, 0.02],  // Hero: Silver Starlight
  [148, 163, 184, 0.025], // About: Neutral Slate Grey
  [160, 175, 195, 0.022], // Skills: Platinum Nebula
  [120, 135, 155, 0.025], // Projects: Deep Technical Slate
  [140, 155, 175, 0.02],  // Gallery: Curated Graphite
  [155, 170, 190, 0.022], // Academics: Archival Slate Starlight
  [180, 195, 215, 0.025], // Contact: Horizon Silver
];

export default function CinematicNebula({
  dim = 0.25,
  vignette = 0.5,
  control,
}: CinematicNebulaProps) {
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

    // ── state & dimensions
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
    let time = 0;
    let wall = 0;
    let last = performance.now();
    let isTabVisible = !document.hidden;

    let stars: Star[] = [];
    let heroes: Hero[] = [];
    const uni: {
      renderer?: Renderer;
      program?: Program;
      mesh?: Mesh;
      ready: boolean;
      lost: boolean;
      shown: boolean;
    } = {
      ready: false,
      lost: false,
      shown: false,
    };

    // ── Sprites matching pure brilliant diamond starlight white palette
    const sprites = {
      back: makeSoftSprite(32, 0.3, '235,245,255'),
      mid: makeSoftSprite(64, 0.1, '245,250,255'),
      front: makeSoftSprite(128, 0.0, '255,255,255'),
      glow: makeSoftSprite(64, 0.08, '255,255,255'),
      blueGlow: makeSoftSprite(64, 0.12, '240,248,255'),
      white: makeSoftSprite(48, 0.15, '255,255,255'),
    };

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // ── Dust system with natural passive drift
    const dust: Dust[] = [];
    const nBack = Math.round(tier.dust * 0.6);
    const nMid = Math.round(tier.dust * 0.28);
    const nFront = tier.dust - nBack - nMid;

    const addDust = (
      n: number,
      sprite: HTMLCanvasElement,
      size: [number, number],
      alpha: [number, number],
      depth: [number, number],
      speed: number
    ) => {
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
          glintTime: Math.random() < 0.18 ? rnd(3, 14) : undefined,
          sprite,
        });
      }
    };

    addDust(nBack, sprites.back, [1.5, 2.8], [0.14, 0.28], [0.03, 0.08], 0.003);
    addDust(nMid, sprites.mid, [3.5, 8], [0.05, 0.10], [0.1, 0.2], 0.005);
    const backCount = dust.length;
    addDust(nFront, sprites.front, [12, 28], [0.02, 0.04], [0.25, 0.45], 0.008);

    // ── Rare Ambient Events Management
    // Only enable rare events if configured
    const enableMeteors = tier.meteors > 0;
    const enableSatellites = tier.satellites > 0;
    const enablePaperTraces = tier.paperTraces > 0;
    const enableClusterPulse = tier.clusterPulse;

    // 1. Meteors (rare: every 35 to 75 seconds)
    const meteors: Meteor[] = [];
    let nextMeteorTime = rnd(35, 65);

    const spawnMeteor = () => {
      if (reduced || !enableMeteors) return;
      if (meteors.filter((m) => m.active).length >= tier.meteors) return;

      const direction = Math.random() < 0.5 ? 1 : -1;
      const angleRad = (rnd(25, 38) * Math.PI) / 180;
      const speed = rnd(1000, 1500);
      const len = rnd(190, 300);
      const duration = rnd(0.75, 1.1);

      const spawnX = direction > 0 ? rnd(-80, cssW * 0.4) : rnd(cssW * 0.6, cssW + 80);
      const spawnY = rnd(-30, cssH * 0.5);

      meteors.push({
        active: true,
        x: spawnX,
        y: spawnY,
        dx: Math.cos(angleRad) * direction,
        dy: Math.sin(angleRad),
        speed,
        len,
        age: 0,
        dur: duration,
        headRgb: '255, 255, 255',
        tailRgb: '180, 205, 240',
      });

      nextMeteorTime = wall + rnd(45, 80);
    };

    // 2. Satellite Flyby (very rare: every 90 to 160 seconds)
    const satellites: Satellite[] = [];
    let nextSatelliteTime = rnd(75, 120);

    const spawnSatellite = () => {
      if (reduced || !enableSatellites) return;
      if (satellites.filter((s) => s.active).length >= tier.satellites) return;

      const startY = rnd(cssH * 0.15, cssH * 0.85);
      const endY = startY + rnd(-80, 80);
      const duration = rnd(12, 18);
      const speed = (cssW + 100) / duration;

      satellites.push({
        active: true,
        x: -50,
        y: startY,
        dx: 1,
        dy: (endY - startY) / (cssW + 100),
        speed,
        age: 0,
        dur: duration,
      });

      nextSatelliteTime = wall + rnd(100, 180);
    };

    // 3. Paper Trace (Discovery 04 - rare gliding light trace: every 110 to 190s)
    const paperTraces: PaperTrace[] = [];
    let nextPaperTraceTime = rnd(90, 150);

    const spawnPaperTrace = () => {
      if (reduced || !enablePaperTraces) return;
      if (paperTraces.filter((p) => p.active).length >= tier.paperTraces) return;

      const duration = rnd(8, 12);
      paperTraces.push({
        active: true,
        x: -40,
        y: rnd(cssH * 0.2, cssH * 0.6),
        dx: 1,
        dy: 0.25,
        speed: (cssW + 80) / duration,
        age: 0,
        dur: duration,
        pathHistory: [],
      });

      nextPaperTraceTime = wall + rnd(130, 220);
    };

    // 4. Star Cluster Response (synchronized subtle shimmer)
    let clusterPulse: ClusterPulse | null = null;
    let nextClusterTime = rnd(50, 90);

    const checkClusterPulse = () => {
      if (reduced || !enableClusterPulse) return;
      if (wall >= nextClusterTime && !clusterPulse) {
        clusterPulse = {
          clusterId: Math.floor(Math.random() * 4) + 1,
          active: true,
          born: wall,
          duration: 3.5,
        };
        nextClusterTime = wall + rnd(60, 110);
      }
      if (clusterPulse && wall - clusterPulse.born > clusterPulse.duration) {
        clusterPulse = null;
      }
    };

    // ── Layout calculations (Completely stationary, full-cover background)
    const layout = () => {
      const cover = Math.max(cssW / imgW, cssH / imgH) * ZOOM;
      drawW = imgW * cover;
      drawH = imgH * cover;
      parallaxRange = 0;
      parallaxY = 0;
    };

    const toScreen = (nx: number, ny: number, _layer: 1 | 2 | 3 = 2) => {
      return {
        x: cssW / 2 + (nx - 0.5) * drawW,
        y: cssH / 2 + (ny - 0.5) * drawH,
      };
    };

    const gainAt = (x: number, y: number) => {
      const d = Math.hypot(x / cssW - 0.5, y / cssH - 0.5) * 1.4142;
      // In darker peripheral/deep-space regions, boost star intensity and contrast
      const darkRegionBoost = 1.0 + 0.45 * smooth(0.35, 1.1, d);
      return Math.min(1.35, darkRegionBoost * (1 - dimRef.current * 0.1));
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
      octx.setTransform(odpr, 0, 0, odpr, 0, 0);
      layout();
    };

    // ── Tab Visibility Listener
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        last = performance.now();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ── GL init
    const initGL = (img: HTMLImageElement, maskCanvas: HTMLCanvasElement) => {
      const renderer = new Renderer({
        alpha: false,
        antialias: false,
        depth: false,
        dpr: dprNow,
        powerPreference: 'high-performance',
      });
      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.cssText = 'position:absolute;inset:0;opacity:1;';
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

    const buildHeroes = (cands: Star[], aw: number, ah: number): Hero[] =>
      HERO_SEEDS.map((seed, i) => {
        let nx: number = seed.nx;
        let ny: number = seed.ny;
        if (seed.snap > 0) {
          let best: Star | null = null;
          for (const c of cands) {
            if (Math.hypot((c.nx - seed.nx) * aw, (c.ny - seed.ny) * ah) <= seed.snap && (!best || c.s > best.s))
              best = c;
          }
          if (best) {
            nx = best.nx;
            ny = best.ny;
          }
        }
        return {
          nx,
          ny,
          len: seed.len,
          strength: seed.strength,
          phase: i * 1.7,
          sprite: makeHeroSprite(seed.rgb, seed.spikes),
        };
      });

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
          // try next
        }
      }
      throw new Error('CinematicNebula: no image loaded');
    };

    loadFirst(IMAGE_SOURCES)
      .then((img) => {
        if (cancelled) return;
        imgW = img.naturalWidth;
        imgH = img.naturalHeight;
        const a = analyzeImage(img, tier.stars);
        if (a) {
          stars = a.stars.map((s, idx) => {
            const rand = (idx * 37) % 100;
            const layer: 1 | 2 | 3 = rand < 60 ? 1 : rand < 90 ? 2 : 3;
            return {
              nx: s.nx,
              ny: s.ny,
              s: s.s * 0.75,
              layer,
              twinkleSpeed: layer === 1 ? rnd(0.4, 0.8) : layer === 2 ? rnd(0.8, 1.2) : rnd(1.2, 1.6),
              twinkleOffset: idx * 1.618,
              clusterId: (idx % 4) + 1,
            };
          });
          heroes = buildHeroes(a.cands, a.aw, a.ah);
        } else {
          heroes = buildHeroes([], 640, 370);
        }
        try {
          const fallbackMask = document.createElement('canvas');
          fallbackMask.width = fallbackMask.height = 1;
          initGL(img, a ? a.maskCanvas : fallbackMask);
        } catch (err) {
          console.warn('CinematicNebula: WebGL unavailable', err);
        }
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      })
      .catch(() => {
        if (cancelled) return;
        stars = Array.from({ length: Math.round(tier.stars * 1.8) }, (_, idx) => {
          const rand = (idx * 37) % 100;
          const layer: 1 | 2 | 3 = rand < 45 ? 1 : rand < 80 ? 2 : 3;
          return {
            nx: Math.random(),
            ny: Math.random(),
            s: 0.6 + Math.random() * 0.6,
            layer,
            twinkleSpeed: layer === 1 ? rnd(0.6, 1.1) : layer === 2 ? rnd(1.1, 1.8) : rnd(1.8, 2.8),
            twinkleOffset: idx * 1.618,
            clusterId: (idx % 5) + 1,
          };
        });
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });

    // ── Drawing Dust (Atmospheric space particles without cursor tracking)
    const drawDust = (from: number, to: number, dt: number, motion: number, sc: number) => {
      for (let i = from; i < to; i++) {
        const d = dust[i];
        d.u = (d.u + d.vx * dt * motion + 1) % 1;
        d.v = (d.v + d.vy * dt * motion + 1) % 1;
        const x = d.u * cssW;
        const y = (((d.v * cssH - sc * d.depth) % cssH) + cssH) % cssH;

        const alpha = d.alpha * (0.6 + 0.25 * Math.sin(time * 0.5 + d.phase)) * gainAt(x, y);
        octx.globalAlpha = Math.min(0.6, alpha);
        octx.drawImage(d.sprite, x - d.size / 2, y - d.size / 2, d.size, d.size);
      }
    };

    // ── Drawing 3-Depth Starfield (Subtle, elegant starlight shimmer)
    const drawStars = (dissolve: number) => {
      const baseAlpha = 0.42 + 0.18 * smooth(0.05, 0.65, dissolve);
      const isClusterActive = clusterPulse?.active ?? false;
      const activeClusterId = clusterPulse?.clusterId;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const p = toScreen(s.nx, s.ny, s.layer);

        if (p.x < -15 || p.x > cssW + 15 || p.y < -15 || p.y > cssH + 15) continue;

        let speed = s.twinkleSpeed ?? 0.8;
        let offset = s.twinkleOffset ?? (i * 1.618);

        // Star Cluster Shimmer Synchronization
        if (isClusterActive && s.clusterId === activeClusterId && clusterPulse) {
          const clusterProgress = (wall - clusterPulse.born) / clusterPulse.duration;
          const clusterGlow = Math.sin(clusterProgress * Math.PI) * 0.2;
          speed = 1.4;
          offset = 0;
          baseAlpha + clusterGlow;
        }

        const rawTwinkle = Math.sin(time * speed + offset);
        const twinkle = 0.85 + 0.15 * rawTwinkle;
        const alpha = Math.min(0.85, baseAlpha * twinkle * gainAt(p.x, p.y));

        let size = 0.9;
        if (s.layer === 1) {
          size = 0.7 + s.s * 0.4;
          octx.fillStyle = 'rgba(215, 230, 250, 0.75)';
        } else if (s.layer === 2) {
          size = 1.1 + s.s * 0.5;
          octx.fillStyle = 'rgba(240, 248, 255, 0.85)';
          if (!reduced) {
            octx.globalAlpha = alpha * 0.1;
            octx.drawImage(sprites.glow, p.x - 4, p.y - 4, 8, 8);
          }
        } else {
          size = 1.5 + s.s * 0.6;
          octx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          if (!reduced) {
            octx.globalAlpha = alpha * 0.15;
            octx.drawImage(sprites.glow, p.x - 6, p.y - 6, 12, 12);
          }
        }

        octx.globalAlpha = alpha;
        octx.beginPath();
        octx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
        octx.fill();
      }
    };

    const drawHeroes = (dissolve: number) => {
      const heroSpikeAlpha = Math.max(0.3, 0.8 - 0.6 * dissolve);
      for (const h of heroes) {
        const p = toScreen(h.nx, h.ny, 3);
        const len = h.len * drawW;
        if (p.x < -len || p.x > cssW + len || p.y < -len || p.y > cssH + len) continue;
        octx.globalAlpha =
          h.strength *
          heroSpikeAlpha *
          0.38 *
          (0.88 + 0.12 * Math.sin(time * BREATH_HZ + h.phase)) *
          gainAt(p.x, p.y);
        octx.drawImage(h.sprite, p.x - len, p.y - len, len * 2, len * 2);
      }
    };

    // ── Drawing Meteors with glowing trails (Controlled Rare Event)
    const drawMeteors = (dt: number) => {
      if (reduced || !enableMeteors) return;

      if (wall >= nextMeteorTime) {
        spawnMeteor();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) {
          meteors.splice(i, 1);
          continue;
        }

        m.age += dt;
        const progress = m.age / m.dur;
        if (progress >= 1) {
          m.active = false;
          meteors.splice(i, 1);
          continue;
        }

        m.x += m.dx * m.speed * dt;
        m.y += m.dy * m.speed * dt;

        const alphaCurve = Math.sin(Math.PI * progress);
        const tailX = m.x - m.dx * m.len;
        const tailY = m.y - m.dy * m.len;

        const trailGrad = octx.createLinearGradient(m.x, m.y, tailX, tailY);
        trailGrad.addColorStop(0, `rgba(${m.headRgb}, ${0.95 * alphaCurve})`);
        trailGrad.addColorStop(0.3, `rgba(${m.tailRgb}, ${0.65 * alphaCurve})`);
        trailGrad.addColorStop(1, 'rgba(100, 116, 139, 0)');

        octx.strokeStyle = trailGrad;
        octx.lineWidth = 3.2;
        octx.beginPath();
        octx.moveTo(m.x, m.y);
        octx.lineTo(tailX, tailY);
        octx.stroke();

        octx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alphaCurve})`;
        octx.lineWidth = 1.1;
        octx.beginPath();
        octx.moveTo(m.x, m.y);
        octx.lineTo(m.x - m.dx * (m.len * 0.4), m.y - m.dy * (m.len * 0.4));
        octx.stroke();
      }
    };

    // ── Drawing Satellites (Rare Ambient Event)
    const drawSatellites = (dt: number) => {
      if (reduced || !enableSatellites) return;

      if (wall >= nextSatelliteTime) {
        spawnSatellite();
      }

      for (let i = satellites.length - 1; i >= 0; i--) {
        const s = satellites[i];
        if (!s.active) {
          satellites.splice(i, 1);
          continue;
        }

        s.age += dt;
        const progress = s.age / s.dur;
        if (progress >= 1 || s.x > cssW + 60) {
          s.active = false;
          satellites.splice(i, 1);
          continue;
        }

        s.x += s.speed * dt;
        s.y += s.dy * s.speed * dt;

        const alphaCurve = Math.min(1, Math.sin(Math.PI * progress) * 1.5);
        octx.globalAlpha = 0.45 * alphaCurve;
        octx.fillStyle = '#e2e8f0';
        octx.beginPath();
        octx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        octx.fill();

        // Tiny starlight beacon blink
        if (Math.sin(wall * 3.5) > 0.8) {
          octx.globalAlpha = 0.7 * alphaCurve;
          octx.fillStyle = '#5FA8FF';
          octx.beginPath();
          octx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
          octx.fill();
        }
      }
    };

    // ── Drawing Discovery 04: Paper Trace (Rare gliding aerodynamic starlight silhouette)
    const drawPaperTraces = (dt: number) => {
      if (reduced || !enablePaperTraces) return;

      if (wall >= nextPaperTraceTime) {
        spawnPaperTrace();
      }

      for (let i = paperTraces.length - 1; i >= 0; i--) {
        const pt = paperTraces[i];
        if (!pt.active) {
          paperTraces.splice(i, 1);
          continue;
        }

        pt.age += dt;
        const progress = pt.age / pt.dur;
        if (progress >= 1 || pt.x > cssW + 80) {
          pt.active = false;
          paperTraces.splice(i, 1);
          continue;
        }

        // Gentle sinusoidal aerodynamic curve
        pt.x += pt.speed * dt;
        pt.y += Math.sin(progress * Math.PI * 3) * 35 * dt + pt.dy * pt.speed * dt;

        pt.pathHistory.push({ x: pt.x, y: pt.y });
        if (pt.pathHistory.length > 25) pt.pathHistory.shift();

        const alphaCurve = Math.sin(Math.PI * progress);

        // Faint dissipating trailing wake
        if (pt.pathHistory.length > 2) {
          octx.beginPath();
          octx.moveTo(pt.pathHistory[0].x, pt.pathHistory[0].y);
          for (let j = 1; j < pt.pathHistory.length; j++) {
            octx.lineTo(pt.pathHistory[j].x, pt.pathHistory[j].y);
          }
          octx.strokeStyle = `rgba(95, 168, 255, ${0.18 * alphaCurve})`;
          octx.lineWidth = 1;
          octx.stroke();
        }

        // Paper Plane Silhouette Vector
        octx.save();
        octx.translate(pt.x, pt.y);
        const heading = Math.atan2(
          pt.pathHistory.length >= 2
            ? pt.y - pt.pathHistory[pt.pathHistory.length - 2].y
            : pt.dy,
          pt.speed * dt
        );
        octx.rotate(heading);

        octx.strokeStyle = `rgba(240, 245, 255, ${0.85 * alphaCurve})`;
        octx.lineWidth = 1;
        octx.beginPath();
        octx.moveTo(8, 0);   // nose
        octx.lineTo(-6, -4); // left wing
        octx.lineTo(-2, 0);  // center fold
        octx.lineTo(-6, 4);  // right wing
        octx.closePath();
        octx.stroke();

        octx.restore();
      }
    };

    // ── Click Constellations (Original Natural Polygonal Star-to-Star Chain)
    const constellations: Constellation[] = [];

    const spawnConstellation = (px: number, py: number) => {
      if (!stars.length) return;
      const k = 4 + Math.floor(Math.random() * 2); // 4 to 5 nearby stars
      const scr = stars
        .map((s) => ({ s, ...toScreen(s.nx, s.ny, s.layer) }))
        .filter((o) => o.x > 12 && o.x < cssW - 12 && o.y > 12 && o.y < cssH - 12)
        .sort((a, b) => (a.x - px) ** 2 + (a.y - py) ** 2 - ((b.x - px) ** 2 + (b.y - py) ** 2));

      const picked: typeof scr = [];
      for (const o of scr) {
        if (picked.length >= k) break;
        // Ensure elegant spatial separation between constellation stars
        if (picked.every((p) => Math.hypot(p.x - o.x, p.y - o.y) >= 28)) {
          picked.push(o);
        }
      }
      if (picked.length < 3) return;

      // Connect star-to-star in a celestial path/chain (Star 1 -> Star 2 -> Star 3 -> Star 4 -> Star 5)
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

      constellations.push({
        pts: chain.map((o) => ({ nx: o.s.nx, ny: o.s.ny, layer: o.s.layer })),
        born: wall,
      });
      if (constellations.length > 3) constellations.shift();
    };

    const onPointerDown = (e: MouseEvent | TouchEvent | PointerEvent) => {
      const ctrl = control ? control.current : { reveal: 1, dissolve: 0 };
      if (ctrl.reveal < 0.3) return;
      const t = e.target as Element | null;
      if (t?.closest?.('a,button,input,textarea,select,summary,[role="button"],[data-no-constellation]')) return;

      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return;

      spawnConstellation(clientX, clientY);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    // ── Draw Interactive Constellations (Matching original celestial glow aesthetic)
    const drawConstellations = () => {
      octx.lineCap = 'round';
      octx.lineJoin = 'round';
      for (let i = constellations.length - 1; i >= 0; i--) {
        const c = constellations[i];
        const age = wall - c.born;
        if (age >= CONSTELLATION_LIFE) {
          constellations.splice(i, 1);
          continue;
        }
        const fadeIn = reduced ? 1 : Math.min(1, age / 0.25);
        const fadeOut = age > CONSTELLATION_LIFE - 0.7 ? (CONSTELLATION_LIFE - age) / 0.7 : 1;
        const a = fadeIn * fadeOut;
        const lastPt = c.pts.length - 1;
        const revealPt = reduced ? lastPt : Math.min(lastPt, (age / 0.55) * lastPt);
        const P = c.pts.map((p) => toScreen(p.nx, p.ny, p.layer));

        const trace = () => {
          octx.beginPath();
          octx.moveTo(P[0].x, P[0].y);
          const full = Math.floor(revealPt);
          for (let j = 1; j <= full; j++) octx.lineTo(P[j].x, P[j].y);
          const frac = revealPt - full;
          if (frac > 0 && full + 1 <= lastPt) {
            octx.lineTo(P[full].x + (P[full + 1].x - P[full].x) * frac, P[full].y + (P[full + 1].y - P[full].y) * frac);
          }
        };

        // Outer starlight glow beam
        trace();
        octx.lineWidth = 3.5;
        octx.strokeStyle = `rgba(255, 255, 255, ${0.22 * a})`;
        octx.stroke();

        // Inner crisp white constellation line
        trace();
        octx.lineWidth = 1.2;
        octx.strokeStyle = `rgba(255, 255, 255, ${0.85 * a})`;
        octx.stroke();

        // Radiant star node halos and crisp starlight cores (Image 2 design)
        P.forEach((p, j) => {
          if (j > revealPt + 0.001) return;
          octx.globalAlpha = a * 0.95;
          octx.drawImage(sprites.glow, p.x - 18, p.y - 18, 36, 36);
          octx.globalAlpha = a;
          octx.fillStyle = '#ffffff';
          octx.beginPath();
          octx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
          octx.fill();
        });
        octx.globalAlpha = 1;
      }
    };

    // ── Draw Section Ambient Color Shift
    const drawSectionColorShift = (secIdx: number) => {
      const tint = SECTION_TINTS[Math.min(secIdx, SECTION_TINTS.length - 1)] || SECTION_TINTS[0];
      octx.fillStyle = `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${tint[3]})`;
      octx.fillRect(0, 0, cssW, cssH);
    };

    // ── Single RequestAnimationFrame Loop
    let rafId = 0;
    let currentDissolve = 0;
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);

      if (!isTabVisible) return;

      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      wall += dt;
      const motion = reduced ? 0 : 1;
      time += dt * motion;

      if (wall - lastMeasure > 0.5) {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        lastMeasure = wall;
      }
      parallaxY = 0;

      const scrollFrac = Math.min(1, Math.max(0, scrollSm / maxScroll));
      const ctrl = control ? control.current : { reveal: 1, dissolve: scrollFrac, sectionIndex: 0 };
      const reveal = typeof ctrl.reveal === 'number' ? Math.max(0, Math.min(1, ctrl.reveal)) : 1;
      const targetDissolve = typeof ctrl.dissolve === 'number' && ctrl.dissolve > 0 ? ctrl.dissolve : scrollFrac;
      const sectionIndex = ctrl.sectionIndex || 0;

      // Smooth buttery continuous interpolation for background dissolve (zero sudden pops or jumps)
      currentDissolve += (targetDissolve - currentDissolve) * (1 - Math.exp(-dt * 3.5));

      host.style.opacity = String(reveal);
      if (reveal < 0.01) return;

      // Ambient cluster check
      checkClusterPulse();

      // WebGL render with gentle, progressive darkening across the whole page (100% fixed position)
      const { renderer, program, mesh } = uni;
      if (uni.ready && renderer && program && mesh && !uni.lost) {
        const u = program.uniforms;
        u.uTime.value = time;
        u.uCenter.value = [0.5, 0.5];
        u.uDim.value = dimRef.current;
        u.uVignette.value = vigRef.current;
        // Keep nebula atmospheric glow and structure visible across entire page including Contact
        const photoBrightness = Math.max(0.42, 1.0 - Math.pow(currentDissolve, 0.8) * 0.52);
        u.uPhoto.value = photoBrightness;
        u.uAmp.value = tier.amp * (1.0 - currentDissolve * 0.35);
        u.uBreath.value = BREATH * (1.0 - currentDissolve * 0.35);
        renderer.render({ scene: mesh });
        if (!uni.shown) {
          (renderer.gl.canvas as HTMLCanvasElement).style.opacity = '1';
          uni.shown = true;
        }
      }

      // 2D Canvas Overlay pass
      octx.clearRect(0, 0, cssW, cssH);
      octx.globalCompositeOperation = 'lighter';
      const sc = 0;

      drawDust(0, backCount, dt, motion, sc);
      drawHeroes(currentDissolve);
      drawStars(currentDissolve);
      drawConstellations();
      drawDust(backCount, dust.length, dt, motion, sc);
      octx.globalAlpha = 1;
      drawMeteors(dt);
      drawSatellites(dt);
      drawPaperTraces(dt);

      octx.globalCompositeOperation = 'source-over';
      drawSectionColorShift(sectionIndex);
    };

    rafId = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      cssW = host.clientWidth || window.innerWidth;
      cssH = host.clientHeight || window.innerHeight;
      applySize();
    });
    ro.observe(host);

    const onMq = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };
    mqReduce.addEventListener('change', onMq);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      mqReduce.removeEventListener('change', onMq);
      window.removeEventListener('pointerdown', onPointerDown);
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
      <canvas ref={overlayRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
