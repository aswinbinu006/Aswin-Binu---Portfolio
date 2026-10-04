import React from "react";
import type { CertificateItem } from "@/data/certificates";
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

interface CertificateCardProps {
  item: CertificateItem;
  onClick: () => void;
}

/**
 * Compact Cosmic Obsidian & Silver Certificate Card with Inner Image Box
 */
export default function CertificateCard({ item, onClick }: CertificateCardProps) {
  const getBadgeStyle = (type: CertificateItem["badgeType"]) => {
    switch (type) {
      case "Gold Tier":
        return "border-amber-400/30 bg-amber-400/10 text-amber-200";
      case "Industry Certified":
        return "border-white/30 bg-white/10 text-white";
      case "Specialization":
        return "border-sky-400/30 bg-sky-400/10 text-sky-200";
      case "Honorary Lead":
        return "border-purple-400/30 bg-purple-400/10 text-purple-200";
      default:
        return "border-white/20 bg-white/5 text-white/80";
    }
  };

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
      aria-label={`View details for ${item.title}`}
      className="group relative flex flex-col justify-between rounded-xl border border-white/20 bg-slate-800/25 backdrop-blur-xl p-3.5 transition-all duration-300 hover:border-white/40 hover:bg-slate-700/35 hover:shadow-silver focus-ring cursor-pointer select-none"
    >
      <div>
        {/* Card Header: Issuer, Badge Type & Date */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15 font-mono text-[9px]">
          <span className="font-semibold text-white/60 uppercase truncate max-w-[20ch]">
            {item.issuer}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-2 py-0.5 rounded-full border font-semibold tracking-wider ${getBadgeStyle(
                item.badgeType
              )}`}
            >
              {item.badgeType}
            </span>
            <span className="text-white/40">{item.issueDate}</span>
          </div>
        </div>

        {/* Embedded Certificate Preview Box Inside the Card (No Zoom) */}
        <div className="mt-2.5 relative w-full aspect-[16/8.5] rounded-lg overflow-hidden border border-white/10 bg-[#12151c]">
          <img
            src={item.image}
            alt={`${item.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-85 group-hover:grayscale-0 transition-[opacity,filter] duration-400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-black/30" />
          
          {/* Watermark Issuer / Category Pill Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-black/75 border border-white/15 font-mono text-[8.5px] text-white/90 backdrop-blur-md">
              {item.categoryLabel}
            </span>
            <span className="p-1 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md">
              {item.badgeType === "Gold Tier" ? (
                <Award className="size-3 text-amber-300" />
              ) : item.badgeType === "Honorary Lead" ? (
                <Sparkles className="size-3 text-purple-300" />
              ) : (
                <ShieldCheck className="size-3 text-sky-300" />
              )}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-2.5">
          <h3 className="font-mono text-sm font-bold text-white group-hover:text-silver-bright transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/60 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Skills Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-1.5 py-0.2 rounded bg-white/[0.03] border border-white/[0.06] font-mono text-[8.5px] text-white/70"
            >
              {skill}
            </span>
          ))}
          {item.skills.length > 3 && (
            <span className="px-1.5 py-0.2 rounded bg-white/[0.02] border border-white/[0.04] font-mono text-[8.5px] text-white/40">
              +{item.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Credential ID / Verification Prompt */}
      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/40">
        <div className="flex items-center gap-1">
          <CheckCircle className="size-3 text-emerald-400 shrink-0" />
          <span className="truncate max-w-[16ch]">
            {item.credentialId ? `ID: ${item.credentialId}` : "VERIFIED RECORD"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-white/60 group-hover:text-white transition-colors shrink-0">
          <span>INSPECT</span>
          <ExternalLink className="size-2.5" />
        </div>
      </div>
    </div>
  );
}

