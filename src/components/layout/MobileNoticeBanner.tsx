import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X, Sparkles } from "lucide-react";

export function MobileNoticeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile screens and if not dismissed in current session
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      const isDismissed = sessionStorage.getItem("dismissed_desktop_notice") === "true";
      if (isMobile && !isDismissed) {
        // Subtle delay for smooth appearance after hero load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dismissed_desktop_notice", "true");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-4 inset-x-3 z-50 md:hidden pointer-events-auto"
        >
          <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#0b1322]/95 border border-cyan-500/30 text-white shadow-2xl shadow-cyan-950/60 backdrop-blur-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Monitor className="w-4 h-4" />
              </div>
              <div className="text-[12px] leading-tight text-slate-300">
                <span className="font-semibold text-cyan-300 flex items-center gap-1 inline-flex">
                  <Sparkles className="w-3 h-3 text-cyan-400 inline" /> Optimal Experience
                </span>
                <p className="text-slate-400 mt-0.5 text-[11px] leading-normal">
                  Some 3D shaders & cosmic effects are disabled for mobile speed. Switch to desktop/laptop for the full interactive view!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
