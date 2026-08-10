import React from "react";
import { motion } from "motion/react";
import { FileText, Sparkles, Github, Linkedin, ArrowRight, Code2, Heart, CheckCircle2, Quote } from "lucide-react";
import { portfolioData } from "../data.js";

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenResume: () => void;
}

export default function HeroSection({ onScrollToSection, onOpenResume }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center px-6 py-20 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full filter blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Welcome To My Portfolio</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary font-display">
              PONABINANTH S
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 font-sans tracking-wide">
              Software Engineer <span className="text-secondary">•</span> Full-Stack Developer <span className="text-secondary">•</span> AI Enthusiast
            </p>
          </div>

          <p className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
            I build intelligent, scalable, and user-focused software solutions by combining full-stack development, artificial intelligence, cybersecurity, and emerging technologies.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Java & Spring Boot", "React.js & Full-Stack", "AI & LLM Integration", "Cybersecurity & Cloud", "MySQL & PostgreSQL"].map((badge, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-[var(--accent-glow)] border border-[var(--glass-border)] rounded-lg text-xs font-mono text-cyan-400 font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 items-center">
            <button
              onClick={() => onScrollToSection("projects")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-primary px-6 py-3.5 rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>

            <a
              href="https://github.com/Ponabinanth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-secondary hover:text-primary px-5 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer shadow-sm"
            >
              <Github className="h-4 w-4 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ponabinanths/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-secondary hover:text-primary px-5 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer shadow-sm"
            >
              <Linkedin className="h-4 w-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Actual Profile Photo Card of Ponabinanth S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative group max-w-[360px] w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative glass-panel border border-[var(--glass-border)] hover:border-cyan-500/50 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-500 group-hover:-translate-y-2 space-y-6">
              
              {/* Profile Image & Header */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400 shadow-md flex-shrink-0">
                  <img
                    src="/ponabinanth-circle.png"
                    alt="Ponabinanth S"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/ponabinanth-profile.jpg";
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-slate-950 rounded-full" />
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-primary">Hi, I'm Ponabinanth S</h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">B.E. Computer Science Student</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                    <CheckCircle2 className="h-3 w-3" /> Open to Opportunities
                  </span>
                </div>
              </div>

              {/* Bio Highlights */}
              <div className="space-y-2.5 text-xs font-sans text-secondary border-t border-[var(--glass-border)] pt-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  <span>Passionate about coding & system design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>Love building real-world software solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-400" />
                  <span>Explorer of AI, Full-Stack & Cloud</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Always learning, always growing</span>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="bg-[var(--accent-glow)] p-4 rounded-2xl border border-[var(--glass-border)] text-xs italic font-serif text-cyan-300 flex items-start gap-2">
                <Quote className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>"Code is my language, Innovation is my passion."</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
