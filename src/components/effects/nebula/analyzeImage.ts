import { Star, HERO_SEEDS } from './types';

export const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export function boxBlur(src: Float32Array, w: number, h: number, r: number): Float32Array {
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

export interface AnalysisResult {
  stars: Star[];
  cands: Star[];
  maskCanvas: HTMLCanvasElement;
  aw: number;
  ah: number;
}

/**
 * Finds the real stars in the photo (sharp luminance peaks) and builds the mask
 * texture: R = bright whitish gas, G = star protection. Runs once at load on a
 * 640 px downsample (~15 ms).
 */
export function analyzeImage(img: HTMLImageElement, maxStars: number): AnalysisResult | null {
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
  for (const item of cands) {
    if (keep.length >= maxStars) break;
    let ok = true;
    for (const k of keep) {
      const dx = item.nx - k.nx;
      const dy = item.ny - k.ny;
      if (dx * dx + dy * dy < minD2) {
        ok = false;
        break;
      }
    }
    if (ok) keep.push(item);
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
