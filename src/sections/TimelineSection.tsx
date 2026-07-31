import { portfolioData } from "../data.js";
import { Clock } from "lucide-react";

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            <Clock className="h-8 w-8 text-cyan-500" />
            Educational & Project Timeline
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-sm mt-3 uppercase tracking-widest">My Journey So Far</p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[var(--glass-border)] ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
          {portfolioData.timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[43px] md:-left-[59px] top-1.5 w-5 h-5 rounded-full bg-cyan-500 border-4 border-[var(--bg-primary)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              
              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-[var(--glass-border)] group-hover:border-cyan-500/30 transition-all duration-300">
                <span className="inline-block bg-cyan-500/10 text-cyan-500 font-mono text-xs font-bold px-3 py-1 rounded-lg mb-3 border border-cyan-500/20">
                  {item.year}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-primary font-display">{item.title}</h4>
                <p className="text-sm md:text-base text-secondary mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
