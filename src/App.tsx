import { useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { VoiceProvider, useVoice } from "./providers/VoiceProvider";
import Layout from "./layout/Layout";

import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import TimelineSection from "./sections/TimelineSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificatesSection from "./sections/CertificatesSection";

import ContactSection from "./sections/ContactSection";
import AiAssistant from "./ui/AiAssistant";
import { useScroll } from "./hooks/useScroll";

function AppContent() {
  const { isSpeakingIntro, toggleVoiceIntro } = useVoice();
  const { scrollToSection } = useScroll();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleSearchNavigation = (query: string) => {
    if (query === "java" || query === "backend") {
      scrollToSection("skills");
    } else if (query === "blockchain" || query === "ai") {
      scrollToSection("projects");
    }
  };

  return (
    <Layout isResumeOpen={isResumeOpen} setIsResumeOpen={setIsResumeOpen}>
      <HeroSection
        onScrollToSection={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        isSpeakingIntro={isSpeakingIntro}
        onToggleVoiceIntro={toggleVoiceIntro}
      />

      <div className="py-8">
        <AiAssistant onSearchNavigation={handleSearchNavigation} />
      </div>

      <AboutSection />
      <TimelineSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection onScrollToSection={scrollToSection} />
      <CertificatesSection />

      <ContactSection />
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <VoiceProvider>
        <AppContent />
      </VoiceProvider>
    </ThemeProvider>
  );
}
