import { useEffect, useRef } from "react";

interface WarpSpeedCanvasProps {
  isFastMoving: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
  size: number;
}

const COLORS = ["#FFFFFF", "#FFFDF8", "#FFF5E6", "#FFE8C2", "#F4E4BA", "#ECE2D0"];

export default function WarpSpeedCanvas({ isFastMoving }: WarpSpeedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const speedRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener("resize", handleResize);

    const numStars = 550;
    starsRef.current = Array.from({ length: numStars }, () => {
      const z = Math.random() * 1000 + 1;
      return {
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z,
        pz: z,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 1.8 + 1.0,
      };
    });

    let currentSpeed = 0.5;

    const render = () => {
      // Smoothly ramp speed towards target
      if (isFastMoving) {
        currentSpeed += (80 - currentSpeed) * 0.12;
      } else {
        currentSpeed = 0.5;
      }
      speedRef.current = currentSpeed;

      // Dark trail clear for motion blur (pure neutral space black)
      ctx.clearRect(0, 0, width, height);

      if (isFastMoving) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, width, height);
      }

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        star.pz = star.z;
        star.z -= speedRef.current;

        if (star.z <= 0) {
          star.z = 1000;
          star.pz = 1000;
          star.x = (Math.random() - 0.5) * 2200;
          star.y = (Math.random() - 0.5) * 2200;
        }

        const k = (400 * dpr) / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px < 0 || px >= width || py < 0 || py >= height) {
          continue;
        }

        if (isFastMoving) {
          // Calculate previous projected position for warp streak line
          const pk = (400 * dpr) / star.pz;
          const prevPx = star.x * pk + cx;
          const prevPy = star.y * pk + cy;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(3.5 * dpr, Math.max(1 * dpr, (1 - star.z / 1000) * 3.2 * dpr));
          ctx.lineCap = "round";
          ctx.stroke();
        } else {
          const progress = Math.max(0, Math.min(1, 1 - star.z / 1000));
          const alpha = progress * 0.85;
          const radius = Math.max(0.1, star.size * progress * dpr);
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      // Add central high-velocity warm starlight glow tunnel when fast-moving
      if (isFastMoving && currentSpeed > 10) {
        const gradient = ctx.createRadialGradient(cx, cy, 10 * dpr, cx, cy, width * 0.55);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.22)");
        gradient.addColorStop(0.35, "rgba(240, 210, 160, 0.08)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isFastMoving]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
