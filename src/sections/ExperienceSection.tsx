import { portfolioData } from "../data.js";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            <Briefcase className="h-8 w-8 text-cyan-500" />
            Industrial Experience
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-sm mt-3 uppercase tracking-widest">Internships & Professional Roles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.internships.map((intern, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/30 transition-all duration-300 group flex flex-col"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-[var(--glass-border)]">
                <div>
                  <h4 className="text-xl font-bold text-primary font-display group-hover:text-cyan-500 transition-colors">
                    {intern.role}
                  </h4>
                  <p className="text-base font-mono text-cyan-500/80 font-semibold mt-1">
                    {intern.company}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 self-start font-mono text-xs text-secondary bg-[var(--accent-glow)] border border-[var(--glass-border)] px-3 py-1.5 rounded-xl whitespace-nowrap">
                  <Calendar className="h-4 w-4 text-cyan-500" />
                  {intern.duration}
                </span>
              </div>

              <ul className="space-y-4 text-sm text-secondary font-sans list-none flex-grow">
                {intern.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex gap-3 items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
