import { useState, useMemo } from 'react';
import { skillsData, type TechItem, type SkillCategory } from '@/data/skills';

export function useConstellationGraph() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const activeSkill = useMemo(
    () => skillsData.find((s) => s.id === activeSkillId) || null,
    [activeSkillId]
  );

  return {
    activeSkillId,
    setActiveSkillId,
    activeCategory,
    setActiveCategory,
    activeSkill,
  };
}
