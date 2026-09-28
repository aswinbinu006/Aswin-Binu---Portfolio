import { useState } from "react";

export function useProjectCardInteraction(forceOpen: boolean) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const isExpanded = forceOpen || isLocked || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggleLock = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button:not(.lock-toggle)")) return;

    setIsLocked((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsLocked((prev) => !prev);
    }
  };

  return {
    isExpanded,
    isLocked,
    handleMouseEnter,
    handleMouseLeave,
    handleToggleLock,
    handleKeyDown,
  };
}
