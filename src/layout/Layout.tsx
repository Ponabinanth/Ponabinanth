import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, Volume2, X } from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import CursorGlow from "../ui/CursorGlow";
import ParticlesBackground from "../ui/ParticlesBackground";
import FloatingAssistant from "../ui/FloatingAssistant";
import ResumeModal from "../ui/ResumeModal";

import { useScroll } from "../hooks/useScroll";
import { useTheme } from "../providers/ThemeProvider";
import { useVoice } from "../providers/VoiceProvider";

interface LayoutProps {
  children: ReactNode;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
}

export default function Layout({ children, isResumeOpen, setIsResumeOpen }: LayoutProps) {
  const { scrolled, showScrollTop, activeSection, scrollToSection, scrollToTop } = useScroll();
  const { theme } = useTheme();
  const { isSpeakingIntro, stopVoiceIntro } = useVoice();
  
  return (
    <div className={`${theme} min-h-screen font-sans overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-500`}>
      <CursorGlow />
      <ParticlesBackground />

      <Header 
        scrolled={scrolled} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

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
              <span className="block text-[10px] text-[var(--text-secondary)] truncate">Synthesizing audio introduction</span>
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
        {children}
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
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
