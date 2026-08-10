import React from "react";
import { portfolioData } from "../data.js";
import { ShieldCheck, ArrowUp, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";

interface FooterProps {
  onOpenResume?: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-primary)] py-16 text-center text-sm text-secondary relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
        
        {/* Futuristic Mini Gate Icon & Text */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative group cursor-pointer" onClick={scrollToTop}>
            <div className="p-4 rounded-3xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <Sparkles className="h-4 w-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <p className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em]">
            “Thanks for exploring my world.”
          </p>

          <h3 className="text-2xl font-bold font-display text-primary">
            PONABINANTH S
          </h3>

          <p className="text-sm font-bold font-mono text-cyan-300 tracking-wider">
            Build. Learn. Innovate.
          </p>
        </div>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-secondary pt-2">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>

          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>

          <a
            href={`mailto:${portfolioData.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="h-4 w-4" /> Email
          </a>

          <button
            onClick={onOpenResume}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="h-4 w-4" /> Resume
          </button>
        </div>

        {/* Back to Top */}
        <div className="pt-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-glow)] border border-[var(--glass-border)] text-xs font-mono text-secondary hover:text-primary transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <ArrowUp className="h-3.5 w-3.5 text-cyan-400" />
            <span>Return to Gate</span>
          </button>
        </div>

        <p className="text-[11px] font-mono text-secondary/60 pt-4">
          © 2026 Ponabinanth S. Built with React, Spring Boot, Three.js & GenAI APIs.
        </p>

      </div>
    </footer>
  );
}
