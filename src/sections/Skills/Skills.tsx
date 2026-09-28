import React from "react";
import { skills, clusterMetas } from "@/data/skills";
import { useConstellationGraph } from "./useConstellationGraph";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 650;

/**
 * Chapter 3 — Skill Constellation
 *
 * Enhanced with scroll-driven animations and cinematic effects:
 * - SVG nodes and connections animated via Framer Motion
 * - Constellation draws itself as you scroll
 * - Hover/tap/keyboard focus illuminates node + connected pathways
 * - Dynamic ambient particles between nodes
 * - Magnetic hover interactions
 */
export default function Skills() {
  const {
    activeSkillId,
    setActiveSkillId,
    activeSkill,
    connectedSkills,
    connectedIds,
    edges,
    containerRef,
    linesRef,
    nodesRef,
    handleNodeSelect,
    handleEmptyClick,
    handleKeyDown,
  } = useConstellationGraph();

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-24 md:py-36 select-none"
      onClick={handleEmptyClick}
    >
      {/* Dynamic Background Elements */}
      <ScrollConstellationBackground isInView={isInView} />

      {/* Editorial Header - Horizontal Reveals */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3 flex items-center gap-2">
              <Label beacon beaconColor="bg-white/80">
                Constellation Topology // Act III
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Systems & Directives"
            className="font-mono text-h1 font-bold tracking-tight text-white"
            highlightWords={["Systems", "Directives"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-6}
            delay={0.15}
            stagger={0.05}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.3}>
            <p className="mt-3 max-w-[65ch] font-mono text-body leading-relaxed text-white/70">
              An interconnected topology of ML frameworks, backend runtimes, and
              organizational leadership. Hover, tap, or focus any star to trace
              its neural pathways.
            </p>
          </HorizontalReveal>
        </div>

        {/* Active Node Indicator Readout - Dynamic */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.4}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/70">
            <motion.span
              className={`inline-block h-2 w-2 rounded-full transition-colors duration-300 ${
                activeSkill ? "bg-white shadow-silver" : "bg-white/30"
              }`}
              animate={{
                scale: activeSkill ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: activeSkill ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            <span className="text-[11px] uppercase tracking-wider">
              {activeSkill
                ? `${activeSkill.label} // ${activeSkill.cluster} (${activeSkill.connectedSkillIds.length} LINKS)`
                : "TOPOLOGY RESTING // TAP STAR"}
            </span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Constellation Canvas Frame - Wrapped in Horizontal Reveal */}
      <HorizontalReveal
        xOffset={70}
        skewAngle={-4}
        delay={0.25}
        duration={0.85}
        className="w-full"
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14]/90 p-2 md:p-6 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible touch-manipulation"
          onClick={handleEmptyClick}
        >
          {/* 4 Quadrant Architectural Frames - Clearly demarcates each quarter */}
          <g className="pointer-events-none select-none">
            {/* Q1: Top-Left - Core Architecture */}
            <rect
              x="20"
              y="18"
              width="460"
              height="290"
              rx="10"
              fill="#ffffff"
              fillOpacity="0.015"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
            {/* Q2: Top-Right - Neural & Statistical */}
            <rect
              x="520"
              y="18"
              width="460"
              height="290"
              rx="10"
              fill="#ffffff"
              fillOpacity="0.015"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
            {/* Q3: Bottom-Left - Deployment & Runtime */}
            <rect
              x="20"
              y="342"
              width="460"
              height="290"
              rx="10"
              fill="#ffffff"
              fillOpacity="0.015"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
            {/* Q4: Bottom-Right - Community & Directive */}
            <rect
              x="520"
              y="342"
              width="460"
              height="290"
              rx="10"
              fill="#ffffff"
              fillOpacity="0.015"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
          </g>

          {/* Central Crosshair Quadrant Dividers */}
          <g className="pointer-events-none select-none">
            {/* Vertical 50% Axis */}
            <line
              x1="500"
              y1="10"
              x2="500"
              y2="640"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeOpacity="0.12"
            />
            {/* Horizontal 50% Axis */}
            <line
              x1="10"
              y1="325"
              x2="990"
              y2="325"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeOpacity="0.12"
            />
            {/* Center Nexus Targeting Reticle */}
            <circle cx="500" cy="325" r="5" fill="none" stroke="#F6C343" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="500" cy="325" r="1.5" fill="#F6C343" fillOpacity="0.8" />
          </g>

          {/* Ambient Connection Particles - Animated paths between nodes */}
          <ConstellationParticles edges={edges} activeSkill={activeSkill} connectedIds={connectedIds} />

          {/* 4 Quadrant Headers */}
          <g className="pointer-events-none select-none">
            {clusterMetas.map((c) => {
              const cx = (c.x / 100) * SVG_WIDTH;
              const cy = (c.y / 100) * SVG_HEIGHT;
              const isClusterActive = activeSkill && activeSkill.cluster === c.name;

              return (
                <motion.text
                  key={c.name}
                  x={cx}
                  y={cy}
                  className="font-mono text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase select-none"
                  fill="#F6C343"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: isClusterActive ? 1 : 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  // {c.label}
                </motion.text>
              );
            })}
          </g>

          {/* Constellation Connection Edges - Draw on Scroll */}
          <g ref={linesRef}>
            {edges.map((edge) => {
              const x1 = (edge.from.x / 100) * SVG_WIDTH;
              const y1 = (edge.from.y / 100) * SVG_HEIGHT;
              const x2 = (edge.to.x / 100) * SVG_WIDTH;
              const y2 = (edge.to.y / 100) * SVG_HEIGHT;

              const isEdgeActive =
                activeSkill &&
                (edge.from.id === activeSkill.id || edge.to.id === activeSkill.id);

              const isEdgeDimmed = activeSkill && !isEdgeActive;

              return (
                <motion.line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`transition-all duration-300 ${isEdgeActive ? "edge-active" : ""}`}
                  stroke={isEdgeActive ? "#F6C343" : "rgba(246, 195, 67, 0.2)"}
                  strokeWidth={isEdgeActive ? 2 : 1}
                  strokeOpacity={isEdgeActive ? 0.9 : isEdgeDimmed ? 0.04 : 0.25}
                  strokeDasharray={isEdgeActive ? "none" : "3 3"}
                  initial={{ pathLength: 0, strokeDashoffset: isEdgeActive ? -40 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  animate={{
                    strokeDashoffset: isEdgeActive ? [0, -40, 0] : 0,
                  }}
                  transition={{
                    pathLength: { duration: 1.2, delay: 0.5, ease: "easeOut" },
                    strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                  }}
                />
              );
            })}
          </g>

          {/* Skill Nodes - Magnetic and Animated */}
          <g ref={nodesRef}>
            {skills.map((skill) => {
              const cx = (skill.x / 100) * SVG_WIDTH;
              const cy = (skill.y / 100) * SVG_HEIGHT;

              const isSelected = activeSkillId === skill.id;
              const isConnected = connectedIds.has(skill.id);
              const isDimmed = activeSkillId !== null && !isConnected;

              // Prevent text clipping on right half of SVG:
              const isNearRightEdge = skill.x > 72;
              const labelX = isNearRightEdge ? cx - 14 : cx + 14;
              const textAnchor = isNearRightEdge ? "end" : "start";

              return (
                <motion.g
                  key={skill.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.label}, ${skill.cluster} cluster`}
                  aria-pressed={isSelected}
                  onMouseEnter={() => setActiveSkillId(skill.id)}
                  onMouseLeave={() => {
                    setActiveSkillId((prev) => (prev === skill.id ? null : prev));
                  }}
                  onFocus={() => setActiveSkillId(skill.id)}
                  onBlur={() => setActiveSkillId(null)}
                  onClick={(e) => handleNodeSelect(skill.id, e)}
                  onKeyDown={(e) => handleKeyDown(skill.id, e)}
                  className="cursor-pointer focus:outline-none"
                  style={{
                    opacity: isDimmed ? 0.25 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{
                    opacity: isDimmed ? 0.25 : 1,
                    scale: 1,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.6 + skill.id.charCodeAt(0) * 0.01, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Invisible 44px+ minimum mobile touch hit target */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={32}
                    fill="transparent"
                    className="cursor-pointer"
                  />

                  {/* Ambient glow ring when active or connected */}
                  {(isSelected || isConnected) && (
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 22 : 14}
                      fill="none"
                      stroke="#F6C343"
                      strokeWidth={isSelected ? 2 : 1}
                      strokeOpacity={isSelected ? 0.6 : 0.25}
                      animate={{
                        r: isSelected ? [22, 26, 22] : [14, 18, 14],
                        strokeOpacity: isSelected ? [0.6, 0.3, 0.6] : [0.25, 0.1, 0.25],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Core Star Node - Magnetic Pulse */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : isConnected ? 6 : 5}
                    fill={isSelected ? "#F6C343" : "#0d0f14"}
                    stroke="#F6C343"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200"
                    whileHover={{ r: isSelected ? 10 : isConnected ? 8 : 7 }}
                    animate={{
                      scale: isSelected ? [1, 1.15, 1] : 1,
                    }}
                    transition={{
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                  />

                  {/* Text Label with edge-safe textAnchor */}
                  <motion.text
                    x={labelX}
                    y={cy + 4}
                    textAnchor={textAnchor}
                    className="font-mono text-xs md:text-sm transition-all duration-200 select-none"
                    fill={isSelected ? "#FFFFFF" : isConnected ? "#F6C343" : "#F7FBFF"}
                    fontWeight={isSelected ? 700 : isConnected ? 600 : 400}
                    opacity={isSelected ? 1 : isConnected ? 0.95 : 0.7}
                    style={{
                      textShadow: isSelected
                        ? "0 0 15px rgba(246, 195, 67, 0.9)"
                        : "none",
                    }}
                    initial={{ opacity: 0, x: isNearRightEdge ? 10 : -10 }}
                    whileInView={{ opacity: isSelected ? 1 : isConnected ? 0.95 : 0.7, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    {skill.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </g>
        </svg>

        {/* Interactive Detail Readout for Mobile & Desktop Inspection - Grey Theme */}
        {activeSkill && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 rounded-xl border border-white/15 bg-[#12141a]/95 p-4 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  className="font-bold text-white text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {activeSkill.label}
                </motion.span>
                <motion.span
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-label text-white uppercase"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {activeSkill.cluster}
                </motion.span>
              </div>
              <button
                type="button"
                onClick={() => setActiveSkillId(null)}
                className="font-mono text-label text-white/50 hover:text-white"
              >
                DISMISS [ESC]
              </button>
            </div>

            <motion.div
              className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-caption text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-label text-white/40 uppercase">Connected to:</span>
              {connectedSkills.map((cs) => (
                <motion.button
                  key={cs.id}
                  type="button"
                  onClick={(e) => handleNodeSelect(cs.id, e)}
                  className="rounded-full border border-white/10 bg-[#12151c] px-2.5 py-0.5 text-label text-white/80 hover:border-white/30 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cs.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Footer Instruction & Metrics */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/40">
          <span>TAP EMPTY SPACE TO DISMISS & TRIGGER COSMOS</span>
          <span>{skills.length} NODES MAPPED</span>
        </div>
      </div>
    </HorizontalReveal>
    </section>
  );
}

/**
 * Dynamic background with ambient particles and glow
 */
function ScrollConstellationBackground({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-stellar/10 to-transparent transition-opacity duration-1000"
        style={{ opacity: isInView ? 1 : 0 }}
      />
    </div>
  );
}

/**
 * Animated particles flowing along constellation edges
 */
function ConstellationParticles({
  edges,
  activeSkill,
  connectedIds,
}: {
  edges: Edge[];
  activeSkill: { id: string } | null;
  connectedIds: Set<string>;
}) {
  return (
    <g className="pointer-events-none">
      {edges.map((edge, i) => {
        const isActive =
          activeSkill &&
          (edge.from.id === activeSkill.id || edge.to.id === activeSkill.id);
        const isConnected = connectedIds.has(edge.from.id) && connectedIds.has(edge.to.id);

        if (!isActive && !isConnected) return null;

        const x1 = (edge.from.x / 100) * SVG_WIDTH;
        const y1 = (edge.from.y / 100) * SVG_HEIGHT;
        const x2 = (edge.to.x / 100) * SVG_WIDTH;
        const y2 = (edge.to.y / 100) * SVG_HEIGHT;
        const distance = Math.hypot(x2 - x1, y2 - y1);
        const particleCount = Math.max(2, Math.floor(distance / 40));

        return (
          <motion.g key={edge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }}>
            {Array.from({ length: particleCount }).map((_, j) => (
              <motion.circle
                key={j}
                cx={x1 + (x2 - x1) * (j / particleCount)}
                cy={y1 + (y2 - y1) * (j / particleCount)}
                r={isActive ? 2 : 1.5}
                fill="#F6C343"
                opacity={isActive ? 0.8 : 0.5}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  r: [1.5, 2.5, 1.5],
                  cx: [x1 + (x2 - x1) * (j / particleCount), x1 + (x2 - x1) * ((j + 0.5) / particleCount)],
                  cy: [y1 + (y2 - y1) * (j / particleCount), y1 + (y2 - y1) * ((j + 0.5) / particleCount)],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: j * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.g>
        );
      })}
    </g>
  );
}

// Type for edge
interface Edge {
  id: string;
  from: { id: string; x: number; y: number };
  to: { id: string; x: number; y: number };
}