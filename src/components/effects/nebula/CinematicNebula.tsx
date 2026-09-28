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
    let time = 0;
    let wall = 0;
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

    // ── sprites + dust - Updated to warm gold/amber palette
    const sprites = {
      back: makeSoftSprite(32, 0.5, '246,195,67'),
      mid: makeSoftSprite(64, 0.15, '255,170,40'),
      front: makeSoftSprite(128, 0.0, '255,205,100'),
      glow: makeSoftSprite(64, 0.12, '255,220,120'),
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
    addDust(nFront, sprites.front, [16, 36], [0.04, 0.08], [0.3, 0.55], 0.008);

    // ── layout
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
      octx.setTransform(odpr, 0, 0, odpr, 0, 0);
      layout();
      dirty = true;
    };

    // ── GL init
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
          console.warn('CinematicNebula: WebGL unavailable', err);
        }
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      })
      .catch(() => {
        if (cancelled) return;
        stars = Array.from({ length: tier.stars }, () => ({ nx: Math.random(), ny: Math.random(), s: 1 }));
        applySize();
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });

    // ── click constellations
    const spawnConstellation = (px: number, py: number) => {
      if (!stars.length) return;
      const k = 4 + Math.floor(Math.random() * 5);
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

    // ── shooting stars
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

    // ── drawing
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
      // Warm starlight with subtle gold tint
      octx.fillStyle = 'rgb(255, 248, 235)';
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const p = toScreen(s.nx, s.ny);
        if (p.x < -10 || p.x > cssW + 10 || p.y < -10 || p.y > cssH + 10) continue;
        const twinkle = 0.75 + 0.25 * Math.sin(time * 1.5 + i * 2.37);
        const alpha = baseAlpha * twinkle * gainAt(p.x, p.y);
        const size = 0.8 + 1.4 * s.s;
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
        const lastPt = c.pts.length - 1;
        const revealPt = reduced ? lastPt : Math.min(lastPt, (age / 0.6) * lastPt);
        const P = c.pts.map((p) => toScreen(p.nx, p.ny));

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
        trace();
        octx.lineWidth = 4;
        octx.strokeStyle = `rgba(246,195,67,${0.1 * a})`;
        octx.stroke();
        trace();
        octx.lineWidth = 1;
        octx.strokeStyle = `rgba(255,220,120,${0.6 * a})`;
        octx.stroke();

        P.forEach((p, j) => {
          if (j > revealPt + 0.001) return;
          octx.globalAlpha = a * 0.9;
          octx.drawImage(sprites.glow, p.x - 14, p.y - 14, 28, 28);
          octx.globalAlpha = a;
          octx.fillStyle = 'rgb(255,245,230)';
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
      grad.addColorStop(1, 'rgba(246,195,67,0)');
      octx.strokeStyle = grad;
      octx.lineWidth = 1.4;
      octx.beginPath();
      octx.moveTo(shoot.x, shoot.y);
      octx.lineTo(tx, ty);
      octx.stroke();
    };

    // ── frame loop
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

      host.style.opacity = String(reveal);
      if (reveal < 0.01) return;

      if (reduced && !dirty && constellations.length === 0) return;
      dirty = false;

      if (wall - lastMeasure > 0.5) {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        lastMeasure = wall;
      }
      scrollSm += (window.scrollY - scrollSm) * (1 - Math.exp(-dt * 6));
      parallaxY = reduced ? 0 : (0.5 - Math.min(1, Math.max(0, scrollSm / maxScroll))) * 2 * parallaxRange;

      if (!reduced) {
        avg += (dt - avg) * 0.05;
        if (uni.ready && wall > 3 && wall - lastAdapt > 4 && avg > 0.024 && dprNow > 1) {
          dprNow = Math.max(1, dprNow - 0.25);
          lastAdapt = wall;
          applySize();
        }
      }

      // WebGL render
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
      <canvas ref={overlayRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
