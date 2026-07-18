import { portfolioData } from "../data.js";
import { Code, Terminal, Cpu, Award, Zap, ChevronRight } from "lucide-react";

export default function CodingProfilesSection() {
  // Map index to icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Code": return Code;
      case "Terminal": return Terminal;
      case "Cpu": return Cpu;
      default: return Award;
    }
  };

  return (
    <section id="coding-profiles" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Algorithms & DSA Profiles</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Competitive coding platforms and diagnostic stats</p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.codingProfiles.map((profile, idx) => {
            const Icon = getIconComponent(profile.iconName);
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-cyan-500/20 hover:translate-y-[-2px] transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual Glow Layer on platform background */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${profile.color} opacity-5 rounded-full filter blur-2xl group-hover:opacity-10 transition-all`} />

                <div className="space-y-4">
                  {/* Icon Panel */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${profile.color} p-2 flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-mono text-gray-400 tracking-wider uppercase">{profile.platform}</h3>
                    <div className="text-xl font-bold font-display text-white mt-1.5 flex items-center gap-1">
                      <Zap className="h-4.5 w-4.5 text-cyan-400" /> {profile.solved}
                    </div>
                  </div>
                </div>

                {/* Badges/Rankings panel */}
                <div className="mt-6 border-t border-white/5 pt-3 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tier Badge:</span>
                    <span className="font-semibold text-gray-300">{profile.badge}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Ranking Stat:</span>
                    <span className="font-semibold text-cyan-400 font-mono">{profile.rank}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
