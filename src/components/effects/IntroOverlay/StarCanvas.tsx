import { useEffect, useRef } from "react";

/**
 * Subtle twinkling star particles that breathe delicately in the darkness
 * matching the JWST space aesthetic.
 */
export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create 60 restrained stars with individual twinkle phases
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.speed;
        const alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
        const clampedAlpha = Math.max(0.05, Math.min(0.9, alpha));

        // Warm gold/amber starlight
        ctx.fillStyle = `rgba(255, 220, 120, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
