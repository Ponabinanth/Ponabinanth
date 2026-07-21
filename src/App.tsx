import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, ChevronUp, Github, Linkedin, Menu, X,
  FileText, Volume2, VolumeX, Sun, Moon
} from "lucide-react";

import ResumeModal from "./components/ResumeModal.tsx";
import HeroSection from "./components/HeroSection.tsx";
import AboutSection from "./components/AboutSection.tsx";
import SkillsSection from "./components/SkillsSection.tsx";
import ProjectsSection from "./components/ProjectsSection.tsx";
import CertificatesSection from "./components/CertificatesSection.tsx";
import GithubSection from "./components/GithubSection.tsx";
import ContactSection from "./components/ContactSection.tsx";
import AiAssistant from "./components/AiAssistant.tsx";
import ExperienceEducationSection from "./components/ExperienceEducationSection.tsx";

import { portfolioData } from "./data.js";
import CursorGlow from "./components/CursorGlow.tsx";
import FloatingAssistant from "./components/FloatingAssistant.tsx";
import ParticlesBackground from "./components/ParticlesBackground.tsx";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // 30-Second Voice Speech Intro State
  const [isSpeakingIntro, setIsSpeakingIntro] = useState(false);
  const hasSpokenOnFirstClickRef = useRef(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const introSpeechScript = `Welcome to my portfolio! I am Ponabinanth S, a Computer Science Engineering student and Java Full Stack Developer specializing in Spring Boot, AI engineering, and decentralized blockchain systems. I build high-performance microservices, RAG-powered intelligent tutors, and edge TensorFlow security applications. Feel free to explore my case studies, test live sandboxes, or chat with my AI twin. Thank you for visiting!`;

  const playVoiceIntro = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(introSpeechScript);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeakingIntro(true);
    utterance.onend = () => setIsSpeakingIntro(false);
    utterance.onerror = () => setIsSpeakingIntro(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stopVoiceIntro = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeakingIntro(false);
    }
  };

  const toggleVoiceIntro = () => {
    if (isSpeakingIntro) {
      stopVoiceIntro();
    } else {
      playVoiceIntro();
    }
  };

  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!hasSpokenOnFirstClickRef.current) {
        hasSpokenOnFirstClickRef.current = true;
        playVoiceIntro();
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const handleSearchNavigation = (query: string) => {
    if (query === "java" || query === "backend") {
      scrollToSection("skills");
    } else if (query === "blockchain" || query === "ai") {
      scrollToSection("projects");
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "AI Assistant", id: "ai-recruiter-mode" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <div className={`${theme} min-h-screen font-sans overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-500`}>
      
      <CursorGlow />
      <ParticlesBackground />

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <div className="w-10"></div>

          <nav className="hidden lg:flex items-center gap-1 bg-[var(--accent-glow)] px-2 py-1.5 rounded-full border border-[var(--glass-border)] shadow-[var(--glass-shadow)] backdrop-blur-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-xs font-medium px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeSection === link.id ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[var(--glass-bg)] shadow-sm rounded-full -z-10 border border-[var(--glass-border)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label === "AI Assistant" && <Sparkles className="h-3.5 w-3.5" />}
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)] transition-all cursor-pointer shadow-sm hover:shadow-md"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={toggleVoiceIntro}
              className={`p-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md ${
                isSpeakingIntro
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)]"
              }`}
              title={isSpeakingIntro ? "Stop 30s AI Voice Introduction" : "Play 30s AI Voice Introduction"}
            >
              {isSpeakingIntro ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="p-2.5 rounded-full bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)] transition-all cursor-pointer shadow-sm hover:shadow-md"
              title="Preview Resume / CV"
            >
              <FileText className="h-4 w-4" />
            </button>

            <a
              href="https://github.com/Ponabinanth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)] transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ponabinanths/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)] transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--glass-border)]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[72px] left-0 w-full z-40 bg-[var(--bg-primary)] border-b border-[var(--glass-border)] backdrop-blur-md px-6 py-4 space-y-2 shadow-lg"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-3 px-4 rounded-xl hover:bg-[var(--accent-glow)] flex items-center gap-2 transition-colors"
              >
                {link.label === "AI Assistant" ? (
                  <>
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-500">{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-[var(--glass-border)] flex gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex-1 py-3 bg-[var(--accent-glow)] text-[var(--text-primary)] rounded-xl text-xs font-medium border border-[var(--glass-border)] flex items-center justify-center gap-2"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} Theme
              </button>
              <button
                onClick={toggleVoiceIntro}
                className="flex-1 py-3 bg-[var(--accent-glow)] text-[var(--text-primary)] rounded-xl text-xs font-medium border border-[var(--glass-border)] flex items-center justify-center gap-2"
              >
                <Volume2 className="h-4 w-4" /> Intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSpeakingIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-[var(--glass-bg)] border border-[var(--glass-border)] p-3.5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3 font-sans text-xs max-w-sm text-[var(--text-primary)]"
          >
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 animate-pulse">
              <Volume2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <span className="block font-semibold text-blue-500 text-[11px]">30s AI Voice Intro Active...</span>
              <span className="block text-[10px] text-[var(--text-secondary)] truncate">Synthesizing audio introduction about Ponabinanth S</span>
            </div>
            <button
              onClick={stopVoiceIntro}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-colors"
              title="Stop Speech"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <main className="pt-32 max-w-7xl mx-auto space-y-16 px-4 sm:px-6">
        
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
        <ExperienceEducationSection />
        <SkillsSection />
        <ProjectsSection onScrollToSection={scrollToSection} />
        <CertificatesSection />
        <GithubSection />
        <ContactSection />

      </main>

      <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-primary)] py-12 text-center text-sm text-[var(--text-secondary)] mt-32 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 Ponabinanth S. Built with React, Spring Boot & Gemini 3.5 API.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Ponabinanth" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/ponabinanths/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            <a href={`mailto:${portfolioData.email}`} className="hover:text-[var(--text-primary)] transition-colors">Email</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-24 z-40 p-3.5 rounded-full bg-[var(--glass-bg)] text-[var(--text-primary)] border border-[var(--glass-border)] hover:bg-[var(--accent-glow)] hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ChevronUp className="h-5 w-5 stroke-[2]" />
          </motion.button>
        )}
      </AnimatePresence>

      <FloatingAssistant 
        onNavigateSection={scrollToSection} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

    </div>
  );
}
