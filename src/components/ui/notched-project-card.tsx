"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NotchedProjectCard
 *
 * Compact & refined exhibition poster card with a filleted cutout and nested arrow disc.
 */

export interface NotchedProjectCardProps {
  href?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  title: string;
  description?: string;
  /** cover photograph */
  image: string;
  imageAlt?: string;
  /** a pill at the top of the cover, e.g. the year */
  badge?: string;
  tags?: string[];
  /** a product screen over the photo (transparent PNG/WebP works best) */
  screen?: { src: string; alt: string; className?: string };
  /** a dark wash between the photo and the screen, 0 to 1 */
  dim?: number;
  monochrome?: boolean;
  /** the colour behind the card; the notch is painted in it */
  surface?: string;
  /** the arrow disc's fill on hover (any CSS colour); defaults to the theme's primary */
  accent?: string;
  /** the arrow's colour on that fill; pick one that contrasts with `accent` */
  accentForeground?: string;
  className?: string;
  aspectClassName?: string;
}

const DISC = 42; // compact arrow disc, px
const BLOCK = 56; // notch block, px (radius = BLOCK - DISC / 2)
const FILLET = 18; // curve where the cut meets the cover's edges, px

export function NotchedProjectCard({
  href,
  onClick,
  onKeyDown,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "#090a0f",
  accent = "#ffffff",
  accentForeground = "#000000",
  className,
  aspectClassName = "aspect-[16/10]",
}: NotchedProjectCardProps) {
  const tone = monochrome
    ? "grayscale transition-[filter,scale] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-[scale] duration-500";

  const Comp = href ? "a" : "div";

  return (
    <Comp
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick || !href ? 0 : undefined}
      className={cn(
        "group flex flex-col rounded-[20px] outline-none select-none cursor-pointer transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <div className="relative">
        {/* Compact cover photo */}
        <div className={cn("relative overflow-hidden rounded-[20px] bg-[#12151c] border border-white/10", aspectClassName)}>
          <img
            src={image}
            alt={screen ? "" : imageAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              tone,
              !screen && "group-hover:scale-[1.04]",
            )}
          />
          {dim > 0 && (
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }} />
          )}
          {screen && (
            <img
              src={screen.src}
              alt={screen.alt}
              className={cn(
                "absolute bottom-0 right-0 w-[80%] origin-bottom-right drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] group-hover:scale-[1.05]",
                tone,
                screen.className,
              )}
            />
          )}
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-3 pt-3">
              <span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-white backdrop-blur-md">
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* The notch block */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2, background: surface }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* Compact arrow disc nested in notch */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-105",
            accent
              ? "group-hover:bg-[var(--card-accent)] group-hover:text-[var(--card-accent-fg)] group-hover:border-transparent group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              : "group-hover:bg-white group-hover:text-black",
          )}
          style={
            {
              width: DISC,
              height: DISC,
              "--card-accent": accent,
              "--card-accent-fg": accentForeground,
            } as React.CSSProperties
          }
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3 className="mt-3 font-mono text-base font-bold tracking-tight text-white group-hover:text-silver-bright transition-colors line-clamp-1">
        {title}
      </h3>
      {description && (
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/65 line-clamp-2">
          {description}
        </p>
      )}
      {tags.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-white/75"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </Comp>
  );
}

export default NotchedProjectCard;
