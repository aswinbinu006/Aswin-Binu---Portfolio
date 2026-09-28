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

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const numStars = 400;
    starsRef.current = Array.from({ length: numStars }, () => {
      const z = Math.random() * 1000 + 1;
      return {
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z,
        pz: z,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 1.5 + 0.8,
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
      ctx.fillStyle = isFastMoving ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 1)";
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
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px < 0 || px >= width || py < 0 || py >= height) {
          continue;
        }

        if (isFastMoving) {
          // Calculate previous projected position for warp streak line
          const pk = 400 / star.pz;
          const prevPx = star.x * pk + cx;
          const prevPy = star.y * pk + cy;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(3.5, Math.max(1, (1 - star.z / 1000) * 3.2));
          ctx.lineCap = "round";
          ctx.stroke();
        } else {
          const alpha = (1 - star.z / 1000) * 0.5;
          ctx.beginPath();
          ctx.arc(px, py, star.size * (1 - star.z / 1000), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      // Add central high-velocity warm starlight glow tunnel when fast-moving (Zero blue)
      if (isFastMoving && currentSpeed > 10) {
        const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.55);
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
      className={`pointer-events-none absolute inset-0 z-15 h-full w-full transition-opacity duration-300 ${
        isFastMoving ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
