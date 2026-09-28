import { useState, useRef, useEffect, useMemo } from "react";
import { skills, type Skill } from "@/data/skills";
import { gsap } from "@/utils/gsap";

export interface Edge {
  id: string;
  from: Skill;
  to: Skill;
}

export function useConstellationGraph() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  // Compute unique edges from skill data
  const edges = useMemo(() => {
    const list: Edge[] = [];
    const seen = new Set<string>();
    const skillMap = new Map(skills.map((s) => [s.id, s]));

    skills.forEach((skill) => {
      skill.connectedSkillIds.forEach((targetId) => {
        const target = skillMap.get(targetId);
        if (!target) return;
        const key = [skill.id, target.id].sort().join("--");
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ id: key, from: skill, to: target });
        }
      });
    });

    return list;
  }, []);

  const activeSkill = useMemo(
    () => skills.find((s) => s.id === activeSkillId) || null,
    [activeSkillId]
  );

  const connectedSkills = useMemo(() => {
    if (!activeSkill) return [];
    const skillMap = new Map(skills.map((s) => [s.id, s]));
    return activeSkill.connectedSkillIds
      .map((id) => skillMap.get(id))
      .filter((s): s is Skill => Boolean(s));
  }, [activeSkill]);

  const connectedIds = useMemo(() => {
    if (!activeSkill) return new Set<string>();
    return new Set([activeSkill.id, ...activeSkill.connectedSkillIds]);
  }, [activeSkill]);

  // GSAP edge pulse animation on activeSkillId change
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      if (activeSkillId && linesRef.current) {
        const activeLines = linesRef.current.querySelectorAll(".edge-active");
        if (activeLines.length > 0) {
          gsap.fromTo(
            activeLines,
            { strokeDashoffset: 40, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 0.9,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.out",
            }
          );
        }
      }
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, [activeSkillId]);

  const handleNodeSelect = (id: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    setActiveSkillId((prev) => (prev === id ? null : id));
  };

  const handleEmptyClick = () => {
    setActiveSkillId(null);
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNodeSelect(id, e);
    } else if (e.key === "Escape") {
      setActiveSkillId(null);
    }
  };

  return {
    activeSkillId,
    setActiveSkillId,
    activeSkill,
    connectedSkills,
    connectedIds,
    edges,
    containerRef,
    linesRef,
    nodesRef,
    handleNodeSelect,
    handleEmptyClick,
    handleKeyDown,
  };
}
