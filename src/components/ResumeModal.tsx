import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { portfolioData } from "../data.js";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header Action Bar */}
          <div className="bg-[#0f172a] px-6 py-4 border-b border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
                CURRICULUM VITAE PREVIEW
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-cyan-500 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Export PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Resume Body Content Container */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8 bg-[#030712] text-gray-200 selection:bg-cyan-500/30">
            
            {/* 1. Header Banner */}
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black font-display text-white tracking-tight">{portfolioData.name}</h1>
                <p className="text-sm font-mono text-cyan-400 font-semibold mt-1">{portfolioData.title}</p>
                <p className="text-xs text-gray-400 mt-1">{portfolioData.location}</p>
              </div>

              <div className="text-xs font-mono space-y-1 text-gray-300">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  <a href={`mailto:${portfolioData.email}`} className="hover:text-cyan-400">{portfolioData.email}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{portfolioData.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
                  <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">linkedin.com/in/ponabinanths</a>
                </p>
                <p className="flex items-center gap-2">
                  <Github className="h-3.5 w-3.5 text-cyan-400" />
                  <a href={portfolioData.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">github.com/Ponabinanth</a>
                </p>
              </div>
            </div>

            {/* 2. Professional Objective */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Code2 className="h-4 w-4" /> Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-gray-300">
                {portfolioData.about}
              </p>
            </div>

            {/* 3. Core Technical Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Code2 className="h-4 w-4" /> Technical Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {portfolioData.skills.map((cat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-2xl">
                    <h3 className="text-[11px] font-bold text-white uppercase font-display mb-1.5">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((item, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white/5 text-cyan-300 px-1.5 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Key Architectural Projects
              </h2>

              <div className="space-y-4">
                {portfolioData.projects.map((proj, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white font-display">{proj.title}</h3>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                        {proj.techStack.slice(0, 3).join(", ")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">{proj.description}</p>
                    <ul className="list-disc list-inside text-[11px] text-gray-400 space-y-1 pl-1">
                      {proj.features.map((feat, fidx) => (
                        <li key={fidx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Education & Internships */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h2 className="text-xs font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Education
                </h2>
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                    <p className="text-xs font-bold text-white">{edu.degree}</p>
                    <p className="text-[11px] text-gray-400">{edu.institution}</p>
                    <div className="flex justify-between text-[10px] font-mono text-cyan-300 mt-1">
                      <span>{edu.duration}</span>
                      {edu.score && <span>Score: {edu.score}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="text-xs font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Award className="h-4 w-4" /> Certifications
                </h2>
                <div className="space-y-2">
                  {portfolioData.certificates.map((cert, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                      <p className="text-xs font-bold text-white">{cert.title}</p>
                      <p className="text-[11px] text-gray-400">{cert.issuer} ({cert.date})</p>
                      <p className="text-[10px] font-mono text-gray-500 mt-0.5">ID: {cert.credentialId}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
