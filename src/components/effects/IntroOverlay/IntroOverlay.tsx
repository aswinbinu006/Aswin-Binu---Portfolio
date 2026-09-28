import React, { useState, useEffect, useMemo } from "react";
import IntroCanvas from "./IntroCanvas";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const HOOK_LINE_1 = "We don't just teach machines to calculate.";
const HOOK_LINE_2 = "We build systems that endure when failure isn't an option.";

const BOOT_LOGS = [
  "INITIALIZING TACTICAL NEURAL BUS [NODE-01] ... ONLINE",
  "MOUNTING EDGE QUANTIZATION RUNTIMES [TENSORRT] ... OK",
  "SYNCHRONIZING SENSOR FUSION & REAL-TIME AVIONICS ... OK",
  "TARGET COORDINATES LOCKED: NAGPUR [LAT 21.14°N] ... READY",
];

const SCRAMBLE_CHARS = "ABCDEF0123456789!<>-_\\/[]{}—=+*^?#";

/**
 * Hook for animated matrix/cypher text decryption effect
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
 * Animated Audio Frequency Visualizer Bars
 */
function EqualizerBars() {
  const barHeights = useMemo(() => [35, 75, 45, 95, 60, 100, 50, 85, 40, 70], []);

  return (
    <div className="flex items-end gap-1 h-3.5 px-1">
      {barHeights.map((h, idx) => (
        <span
          key={idx}
          className="w-0.5 bg-blue-400/80 rounded-full animate-pulse"
          style={{
            height: `${h}%`,
            animationDuration: `${0.35 + (idx % 3) * 0.18}s`,
            animationDelay: `${idx * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Cinematic, suspenseful intro overlay:
 * - Real-time 3D Hyperspace Warp Drive Tunnel with depth streaks
 * - Live Matrix / Cypher Text Decryption Sequence
 * - Audio Spectrum Equalizer & HUD Telemetry Aperture
 * - Lightspeed Hyperdrive Transition into the monumental ASWIN BINU Hero
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

  const line1Text = useScrambleText(HOOK_LINE_1, stage === "line1" || stage === "line2" || stage === "cta" || stage === "warp", 900);
  const line2Text = useScrambleText(HOOK_LINE_2, stage === "line2" || stage === "cta" || stage === "warp", 1200);

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
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="System Initialization Directive"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-[#020610] text-white select-none transition-all duration-700 ${
        isWarping ? "scale-125 opacity-0 brightness-200 blur-2xl" : "scale-100 opacity-100"
      }`}
    >
      {/* 1. Dynamic 3D Hyperspace Warp & Tactical Singularity Core Canvas */}
      <IntroCanvas isWarping={isWarping || stage === "warp"} />

      {/* 2. Ambient Cosmic Space Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(2,6,16,0.1) 0%, rgba(2,6,16,0.7) 65%, #020610 100%)",
        }}
      />

      {/* 3. Top Cybernetic Aperture Shutter Bar */}
      <header className="intro-telemetry relative z-20 w-full flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 bg-[#020610]/40 backdrop-blur-md">
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs tracking-widest text-blue-300/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-bold text-white">SYS_CORE: ONLINE</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-white/60">LAT 21.14°N // LON 79.08°E</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/50">
            <span>FREQ</span>
            <EqualizerBars />
          </div>

          {/* Skip Button */}
          <button
            type="button"
            onClick={onInitializeClick}
            className="font-mono text-[10px] sm:text-[11px] tracking-widest text-white/60 hover:text-white transition-all uppercase px-3.5 py-1.5 rounded-full border border-white/15 hover:border-blue-400/50 bg-white/5 hover:bg-blue-500/10 cursor-pointer backdrop-blur-md"
          >
            SKIP [ESC]
          </button>
        </div>
      </header>

      {/* 4. Central Kinetic Stage */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center my-auto">
        {/* Live Typewriter Terminal Badge */}
        <div
          ref={terminalRef}
          className="mb-7 sm:mb-9 inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-950/40 px-4 sm:px-5 py-2 font-mono text-[10px] sm:text-xs text-blue-200 tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <span className="text-cyan-400 font-bold">&gt;</span>
          <span className="text-white transition-all duration-300 min-h-[1.2em]">
            {BOOT_LOGS[activeLogIndex]}
          </span>
        </div>

        {/* Suspense Cypher Decoded Manifesto */}
        <div className="flex flex-col items-center gap-3.5 sm:gap-4.5 max-w-3xl min-h-[120px] sm:min-h-[140px] justify-center">
          {/* Line 1 */}
          <h2 className="font-mono text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white/70 leading-[1.3] min-h-[1.4em]">
            {line1Text ? (
              <span className="inline-block transition-all duration-300">
                {line1Text}
              </span>
            ) : (
              <span className="opacity-0">{HOOK_LINE_1}</span>
            )}
          </h2>

          {/* Line 2 with Specular Cyan Glow */}
          <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.3] min-h-[1.4em]">
            {line2Text ? (
              <span className="inline-block text-white drop-shadow-[0_0_30px_rgba(95,168,255,0.6)]">
                {line2Text}
              </span>
            ) : (
              <span className="opacity-0">{HOOK_LINE_2}</span>
            )}
          </h2>
        </div>

        {/* Interactive Lightspeed Launch Button */}
        <div className="mt-8 sm:mt-11">
          <button
            ref={ctaRef}
            type="button"
            onClick={onInitializeClick}
            className="group relative flex items-center gap-3.5 rounded-full border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/25 px-8 sm:px-10 py-3.5 sm:py-4 font-mono text-xs sm:text-sm tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-300 hover:shadow-[0_0_40px_rgba(95,168,255,0.55)] cursor-pointer active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-wider">INITIALIZE OPERATOR</span>
            <span className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-2 font-bold">
              →
            </span>
          </button>
        </div>
      </div>

      {/* 5. Bottom Cybernetic Diagnostic Bar */}
      <footer className="intro-telemetry relative z-20 w-full flex items-center justify-between px-6 sm:px-10 py-4 border-t border-white/10 bg-[#020610]/40 backdrop-blur-md">
        <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50">
          <span className="text-white/40">SYSTEM CALIBRATION:</span>
          <span className="text-cyan-300 font-bold">{progress}%</span>
          <div className="h-1.5 w-20 sm:w-32 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 flex items-center gap-3">
          <span className="hidden sm:inline">TIMECODE:</span>
          <span className="text-blue-300/80 font-semibold">{timecode}</span>
        </div>
      </footer>
    </div>
  );
}