import { motion } from "motion/react";
import { portfolioData } from "../data.js";
import { Briefcase, GraduationCap, Calendar, Award } from "lucide-react";

export default function ExperienceEducationSection() {
  return (
    <section id="experience" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Experience & Education</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-secondary text-xs mt-2 uppercase tracking-widest">My Industrial Internships & Academic Foundation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Internship Experience */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold font-display text-primary flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Briefcase className="h-5 w-5" />
              </div>
              Internship Experience
            </h3>

            <div className="space-y-6">
              {portfolioData.internships.map((intern, idx) => (
                <div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-primary font-display group-hover:text-cyan-400 transition-all">
                        {intern.role}
                      </h4>
                      <p className="text-xs font-mono text-cyan-400/80 font-semibold mt-0.5">
                        {intern.company}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start md:self-center font-mono text-[10px] text-secondary bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
                      <Calendar className="h-3 w-3 text-cyan-400" />
                      {intern.duration}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-secondary font-sans list-none">
                    {intern.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold font-display text-primary flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              Education
            </h3>

            <div className="space-y-6">
              {portfolioData.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-primary font-display group-hover:text-cyan-400 transition-all">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-mono text-cyan-400/80 font-semibold mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start md:self-center font-mono text-[10px] text-secondary bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
                      <Calendar className="h-3 w-3 text-cyan-400" />
                      {edu.duration}
                    </span>
                  </div>

                  {edu.score && (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-mono text-[10px] text-emerald-400 font-bold mt-1">
                      <Award className="h-3 w-3" />
                      {edu.score}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
