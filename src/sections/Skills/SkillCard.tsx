import React from 'react';
import { motion } from 'framer-motion';
import type { TechItem } from '@/data/skills';
import TechIcon from './TechIcon';

interface SkillCardProps {
  item: TechItem;
  index?: number;
}

export default function SkillCard({ item }: SkillCardProps) {
  return (
    <div
      className="group relative flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/20 bg-[#0c121e]/90 transition-all duration-200 hover:border-white/40 hover:bg-[#131d2e] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] h-full select-none"
      title={`Used in: ${item.usedIn.join(', ')}`}
    >
      {/* Small Tech Logo Box */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] p-1.5 transition-transform duration-200 group-hover:scale-105 group-hover:border-white/35">
        <TechIcon type={item.iconType} className="h-5 w-5" />
      </div>

      {/* Tech Name & Compact Category */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="truncate font-mono text-xs sm:text-[13px] font-bold tracking-wide text-white transition-colors duration-150 group-hover:text-white">
          {item.name}
        </span>
        <span className="truncate font-mono text-[10px] tracking-wider uppercase text-white/75 font-medium">
          {item.categoryLabel}
        </span>
      </div>
    </div>
  );
}
