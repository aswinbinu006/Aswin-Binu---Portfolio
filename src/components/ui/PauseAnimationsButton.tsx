import React from "react";
import { useMotion } from "@/context/MotionContext";
import { Play, Pause } from "lucide-react";

export function PauseAnimationsButton() {
  const { isPaused, togglePause } = useMotion();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        type="button"
        id="btn-pause-animations"
        onClick={togglePause}
        aria-pressed={isPaused}
        aria-label={isPaused ? "Resume animations" : "Pause animations"}
        title={isPaused ? "Resume animations (WCAG 2.3.3)" : "Pause animations (WCAG 2.3.3)"}
        className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-[#0c121e]/90 px-3.5 py-2 font-mono text-[11px] text-white/90 shadow-xl shadow-black/50 backdrop-blur-md transition-all hover:border-white/40 hover:bg-[#152033] hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#020814] cursor-pointer"
      >
        <span className="sr-only" aria-live="polite">
          {isPaused ? "Animations are paused" : "Animations are active"}
        </span>

        {isPaused ? (
          <>
            <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" aria-hidden="true" />
            <span className="font-semibold text-cyan-300">Resume Animations</span>
          </>
        ) : (
          <>
            <Pause className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
            <span className="text-white/80 group-hover:text-white">Pause Animations</span>
          </>
        )}
      </button>
    </div>
  );
}
