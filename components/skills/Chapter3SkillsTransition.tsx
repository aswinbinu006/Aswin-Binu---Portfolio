"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // Enters dispersed -> locks in center -> disperses outward as user scrolls through
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.55],
    [distanceFromCenter * 45, 0, 0, distanceFromCenter * 65]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.55],
    [distanceFromCenter * 35, 0, 0, -distanceFromCenter * 45]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.42, 0.58],
    [0.1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.55],
    [0.85, 1, 1, 1.15]
  );

  return (
    <motion.span
      className={cn(
        "inline-block font-mono font-bold tracking-tighter text-white drop-shadow-[0_0_16px_rgba(95,168,255,0.45)]",
        isSpace && "w-3 md:w-5"
      )}
      style={{
        x,
        rotateX,
        opacity,
        scale,
        transformOrigin: "center",
      }}
    >
      {char}
    </motion.span>
  );
};

type TechBadgeProps = {
  item: {
    name: string;
    category: string;
    icon: React.ReactNode;
  };
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const TechStackCard = ({
  item,
  index,
  centerIndex,
  scrollYProgress,
}: TechBadgeProps) => {
  const distanceFromCenter = index - centerIndex;

  // Arc & disperse animation for tech cards
  const x = useTransform(
    scrollYProgress,
    [0.35, 0.6, 0.78, 0.98],
    [distanceFromCenter * 60, 0, 0, distanceFromCenter * 80]
  );
  const y = useTransform(
    scrollYProgress,
    [0.35, 0.6, 0.78, 0.98],
    [Math.abs(distanceFromCenter) * 35, 0, 0, -Math.abs(distanceFromCenter) * 40]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0.35, 0.6, 0.78, 0.98],
    [distanceFromCenter * 14, 0, 0, -distanceFromCenter * 20]
  );
  const scale = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.78, 0.98],
    [0.75, 1, 1, 0.85]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.35, 0.52, 0.82, 0.98],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        transformOrigin: "center",
      }}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#061A3A]/70 px-4 py-5 backdrop-blur-xl transition-colors duration-300 hover:border-soft-glow/50 hover:bg-[#0F4C81]/40 md:px-6 md:py-7"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_24px_rgba(95,168,255,0.35)]" />
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-soft-glow md:h-12 md:w-12">
        {item.icon}
      </div>
      <span className="relative z-10 mt-3 font-mono text-xs font-bold tracking-wider text-white md:text-sm">
        {item.name}
      </span>
      <span className="relative z-10 mt-1 font-mono text-[10px] tracking-widest text-soft-glow/80 uppercase">
        {item.category}
      </span>
    </motion.div>
  );
};

export default function Chapter3SkillsTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headlineText = "CORE ARSENAL & SYSTEMS";
  const characters = headlineText.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const techStack = [
    {
      name: "PyTorch",
      category: "NEURAL ENGINE",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M12 2L9.5 9.5H4l4.5 4.5L6.5 21 12 16.5l5.5 4.5-2-7 4.5-4.5h-5.5L12 2z" />
        </svg>
      ),
    },
    {
      name: "TensorRT",
      category: "INFERENCE SPEED",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      name: "CUDA",
      category: "GPU PARALLEL",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="9" y1="9" x2="9" y2="15" />
          <line x1="15" y1="9" x2="15" y2="15" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      ),
    },
    {
      name: "C++20",
      category: "LOW LATENCY",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      name: "ROS 2",
      category: "ROBOTICS NODES",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="8" r="2" />
          <circle cx="5" cy="8" r="2" />
          <circle cx="19" cy="16" r="2" />
          <circle cx="5" cy="16" r="2" />
          <line x1="7" y1="9" x2="10" y2="11" />
          <line x1="14" y1="13" x2="17" y2="15" />
          <line x1="7" y1="15" x2="10" y2="13" />
          <line x1="14" y1="11" x2="17" y2="9" />
        </svg>
      ),
    },
    {
      name: "Rust",
      category: "SAFE EMBEDDED",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      name: "JAX",
      category: "AUTOGRAD ACCEL",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      ),
    },
    {
      name: "TinyML",
      category: "EDGE SILICON",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      ),
    },
  ];

  const techCenterIndex = Math.floor(techStack.length / 2);

  // Transition glow opacity
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 0.95],
    [0.2, 0.7, 0.7, 0.1]
  );

  return (
    <section ref={containerRef} className="relative h-[260vh] w-full">
      {/* Sticky viewport frame containing the animated transition */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 select-none">
        {/* Subtle dynamic background glow that pulses with scroll progress */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            opacity: glowOpacity,
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(95, 168, 255, 0.22) 0%, rgba(15, 76, 129, 0.12) 50%, transparent 75%)",
          }}
        />

        {/* Top editorial marker */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="font-mono text-xs tracking-widest text-soft-glow uppercase">
            Chapter 03 // Tech Stack Transition
          </span>
          <p className="mt-2 text-xs font-mono tracking-wider text-white/50 uppercase">
            Scroll to observe stack synthesis &amp; dispersion
          </p>
        </div>

        {/* Phase 1: Dispersing Headline Animation (Skiper31 CharacterV1) */}
        <div
          className="w-full max-w-5xl text-center text-3xl font-extrabold uppercase tracking-tight md:text-6xl lg:text-7xl"
          style={{ perspective: "800px" }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Phase 2: Tech Stack Cards Animation (Skiper31 CharacterV2/V3 adapted) */}
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs md:text-sm font-mono tracking-widest text-white/70 uppercase">
            <Bracket className="h-6 md:h-8 text-soft-glow" />
            <span className="font-semibold text-white">
              Integrated Runtimes &amp; Hardware Acceleration
            </span>
            <Bracket className="h-6 md:h-8 scale-x-[-1] text-soft-glow" />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl"
            style={{ perspective: "1000px" }}
          >
            {techStack.map((item, index) => (
              <TechStackCard
                key={item.name}
                item={item}
                index={index}
                centerIndex={techCenterIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Subtle bottom scroll guide line */}
        <div className="mt-8 flex flex-col items-center opacity-40">
          <div className="h-10 w-px bg-gradient-to-b from-soft-glow to-transparent" />
        </div>
      </div>
    </section>
  );
}

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};
