import React, { useState } from "react";
import { Providers } from "./providers";
import Background from "@/components/layout/Background";
import { IntroOverlay } from "@/components/effects/IntroOverlay";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Gallery } from "@/sections/Gallery";
import { Contact } from "@/sections/Contact";

/**
 * Main Application Shell - Story-Driven Flow:
 * - Cinematic intro overlay plays on entry and signals completion
 * - Hero dissolves into view with fluid title and tactical HUD
 * - About (Act II), Skills, Projects, Gallery, and Contact follow with zero overflow
 */
export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "✦ Systems Online • Aswin Binu";
      } else {
        document.title = "Aswin Binu • Portfolio";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <Providers>
      <Background />
      <IntroOverlay onComplete={() => setIsIntroComplete(true)} />
      <main
        className={`relative z-10 w-full overflow-x-clip transition-opacity duration-700 ${
          isIntroComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Hero isIntroComplete={isIntroComplete} />
        <About isIntroComplete={isIntroComplete} />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </Providers>
  );
}