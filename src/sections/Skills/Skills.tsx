import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  skillsData,
  skillCategories,
  type SkillItem,
  type SkillCategory,
} from "@/data/skills";
import SkillCard from "./SkillCard";
import SkillDetailModal from "./SkillDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

type CategoryFilter = "all" | SkillCategory;

const FILTER_CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "ALL DISCIPLINES" },
  { key: "ai-ml", label: "AI & DEEP LEARNING" },
  { key: "robotics", label: "ROBOTICS & EMBEDDED" },
  { key: "backend", label: "BACKEND & CLOUD" },
  { key: "systems", label: "SYSTEM ARCHITECTURE" },
  { key: "leadership", label: "COMMUNITY & DIRECTIVE" },
];

/**
 * Chapter 3 — Skills & Technologies Matrix
 *
 * Spread-out obsidian glass grid architecture:
 * - Spread-out responsive multi-column cards matching Chapter 05 & Chapter 04
 * - Animated skill proficiency meters with recruiter tooltips
 * - Category filter navigation with live counts
 * - Detailed skill inspection modal
 */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleSelectRelated = (techName: string) => {
    const matched = skillsData.find(
      (s) =>
        s.name.toLowerCase().includes(techName.toLowerCase()) ||
        techName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (matched) {
      setSelectedSkill(matched);
      if (activeCategory !== "all" && matched.category !== activeCategory) {
        setActiveCategory("all");
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-24 md:py-36 overflow-x-clip select-none"
    >
      {/* Chapter Ambient Cosmic Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.06) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ── EDITORIAL CHAPTER HEADER ── */}
      <div className="mb-10 md:mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 03 // TECHNICAL DIRECTIVE
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Skills & Technologies"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Skills", "Technologies"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-3 max-w-[70ch] font-mono text-body leading-relaxed text-white/80 font-medium">
              Verified technical proficiencies across edge AI acceleration, robotics middleware, 
              distributed backend engines, and fault-tolerant system architectures.
            </p>
          </HorizontalReveal>
        </div>

        {/* Global Node Telemetry Counter */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/90 px-4 py-2.5 rounded-xl border border-white/20 bg-[#080B14]/85 backdrop-blur-md shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wider uppercase font-bold text-xs">
              {skillsData.length} VERIFIED SYSTEMS // ACTIVE
            </span>
          </div>
        </HorizontalReveal>
      </div>

      {/* ── CATEGORY FILTER NAVIGATION BAR (MATCHING CERTIFICATES & PROJECTS) ── */}
      <div className="mb-8 sm:mb-10 flex flex-wrap gap-2.5 border-b border-white/10 pb-4 font-mono text-caption">
        {FILTER_CATEGORIES.map((cat) => {
          const count =
            cat.key === "all"
              ? skillsData.length
              : skillsData.filter((s) => s.category === cat.key).length;
          const isActive = activeCategory === cat.key;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl border text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-white/50 bg-white/20 text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-[1.02]"
                  : "border-white/10 bg-[#080B14]/80 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.label} <span className="opacity-50 font-normal">({count})</span>
            </button>
          );
        })}
      </div>

      {/* ── SPREAD-OUT RESPONSIVE CARD GRID ── */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
            >
              <SkillCard
                item={skill}
                index={idx}
                onClick={() => setSelectedSkill(skill)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── SKILL INSPECTION MODAL ── */}
      <SkillDetailModal
        item={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectRelated={handleSelectRelated}
      />
    </section>
  );
}