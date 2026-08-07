import { portfolioData } from "../data.js";
import { Award, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 relative">
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
            <Award className="h-3.5 w-3.5" />
            Accreditations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Certificates & Credentials</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">
            Validated Industry & University Certifications
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certificates.map((cert, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 shadow-md">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-secondary font-mono font-semibold tracking-wider bg-[var(--accent-glow)] px-2.5 py-1 rounded-lg border border-[var(--glass-border)]">{cert.date}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-display text-primary group-hover:text-cyan-400 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-secondary font-medium font-sans mt-1.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Validation tag */}
                <div className="mt-6 border-t border-[var(--glass-border)] pt-4 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-secondary">
                    ID: <span className="text-primary font-semibold">{cert.credentialId}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-widest font-mono bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
