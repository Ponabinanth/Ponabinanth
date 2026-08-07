import { portfolioData } from "../data.js";
import { GraduationCap, Calendar, Award, BookOpen, Trophy } from "lucide-react";
import { motion } from "motion/react";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 relative">
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
            <GraduationCap className="h-3.5 w-3.5" />
            Academic Milestone
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            Academic Foundation
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">
            Degrees, certifications & institution timeline
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.education.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div className="mb-6 flex-grow">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">Education</span>
                </div>
                <h4 className="text-xl font-bold text-primary font-display group-hover:text-cyan-400 transition-colors leading-tight">
                  {edu.degree}
                </h4>
                <p className="text-sm font-mono text-secondary font-medium mt-3 leading-relaxed">
                  {edu.institution}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[var(--glass-border)]">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-secondary bg-[var(--accent-glow)] border border-[var(--glass-border)] px-3.5 py-2 rounded-xl">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  {edu.duration}
                </span>

                {edu.score && (
                  <div className="inline-flex items-center justify-between bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-2 rounded-xl font-mono text-xs text-emerald-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-amber-400" />
                      Academic Score:
                    </span>
                    <span>{edu.score}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
