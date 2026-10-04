import React, { useEffect, useRef } from "react";
import type { SkillItem } from "@/data/skills";
import { X, Sparkles, Cpu, Layers, Terminal, Users, CheckCircle2, Workflow, ArrowRight } from "lucide-react";

interface SkillDetailModalProps {
  item: SkillItem | null;
  onClose: () => void;
  onSelectRelated?: (techName: string) => void;
}

export default function SkillDetailModal({
  item,
  onClose,
  onSelectRelated,
}: SkillDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const getCategoryIcon = (cat: SkillItem["category"]) => {
    switch (cat) {
      case "ai-ml":
        return <Sparkles className="size-4 text-amber-300" />;
      case "robotics":
        return <Cpu className="size-4 text-cyan-300" />;
      case "backend":
        return <Layers className="size-4 text-emerald-300" />;
      case "systems":
        return <Terminal className="size-4 text-purple-300" />;
      case "leadership":
        return <Users className="size-4 text-rose-300" />;
      default:
        return <Sparkles className="size-4 text-white" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        data-no-constellation
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#080B14]/95 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close telemetry dossier"
          className="absolute right-4 top-4 p-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all focus-ring cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Header Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-[10.5px] text-white/60 mb-2 font-semibold">
          {getCategoryIcon(item.category)}
          <span className="uppercase tracking-widest">
            TECHNICAL DOSSIER // {item.categoryName}
          </span>
        </div>

        {/* Title & Tag */}
        <h2
          id="skill-modal-title"
          className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight pr-8"
        >
          {item.name}
        </h2>

        <div className="mt-1 flex items-center gap-2 font-mono text-xs">
          <span className="text-white/70 font-semibold">{item.tag}</span>
          <span className="text-white/30">•</span>
          <span className="px-2 py-0.5 rounded bg-white/15 text-white font-bold text-[10px]">
            {item.proficiency} ({item.levelPercentage}%)
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between font-mono text-xs font-semibold mb-2">
            <span className="text-white/70">PROFICIENCY SCORE</span>
            <span className="text-white font-bold">{item.levelPercentage}%</span>
          </div>

          <div className="relative h-3 w-full rounded-full bg-white/[0.08] border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white/70 via-white/90 to-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              style={{ width: `${item.levelPercentage}%` }}
            />
          </div>
        </div>

        {/* Highlight Architecture Role */}
        <div className="mt-4 p-4 rounded-xl border border-white/15 bg-white/[0.03]">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-1 font-semibold">
            CORE ARCHITECTURE HIGHLIGHT
          </span>
          <p className="font-mono text-xs sm:text-sm font-bold text-white leading-relaxed">
            "{item.highlight}"
          </p>
        </div>

        {/* In-depth Engineering Description */}
        <div className="mt-4 font-mono text-xs sm:text-sm text-white/85 leading-relaxed">
          {item.description}
        </div>

        {/* Featured Deployments */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-2 font-semibold">
            DEPLOYED IN PRODUCTION & CASE STUDIES
          </span>
          <div className="flex flex-wrap gap-2">
            {item.keyWork.map((kw, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/20 bg-white/[0.06] font-mono text-xs text-white font-semibold"
              >
                <CheckCircle2 className="size-3 text-emerald-400" />
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Technology Stack */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-2 font-semibold">
            CONNECTED ECOSYSTEM NODES
          </span>
          <div className="flex flex-wrap gap-2">
            {item.connectedTech.map((tech, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectRelated?.(tech)}
                className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-lg border border-white/15 bg-white/[0.03] hover:border-white/40 hover:bg-white/15 font-mono text-xs text-white/80 hover:text-white transition-all font-medium"
              >
                <span>✦</span>
                <span>{tech}</span>
                <ArrowRight className="size-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
