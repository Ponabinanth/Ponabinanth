import { useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { VoiceProvider } from "./providers/VoiceProvider";

import DigitalGateLanding from "./ui/DigitalGateLanding";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProfessionalSection from "./sections/ProfessionalSection";
import EducationSection from "./sections/EducationSection";
import AcademicsSection from "./sections/AcademicsSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import CertificatesSection from "./sections/CertificatesSection";
import SocialProfilesSection from "./sections/SocialProfilesSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./layout/Footer";
import ResumeModal from "./ui/ResumeModal";
import AiAssistant from "./ui/AiAssistant";
import Header from "./layout/Header";

import { useScroll } from "./hooks/useScroll";

function AppContent() {
  const [hasEnteredGate, setHasEnteredGate] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { scrolled, activeSection, scrollToSection } = useScroll();

  const handleSearchNavigation = (query: string) => {
    if (query.includes("java") || query.includes("backend")) {
      scrollToSection("skills");
    } else if (query.includes("blockchain") || query.includes("ai")) {
      scrollToSection("projects");
    } else if (query.includes("education") || query.includes("college")) {
      scrollToSection("education");
    }
  };

  const handleGateNavigate = (sectionId?: string) => {
    setHasEnteredGate(true);
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    }
  };

  return (
    <>
      {/* 1. Light Theme & Dark Theme Gate Landing (First Screen) */}
      {!hasEnteredGate ? (
        <DigitalGateLanding
          onEnter={() => setHasEnteredGate(true)}
          onNavigateToSection={handleGateNavigate}
        />
      ) : (
        /* 2. Main Portfolio World */
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-sans">
          {/* Header Navigation */}
          <Header
            scrolled={scrolled}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          <main className="pt-16">
            <HeroSection
              onScrollToSection={scrollToSection}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            <div className="py-6 max-w-6xl mx-auto px-6">
              <AiAssistant onSearchNavigation={handleSearchNavigation} />
            </div>

            <AboutSection />
            <ProfessionalSection />
            <EducationSection />
            <AcademicsSection />
            <SkillsSection />
            <ProjectsSection onScrollToSection={scrollToSection} />
            <ExperienceSection />
            <CertificatesSection />
            <SocialProfilesSection onOpenResume={() => setIsResumeOpen(true)} />
            <ContactSection />
          </main>

          {/* Final Experience Footer */}
          <Footer onOpenResume={() => setIsResumeOpen(true)} />

          {/* Resume Viewer Modal */}
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
      )}
    </>
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
