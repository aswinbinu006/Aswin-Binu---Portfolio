import React, { useEffect, useRef } from 'react';
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
} from './types';
import { VERTEX, buildFragment } from './shaders';
import { smooth, analyzeImage } from './analyzeImage';
import { makeSoftSprite, makeHeroSprite } from './sprites';

export type { NebulaControl };

export interface CinematicNebulaProps {
  dim?: number;
  vignette?: number;
  control?: React.MutableRefObject<NebulaControl>;
}

// Section-dependent ambient cosmic tint palette:
// [r, g, b, alpha] - Refined Dark Grey & Silver Monochrome Atmosphere
const SECTION_TINTS: [number, number, number, number][] = [
  [180, 195, 215, 0.02],  // Hero: Silver Starlight
  [148, 163, 184, 0.025], // About: Neutral Slate Grey
  [160, 175, 195, 0.022], // Skills: Platinum Nebula
  [120, 135, 155, 0.025], // Projects: Deep Technical Slate
  [140, 155, 175, 0.02],  // Gallery: Curated Graphite
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
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

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
    // Cap devicePixelRatio strictly at 2
    let dprNow = Math.min(window.devicePixelRatio || 1, Math.min(tier.dpr, 2));
    let time = 0;
    let wall = 0;
    let last = performance.now();
    let isTabVisible = !document.hidden;

    // ── Mouse tracking for subtle 3D parallax & cursor aura
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      lastMove: 0,
    };

    let stars: Star[] = [];
    let heroes: Hero[] = [];
    const constellations: Constellation[] = [];
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

    // ── Sprites matching strict silver / slate / white palette
    const sprites = {
      back: makeSoftSprite(32, 0.5, '180,195,215'),
      mid: makeSoftSprite(64, 0.15, '120,135,155'),
      front: makeSoftSprite(128, 0.0, '220,230,245'),
      glow: makeSoftSprite(64, 0.12, '200,210,225'),
      white: makeSoftSprite(48, 0.25, '248,250,252'),
    };

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // ── Dust system with occasional particle glints
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
          glintTime: Math.random() < 0.18 ? rnd(2, 12) : undefined,
          sprite,
        });
      }
    };

    addDust(nBack, sprites.back, [1.5, 3.0], [0.25, 0.5], [0.03, 0.08], 0.003);
    addDust(nMid, sprites.mid, [4, 9], [0.08, 0.16], [0.1, 0.2], 0.005);
    const backCount = dust.length;
    addDust(nFront, sprites.front, [14, 32], [0.03, 0.07], [0.25, 0.45], 0.008);

    // ── Multi-meteor shooting stars system (every 3 to 8 seconds)
    const meteors: Meteor[] = [];
    let nextMeteorTime = rnd(3, 7);

    const spawnMeteor = () => {
      if (reduced) return;
      const maxConcurrent = tier.isMobile ? 1 : 2;
      const activeCount = meteors.filter((m) => m.active).length;
      if (activeCount >= maxConcurrent) return;

      const direction = Math.random() < 0.55 ? 1 : -1;
      const angleRad = (rnd(22, 42) * Math.PI) / 180;
      const speed = rnd(950, 1400);
      const len = rnd(180, 320);
      const duration = rnd(0.7, 1.15);

      const spawnX = direction > 0 ? rnd(-100, cssW * 0.45) : rnd(cssW * 0.55, cssW + 100);
      const spawnY = rnd(-50, cssH * 0.35);

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
        tailRgb: '180, 195, 215',
      });

      // Next spawn scheduled in 3 to 8 seconds
      nextMeteorTime = wall + rnd(3, 8);
    };

    // ── Layout calculations
    const layout = () => {
      const cover = Math.max(cssW / imgW, cssH / imgH) * ZOOM;
      drawW = imgW * cover;
      drawH = imgH * cover;
      const slackY = Math.max(0, (drawH - cssH) / 2 - tier.amp * 1.5);
      parallaxRange = Math.min(slackY * 0.9, cssH * 0.05);
    };

    const toScreen = (nx: number, ny: number, layer: 1 | 2 | 3 = 2) => {
      // 3 Depth layers with distinct scroll & subtle mouse parallax
      let scrollFactor = 0.06;
      let mouseFactor = 0.025;

      if (layer === 1) {
        scrollFactor = 0.02;
        mouseFactor = 0.008;
      } else if (layer === 3) {
        scrollFactor = 0.12;
        mouseFactor = 0.045;
      }

      const mxOffset = reduced ? 0 : mouse.x * mouseFactor * cssW;
      const myOffset = reduced ? 0 : mouse.y * mouseFactor * cssH;
      const sOffset = reduced ? 0 : parallaxY * (scrollFactor / 0.06);

      return {
        x: cssW / 2 + (nx - 0.5) * drawW + mxOffset,
        y: cssH / 2 + sOffset + (ny - 0.5) * drawH + myOffset,
      };
    };

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
      const odpr = Math.min(window.devicePixelRatio || 1, Math.min(tier.overlayDpr, 2));
      overlay.width = Math.round(cssW * odpr);
      overlay.height = Math.round(cssH * odpr);
      overlay.style.width = cssW + 'px';
      overlay.style.height = cssH + 'px';
      octx.setTransform(odpr, 0, 0, odpr, 0, 0);
      layout();
    };

    // ── Mouse & Touch listeners for parallax
    const onMouseMove = (e: MouseEvent) => {
      if (reduced || isTouch) return;
      mouse.targetX = (e.clientX / cssW - 0.5) * 2;
      mouse.targetY = (e.clientY / cssH - 0.5) * 2;
      mouse.active = true;
      mouse.lastMove = wall;
    };

    const onMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    // ── Tab Visibility Listener (pause when tab hidden to preserve battery)
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
          // Distribute stars across 3 depth layers
          stars = a.stars.map((s, idx) => {
            const rand = (idx * 37) % 100;
            const layer: 1 | 2 | 3 = rand < 50 ? 1 : rand < 85 ? 2 : 3;
            return {
              ...s,
              layer,
              twinkleSpeed: layer === 1 ? rnd(0.5, 0.9) : layer === 2 ? rnd(1.0, 1.6) : rnd(1.6, 2.4),
              twinkleOffset: idx * 1.618,
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
        stars = Array.from({ length: tier.stars }, (_, idx) => {
          const rand = (idx * 37) % 100;
          const layer: 1 | 2 | 3 = rand < 50 ? 1 : rand < 85 ? 2 : 3;
          return {
            nx: Math.random(),
            ny: Math.random(),
            s: 1,
            layer,
            twinkleSpeed: layer === 1 ? rnd(0.5, 0.9) : layer === 2 ? rnd(1.0, 1.6) : rnd(1.6, 2.4),
            twinkleOffset: idx * 1.618,
          };
        });
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });

    // ── Click constellation generator
    const spawnConstellation = (px: number, py: number) => {
      if (!stars.length) return;
      const k = 4 + Math.floor(Math.random() * 5);
      const scr = stars
        .map((s) => ({ s, ...toScreen(s.nx, s.ny, s.layer) }))
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
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const ctrl = control ? control.current : { reveal: 1, dissolve: 0 };
      if (ctrl.reveal < 0.5) return;
      const t = e.target as Element | null;
      if (t?.closest?.('a,button,input,textarea,select,summary,[role="button"],[data-no-constellation]'))
        return;
      spawnConstellation(e.clientX, e.clientY);
    };
    window.addEventListener('click', onClick);

    // ── Drawing Dust & Glints
    const drawDust = (from: number, to: number, dt: number, motion: number, sc: number) => {
      for (let i = from; i < to; i++) {
        const d = dust[i];
        d.u = (d.u + d.vx * dt * motion + 1) % 1;
        d.v = (d.v + d.vy * dt * motion + 1) % 1;
        const x = d.u * cssW;
        const y = (((d.v * cssH - sc * d.depth) % cssH) + cssH) % cssH;

        let glintAlpha = 0;
        if (d.glintTime && !reduced) {
          const glintCycle = (wall + d.phase) % d.glintTime;
          if (glintCycle < 0.4) {
            glintAlpha = Math.sin((glintCycle / 0.4) * Math.PI) * 0.7;
          }
        }

        const alpha = d.alpha * (0.7 + 0.3 * Math.sin(time * 0.6 + d.phase)) * gainAt(x, y);
        octx.globalAlpha = Math.min(1, alpha + glintAlpha);
        octx.drawImage(d.sprite, x - d.size / 2, y - d.size / 2, d.size, d.size);

        // Draw sparkle glint crosshair if active
        if (glintAlpha > 0.3) {
          octx.strokeStyle = `rgba(247, 251, 255, ${glintAlpha * 0.8})`;
          octx.lineWidth = 0.8;
          octx.beginPath();
          octx.moveTo(x - 5, y);
          octx.lineTo(x + 5, y);
          octx.moveTo(x, y - 5);
          octx.lineTo(x, y + 5);
          octx.stroke();
        }
      }
    };

    // ── Drawing 3-Depth Starfield with Cursor Attraction
    const drawStars = (dissolve: number) => {
      const baseAlpha = smooth(0.15, 0.85, dissolve);
      if (baseAlpha <= 0.001) return;

      const cursorScreenX = (mouse.x * 0.5 + 0.5) * cssW;
      const cursorScreenY = (mouse.y * 0.5 + 0.5) * cssH;
      const hasCursor = mouse.active && !isTouch && !reduced;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const p = toScreen(s.nx, s.ny, s.layer);

        // Gravitational cursor attraction for nearby stars
        let drawX = p.x;
        let drawY = p.y;
        let hoverBoost = 0;

        if (hasCursor) {
          const distToCursor = Math.hypot(cursorScreenX - p.x, cursorScreenY - p.y);
          if (distToCursor < 110) {
            const pull = (1 - distToCursor / 110) * 8;
            const angle = Math.atan2(cursorScreenY - p.y, cursorScreenX - p.x);
            drawX += Math.cos(angle) * pull;
            drawY += Math.sin(angle) * pull;
            hoverBoost = (1 - distToCursor / 110) * 0.5;
          }
        }

        if (drawX < -15 || drawX > cssW + 15 || drawY < -15 || drawY > cssH + 15) continue;

        const speed = s.twinkleSpeed ?? 1.2;
        const offset = s.twinkleOffset ?? (i * 1.618);
        const twinkle = 0.72 + 0.28 * Math.sin(time * speed + offset);
        const alpha = Math.min(1, (baseAlpha * twinkle + hoverBoost) * gainAt(drawX, drawY));

        // Layer-based size
        let size = 0.8;
        if (s.layer === 1) {
          size = 0.7 + s.s * 0.6;
          octx.fillStyle = 'rgba(180, 195, 215, 0.85)';
        } else if (s.layer === 2) {
          size = 1.2 + s.s * 0.8;
          octx.fillStyle = 'rgba(220, 230, 245, 0.95)';
        } else {
          size = 2.0 + s.s * 1.2;
          octx.fillStyle = 'rgba(255, 255, 255, 1.0)';
          // Soft halo around hero/foreground stars
          if (!reduced) {
            octx.globalAlpha = alpha * 0.35;
            octx.drawImage(sprites.glow, drawX - 10, drawY - 10, 20, 20);
          }
        }

        octx.globalAlpha = alpha;
        octx.beginPath();
        octx.arc(drawX, drawY, size * 0.5, 0, Math.PI * 2);
        octx.fill();
      }
    };

    const drawHeroes = (dissolve: number) => {
      const heroSpikeAlpha = Math.max(0.4, 1.0 - 0.88 * dissolve);
      for (const h of heroes) {
        const p = toScreen(h.nx, h.ny, 3);
        const len = h.len * drawW;
        if (p.x < -len || p.x > cssW + len || p.y < -len || p.y > cssH + len) continue;
        octx.globalAlpha =
          h.strength *
          heroSpikeAlpha *
          (0.82 + 0.18 * Math.sin(time * BREATH_HZ + h.phase)) *
          gainAt(p.x, p.y);
        octx.drawImage(h.sprite, p.x - len, p.y - len, len * 2, len * 2);
      }
    };

    // ── Drawing Constellations
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
        const fadeOut = age > CONSTELLATION_LIFE - 0.8 ? (CONSTELLATION_LIFE - age) / 0.8 : 1;
        const a = fadeIn * fadeOut;
        const lastPt = c.pts.length - 1;
        const revealPt = reduced ? lastPt : Math.min(lastPt, (age / 0.6) * lastPt);
        const P = c.pts.map((p) => toScreen(p.nx, p.ny, 2));

        const trace = () => {
          octx.beginPath();
          octx.moveTo(P[0].x, P[0].y);
          const full = Math.floor(revealPt);
          for (let j = 1; j <= full; j++) octx.lineTo(P[j].x, P[j].y);
          const frac = revealPt - full;
          if (frac > 0 && full + 1 <= lastPt) {
            octx.lineTo(
              P[full].x + (P[full + 1].x - P[full].x) * frac,
              P[full].y + (P[full + 1].y - P[full].y) * frac
            );
          }
        };

        // Outer subtle slate-silver aura
        trace();
        octx.lineWidth = 3.5;
        octx.strokeStyle = `rgba(148, 163, 184, ${0.18 * a})`;
        octx.stroke();

        // Core bright silver thread
        trace();
        octx.lineWidth = 1.2;
        octx.strokeStyle = `rgba(226, 232, 240, ${0.8 * a})`;
        octx.stroke();

        P.forEach((p, j) => {
          if (j > revealPt + 0.001) return;
          octx.globalAlpha = a * 0.9;
          octx.drawImage(sprites.glow, p.x - 14, p.y - 14, 28, 28);
          octx.globalAlpha = a;
          octx.fillStyle = '#f8fafc';
          octx.beginPath();
          octx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          octx.fill();
        });
        octx.globalAlpha = 1;
      }
    };

    // ── Drawing Meteors with glowing trails
    const drawMeteors = (dt: number) => {
      if (reduced) return;

      // Spawn check
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

        // Glowing outer trail
        const trailGrad = octx.createLinearGradient(m.x, m.y, tailX, tailY);
        trailGrad.addColorStop(0, `rgba(${m.headRgb}, ${0.95 * alphaCurve})`);
        trailGrad.addColorStop(0.3, `rgba(${m.tailRgb}, ${0.65 * alphaCurve})`);
        trailGrad.addColorStop(1, 'rgba(100, 116, 139, 0)');

        octx.strokeStyle = trailGrad;
        octx.lineWidth = 3.5;
        octx.beginPath();
        octx.moveTo(m.x, m.y);
        octx.lineTo(tailX, tailY);
        octx.stroke();

        // Intense core white streak
        octx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alphaCurve})`;
        octx.lineWidth = 1.2;
        octx.beginPath();
        octx.moveTo(m.x, m.y);
        octx.lineTo(m.x - m.dx * (m.len * 0.4), m.y - m.dy * (m.len * 0.4));
        octx.stroke();
      }
    };

    // ── Draw Faint Cursor Aura
    const drawCursorAura = () => {
      if (reduced || isTouch || !mouse.active || wall - mouse.lastMove > 3.0) return;
      const cx = (mouse.x * 0.5 + 0.5) * cssW;
      const cy = (mouse.y * 0.5 + 0.5) * cssH;
      const fade = Math.max(0, 1 - (wall - mouse.lastMove) / 3.0);

      const rad = octx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      rad.addColorStop(0, `rgba(226, 232, 240, ${0.05 * fade})`);
      rad.addColorStop(0.5, `rgba(148, 163, 184, ${0.02 * fade})`);
      rad.addColorStop(1, 'rgba(9, 10, 15, 0)');

      octx.fillStyle = rad;
      octx.beginPath();
      octx.arc(cx, cy, 110, 0, Math.PI * 2);
      octx.fill();
    };

    // ── Draw Section Ambient Color Shift
    const drawSectionColorShift = (secIdx: number) => {
      const tint = SECTION_TINTS[Math.min(secIdx, SECTION_TINTS.length - 1)] || SECTION_TINTS[0];
      octx.fillStyle = `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${tint[3]})`;
      octx.fillRect(0, 0, cssW, cssH);
    };

    // ── Single RequestAnimationFrame Loop
    let rafId = 0;
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);

      // Do nothing if tab is hidden
      if (!isTabVisible) return;

      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      wall += dt;
      const motion = reduced ? 0 : 1;
      time += dt * motion;

      // Smooth mouse position interpolation
      if (!reduced && !isTouch) {
        mouse.x += (mouse.targetX - mouse.x) * (1 - Math.exp(-dt * 5));
        mouse.y += (mouse.targetY - mouse.y) * (1 - Math.exp(-dt * 5));
      }

      const ctrl = control ? control.current : { reveal: 1, dissolve: 0, sectionIndex: 0 };
      const reveal = typeof ctrl.reveal === 'number' ? Math.max(0, Math.min(1, ctrl.reveal)) : 1;
      const dissolve = typeof ctrl.dissolve === 'number' ? Math.max(0, Math.min(1, ctrl.dissolve)) : 0;
      const sectionIndex = ctrl.sectionIndex || 0;

      host.style.opacity = String(reveal);
      if (reveal < 0.01) return;

      if (wall - lastMeasure > 0.5) {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        lastMeasure = wall;
      }
      scrollSm += (window.scrollY - scrollSm) * (1 - Math.exp(-dt * 6));
      parallaxY = reduced ? 0 : (0.5 - Math.min(1, Math.max(0, scrollSm / maxScroll))) * 2 * parallaxRange;

      // WebGL render
      const { renderer, program, mesh } = uni;
      if (uni.ready && renderer && program && mesh && !uni.lost) {
        const u = program.uniforms;
        u.uTime.value = time;
        u.uCenter.value = [0.5, 0.5 - parallaxY / cssH];
        u.uDim.value = dimRef.current;
        u.uVignette.value = vigRef.current;
        u.uPhoto.value = Math.max(0.1, 1.0 - 0.88 * dissolve);
        u.uAmp.value = tier.amp * (1.0 - dissolve * 0.7);
        u.uBreath.value = BREATH * (1.0 - dissolve * 0.7);
        renderer.render({ scene: mesh });
        if (!uni.shown) {
          (renderer.gl.canvas as HTMLCanvasElement).style.opacity = '1';
          uni.shown = true;
        }
      }

      // 2D Canvas Overlay pass
      octx.clearRect(0, 0, cssW, cssH);
      octx.globalCompositeOperation = 'lighter';
      const sc = reduced ? 0 : scrollSm;

      drawDust(0, backCount, dt, motion, sc);
      drawHeroes(dissolve);
      drawStars(dissolve);
      drawDust(backCount, dust.length, dt, motion, sc);
      octx.globalAlpha = 1;
      drawConstellations();
      drawMeteors(dt);
      drawCursorAura();

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
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
      <canvas ref={overlayRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
