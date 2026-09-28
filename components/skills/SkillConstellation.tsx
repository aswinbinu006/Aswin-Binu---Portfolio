"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { skills, clusterMetas, Skill } from "@/lib/skills";
import { gsap } from "@/lib/gsap";

/**
 * Chapter 3 — Skill Constellation
 *
 * Implements strict spec:
 * - Asymmetrical, non-grid, non-circular constellation layout
 * - Quiet ambient cluster labels floating in the scene
 * - SVG nodes and connection lines animated via GSAP
 * - Unified interaction model: hover, tap, keyboard focus illuminate node + connected nodes
 * - Node click stops propagation; empty space click triggers background cosmos constellation
 * - Accessible 375px mobile experience with 44px+ touch targets and zero label clipping
 * - Respects prefers-reduced-motion
 */
export default function SkillConstellation() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  // Compute unique edges from skill data
  const edges = useMemo(() => {
    const list: { id: string; from: Skill; to: Skill }[] = [];
    const seen = new Set<string>();

    const skillMap = new Map(skills.map((s) => [s.id, s]));

    skills.forEach((skill) => {
      skill.connectedSkillIds.forEach((targetId) => {
        const target = skillMap.get(targetId);
        if (!target) return;
        const key = [skill.id, target.id].sort().join("--");
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ id: key, from: skill, to: target });
        }
      });
    });

    return list;
  }, []);

  const activeSkill = useMemo(
    () => skills.find((s) => s.id === activeSkillId) || null,
    [activeSkillId]
  );

  const connectedSkills = useMemo(() => {
    if (!activeSkill) return [];
    const skillMap = new Map(skills.map((s) => [s.id, s]));
    return activeSkill.connectedSkillIds
      .map((id) => skillMap.get(id))
      .filter((s): s is Skill => Boolean(s));
  }, [activeSkill]);

  const connectedIds = useMemo(() => {
    if (!activeSkill) return new Set<string>();
    return new Set([activeSkill.id, ...activeSkill.connectedSkillIds]);
  }, [activeSkill]);

  // GSAP animation on activeSkillId change with context revert
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Instant visual switch without motion
        return;
      }

      if (activeSkillId && linesRef.current) {
        const activeLines = linesRef.current.querySelectorAll(".edge-active");
        if (activeLines.length > 0) {
          gsap.fromTo(
            activeLines,
            { strokeDashoffset: 40, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 0.9,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.out",
            }
          );
        }
      }
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, [activeSkillId]);

  const handleNodeSelect = (id: string, e: React.SyntheticEvent) => {
    // Stop propagation so background constellation click is NOT triggered on node click
    e.stopPropagation();
    setActiveSkillId((prev) => (prev === id ? null : id));
  };

  const handleEmptyClick = () => {
    // Clicking empty space deselects node, but DOES NOT stop propagation
    // so background constellation click can fire naturally
    setActiveSkillId(null);
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNodeSelect(id, e);
    } else if (e.key === "Escape") {
      setActiveSkillId(null);
    }
  };

  // SVG coordinate dimensions
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 650;

  return (
    <section
      ref={containerRef}
      className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-24 md:py-36 select-none"
      onClick={handleEmptyClick}
    >
      {/* Editorial Chapter Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-block font-mono text-xs tracking-widest text-soft-glow/80 uppercase">
            Chapter 03 // Skill Constellation
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Systems &amp; Directives
          </h2>
          <p className="mt-3 max-w-[65ch] font-mono text-xs leading-relaxed text-white/60 md:text-sm">
            An interconnected topology of ML frameworks, backend runtimes, and
            organizational leadership. Hover, tap, or focus any star to trace
            its neural pathways.
          </p>
        </div>

        {/* Active Node Indicator Readout */}
        <div className="flex items-center gap-2 font-mono text-xs text-white/50">
          <span
            className={`inline-block h-2 w-2 rounded-full transition-colors duration-300 ${
              activeSkill ? "bg-soft-glow shadow-[0_0_8px_#5FA8FF]" : "bg-white/20"
            }`}
          />
          <span className="text-[11px] uppercase tracking-wider">
            {activeSkill
              ? `${activeSkill.label} // ${activeSkill.cluster} (${activeSkill.connectedSkillIds.length} LINKS)`
              : "TOPOLOGY RESTING // TAP STAR"}
          </span>
        </div>
      </div>

      {/* Constellation Canvas Frame */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#040e20]/60 p-2 md:p-6 backdrop-blur-md">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full overflow-visible touch-manipulation"
          onClick={handleEmptyClick}
        >
          {/* Subtle Background Coordinate Crosses for Editorial Atmosphere */}
          <g className="pointer-events-none opacity-15">
            <line x1="500" y1="20" x2="500" y2="630" stroke="#5FA8FF" strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="30" y1="325" x2="970" y2="325" stroke="#5FA8FF" strokeWidth="0.5" strokeDasharray="4 8" />
          </g>

          {/* Quiet Cluster Names (floating in scene, not cards) */}
          <g className="pointer-events-none select-none">
            {clusterMetas.map((c) => {
              const cx = (c.x / 100) * SVG_WIDTH;
              const cy = (c.y / 100) * SVG_HEIGHT;
              const isClusterActive =
                activeSkill && activeSkill.cluster === c.name;

              return (
                <text
                  key={c.name}
                  x={cx}
                  y={cy}
                  className="font-mono text-xs md:text-sm font-semibold tracking-widest uppercase transition-opacity duration-300"
                  fill="#5FA8FF"
                  opacity={isClusterActive ? 0.8 : activeSkill ? 0.15 : 0.35}
                >
                  // {c.label}
                </text>
              );
            })}
          </g>

          {/* Constellation Connection Edges */}
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
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`transition-all duration-300 ${
                    isEdgeActive ? "edge-active" : ""
                  }`}
                  stroke={isEdgeActive ? "#5FA8FF" : "rgba(95, 168, 255, 0.2)"}
                  strokeWidth={isEdgeActive ? 2 : 1}
                  strokeOpacity={isEdgeActive ? 0.9 : isEdgeDimmed ? 0.04 : 0.25}
                  strokeDasharray={isEdgeActive ? "none" : "3 3"}
                />
              );
            })}
          </g>

          {/* Skill Nodes */}
          <g ref={nodesRef}>
            {skills.map((skill) => {
              const cx = (skill.x / 100) * SVG_WIDTH;
              const cy = (skill.y / 100) * SVG_HEIGHT;

              const isSelected = activeSkillId === skill.id;
              const isConnected = connectedIds.has(skill.id);
              const isDimmed = activeSkillId !== null && !isConnected;

              // Prevent text clipping on right half of SVG:
              // Align text to the left of the node if node x > 72%
              const isNearRightEdge = skill.x > 72;
              const labelX = isNearRightEdge ? cx - 14 : cx + 14;
              const textAnchor = isNearRightEdge ? "end" : "start";

              return (
                <g
                  key={skill.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.label}, ${skill.cluster} cluster`}
                  aria-pressed={isSelected}
                  onMouseEnter={() => setActiveSkillId(skill.id)}
                  onMouseLeave={() => {
                    // Only clear on mouse leave if not selected via click
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
                >
                  {/* Invisible 44px+ minimum mobile touch hit target */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={32}
                    fill="transparent"
                    className="cursor-pointer"
                  />

                  {/* Outer pulse aura when active or connected */}
                  {(isSelected || isConnected) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 18 : 12}
                      fill="none"
                      stroke="#5FA8FF"
                      strokeWidth={isSelected ? 1.5 : 0.8}
                      strokeOpacity={isSelected ? 0.7 : 0.3}
                      className={isSelected ? "animate-pulse" : ""}
                    />
                  )}

                  {/* Core Star Node */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 6 : isConnected ? 5 : 4}
                    fill={isSelected ? "#5FA8FF" : "#020814"}
                    stroke="#5FA8FF"
                    strokeWidth={isSelected ? 2 : 1.2}
                    className="transition-all duration-200"
                  />

                  {/* Text Label with edge-safe textAnchor */}
                  <text
                    x={labelX}
                    y={cy + 4}
                    textAnchor={textAnchor}
                    className="font-mono text-xs md:text-sm transition-all duration-200 select-none"
                    fill={isSelected ? "#FFFFFF" : isConnected ? "#5FA8FF" : "#F7FBFF"}
                    fontWeight={isSelected ? 700 : isConnected ? 600 : 400}
                    opacity={isSelected ? 1 : isConnected ? 0.95 : 0.7}
                    style={{
                      textShadow: isSelected
                        ? "0 0 10px rgba(95, 168, 255, 0.8)"
                        : "none",
                    }}
                  >
                    {skill.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Interactive Detail Readout for Mobile & Desktop Inspection */}
        {activeSkill && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 rounded-xl border border-soft-glow/30 bg-[#061A3A]/80 p-3.5 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {activeSkill.label}
                </span>
                <span className="rounded-full border border-soft-glow/30 bg-soft-glow/15 px-2 py-0.5 font-mono text-[10px] text-soft-glow uppercase">
                  {activeSkill.cluster}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveSkillId(null)}
                className="font-mono text-[10px] text-white/50 hover:text-white"
              >
                DISMISS [ESC]
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/70">
              <span className="text-[10px] text-white/40 uppercase">Connected to:</span>
              {connectedSkills.map((cs) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={(e) => handleNodeSelect(cs.id, e)}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-soft-glow hover:border-soft-glow/50 hover:bg-soft-glow/20"
                >
                  {cs.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Instruction & Metrics */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/40">
          <span>TAP EMPTY SPACE TO DISMISS &amp; TRIGGER COSMOS</span>
          <span>16 NODES MAPPED</span>
        </div>
      </div>
    </section>
  );
}
