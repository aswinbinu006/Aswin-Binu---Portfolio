import React, { useEffect, useRef } from "react";

interface IntroCanvasProps {
  isWarping?: boolean;
}

/**
 * Interstellar Wormhole & Cosmic Singularity Canvas (First-Person Astronaut POV)
 * - Luminous gravitational lensing accretion disc in cosmic gold, amber, and pure starlight
 * - 480+ Relativistic depth stars streaming around the gravitational core
 * - Dynamic gravitational lensing curvature & photon orbital rings
 * - Lightspeed wormhole dive acceleration into the new multiverse
 */
export default function IntroCanvas({ isWarping = false }: IntroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isWarpingRef = useRef(isWarping);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.12;
      targetMouseY = (e.clientY - height / 2) * 0.12;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Relativistic starfield setup
    const STAR_COUNT = 450;
    const fov = 380;
    let speed = 3.5;
    let wormholeRotation = 0;
    let pulseTime = 0;

    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      size: number;
      color: string;
      orbitAngle: number;
      orbitRadius: number;
      isAccretion: boolean;
    }

    // Warm Cosmic Gold, Amber, and Starlight White Palette (No AI blue)
    const starColors = [
      "rgba(255, 255, 255,",   // Pure Starlight White
      "rgba(254, 243, 199,",   // Soft Warm White/Cream
      "rgba(251, 191, 36,",    // Interstellar Amber
      "rgba(245, 158, 11,",    // Deep Cosmic Gold
      "rgba(217, 119, 6,",     // Relativistic Orange-Gold
    ];

    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, idx) => {
      const isAccretion = idx < 160;
      const z = Math.random() * 1800 + 40;
      return {
        x: (Math.random() - 0.5) * width * 3,
        y: (Math.random() - 0.5) * height * 3,
        z,
        pz: z,
        size: Math.random() * 2.2 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 260 + 90,
        isAccretion,
      };
    });

    const render = () => {
      const isWarp = isWarpingRef.current;
      const targetSpeed = isWarp ? 54.0 : 4.2;
      speed += (targetSpeed - speed) * 0.08;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      wormholeRotation += isWarp ? 0.045 : 0.006;
      pulseTime += 0.025;

      // Deep space void clear with motion trails
      ctx.fillStyle = isWarp ? "rgba(3, 7, 18, 0.45)" : "rgba(3, 7, 18, 0.65)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;
      const coreRadius = Math.min(width, height) * 0.18;

      // 1. Deep Space Gravitational Lensing Halo (Golden Ambient Glow)
      const glowGrad = ctx.createRadialGradient(cx, cy, coreRadius * 0.5, cx, cy, coreRadius * 3.6);
      glowGrad.addColorStop(0, isWarp ? "rgba(255, 255, 255, 0.95)" : "rgba(251, 191, 36, 0.35)");
      glowGrad.addColorStop(0.25, isWarp ? "rgba(251, 191, 36, 0.6)" : "rgba(217, 119, 6, 0.2)");
      glowGrad.addColorStop(0.6, "rgba(120, 53, 15, 0.07)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 3.6, 0, Math.PI * 2);
      ctx.fill();

      // 2. Interstellar Accretion Disk (Curved Gravitational Lensing Arcs)
      ctx.save();
      ctx.translate(cx, cy);

      // Upper Curved Lensing Arch (Light bending over the black hole)
      const arcGlow = Math.sin(pulseTime * 2) * 0.15 + 0.85;
      ctx.save();
      ctx.rotate(0.12);
      ctx.scale(1, 0.45);
      const diskGrad = ctx.createRadialGradient(0, 0, coreRadius * 0.9, 0, 0, coreRadius * 2.2);
      diskGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * arcGlow})`);
      diskGrad.addColorStop(0.2, `rgba(251, 191, 36, ${0.75 * arcGlow})`);
      diskGrad.addColorStop(0.5, `rgba(217, 119, 6, ${0.45 * arcGlow})`);
      diskGrad.addColorStop(0.85, "rgba(180, 83, 9, 0.15)");
      diskGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.strokeStyle = diskGrad;
      ctx.lineWidth = isWarp ? 38 : 26;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      // Inner intense photon ring
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * arcGlow})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 1.08, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Accretion Matter Swirling Particles
      for (let i = 0; i < 160; i++) {
        const s = stars[i];
        s.orbitAngle += (0.012 + (1 - s.orbitRadius / 350) * 0.02) * (isWarp ? 4 : 1);
        const ox = Math.cos(s.orbitAngle) * (s.orbitRadius * (coreRadius / 150));
        const oy = Math.sin(s.orbitAngle) * (s.orbitRadius * (coreRadius / 150) * 0.42);

        const particleAlpha = Math.min(1, Math.max(0.15, (1 - Math.abs(oy) / 120)));
        ctx.fillStyle = `${s.color} ${particleAlpha * arcGlow})`;
        ctx.beginPath();
        ctx.arc(ox, oy, s.size * (isWarp ? 1.8 : 1.1), 0, Math.PI * 2);
        ctx.fill();
      }

      // Black Hole Silhouette Core (Event Horizon Void)
      const holeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
      holeGrad.addColorStop(0, "#010206");
      holeGrad.addColorStop(0.85, "#02040a");
      holeGrad.addColorStop(0.98, "#050814");
      holeGrad.addColorStop(1, "rgba(251, 191, 36, 0.4)");

      ctx.fillStyle = holeGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Photon Ring Glow on Event Horizon
      ctx.strokeStyle = `rgba(255, 243, 199, ${0.85 * arcGlow})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 3. Relativistic 3D Starfield (Stars streaming & bending around wormhole)
      for (let i = 160; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed;

        if (s.z <= 0) {
          s.z = 1800;
          s.pz = 1800;
          s.x = (Math.random() - 0.5) * width * 3;
          s.y = (Math.random() - 0.5) * height * 3;
        }

        const k = fov / s.z;
        let px = s.x * k + cx;
        let py = s.y * k + cy;

        // Gravitational lensing deflection around black hole center
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > 10 && dist < coreRadius * 2.8) {
          const bend = (coreRadius * 0.4) / (dist * 0.05 + 1);
          px += (dx / dist) * bend;
          py += (dy / dist) * bend;
        }

        const pk = fov / s.pz;
        const prevPx = s.x * pk + cx;
        const prevPy = s.y * pk + cy;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          const depthAlpha = Math.min(1, Math.max(0.08, (1 - s.z / 1800) * 1.2));
          const starRadius = Math.max(0.5, (1 - s.z / 1800) * s.size * (isWarp ? 2.5 : 1.1));

          // Draw golden-white relativistic motion trail
          ctx.strokeStyle = `${s.color} ${depthAlpha})`;
          ctx.lineWidth = starRadius * (isWarp ? 2.2 : 1.0);
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Leading photon head
          ctx.fillStyle = `${s.color} ${depthAlpha + 0.2})`;
          ctx.beginPath();
          ctx.arc(px, py, starRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none"
    />
  );
}
