export function makeSoftSprite(size: number, innerR: number, rgb: string): HTMLCanvasElement {
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

export function makeHeroSprite(
  rgb: readonly [number, number, number],
  spikeScale: readonly number[]
): HTMLCanvasElement {
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
