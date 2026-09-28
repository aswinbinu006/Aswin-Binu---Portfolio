import { WARP_SPEED, BREATH_HZ } from './types';

export const VERTEX = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export const buildFragment = (octaves: number) => /* glsl */ `
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

  // stars stay rigid; gas moves fully; the rest a little
  float w = (0.35 + 0.65 * gas) * (1.0 - protect);
  vec3 q = vec3(pa * 1.6, uTime * ${WARP_SPEED.toFixed(3)});
  vec2 d = (vec2(fbm(q), fbm(q + vec3(5.2, 1.3, 7.7))) - 0.5) * 3.2;
  vec2 uv = coverUv(vUv + (d * uAmp * w) / uRes, aspect);

  vec3 col = texture2D(tMap, uv).rgb;

  // Suppress harsh cold blue cast from raw nebula image and grade to warm cosmic amber
  col.b = min(col.b, max(col.r, col.g) * 0.85);
  vec3 goldTint = vec3(1.0, 0.82, 0.35); // warm gold/amber
  col = mix(col, col * goldTint, 0.45) * 1.02;

  float phase = fbm(vec3(pa * 1.1, 3.0 + uTime * 0.015)) * 6.2831853;
  col *= 1.0 + uBreath * sin(uTime * ${BREATH_HZ.toFixed(2)} + phase) * gas;

  float vig = smoothstep(0.35, 0.85, length(vUv - 0.5) * 1.4142);
  col *= (1.0 - uDim) * (1.0 - uVignette * vig);
  col *= uPhoto;
  gl_FragColor = vec4(col, 1.0);
}`;