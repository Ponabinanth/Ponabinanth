import React from "react";
import { portfolioData, SkillCategory } from "../data.js";
import { motion } from "motion/react";
import { Cpu, Code2, Layout, Server, Database, BrainCircuit, Cloud } from "lucide-react";

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages": return Code2;
      case "Frontend": return Layout;
      case "Backend": return Server;
      case "Databases": return Database;
      case "AI": return BrainCircuit;
      case "Cloud / Tools": return Cloud;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
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
            <Cpu className="h-3.5 w-3.5" />
            Tech Stack Matrix
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Technical Skills</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Interactive Technology Wall Across 6 Engineering Domains
          </p>
        </motion.div>

        {/* 6 Category Interactive Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((cat: SkillCategory, idx: number) => {
            const Icon = getCategoryIcon(cat.category);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-primary">{cat.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3.5 py-2 rounded-xl text-xs font-mono bg-[var(--accent-glow)] text-cyan-300 border border-[var(--glass-border)] hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all cursor-default shadow-sm"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
