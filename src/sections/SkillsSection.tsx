import { motion } from "motion/react";
import { portfolioData } from "../data.js";
import { CheckCircle2, Cpu, Brain, Layers, Database, Shield, Zap } from "lucide-react";

export default function SkillsSection() {
  const categoryIcons: { [key: string]: any } = {
    "Languages": Cpu,
    "Frontend": Layers,
    "Backend": Database,
    "Database & Cloud": Database,
    "AI & ML": Brain,
    "Developer Tools": Shield
  };

  return (
    <section id="skills" className="py-20 relative">
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
            <Zap className="h-3.5 w-3.5" />
            Technical Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Skills Portfolio</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">
            Enterprise backend, web frameworks & AI integration tools
          </p>
        </motion.div>

        {/* 1. ANIMATED CIRCULAR PROGRESS BARS */}
        <div className="mb-16">
          <h3 className="text-base font-bold font-mono uppercase tracking-wider text-secondary text-center mb-8">Core Competency Levels</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {portfolioData.skillProgress.map((skill, i) => {
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-panel p-5 rounded-2xl border border-[var(--glass-border)] flex flex-col items-center hover:border-cyan-500/40 transition-all duration-300 shadow-md"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-[var(--glass-border)] fill-transparent"
                        strokeWidth="6"
                      />
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
                    <div className="absolute font-mono text-base font-bold text-primary">
                      {skill.percentage}%
                    </div>
                  </div>

                  <span className="text-xs font-bold font-display text-primary text-center mt-3">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. CATEGORIZED TECH STACK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Cpu;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/30 transition-all duration-300 relative group shadow-md"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold font-display text-primary">{cat.category}</h4>
                </div>

                <ul className="space-y-2.5">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2.5 text-xs text-secondary font-mono">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
