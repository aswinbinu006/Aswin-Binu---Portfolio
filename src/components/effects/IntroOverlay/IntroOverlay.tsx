import React, { useState, useEffect } from "react";
import IntroCanvas from "./IntroCanvas";
import AstronautVisor from "./AstronautVisor";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const HOOK_LINE_1 = "We don't just teach machines to calculate.";
const HOOK_LINE_2 = "We build systems that endure when failure isn't an option.";

const BOOT_LOGS = [
  "LOCKING WORMHOLE TRAJECTORY: EVENT HORIZON ... ARMED",
  "PRESSURIZING EVA REACTION CONTROL THRUSTERS ... 100%",
  "SYNCHRONIZING RELATIVISTIC GRAVITATIONAL SENSORS ... OK",
  "TARGET VECTOR IDENTIFIED: THE MULTIVERSE ... READY",
];

const SCRAMBLE_CHARS = "ABCDEF0123456789!<>-_\\/[]{}—=+*^?#";

/**
 * Animated cypher text decryption effect in starlight gold
 */
function useScrambleText(targetText: string, isTriggered: boolean, durationMs = 1100) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isTriggered) {
      setDisplayed("");
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(15, Math.floor(durationMs / 25));
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * targetText.length);

      let result = "";
      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === " ") {
          result += " ";
        } else if (i < revealCount) {
          result += targetText[i];
        } else {
          result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      setDisplayed(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayed(targetText);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [targetText, isTriggered, durationMs]);

  return displayed;
}

/**
 * Cinematic First-Person Astronaut Helmet Visor POV:
 * - Astronaut Helmet HUD Viewport with ergonomic visor curvature
 * - Interstellar Wormhole & Golden Accretion Singularity Canvas
 * - Real-time Life-Support Telemetry & ECG Heart Rate Monitor
 * - Golden Starlight / Warm Amber HUD Projections (No generic AI blues)
 * - Event Horizon Breaching Transition into the monumental ASWIN BINU Hero
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    stage,
    overlayRef,
    terminalRef,
    ctaRef,
    handleExplore,
  } = useIntroAnimation({ onComplete });

  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");

  const line1Text = useScrambleText(
    HOOK_LINE_1,
    stage === "line1" || stage === "line2" || stage === "cta" || stage === "warp",
    900
  );
  const line2Text = useScrambleText(
    HOOK_LINE_2,
    stage === "line2" || stage === "cta" || stage === "warp",
    1200
  );

  // Live boot sequence & precision progress ticking
  useEffect(() => {
    if (!isVisible) return;

    const logInterval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % BOOT_LOGS.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 45);

    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, "0");
      const sec = Math.floor((elapsed / 1000) % 60).toString().padStart(2, "0");
      const min = Math.floor((elapsed / 60000) % 60).toString().padStart(2, "0");
      setTimecode(`00:${min}:${sec}:${ms}`);
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, [isVisible]);

  const onInitializeClick = () => {
    if (isWarping) return;
    setIsWarping(true);
    setTimeout(() => {
      handleExplore();
    }, 550);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Astronaut EVA Visor Viewport"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-[#030712] text-white select-none transition-all duration-700 ${
        isWarping ? "scale-140 opacity-0 brightness-200 blur-2xl" : "scale-100 opacity-100"
      }`}
    >
      {/* 1. Interstellar Wormhole & Accretion Singularity Canvas */}
      <IntroCanvas isWarping={isWarping || stage === "warp"} />

      {/* 2. Deep Cosmic Void Ambient Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(3,7,18,0.1) 0%, rgba(3,7,18,0.7) 65%, #030712 100%)",
        }}
      />

      {/* 3. First-Person Astronaut Helmet Visor Frame & HUD Overlay */}
      <AstronautVisor
        progress={progress}
        timecode={timecode}
        isWarping={isWarping || stage === "warp"}
        onInitialize={onInitializeClick}
      >
        {/* Central Visor Projection Glass */}
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center text-center px-4">
          {/* Astronaut Suit Navigation Badge */}
          <div
            ref={terminalRef}
            className="mb-7 sm:mb-9 inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-4 sm:px-6 py-2 font-mono text-[10px] sm:text-xs text-amber-200 tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.2)]"
          >
            <span className="text-amber-400 font-bold">&gt;</span>
            <span className="text-white transition-all duration-300 min-h-[1.2em]">
              {BOOT_LOGS[activeLogIndex]}
            </span>
          </div>

          {/* Holographic Manifesto Decryption on Helmet Glass */}
          <div className="flex flex-col items-center gap-3.5 sm:gap-4.5 max-w-3xl min-h-[120px] sm:min-h-[140px] justify-center">
            {/* Line 1 in Platinum Starlight */}
            <h2 className="font-mono text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-amber-100/80 leading-[1.3] min-h-[1.4em]">
              {line1Text ? (
                <span className="inline-block transition-all duration-300">
                  {line1Text}
                </span>
              ) : (
                <span className="opacity-0">{HOOK_LINE_1}</span>
              )}
            </h2>

            {/* Line 2 with Radiant Golden Starlight Specular Glow */}
            <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.3] min-h-[1.4em]">
              {line2Text ? (
                <span className="inline-block text-white drop-shadow-[0_0_35px_rgba(251,191,36,0.65)]">
                  {line2Text}
                </span>
              ) : (
                <span className="opacity-0">{HOOK_LINE_2}</span>
              )}
            </h2>
          </div>

          {/* Interactive Thruster Engagement / Event Horizon Breach Button */}
          <div className="mt-8 sm:mt-11">
            <button
              ref={ctaRef}
              type="button"
              onClick={onInitializeClick}
              className="group relative flex items-center gap-3.5 rounded-full border border-amber-400/50 bg-amber-500/15 hover:bg-amber-500/30 px-8 sm:px-11 py-3.5 sm:py-4 font-mono text-xs sm:text-sm tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-amber-300 hover:shadow-[0_0_45px_rgba(251,191,36,0.6)] cursor-pointer active:scale-95"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-bold tracking-wider text-amber-100">ENTER THE MULTIVERSE</span>
              <span className="text-amber-300 transition-transform duration-300 group-hover:translate-x-2 font-bold">
                →
              </span>
            </button>
          </div>
        </div>
      </AstronautVisor>
    </div>
  );
}