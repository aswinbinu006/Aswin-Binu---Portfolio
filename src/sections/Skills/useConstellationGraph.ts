import { useState, useMemo } from "react";
import { skillsData, type SkillItem, type SkillCategory } from "@/data/skills";

export function useConstellationGraph() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  const activeSkill = useMemo(
    () => skillsData.find((s) => s.id === activeSkillId) || null,
    [activeSkillId]
  );

  const connectedSkills = useMemo(() => {
    if (!activeSkill) return [];
    return skillsData.filter((s) =>
      activeSkill.connectedTech.some(
        (tech) =>
          tech.toLowerCase().includes(s.name.toLowerCase()) ||
          s.name.toLowerCase().includes(tech.toLowerCase())
      )
    );
  }, [activeSkill]);

  const handleSelectSkill = (skill: SkillItem) => {
    setActiveSkillId((prev) => (prev === skill.id ? null : skill.id));
  };

  const handleClearSkill = () => {
    setActiveSkillId(null);
  };

  return {
    activeSkillId,
    setActiveSkillId,
    activeCategory,
    setActiveCategory,
    activeSkill,
    connectedSkills,
    handleSelectSkill,
    handleClearSkill,
  };
}
