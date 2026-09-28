import { Providers } from "./providers";
import Background from "@/components/layout/Background";
import { IntroOverlay } from "@/components/effects/IntroOverlay";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Gallery } from "@/sections/Gallery";
import { Contact } from "@/sections/Contact";

/**
 * Main Application Shell - Story-Driven Flow:
 * - Cinematic intro overlay plays on entry
 * - Fades out seamlessly into Introduction (About) section
 * - No duplicate name display - Intro has name, About starts with narrative
 */
export default function App() {
  return (
    <Providers>
      <IntroOverlay />
      <Background />
      <main className="relative z-10">
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </Providers>
  );
}