import { motion } from "motion/react";
import { portfolioData } from "../data.js";
import { GraduationCap, Award, MapPin, Clock, Heart, BookOpen } from "lucide-react";

export default function AboutSection() {
  const strengths = [
    { title: "Scalable Java Backend Architectures", desc: "Solid familiarity with MVC pipelines, thread safety, and custom connection pooling inside Spring." },
    { title: "Generative AI Systems Integration", desc: "Expertise in writing clean server-side proxies, managing context, and parsing vector data streams." },
    { title: "Blockchain Security Analysis", desc: "Strong conceptualization of decentralized smart contract lifecycles and cryptographic validation." }
  ];

  return (
    <section id="about" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">About Me</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-secondary text-xs mt-2 uppercase tracking-widest">Bridging Java Rigor with Intelligent LLMs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Column 1: Bio and Strengths */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/10">
              <h3 className="text-lg font-bold font-display text-primary mb-3">Professional Narrative</h3>
              <p className="text-sm text-secondary leading-relaxed font-sans">
                {portfolioData.about}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-secondary border-t border-white/5 pt-4">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-cyan-400" /> {portfolioData.location}</span>
                <span className="flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-cyan-400" /> BE Computer Science Engineering</span>
              </div>
            </div>

            {/* Strengths Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-primary">Core Strengths</h3>
              <div className="grid grid-cols-1 gap-3">
                {strengths.map((str, i) => (
                  <div key={i} className="glass-panel-light p-4 rounded-xl border border-white/5 flex gap-3 items-start">
                    <div className="bg-cyan-500/10 text-cyan-400 p-1.5 rounded-lg mt-0.5">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary font-display">{str.title}</h4>
                      <p className="text-xs text-secondary mt-1 leading-normal">{str.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Timeline Progress */}
          <div className="space-y-8">
            <h3 className="text-lg font-bold font-display text-primary flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-400" /> Educational & Project Timeline
            </h3>

            {/* Interactive Timeline Layout */}
            <div className="relative border-l border-white/10 ml-3 pl-6 space-y-6">
              {portfolioData.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 border border-slate-950 neon-glow-active" />
                  
                  <div className="glass-panel-light p-4 rounded-2xl border border-white/5 hover:border-cyan-500/10 transition-all">
                    <span className="inline-block bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md mb-1.5">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-primary font-display">{item.title}</h4>
                    <p className="text-xs text-secondary mt-1 leading-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Hobbies and Strengths Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 border-t border-white/5 pt-10">
          <div className="glass-panel-light p-5 rounded-2xl flex items-start gap-4">
            <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl mt-1">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary font-display">Passions & Interests</h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Competitive Coding (Java DSA), Artificial Intelligence, Researching Decentralized Ledger Cryptography, and Open-Source software architecture designs.
              </p>
            </div>
          </div>

          <div className="glass-panel-light p-5 rounded-2xl flex items-start gap-4">
            <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl mt-1">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary font-display">Personal Philosophy</h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                &ldquo;Mastery requires persistent experimentation. I believe clean documentation, automated unit tests, and robust type safety represent the height of coding elegance.&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
