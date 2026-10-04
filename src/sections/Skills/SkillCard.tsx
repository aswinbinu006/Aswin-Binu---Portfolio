import React from 'react';
import { motion } from 'framer-motion';
import type { TechItem } from '@/data/skills';
import TechIcon from './TechIcon';

interface SkillCardProps {
  item: TechItem;
  index?: number;
}

export default function SkillCard({ item, index = 0 }: SkillCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
      className="group relative flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/10 bg-[#080B14]/85 backdrop-blur-md transition-all duration-200 hover:border-white/35 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
      title={`Used in: ${item.usedIn.join(', ')}`}
    >
      {/* Small Tech Logo Box */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 transition-transform duration-200 group-hover:scale-105 group-hover:border-white/25">
        <TechIcon type={item.iconType} className="h-5 w-5" />
      </div>

      {/* Tech Name & Compact Category */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="truncate font-mono text-xs sm:text-[13px] font-bold tracking-wide text-white transition-colors duration-150 group-hover:text-white">
          {item.name}
        </span>
        <span className="truncate font-mono text-[10px] tracking-wider uppercase text-white/50">
          {item.categoryLabel}
        </span>
      </div>
    </motion.div>
  );
}
