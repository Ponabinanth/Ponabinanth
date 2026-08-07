import { portfolioData } from "../data.js";
import { Clock, Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 relative">
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
            <Clock className="h-3.5 w-3.5" />
            Milestones
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Career & Project Timeline
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">My Growth & Achievement Journey</p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[var(--glass-border)] ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
          {portfolioData.timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[43px] md:-left-[59px] top-2.5 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[var(--bg-primary)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
              
              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-[var(--glass-border)] group-hover:border-cyan-500/40 transition-all duration-300 shadow-md">
                <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold px-3 py-1 rounded-lg mb-3 border border-cyan-500/20">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.year}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-primary font-display">{item.title}</h4>
                <p className="text-sm md:text-base text-secondary mt-2 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
