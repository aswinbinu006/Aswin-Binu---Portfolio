import React, { useState, useEffect } from "react";

const CHAPTERS = [
  { id: "chapter-1", label: "01 // GENESIS" },
  { id: "chapter-2", label: "02 // OPERATOR" },
  { id: "chapter-3", label: "03 // TOPOLOGY" },
  { id: "chapter-4", label: "04 // SYSTEMS" },
  { id: "chapter-5", label: "05 // ARCHIVES" },
  { id: "chapter-8", label: "08 // SIGNAL" },
];

/**
 * Futuristic Space OS Orbital Telemetry Header Bar
 * Floats fixed at top of screen providing real-time telemetry,
 * sector coordinates, and interactive mission chapter navigation.
 */
export default function SpaceOSHud() {
  const [activeChapter, setActiveChapter] = useState("01 // GENESIS");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    // Universal Mission Time Clock (UTC)
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().split(" ")[4];
      setTimeString(`${utc} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Scroll spy for chapters
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ch2 = document.getElementById("chapter-2")?.offsetTop || 800;
      const ch3 = document.getElementById("chapter-3")?.offsetTop || 1800;
      const ch4 = document.getElementById("chapter-4")?.offsetTop || 2800;
      const ch5 = document.getElementById("chapter-5")?.offsetTop || 3800;
      const ch8 = document.getElementById("chapter-8")?.offsetTop || 4800;

      if (scrollY < ch2 - 200) {
        setActiveChapter("01 // GENESIS");
      } else if (scrollY < ch3 - 200) {
        setActiveChapter("02 // OPERATOR");
      } else if (scrollY < ch4 - 200) {
        setActiveChapter("03 // TOPOLOGY");
      } else if (scrollY < ch5 - 200) {
        setActiveChapter("04 // SYSTEMS");
      } else if (scrollY < ch8 - 200) {
        setActiveChapter("05 // ARCHIVES");
      } else {
        setActiveChapter("08 // SIGNAL");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-40 p-3 md:p-5 select-none transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-xl border border-white/10 bg-[#020814]/70 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(2,8,20,0.8)]">
        {/* Left Telemetry: Identity & System Beacon */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-soft-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-soft-glow" />
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold tracking-wider text-white">
              SPACE OS // ASWIN BINU
            </span>
            <span className="hidden font-mono text-[9px] text-soft-glow/80 sm:inline-block">
              SYS_STATUS: ACTIVE • TELEMETRY NOMINAL
            </span>
          </div>
        </div>

        {/* Center Telemetry: Deep Space Coordinates */}
        <div className="hidden font-mono text-[10px] tracking-widest text-white/50 lg:flex items-center gap-2">
          <span className="text-soft-glow/60">[</span>
          <span>SECTOR 07 • TARANTULA NEBULA</span>
          <span className="text-white/20">|</span>
          <span>RA 05h 38m • DEC -69° 05&apos;</span>
          <span className="text-soft-glow/60">]</span>
        </div>

        {/* Right Navigation: Active Mission Chapter Quick-Jump */}
        <div className="pointer-events-auto flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {CHAPTERS.map((ch) => {
              const isActive = activeChapter === ch.label;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollTo(ch.id)}
                  className={`rounded px-2 py-1 font-mono text-[10px] tracking-wider transition-all duration-200 ${
                    isActive
                      ? "border border-soft-glow/40 bg-soft-glow/15 text-white shadow-[0_0_10px_rgba(95,168,255,0.3)]"
                      : "text-white/40 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {ch.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile active indicator readout */}
          <div className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-soft-glow md:hidden">
            <span>{activeChapter}</span>
          </div>

          {/* Live UTC time */}
          <div className="hidden font-mono text-[10px] text-white/40 xl:block border-l border-white/10 pl-3">
            {timeString}
          </div>
        </div>
      </div>
    </header>
  );
}
