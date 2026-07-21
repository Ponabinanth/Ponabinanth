import { portfolioData } from "../data.js";
import { Award, ShieldAlert, CheckCircle, ExternalLink } from "lucide-react";

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Certificates & Credentials</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-secondary text-xs mt-2 uppercase tracking-widest">Validated Industry & University Accreditations</p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.certificates.map((cert, idx) => {
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cyan-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Badge logo placeholder */}
                  <div className="flex justify-between items-start">
                    <div className="bg-cyan-500/15 text-cyan-400 p-2.5 rounded-xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-secondary font-mono font-semibold tracking-wider">{cert.date}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-display text-primary group-hover:text-cyan-400 transition-all">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-secondary font-medium font-sans mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Validation tag */}
                <div className="mt-6 border-t border-white/5 pt-3 flex items-center justify-between">
                  <div className="font-mono text-[9px] text-secondary">
                    ID: <span className="text-secondary font-medium">{cert.credentialId}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400/80 uppercase tracking-widest font-mono">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
