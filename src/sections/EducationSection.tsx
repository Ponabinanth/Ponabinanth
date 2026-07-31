import { portfolioData } from "../data.js";
import { GraduationCap, Calendar, Award } from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-cyan-500" />
            Academic Foundation
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-sm mt-3 uppercase tracking-widest">Educational Background</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.education.map((edu, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/30 transition-all duration-300 group flex flex-col"
            >
              <div className="mb-6 flex-grow">
                <h4 className="text-xl font-bold text-primary font-display group-hover:text-cyan-500 transition-colors leading-tight">
                  {edu.degree}
                </h4>
                <p className="text-sm font-mono text-cyan-500/80 font-semibold mt-3 leading-relaxed">
                  {edu.institution}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[var(--glass-border)]">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-secondary bg-[var(--accent-glow)] border border-[var(--glass-border)] px-3 py-2 rounded-xl">
                  <Calendar className="h-4 w-4 text-cyan-500" />
                  {edu.duration}
                </span>

                {edu.score && (
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl font-mono text-xs text-emerald-500 font-bold">
                    <Award className="h-4 w-4" />
                    {edu.score}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
