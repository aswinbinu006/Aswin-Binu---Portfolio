import React, { useState, useEffect } from "react";
import { Providers } from "./providers";
import Background from "@/components/layout/Background";
import { IntroOverlay } from "@/components/effects/IntroOverlay";
import { MobileNoticeBanner } from "@/components/layout/MobileNoticeBanner";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Certificates } from "@/sections/Certificates";
import { Academics } from "@/sections/Academics";
import { Contact } from "@/sections/Contact";
import { initGoogleAnalytics } from "@/lib/analytics";

/**
 * Main Application Shell - Story-Driven Flow:
 * - Cinematic intro overlay plays on entry and signals completion
 * - Chapter 1: Hero (The Statement)
 * - Chapter 2: About (The Operator)
 * - Chapter 3: Skills (Skill Constellation)
 * - Chapter 4: Projects (Project Gallery)
 * - Chapter 5: Certificates (Certificates & Badges)
 * - Chapter 6: Academics (Academic Archive / The Academic Wall)
 * - Chapter 8: Contact (Tactical Uplink)
 */
export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics 4 (GA4) with UTM parameter capturing
    initGoogleAnalytics();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "✦ Systems Online • Aswin Binu";
      } else {
        document.title = "Aswin Binu • Portfolio";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Providers>
      <Background isIntroComplete={isIntroComplete} />
      <IntroOverlay onComplete={() => setIsIntroComplete(true)} />
      {isIntroComplete && <MobileNoticeBanner />}
      <main
        className={`relative z-10 w-full overflow-x-clip transition-opacity duration-700 ${
          isIntroComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Hero isIntroComplete={isIntroComplete} />
        <About isIntroComplete={isIntroComplete} />
        <Projects />
        <Skills />
        <Certificates />
        <Academics />
        <Contact />
      </main>
    </Providers>
  );
}