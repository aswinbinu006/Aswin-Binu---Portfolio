import React from "react";
import type { EventItem } from "@/data/events";

interface EventPosterProps {
  event: EventItem;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Exhibition Poster Placeholder
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
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
      className={`focus-ring group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-luminous-faint bg-navy-surface p-5 sm:p-6 shadow-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/50 hover:bg-navy/80 hover:shadow-stellar cursor-pointer select-none ${getAspectClass(
        event.posterAspect
      )}`}
    >
      {/* Background Graphic Motif (Handcrafted SVG Art) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75">
        {event.motif === "escape" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.8">
            <rect x="20" y="20" width="160" height="200" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="100" cy="100" r="50" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="30" strokeDasharray="2 4" />
            <line x1="100" y1="30" x2="100" y2="170" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="30" y1="100" x2="170" y2="100" strokeWidth="0.6" strokeDasharray="3 3" />
            <rect x="90" y="90" width="20" height="20" fill="#5FA8FF" fillOpacity="0.2" />
          </svg>
        )}

        {event.motif === "stranger" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.7">
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
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.8">
            <polyline points="20,40 70,40 100,70 170,70" />
            <polyline points="30,120 90,120 120,150 180,150" />
            <polyline points="40,200 110,200 140,170 180,170" />
            <circle cx="20" cy="40" r="3" fill="#5FA8FF" />
            <circle cx="170" cy="70" r="3" fill="#5FA8FF" />
            <circle cx="180" cy="150" r="3" fill="#5FA8FF" />
            <circle cx="40" cy="200" r="3" fill="#5FA8FF" />
          </svg>
        )}

        {event.motif === "workshop" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.8">
            <circle cx="50" cy="80" r="16" />
            <circle cx="50" cy="160" r="16" />
            <circle cx="150" cy="120" r="22" strokeWidth="1.2" />
            <line x1="66" y1="80" x2="128" y2="120" strokeDasharray="2 3" />
            <line x1="66" y1="160" x2="128" y2="120" strokeDasharray="2 3" />
          </svg>
        )}

        {event.motif === "blockchain" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.9">
            <rect x="40" y="50" width="45" height="45" rx="3" />
            <rect x="115" y="145" width="45" height="45" rx="3" />
            <polyline points="85,72 137,72 137,145" strokeDasharray="3 3" />
            <circle cx="137" cy="72" r="3" fill="#5FA8FF" />
          </svg>
        )}

        {event.motif === "creative" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.8">
            <circle cx="100" cy="120" r="60" strokeDasharray="5 5" />
            <polygon points="100,50 160,150 40,150" opacity="0.6" />
            <line x1="20" y1="20" x2="180" y2="220" opacity="0.3" />
          </svg>
        )}

        {event.motif === "defense" && (
          <svg viewBox="0 0 200 240" className="h-full w-full stroke-cyan fill-none" strokeWidth="0.8">
            <polygon points="100,30 170,80 170,160 100,210 30,160 30,80" strokeWidth="1.2" />
            <circle cx="100" cy="120" r="30" strokeDasharray="3 3" />
            <line x1="100" y1="90" x2="100" y2="150" />
            <line x1="70" y1="120" x2="130" y2="120" />
          </svg>
        )}
      </div>

      {/* Top: Year Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full border border-cyan/30 bg-cyan-dim px-2.5 py-0.5 font-mono text-label tracking-wider text-cyan-bright uppercase">
          {event.year}
        </span>
        <span className="font-mono text-label text-luminous-dim tracking-widest uppercase">
          ARCHIVE // 0{event.id}
        </span>
      </div>

      {/* Bottom: Poster Title */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="flex items-end justify-between gap-2">
          <h3 className="font-mono font-bold tracking-tight text-luminous text-h3 group-hover:text-cyan-bright transition-colors duration-200">
            {event.title}
          </h3>
          <span className="shrink-0 font-mono text-caption text-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}
