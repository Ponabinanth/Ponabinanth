import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Github, Linkedin, Menu, X, FileText, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { useVoice } from "../providers/VoiceProvider";

interface HeaderProps {
  scrolled: boolean;
  activeSection: string;
  scrollToSection: (id: string) => void;
  onOpenResume: () => void;
}

const navLinks = [
  { label: "Home", id: "home" },
  { label: "AI", id: "ai-recruiter-mode" },
  { label: "About", id: "about" },
  { label: "Timeline", id: "timeline" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" }
];

export default function Header({ scrolled, activeSection, scrollToSection, onOpenResume }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isSpeakingIntro, toggleVoiceIntro } = useVoice();

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="w-10"></div> {/* Spacer for symmetry if needed, or put a logo here */}

          <nav className="hidden lg:flex items-center gap-1 bg-[var(--accent-glow)] px-2 py-1.5 rounded-full border border-[var(--glass-border)] shadow-[var(--glass-shadow)] backdrop-blur-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
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
              onClick={toggleTheme}
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
              onClick={onOpenResume}
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
                onClick={() => handleNavClick(link.id)}
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
                onClick={toggleTheme}
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
    </>
  );
}
