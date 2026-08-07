import { portfolioData } from "../data.js";
import { Briefcase, Calendar, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "motion/react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative">
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
            Work History
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            Industrial Experience
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">
            Internships & Professional Enterprise Engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.internships.map((intern, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-[var(--glass-border)]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">{intern.company}</span>
                  </div>
                  <h4 className="text-xl font-bold text-primary font-display group-hover:text-cyan-400 transition-colors">
                    {intern.role}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-2 self-start font-mono text-xs text-secondary bg-[var(--accent-glow)] border border-[var(--glass-border)] px-3.5 py-1.5 rounded-xl whitespace-nowrap">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  {intern.duration}
                </span>
              </div>

              <ul className="space-y-3 text-sm text-secondary font-sans list-none flex-grow">
                {intern.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
