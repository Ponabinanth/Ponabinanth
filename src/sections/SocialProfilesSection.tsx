import React from "react";
import { portfolioData } from "../data.js";
import { motion } from "motion/react";
import { Linkedin, Github, FileText, ExternalLink, Code2, Star, GitFork, UserCheck } from "lucide-react";

interface SocialProfilesSectionProps {
  onOpenResume: () => void;
}

export default function SocialProfilesSection({ onOpenResume }: SocialProfilesSectionProps) {
  return (
    <section id="social-profiles" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        
        {/* 1. LINKEDIN SECTION */}
        <div id="linkedin">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono text-blue-400 mb-3">
              <Linkedin className="h-3.5 w-3.5" />
              Professional Identity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">LinkedIn Profile</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] hover:border-blue-500/40 transition-all shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 font-mono text-xs font-bold rounded-full border border-blue-500/20">
                <UserCheck className="h-3.5 w-3.5" />
                Verified LinkedIn Profile
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-display text-primary">{portfolioData.name}</h3>
              <p className="text-sm font-mono text-cyan-400 font-medium">{portfolioData.title}</p>
              <p className="text-xs md:text-sm text-secondary leading-relaxed font-sans max-w-xl">
                Passionate about Java Spring Boot microservices, Generative AI agent pipelines, and full-stack software development. Open for software engineering roles, internships, and research collaborations.
              </p>
            </div>

            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 flex-shrink-0"
            >
              <Linkedin className="h-5 w-5" />
              <span>CONNECT ON LINKEDIN</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* 2. GITHUB SECTION */}
        <div id="github">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-3">
              <Github className="h-3.5 w-3.5" />
              Open Source & Codebase
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">GitHub Profile</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all shadow-xl max-w-4xl mx-auto space-y-8"
          >
            {/* Stats Row */}
            <div className="flex justify-center">
              <div className="glass-panel px-8 py-4 rounded-2xl border border-[var(--glass-border)] text-center">
                <span className="text-3xl font-bold font-display text-cyan-400">{portfolioData.githubStats.repos}+</span>
                <span className="text-xs font-mono text-secondary block mt-1 uppercase tracking-wider">GitHub Repositories</span>
              </div>
            </div>

            {/* Language Breakdown */}
            <div>
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                Core Programming Languages Distribution
              </h4>
              <div className="space-y-2">
                {portfolioData.githubStats.languages.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-secondary">
                      <span>{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                <span>VIEW GITHUB REPOSITORIES</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. RESUME SECTION */}
        <div id="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-10 rounded-3xl border border-cyan-500/30 text-center max-w-3xl mx-auto space-y-6 shadow-2xl bg-cyan-950/20"
          >
            <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 w-fit mx-auto border border-cyan-500/20">
              <FileText className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-display text-primary">Want to know more about my journey?</h2>
              <p className="text-sm text-secondary font-sans max-w-xl mx-auto">
                Explore my complete curriculum vitae detailing technical projects, academic credentials, and software engineering experience.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={onOpenResume}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>VIEW RESUME</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-7 py-3.5 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-primary font-bold text-xs tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>DOWNLOAD RESUME PDF</span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
