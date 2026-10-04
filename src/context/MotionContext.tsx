import React, { createContext, useContext, useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";

interface MotionContextType {
  isPaused: boolean;
  togglePause: () => void;
  setPause: (paused: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  isPaused: false,
  togglePause: () => {},
  setPause: () => {},
});

export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aswin_motion_paused");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isPaused) {
        document.documentElement.classList.add("reduce-motion", "animations-paused");
      } else {
        document.documentElement.classList.remove("reduce-motion", "animations-paused");
      }
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("aswin_motion_paused", String(isPaused));
    }
  }, [isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);
  const setPause = (paused: boolean) => setIsPaused(paused);

  return (
    <MotionContext.Provider value={{ isPaused, togglePause, setPause }}>
      <MotionConfig reducedMotion={isPaused ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}
