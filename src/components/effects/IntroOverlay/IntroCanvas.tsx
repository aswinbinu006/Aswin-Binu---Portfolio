import React, { useEffect, useRef } from "react";

interface IntroCanvasProps {
  isWarping?: boolean;
}

/**
 * 3D Hyperspace Warp & Tactical Singularity Canvas
 * - 450+ 3D depth-projected stars with dynamic velocity motion trails
 * - Pulsing central cosmic singularity core with harmonic energy rings
 * - Rotating tactical HUD rings with azimuth degree markers and crosshairs
 * - Accelerates into lightspeed burst on trigger
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
      targetMouseX = (e.clientX - width / 2) * 0.15;
      targetMouseY = (e.clientY - height / 2) * 0.15;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Starfield setup
    const STAR_COUNT = 480;
    const fov = 350;
    let speed = 4.0;
    let hudAngle = 0;
    let pulseTime = 0;

    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      size: number;
      color: string;
    }

    const starColors = [
      "rgba(255, 255, 255,",
      "rgba(95, 168, 255,",
      "rgba(147, 197, 253,",
      "rgba(224, 238, 255,",
      "rgba(56, 189, 248,",
    ];

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const z = Math.random() * 1800 + 50;
      return {
        x: (Math.random() - 0.5) * width * 3,
        y: (Math.random() - 0.5) * height * 3,
        z,
        pz: z,
        size: Math.random() * 2.2 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
    });

    const render = () => {
      const isWarp = isWarpingRef.current;
      const targetSpeed = isWarp ? 52.0 : 4.5;
      speed += (targetSpeed - speed) * 0.08;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      hudAngle += isWarp ? 0.08 : 0.008;
      pulseTime += 0.03;

      ctx.fillStyle = isWarp ? "rgba(2, 6, 16, 0.45)" : "rgba(2, 6, 16, 0.65)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      // 1. Central Singularity Core Glow
      const corePulse = Math.sin(pulseTime) * 12 + (isWarp ? 90 : 35);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, corePulse * 3.5);
      coreGrad.addColorStop(0, isWarp ? "rgba(255, 255, 255, 0.95)" : "rgba(95, 168, 255, 0.45)");
      coreGrad.addColorStop(0.3, isWarp ? "rgba(95, 168, 255, 0.6)" : "rgba(15, 76, 129, 0.25)");
      coreGrad.addColorStop(0.7, "rgba(6, 26, 58, 0.08)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, corePulse * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Hyperspace Warp Stars
      for (let i = 0; i < stars.length; i++) {
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
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        const pk = fov / s.pz;
        const prevPx = s.x * pk + cx;
        const prevPy = s.y * pk + cy;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          const depthAlpha = Math.min(1, Math.max(0.08, (1 - s.z / 1800) * 1.2));
          const starRadius = Math.max(0.5, (1 - s.z / 1800) * s.size * (isWarp ? 2.5 : 1.2));

          // Draw motion streak trail
          ctx.strokeStyle = `${s.color} ${depthAlpha})`;
          ctx.lineWidth = starRadius * (isWarp ? 2.2 : 1.1);
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

      // 3. Futuristic Tactical HUD Rings (Center Lock-On)
      const hudRadius = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.translate(cx, cy);

      // Outer Rotating Segmented Compass Ring
      ctx.rotate(hudAngle);
      ctx.strokeStyle = "rgba(95, 168, 255, 0.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([12, 16, 4, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, hudRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Degree Ticks on HUD Ring
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      for (let d = 0; d < 360; d += 30) {
        const rad = (d * Math.PI) / 180;
        const x1 = Math.cos(rad) * (hudRadius - 8);
        const y1 = Math.sin(rad) * (hudRadius - 8);
        const x2 = Math.cos(rad) * (hudRadius + 8);
        const y2 = Math.sin(rad) * (hudRadius + 8);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Inner Counter-Rotating Reticle Ring
      ctx.rotate(-hudAngle * 2.2);
      ctx.strokeStyle = "rgba(95, 168, 255, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([24, 28]);
      ctx.beginPath();
      ctx.arc(0, 0, hudRadius * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      // Center Precision Reticle Brackets
      ctx.setLineDash([]);
      ctx.strokeStyle = isWarp ? "rgba(255, 255, 255, 0.7)" : "rgba(95, 168, 255, 0.35)";
      const bracketSize = 24;
      const bracketDist = hudRadius * 0.28;

      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(sx * bracketDist, sy * (bracketDist - bracketSize));
        ctx.lineTo(sx * bracketDist, sy * bracketDist);
        ctx.lineTo(sx * (bracketDist - bracketSize), sy * bracketDist);
        ctx.stroke();
      });

      // Center crosshair dot
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 4. Scanning Horizon Laser Sweep
      const laserY = ((pulseTime * 85) % (height + 200)) - 100;
      const laserGrad = ctx.createLinearGradient(0, laserY, 0, laserY + 40);
      laserGrad.addColorStop(0, "rgba(95, 168, 255, 0)");
      laserGrad.addColorStop(0.5, "rgba(95, 168, 255, 0.08)");
      laserGrad.addColorStop(1, "rgba(95, 168, 255, 0)");
      ctx.fillStyle = laserGrad;
      ctx.fillRect(0, laserY, width, 40);

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
