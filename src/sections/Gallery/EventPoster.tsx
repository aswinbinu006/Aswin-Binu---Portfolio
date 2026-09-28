import React from "react";
import type { EventItem } from "@/data/events";

interface EventPosterProps {
  event: EventItem;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Handcrafted CSS/SVG Exhibition Poster Placeholder
 * Museum wall display aesthetic:
 * - Handcrafted graphic motif matching the event theme
 * - Title and Year ONLY in the rest state
 * - Asymmetrical proportions and editorial framing
 */
export default function EventPoster({ event, onClick, onKeyDown }: EventPosterProps) {
  const getAspectClass = (aspect: EventItem["posterAspect"]) => {
    switch (aspect) {
      case "tall":
        return "aspect-[3/4.2]";
      case "wide":
        return "aspect-[16/11]";
      case "square":
        return "aspect-square";
      case "portrait":
      default:
        return "aspect-[3/4]";
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      data-no-constellation
      id={`poster-${event.id}`}
      aria-label={`${event.title}, ${event.year}. Click to view exhibition archive.`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`focus-ring reflection-edge group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#12141a]/90 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-soft-glow/50 hover:bg-[#1a1c24] hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(246,195,67,0.15)] cursor-pointer select-none ${getAspectClass(
        event.posterAspect
      )}`}
    >
      {/* Background Graphic Motif (Handcrafted SVG Art) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-70">
        {event.motif === "escape" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.8">
            <rect x="20" y="20" width="160" height="200" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="100" cy="100" r="50" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="30" strokeDasharray="2 4" />
            <line x1="100" y1="30" x2="100" y2="170" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="30" y1="100" x2="170" y2="100" strokeWidth="0.6" strokeDasharray="3 3" />
            <rect x="90" y="90" width="20" height="20" fill="#F6C343" fillOpacity="0.2" />
          </svg>
        )}

        {event.motif === "stranger" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.7">
            {/* Perspective Synth Grid */}
            <line x1="0" y1="160" x2="200" y2="160" opacity="0.4" />
            <line x1="0" y1="180" x2="200" y2="180" opacity="0.6" />
            <line x1="0" y1="205" x2="200" y2="205" opacity="0.8" />
            <line x1="100" y1="140" x2="0" y2="240" />
            <line x1="100" y1="140" x2="50" y2="240" />
            <line x1="100" y1="140" x2="100" y2="240" />
            <line x1="100" y1="140" x2="150" y2="240" />
            <line x1="100" y1="140" x2="200" y2="240" />
            <circle cx="100" cy="90" r="45" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        )}

        {event.motif === "hackathon" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.8">
            <polyline points="20,40 70,40 100,70 170,70" />
            <polyline points="30,120 90,120 120,150 180,150" />
            <polyline points="40,200 110,200 140,170 180,170" />
            <circle cx="20" cy="40" r="3" fill="#F6C343" />
            <circle cx="170" cy="70" r="3" fill="#F6C343" />
            <circle cx="180" cy="150" r="3" fill="#F6C343" />
            <circle cx="40" cy="200" r="3" fill="#F6C343" />
          </svg>
        )}

        {event.motif === "workshop" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.8">
            <circle cx="50" cy="80" r="16" />
            <circle cx="50" cy="160" r="16" />
            <circle cx="150" cy="120" r="22" strokeWidth="1.2" />
            <line x1="66" y1="80" x2="128" y2="120" strokeDasharray="2 3" />
            <line x1="66" y1="160" x2="128" y2="120" strokeDasharray="2 3" />
          </svg>
        )}

        {event.motif === "blockchain" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.9">
            <rect x="40" y="50" width="45" height="45" rx="3" />
            <rect x="115" y="145" width="45" height="45" rx="3" />
            <polyline points="85,72 137,72 137,145" strokeDasharray="3 3" />
            <circle cx="137" cy="72" r="3" fill="#F6C343" />
          </svg>
        )}

        {event.motif === "creative" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.8">
            <circle cx="100" cy="120" r="60" strokeDasharray="5 5" />
            <polygon points="100,50 160,150 40,150" opacity="0.6" />
            <line x1="20" y1="20" x2="180" y2="220" opacity="0.3" />
          </svg>
        )}

        {event.motif === "defense" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-soft-glow fill-none" strokeWidth="0.8">
            <polygon points="100,30 170,80 170,160 100,210 30,160 30,80" strokeWidth="1.2" />
            <circle cx="100" cy="120" r="30" strokeDasharray="3 3" />
            <line x1="100" y1="90" x2="100" y2="150" />
            <line x1="70" y1="120" x2="130" y2="120" />
          </svg>
        )}
      </div>

      {/* Top: Year Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-soft-glow/90 uppercase">
          {event.year}
        </span>
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
          ARCHIVE // 0{event.id}
        </span>
      </div>

      {/* Bottom: Poster Title ONLY per locked spec */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="flex items-end justify-between gap-2">
          <h3 className="font-bold tracking-tight text-white text-lg md:text-xl group-hover:text-soft-glow transition-colors duration-200">
            {event.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-soft-glow opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}
