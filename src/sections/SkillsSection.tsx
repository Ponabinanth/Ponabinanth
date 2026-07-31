import { motion } from "motion/react";
import { portfolioData } from "../data.js";
import { CheckCircle2, Cpu, Brain, Layers, Database, Shield } from "lucide-react";

export default function SkillsSection() {
  // Map index categories to specific icons
  const categoryIcons: { [key: string]: any } = {
    "Languages": Cpu,
    "Frontend": Layers,
    "Backend": Database,
    "Database & Cloud": Database,
    "AI & ML": Brain,
    "Developer Tools": Shield
  };

  return (
    <section id="skills" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Skills Portfolio</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-secondary text-xs mt-2 uppercase tracking-widest">Enterprise backend tools and neural networks</p>
        </div>

        {/* 1. ANIMATED CIRCULAR PROGRESS BARS */}
        <div className="mb-16">
          <h3 className="text-lg font-bold font-display text-primary text-center mb-8">Core Competency Levels</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {portfolioData.skillProgress.map((skill, i) => {
              // Calculate SVG Circle values
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

              return (
                <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center hover:scale-105 hover:border-cyan-500/20 transition-all duration-300">
                  {/* Radial circle container */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Gray base circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-white/5 fill-transparent"
                        strokeWidth="6"
                      />
                      {/* Cyan glowing animated circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-cyan-400 fill-transparent transition-all duration-1000 ease-out"
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Inner percentage text */}
                    <div className="absolute font-mono text-base font-bold text-primary">
                      {skill.percentage}%
                    </div>
                  </div>

                  <span className="text-xs font-bold font-display text-secondary text-center mt-3">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CATEGORIZED TECH STACK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Cpu;
            return (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-cyan-500/10 transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/0 group-hover:bg-cyan-500/30 rounded-t-3xl transition-all" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl group-hover:scale-110 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-md font-bold font-display text-primary">{cat.category}</h4>
                </div>

                <ul className="space-y-2.5">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-xs text-secondary font-mono">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
