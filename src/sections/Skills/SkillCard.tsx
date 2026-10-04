import React from "react";
import { motion } from "framer-motion";
import type { SkillItem } from "@/data/skills";
import { ExternalLink, Cpu, Layers, Sparkles, Terminal, Users } from "lucide-react";

interface SkillCardProps {
  item: SkillItem;
  onClick: () => void;
  index?: number;
}

export default function SkillCard({ item, onClick, index = 0 }: SkillCardProps) {
  const getCategoryTheme = (category: SkillItem["category"]) => {
    switch (category) {
      case "ai-ml":
        return {
          badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
          icon: <Sparkles className="size-3 text-amber-300" />,
          accent: "from-amber-400/20 to-transparent",
        };
      case "robotics":
        return {
          badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
          icon: <Cpu className="size-3 text-cyan-300" />,
          accent: "from-cyan-400/20 to-transparent",
        };
      case "backend":
        return {
          badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
          icon: <Layers className="size-3 text-emerald-300" />,
          accent: "from-emerald-400/20 to-transparent",
        };
      case "systems":
        return {
          badge: "border-purple-400/30 bg-purple-400/10 text-purple-200",
          icon: <Terminal className="size-3 text-purple-300" />,
          accent: "from-purple-400/20 to-transparent",
        };
      case "leadership":
        return {
          badge: "border-rose-400/30 bg-rose-400/10 text-rose-200",
          icon: <Users className="size-3 text-rose-300" />,
          accent: "from-rose-400/20 to-transparent",
        };
      default:
        return {
          badge: "border-white/20 bg-white/5 text-white/80",
          icon: <Sparkles className="size-3 text-white" />,
          accent: "from-white/10 to-transparent",
        };
    }
  };

  const theme = getCategoryTheme(item.category);

  return (
    <div
      data-no-constellation
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View telemetry for ${item.name}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#080B14]/85 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/40 hover:bg-[#0D1220]/95 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] focus-ring cursor-pointer select-none"
    >
      {/* Top Ambient Glow */}
      <div
        className={`pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full bg-gradient-to-br ${theme.accent} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`}
      />

      <div>
        {/* Card Header: Category Badge & Seniority */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            {theme.icon}
            <span
              className={`px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider text-[9px] ${theme.badge}`}
            >
              {item.categoryName.split(" ")[0]}
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 font-bold px-2 py-0.5 rounded bg-white/[0.08] border border-white/10">
            {item.proficiency}
          </span>
        </div>

        {/* Skill Title & Tag */}
        <div className="mt-3.5">
          <h3 className="font-mono text-lg sm:text-xl font-extrabold text-white group-hover:text-white tracking-tight leading-snug">
            {item.name}
          </h3>

          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/60 group-hover:text-white/85 transition-colors uppercase">
            // {item.tag}
          </span>
        </div>

        {/* ── ANIMATED PROGRESS BAR WITH RECRUITER TOOLTIP ── */}
        <div className="my-4">
          <div className="flex items-center justify-between font-mono text-[10px] text-white/60 mb-1.5 font-semibold">
            <span>PROFICIENCY SCORE</span>
            <span className="text-white font-bold">{item.levelPercentage}%</span>
          </div>

          <div className="skill-bar relative h-2.5 w-full rounded-full bg-white/[0.08] border border-white/10 overflow-visible">
            <motion.div
              className="skill-per relative h-full rounded-full bg-gradient-to-r from-white/70 via-white/90 to-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.levelPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: "easeOut" }}
            >
              {/* Floating Tooltip with Arrow */}
              <div className="absolute -right-3.5 -top-7.5 z-20 flex items-center justify-center pointer-events-none">
                <span className="relative font-mono text-[9px] font-extrabold text-black bg-white px-1.5 py-0.5 rounded shadow-md tracking-tight">
                  {item.levelPercentage}%
                  <span
                    className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-white -z-10"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Highlight Architecture Snippet */}
        <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03] group-hover:bg-white/[0.05] transition-colors">
          <p className="font-mono text-[11px] sm:text-xs text-white/90 leading-relaxed line-clamp-2">
            "{item.highlight}"
          </p>
        </div>

        {/* Key Deployment Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {item.keyWork.slice(0, 2).map((work) => (
            <span
              key={work}
              className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[9.5px] text-white/80 font-medium"
            >
              ✦ {work}
            </span>
          ))}
          {item.keyWork.length > 2 && (
            <span className="px-1.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] font-mono text-[9px] text-white/50">
              +{item.keyWork.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Status & Inspection Prompt */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/60">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-semibold text-white/70">ACTIVE MODULE</span>
        </div>

        <div className="flex items-center gap-1 text-white/80 group-hover:text-white font-semibold transition-colors">
          <span>INSPECT</span>
          <ExternalLink className="size-3" />
        </div>
      </div>
    </div>
  );
}
