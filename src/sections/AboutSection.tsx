import React from "react";
import { portfolioData } from "../data.js";
import { motion } from "motion/react";
import { User, Code2, Rocket, Lightbulb, RefreshCw, Terminal, MapPin, GraduationCap, Quote } from "lucide-react";

export default function AboutSection() {
  const mindsetBadges = [
    { label: "Build", desc: "Crafting end-to-end applications with clean architectures", icon: Code2, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
    { label: "Learn", desc: "Continuously mastering new frameworks, AI models, & paradigms", icon: Lightbulb, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { label: "Solve", desc: "Applying algorithmic logic to tackle complex real-world bottlenecks", icon: Rocket, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { label: "Improve", desc: "Refactoring code bases for maximum throughput, security, & scalability", icon: RefreshCw, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" }
  ];

  return (
    <section id="about" className="py-24 relative">
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
            <User className="h-3.5 w-3.5" />
            Background & Philosophy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">About Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Engineering Identity & Problem-Solving Mindset
          </p>
        </motion.div>

        {/* Mindset Philosophy Banner: Build → Learn → Solve → Improve */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 text-center mb-6">
            Core Engineering Cycle
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mindsetBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04 }}
                  className={`glass-panel p-6 rounded-2xl border ${badge.color} flex flex-col items-center text-center shadow-md transition-all`}
                >
                  <div className="p-3 rounded-xl mb-3 bg-slate-900/60 border border-white/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-primary">{badge.label}</h4>
                  <p className="text-xs text-secondary mt-2 leading-relaxed font-sans">{badge.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-cyan-400 border border-blue-500/20">
              <Quote className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-primary">Professional Narrative</h3>
              <p className="text-xs font-mono text-secondary mt-0.5">Software Engineering & Continuous Learning</p>
            </div>
          </div>
          
          <p className="text-base md:text-lg text-secondary leading-relaxed font-sans mb-8">
            {portfolioData.about}
          </p>

          {/* Core Focus Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--glass-border)]">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">What I Build</span>
              <p className="text-sm text-secondary leading-relaxed">
                Full-Stack Spring Boot & React web platforms, RAG-assisted AI tutors, and client-side ML security threat classifiers.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Technical Interests</span>
              <p className="text-sm text-secondary leading-relaxed">
                Microservices design, prompt engineering, LLM orchestration, automated testing suites, and Web3 cryptographic ledgers.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Career Objective</span>
              <p className="text-sm text-secondary leading-relaxed">
                Build production-grade software combining AI + Full Stack + Cloud + Security to solve meaningful real-world problems.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-secondary mt-8 pt-4">
            <span className="flex items-center gap-2 bg-[var(--accent-glow)] px-4 py-2 rounded-full border border-[var(--glass-border)]">
              <MapPin className="h-4 w-4 text-cyan-400" /> {portfolioData.location}
            </span>
            <span className="flex items-center gap-2 bg-[var(--accent-glow)] px-4 py-2 rounded-full border border-[var(--glass-border)]">
              <GraduationCap className="h-4 w-4 text-cyan-400" /> B.E. Computer Science & Engineering (CGPA 8.0)
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
