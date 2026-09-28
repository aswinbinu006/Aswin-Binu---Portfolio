import SmoothScroll from "@/components/ui/SmoothScroll";
import Background from "@/components/background/Background";
import Chapter1Hero from "@/components/hero/Chapter1Hero";
import Chapter2Intro from "@/components/intro/Chapter2Intro";
import SkillConstellation from "@/components/skills/SkillConstellation";
import ProjectGallery from "@/components/projects/ProjectGallery";
import EventArchive from "@/components/events/EventArchive";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Background />
      <main className="relative z-10">
        <Chapter1Hero />
        <Chapter2Intro />
        <SkillConstellation />
        <ProjectGallery />
        <EventArchive />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
