import { portfolioData } from "../data.js";
import { GraduationCap, Award, MapPin, Heart, BookOpen, Quote, Code2, Database, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function AboutSection() {
  const strengths = [
    { title: "Scalable Java Backend Architectures", desc: "Solid familiarity with MVC pipelines, thread safety, and custom connection pooling inside Spring Boot." },
    { title: "Generative AI Systems Integration", desc: "Expertise in writing clean server-side proxies, managing context, and parsing vector data streams." },
    { title: "Blockchain Security Analysis", desc: "Strong conceptualization of decentralized smart contract lifecycles and cryptographic validation." }
  ];

  const quickStats = [
    { label: "B.E Academic Score", val: "8.0 CGPA", icon: GraduationCap, color: "text-cyan-400" },
    { label: "GitHub Projects", val: "24+ Repos", icon: Terminal, color: "text-emerald-400" },
    { label: "Core Competency", val: "Java & AI", icon: Sparkles, color: "text-purple-400" }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">About Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-sm mt-4 uppercase tracking-[0.2em] font-semibold">
            Professional Narrative & Core Philosophy
          </p>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {quickStats.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-panel p-5 rounded-2xl border border-[var(--glass-border)] text-center flex flex-col items-center justify-center hover:border-cyan-500/30 transition-all shadow-md"
              >
                <Icon className={`h-6 w-6 mb-2 ${st.color}`} />
                <span className="text-2xl font-bold font-display text-primary">{st.val}</span>
                <span className="text-xs text-secondary font-mono mt-1">{st.label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Bio - Spans 7 columns */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/20 h-full flex flex-col justify-center shadow-lg">
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
          </motion.div>

          {/* Strengths - Spans 5 columns */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl font-bold font-display text-primary pl-2">Core Strengths</h3>
            <div className="grid grid-cols-1 gap-4">
              {strengths.map((str, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-300 flex gap-4 items-start group shadow-md">
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
          </motion.div>

        </div>

        {/* Hobbies and Personal Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 rounded-3xl flex items-start gap-5 border border-[var(--glass-border)] hover:border-pink-500/30 transition-colors shadow-md"
          >
            <div className="bg-pink-500/10 text-pink-500 p-3 rounded-2xl mt-1">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary font-display">Passions & Interests</h4>
              <p className="text-sm text-secondary mt-2 leading-relaxed">
                Full-Stack Development, Artificial Intelligence, Researching Decentralized Ledger Cryptography, and Open-Source software architecture designs.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-8 rounded-3xl flex items-start gap-5 border border-[var(--glass-border)] hover:border-purple-500/30 transition-colors shadow-md"
          >
            <div className="bg-purple-500/10 text-purple-500 p-3 rounded-2xl mt-1">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary font-display">Personal Philosophy</h4>
              <p className="text-sm text-secondary mt-2 leading-relaxed">
                "Mastery requires persistent experimentation. I believe clean documentation, automated unit tests, and robust type safety represent the height of coding elegance."
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
