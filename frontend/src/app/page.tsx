import { About } from "@/components/about";
import { AiAssistant } from "@/components/ai-assistant";
import { Contact } from "@/components/contact";
import { ExperienceSection } from "@/components/experience-section";
import { FloatingAmbient } from "@/components/floating-ambient";
import { Footer } from "@/components/footer";
import { GitHubContributions } from "@/components/github-contributions";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { ResumeSection } from "@/components/resume-section";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { TerminalSection } from "@/components/terminal-section";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingAmbient />
      {/* Header outside z-10 so fixed mobile menu stacks above main (motion/transform layers). */}
      <SiteHeader />
      <div className="relative z-10 min-h-screen bg-paper">
        <main>
          <Hero />
          <About />
          <SkillsSection />
          <ExperienceSection />
          <Projects />
          <TerminalSection />
          <GitHubContributions />
          <ResumeSection />
          <Contact />
        </main>
        <Footer />
        <AiAssistant />
      </div>
    </div>
  );
}
