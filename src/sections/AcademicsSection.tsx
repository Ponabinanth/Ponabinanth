import React from "react";
import { portfolioData, AcademicSubject } from "../data.js";
import { motion } from "motion/react";
import { BookMarked, Cpu, CheckCircle2, ShieldCheck, Database, Code2, Network, Terminal } from "lucide-react";

export default function AcademicsSection() {
  const getSubjectIcon = (name: string) => {
    if (name.includes("Data Structures")) return Code2;
    if (name.includes("Object-Oriented")) return Cpu;
    if (name.includes("Database")) return Database;
    if (name.includes("Operating")) return Terminal;
    if (name.includes("Networks")) return Network;
    if (name.includes("Cybersecurity")) return ShieldCheck;
    return BookMarked;
  };

  const getProficiencyBadgeClass = (prof: string) => {
    switch (prof) {
      case "Advanced":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "Proficient":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <section id="academics" className="py-24 relative">
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
            <BookMarked className="h-3.5 w-3.5" />
            Computer Science Subject Mastery
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Academics</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Core Computer Science Subjects & Verified Practical Applications
          </p>
        </motion.div>

        {/* Academic Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.academics.map((subj: AcademicSubject, idx: number) => {
            const Icon = getSubjectIcon(subj.name);
            const badgeStyle = getProficiencyBadgeClass(subj.proficiency);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${badgeStyle}`}>
                      {subj.proficiency}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-primary">{subj.name}</h3>
                  <span className="text-xs font-mono text-cyan-400 mt-1 block">{subj.category}</span>

                  {/* Key Concepts */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono text-secondary uppercase tracking-wider block mb-2">
                      Key Concepts Mastered
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {subj.keyConcepts.map((concept, i) => (
                        <span key={i} className="text-xs font-mono bg-[var(--accent-glow)] text-secondary px-2.5 py-1 rounded-md border border-[var(--glass-border)]">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practical Application */}
                <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Practical Implementation
                  </span>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    {subj.practicalApplication}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
