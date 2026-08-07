import { portfolioData } from "../data.js";
import { Code, Code2, Cpu, Award, Zap, ExternalLink, Trophy } from "lucide-react";
import { motion } from "motion/react";

export default function CodingProfilesSection() {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Code": return Code;
      case "Terminal": return Code2;
      case "Cpu": return Cpu;
      default: return Award;
    }
  };

  return (
    <section id="coding-profiles" className="py-20 relative">
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
            <Trophy className="h-3.5 w-3.5" />
            Competitive Coding Stats
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary flex items-center justify-center gap-3">
            Algorithms & DSA Profiles
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-3 uppercase tracking-widest font-mono">
            Problem solving milestones & verified platforms
          </p>
        </motion.div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.codingProfiles.map((profile, idx) => {
            const Icon = getIconComponent(profile.iconName);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Visual Glow Layer */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${profile.color} opacity-10 rounded-full filter blur-2xl group-hover:opacity-25 transition-opacity duration-500`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${profile.color} p-2.5 flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {profile.profileUrl && (
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${profile.platform} Profile`}
                        className="text-secondary hover:text-cyan-400 p-2 rounded-lg hover:bg-[var(--accent-glow)] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold font-mono text-secondary tracking-widest uppercase">{profile.platform}</h3>
                    <div className="text-2xl font-bold font-display text-primary mt-1 flex items-center gap-1.5">
                      <Zap className="h-5 w-5 text-cyan-400 animate-pulse" /> {profile.solved}
                    </div>
                  </div>
                </div>

                {/* Badges/Rankings panel */}
                <div className="mt-6 border-t border-[var(--glass-border)] pt-4 space-y-2 text-xs relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Tier Badge:</span>
                    <span className="font-semibold text-primary bg-[var(--accent-glow)] px-2 py-0.5 rounded border border-[var(--glass-border)]">{profile.badge}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Ranking Stat:</span>
                    <span className="font-bold text-cyan-400 font-mono">{profile.rank}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
