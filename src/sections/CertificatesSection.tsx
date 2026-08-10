import React, { useState } from "react";
import { portfolioData, Certificate } from "../data.js";
import { motion } from "motion/react";
import { Award, CheckCircle2, ShieldCheck, Database, Code2, Layers, ExternalLink } from "lucide-react";

export default function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Java", "Full Stack", "SQL", "Big Data", "Cybersecurity", "Testing"];

  const filteredCertificates = selectedCategory === "All"
    ? portfolioData.certificates
    : portfolioData.certificates.filter(c => c.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Java": return Code2;
      case "Full Stack": return Layers;
      case "SQL":
      case "Big Data": return Database;
      case "Cybersecurity": return ShieldCheck;
      default: return Award;
    }
  };

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-3">
            <Award className="h-3.5 w-3.5" />
            Verified Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">Certifications</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-[0.2em] font-mono">
            Digital Certification Vault Categorized by Core Technical Domain
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "bg-[var(--glass-bg)] text-secondary border border-[var(--glass-border)] hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert: Certificate, idx: number) => {
            const Icon = getCategoryIcon(cert.category);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-primary">{cert.title}</h3>
                  <p className="text-xs font-mono text-cyan-400 font-semibold mt-1">{cert.issuer} ({cert.date})</p>

                  <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                    <span className="text-[11px] font-mono text-secondary uppercase tracking-wider block mb-2">
                      Key Competencies Verified
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsLearned.map((skill, i) => (
                        <span key={i} className="text-[11px] font-mono bg-[var(--accent-glow)] text-secondary px-2.5 py-1 rounded-md border border-[var(--glass-border)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-secondary">ID: {cert.credentialId}</span>
                  <button
                    onClick={() => alert(`Credential verified: ${cert.title} (${cert.issuer})`)}
                    className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
