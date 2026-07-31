import { portfolioData } from "../data.js";
import { GraduationCap, Award, MapPin, Heart, BookOpen, Quote } from "lucide-react";

export default function AboutSection() {
  const strengths = [
    { title: "Scalable Java Backend Architectures", desc: "Solid familiarity with MVC pipelines, thread safety, and custom connection pooling inside Spring." },
    { title: "Generative AI Systems Integration", desc: "Expertise in writing clean server-side proxies, managing context, and parsing vector data streams." },
    { title: "Blockchain Security Analysis", desc: "Strong conceptualization of decentralized smart contract lifecycles and cryptographic validation." }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">About Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-sm mt-4 uppercase tracking-[0.2em] font-semibold">Professional Narrative & Core Philosophy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Bio - Spans 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border-cyan-500/10 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Quote className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary">Professional Narrative</h3>
              </div>
              
              <p className="text-base md:text-lg text-secondary leading-relaxed font-sans mb-8">
                {portfolioData.about}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm font-mono text-secondary mt-auto">
                <span className="flex items-center gap-2 bg-[var(--accent-glow)] px-4 py-2 rounded-full border border-[var(--glass-border)]">
                  <MapPin className="h-4 w-4 text-cyan-500" /> {portfolioData.location}
                </span>
                <span className="flex items-center gap-2 bg-[var(--accent-glow)] px-4 py-2 rounded-full border border-[var(--glass-border)]">
                  <GraduationCap className="h-4 w-4 text-cyan-500" /> BE Computer Science Engineering
                </span>
              </div>
            </div>
          </div>

          {/* Strengths - Spans 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-display text-primary pl-2">Core Strengths</h3>
            <div className="grid grid-cols-1 gap-4">
              {strengths.map((str, i) => (
                <div key={i} className="glass-panel-light p-6 rounded-2xl border border-[var(--glass-border)] hover:border-cyan-500/30 transition-all duration-300 flex gap-4 items-start group">
                  <div className="bg-cyan-500/10 text-cyan-500 p-2.5 rounded-xl mt-0.5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-primary font-display">{str.title}</h4>
                    <p className="text-sm text-secondary mt-1.5 leading-relaxed">{str.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Hobbies and Strengths Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="glass-panel p-8 rounded-3xl flex items-start gap-5 border border-[var(--glass-border)] hover:border-pink-500/30 transition-colors">
            <div className="bg-pink-500/10 text-pink-500 p-3 rounded-2xl mt-1">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary font-display">Passions & Interests</h4>
              <p className="text-sm text-secondary mt-2 leading-relaxed">
                Competitive Coding (Java DSA), Artificial Intelligence, Researching Decentralized Ledger Cryptography, and Open-Source software architecture designs.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex items-start gap-5 border border-[var(--glass-border)] hover:border-purple-500/30 transition-colors">
            <div className="bg-purple-500/10 text-purple-500 p-3 rounded-2xl mt-1">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary font-display">Personal Philosophy</h4>
              <p className="text-sm text-secondary mt-2 leading-relaxed">
                "Mastery requires persistent experimentation. I believe clean documentation, automated unit tests, and robust type safety represent the height of coding elegance."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
