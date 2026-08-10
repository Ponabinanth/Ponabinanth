import React from "react";
import { portfolioData, InternshipExperience } from "../data.js";
import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative">
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
            <Briefcase className="h-3.5 w-3.5" />
            Professional Background
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Experience</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Industrial Internships, Engineering Programs, & Testing Frameworks
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.internships.map((exp: InternshipExperience, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.duration}
                  </span>

                  <span className="text-xs font-mono text-secondary flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                    {exp.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-primary">{exp.role}</h3>
                  <p className="text-sm font-semibold text-cyan-400 font-mono mt-1">{exp.company}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    Responsibilities
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-secondary">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Outcome */}
              <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-bold">
                  Engineering Outcome
                </span>
                <p className="text-xs text-secondary leading-relaxed font-sans font-medium">
                  {exp.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
