import React from "react";
import { portfolioData } from "../data.js";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { motion } from "motion/react";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        
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
            Academic Foundations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Education</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Academic Period, Degrees, & Institutional Highlights
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[var(--glass-border)] ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[43px] md:-left-[59px] top-3 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[var(--bg-primary)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

              <div className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] group-hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border border-cyan-500/20">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.duration}
                  </span>

                  {edu.score && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                      <Award className="h-3.5 w-3.5" />
                      {edu.score}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-display text-primary">{edu.degree}</h3>
                  <p className="text-base text-cyan-400 font-medium font-sans mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-500" />
                    {edu.institution} ({edu.location})
                  </p>
                </div>

                {edu.technicalFocus && (
                  <p className="text-sm text-secondary leading-relaxed font-sans border-l-2 border-cyan-500/30 pl-3">
                    {edu.technicalFocus}
                  </p>
                )}

                {/* Relevant Coursework */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> Relevant Coursework & Focus Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span key={i} className="text-xs font-mono bg-[var(--accent-glow)] text-secondary px-3 py-1 rounded-lg border border-[var(--glass-border)]">
                          {course}
                        </span>
                      ))}
                    </div>
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
