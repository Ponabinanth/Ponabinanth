import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, ShieldAlert, ChevronUp, Github, Linkedin, Mail, Menu, X,
  Terminal, Code2, Cpu, FileText, Volume2, VolumeX, Pause, Play
} from "lucide-react";

import LiveTelemetryHeader from "./components/LiveTelemetryHeader.tsx";
import TerminalCliModal from "./components/TerminalCliModal.tsx";
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals state
  const [isCliOpen, setIsCliOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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

  // 30-Second Speech Intro Text
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

  // Trigger 30s Voice Intro on first user click anywhere on the page
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

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl + K / Cmd + K to open developer CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCliOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
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

  // Navigation Links without Coding Profiles
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
    <div className="bg-[#030712] text-gray-100 min-h-screen font-sans tech-grid overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* 1. REAL-TIME TELEMETRY TOP BAR */}
      <LiveTelemetryHeader
        onOpenCli={() => setIsCliOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 2. STICKY GLASS HEADER */}
      <header
        className={`fixed top-[32px] sm:top-[28px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-[#030712]/85 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 font-black flex items-center justify-center font-display shadow-md shadow-cyan-500/10">
              P
            </div>
            <div>
              <span className="block font-display font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-all">
                ABINANTH // DEV
              </span>
              <span className="block text-[8px] font-mono text-cyan-400 font-semibold tracking-wider -mt-0.5">FUTURE SOFTWARE ENGINEER</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-2xl border border-white/5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-semibold text-gray-400 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
              >
                {link.label === "AI Assistant" ? (
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Sparkles className="h-3.5 w-3.5 fill-cyan-400/20" /> {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </button>
            ))}
          </nav>

          {/* Action triggers */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleVoiceIntro}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isSpeakingIntro
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white/5 text-cyan-400 hover:bg-cyan-500/10 border border-white/5"
              }`}
              title={isSpeakingIntro ? "Stop 30s AI Voice Introduction" : "Play 30s AI Voice Introduction"}
            >
              {isSpeakingIntro ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setIsCliOpen(true)}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer"
              title="Launch Developer CLI (Ctrl+K)"
            >
              <Terminal className="h-4.5 w-4.5" />
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              title="Preview Resume / CV"
            >
              <FileText className="h-4.5 w-4.5 text-purple-400" />
            </button>

            <a
              href="https://github.com/Ponabinanth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ponabinanths/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/5"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[100px] left-0 w-full z-40 bg-[#030712] border-b border-white/10 backdrop-blur-md px-6 py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left text-sm font-semibold text-gray-300 hover:text-white py-2.5 px-3 rounded-xl hover:bg-white/5 flex items-center gap-2"
              >
                {link.label === "AI Assistant" ? (
                  <>
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span className="text-cyan-400">{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={toggleVoiceIntro}
                className="flex-1 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-xs font-bold border border-cyan-500/30 flex items-center justify-center gap-1.5"
              >
                <Volume2 className="h-4 w-4" /> {isSpeakingIntro ? "Stop 30s Intro" : "Play 30s Intro"}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCliOpen(true);
                }}
                className="flex-1 py-2 bg-white/5 text-white rounded-xl text-xs font-bold border border-white/10 flex items-center justify-center gap-1.5"
              >
                <Terminal className="h-4 w-4" /> Open CLI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 30-Second Speech Toast Banner when speaking */}
      <AnimatePresence>
        {isSpeakingIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900/95 border border-cyan-500/40 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 font-mono text-xs max-w-sm text-white"
          >
            <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400 animate-pulse">
              <Volume2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <span className="block font-bold text-cyan-400 text-[11px]">30s AI Voice Intro Active...</span>
              <span className="block text-[10px] text-gray-400 truncate">Synthesizing audio introduction about Ponabinanth S</span>
            </div>
            <button
              onClick={stopVoiceIntro}
              className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              title="Stop Speech"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Developer CLI Modal */}
      <TerminalCliModal
        isOpen={isCliOpen}
        onClose={() => setIsCliOpen(false)}
        onNavigateSection={scrollToSection}
      />

      {/* CV / Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Main Core Layout */}
      <main className="pt-28 max-w-7xl mx-auto space-y-12">
        
        {/* 1. HERO HOME SECTION */}
        <HeroSection
          onScrollToSection={scrollToSection}
          onOpenCli={() => setIsCliOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          isSpeakingIntro={isSpeakingIntro}
          onToggleVoiceIntro={toggleVoiceIntro}
        />

        {/* 2. MAIN AI RECRUITER ENGINE */}
        <div className="px-6 py-8">
          <AiAssistant onSearchNavigation={handleSearchNavigation} />
        </div>

        {/* 3. ABOUT SECTION & TIMELINE */}
        <AboutSection />

        {/* 4. EXPERIENCE & EDUCATION */}
        <ExperienceEducationSection />

        {/* 5. SKILLS PROGRESS */}
        <SkillsSection />

        {/* 6. CASE STUDY PROJECTS WITH LIVE SANDBOXES */}
        <ProjectsSection onScrollToSection={scrollToSection} />

        {/* 7. CREDENTIALS */}
        <CertificatesSection />

        {/* 8. LIVE GITHUB TELEMETRY */}
        <GithubSection />

        {/* 9. REAL-TIME CONTACT FORM */}
        <ContactSection />

      </main>

      {/* COMPACT FOOTER */}
      <footer className="border-t border-white/5 bg-slate-950/60 py-8 text-center text-xs text-gray-500 font-mono mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Ponabinanth S. Built with React, Spring Boot & Gemini 3.5 API.</p>
          <div className="flex gap-4">
            <a href="https://github.com/Ponabinanth" target="_blank" rel="noreferrer" className="hover:text-cyan-400">GitHub</a>
            <a href="https://www.linkedin.com/in/ponabinanths/" target="_blank" rel="noreferrer" className="hover:text-cyan-400">LinkedIn</a>
            <a href={`mailto:${portfolioData.email}`} className="hover:text-cyan-400">Email</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top tool */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:scale-110 active:scale-95 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ChevronUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
