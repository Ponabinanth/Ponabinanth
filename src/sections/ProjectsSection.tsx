import React, { useState } from "react";
import { portfolioData, Project } from "../data.js";
import { motion, AnimatePresence } from "motion/react";
import { FolderGit2, Github, ExternalLink, Sparkles, Layers, ShieldCheck, ShoppingCart, Users, ChevronRight, X } from "lucide-react";

interface ProjectsSectionProps {
  onScrollToSection?: (id: string) => void;
}

export default function ProjectsSection({ onScrollToSection }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "edureach": return Sparkles;
      case "securechain": return ShieldCheck;
      case "retail-intelligence": return ShoppingCart;
      case "ai-recruitment": return Users;
      default: return FolderGit2;
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-3">
            <FolderGit2 className="h-3.5 w-3.5" />
            Engineering Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Production-Grade Applications, AI Ecosystems, & Web3 Security Suites
          </p>
        </motion.div>

        {/* 4 Large Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((proj: Project, idx: number) => {
            const Icon = getProjectIcon(proj.id);

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="glass-panel rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-8 space-y-6">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-[var(--accent-glow)] text-secondary hover:text-cyan-400 border border-[var(--glass-border)] transition-colors cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-bold font-display text-primary">{proj.title}</h3>
                    <p className="text-xs font-mono text-cyan-400 mt-1 font-semibold">{proj.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-secondary leading-relaxed font-sans">
                    {proj.description}
                  </p>

                  {/* Key Features Summary List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                      Key Highlights & Capabilities
                    </span>
                    <ul className="space-y-1 text-xs font-sans text-secondary">
                      {proj.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-6 bg-slate-950/40 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
                  >
                    <span>EXPLORE ARCHITECTURE & DETAILS</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-secondary hover:text-primary flex items-center gap-1"
                  >
                    <span>CODE</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Modal Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-slate-900 border border-cyan-500/30 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-white"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="space-y-2 pr-8">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                    Project Deep Dive
                  </span>
                  <h3 className="text-3xl font-bold font-display text-white">{selectedProject.title}</h3>
                  <p className="text-sm font-mono text-cyan-300">{selectedProject.subtitle}</p>
                </div>

                <div className="space-y-4 text-sm text-slate-300 font-sans">
                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                      Problem Statement
                    </h4>
                    <p className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                      Solution Architecture
                    </h4>
                    <p className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                      System Design & Data Flow
                    </h4>
                    <p className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                      Complete Feature Set
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                          <Sparkles className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                      My Core Engineering Contribution
                    </h4>
                    <p className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                      {selectedProject.contribution}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View GitHub Repository</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
