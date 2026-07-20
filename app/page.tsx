import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import { AiAssistant } from "@/components/ai-assistant";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { TechCloud } from "@/components/sections/tech-cloud";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Particles />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Achievements />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <TechCloud />
        <Contact />
      </main>
      <Footer />
      <AiAssistant />
    </>
  );
}
