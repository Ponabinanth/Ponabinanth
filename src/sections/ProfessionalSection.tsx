import React, { useState } from "react";
import { portfolioData, AreaOfInterestDomain } from "../data.js";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Layers, BrainCircuit, Server, Cloud, ShieldCheck, Cpu, ChevronDown, Sparkles, CheckCircle2, Heart } from "lucide-react";

export default function ProfessionalSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2": return Code2;
      case "Layers": return Layers;
      case "BrainCircuit": return BrainCircuit;
      case "Server": return Server;
      case "Cloud": return Cloud;
      case "ShieldCheck": return ShieldCheck;
      case "Cpu": return Cpu;
      default: return Heart;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const interests = portfolioData.areaOfInterest || portfolioData.careerFocus;

  return (
    <section id="area-of-interest" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-3">
            <Heart className="h-3.5 w-3.5" />
            Specialized Engineering Focus
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Area Of Interest</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Core Technical Interests, Applied Engineering Domains, & Projects
          </p>
        </motion.div>

        {/* Area Of Interest Cards Grid (Uniform Sizing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((domain: AreaOfInterestDomain, idx: number) => {
            const Icon = getIcon(domain.iconName);
            const isExpanded = expandedId === domain.id;

            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass-panel rounded-3xl border transition-all duration-300 shadow-lg overflow-hidden flex flex-col justify-between ${
                  isExpanded ? "border-cyan-500/60 bg-cyan-950/20" : "border-[var(--glass-border)] hover:border-cyan-500/40"
                }`}
              >
                <div 
                  onClick={() => toggleExpand(domain.id)}
                  className="p-6 cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1">
                      <span>{isExpanded ? "Less" : "Details"}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xl font-bold font-display text-primary">{domain.title}</h3>
                    <p className="text-xs text-secondary mt-2 leading-relaxed font-sans min-h-[40px]">{domain.shortDesc}</p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {domain.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-[var(--accent-glow)] text-cyan-300 px-2 py-0.5 rounded border border-[var(--glass-border)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 pt-3 border-t border-[var(--glass-border)] space-y-4 bg-slate-950/40 text-left"
                    >
                      <div>
                        <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" /> Practical Experience
                        </h4>
                        <p className="text-xs text-secondary leading-relaxed font-sans">{domain.experienceSummary}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Key Applications
                        </h4>
                        <ul className="space-y-1 text-xs font-mono text-secondary">
                          {domain.practicalApplications.map((app, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                          Related Projects
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {domain.relatedProjects.map((proj, i) => (
                            <span key={i} className="text-[10px] font-mono text-cyan-300 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
