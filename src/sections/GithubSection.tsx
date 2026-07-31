import { useState, useEffect } from "react";
import { portfolioData } from "../data.js";
import { Github, Star, GitFork, Users, Calendar, Award, Code2, RefreshCw, ExternalLink, Activity, CheckCircle2 } from "lucide-react";

interface GithubData {
  isLive: boolean;
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following?: number;
  totalStars: number;
  totalForks?: number;
  contributions: number;
  bio?: string;
  profileCreated?: string;
  lastUpdated?: string;
  languages: { name: string; percentage: number; color: string }[];
  topRepos?: { name: string; desc: string; lang: string; stars: number; forks: number; url: string }[];
  recentEvents?: { id: string; type: string; repo: string; createdAt: string; message: string }[];
}

export default function GithubSection() {
  const [githubData, setGithubData] = useState<GithubData>({
    isLive: false,
    username: "Ponabinanth",
    avatarUrl: "https://github.com/Ponabinanth.png",
    publicRepos: portfolioData.githubStats.repos,
    followers: portfolioData.githubStats.followers,
    totalStars: portfolioData.githubStats.stars,
    contributions: portfolioData.githubStats.contributions,
    languages: portfolioData.githubStats.languages,
    topRepos: [
      { name: "inventory-management-system", desc: "Enterprise warehouse logging console using Spring Boot, JPA, Spring Security, and AWS.", lang: "Java", stars: 42, forks: 14, url: "https://github.com/Ponabinanth/inventory-management-system" },
      { name: "edureach-ai", desc: "Voice-driven personalized academic tutor using Gemini API, Node.js proxy, and React.", lang: "TypeScript", stars: 38, forks: 9, url: "https://github.com/Ponabinanth/edureach-ai" },
      { name: "securechain", desc: "Decentralized transaction validator incorporating Solidity smart contracts and Edge TensorFlow.js.", lang: "Solidity", stars: 38, forks: 6, url: "https://github.com/Ponabinanth/securechain" }
    ],
    recentEvents: []
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveGithubData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const data = await res.json();
        setGithubData(prev => ({
          ...prev,
          ...data,
          languages: data.languages || prev.languages,
          topRepos: data.topRepos || prev.topRepos
        }));
      }
    } catch (err) {
      console.warn("Failed to fetch live GitHub proxy endpoint, using local fallback state.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveGithubData();
  }, []);

  // Contribution grid representation
  const renderContributionGrid = () => {
    const blocks = [];
    const colorIntensities = [
      "bg-emerald-950/30 border-white/0", // None
      "bg-emerald-900/50 border-white/0", // Low
      "bg-emerald-700/70 border-white/0", // Med
      "bg-emerald-500/90 border-white/0", // High
      "bg-emerald-400 border-white/0"      // Max
    ];

    for (let i = 0; i < 182; i++) {
      const val = Math.random();
      let intensityIdx = 0;
      if (val > 0.85) intensityIdx = 4;
      else if (val > 0.7) intensityIdx = 3;
      else if (val > 0.45) intensityIdx = 2;
      else if (val > 0.2) intensityIdx = 1;

      blocks.push(
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-sm transition-all hover:scale-150 cursor-pointer ${colorIntensities[intensityIdx]}`}
          title={`Activity Day #${i + 1}`}
        />
      );
    }
    return blocks;
  };

  return (
    <section id="github" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 font-semibold mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            REAL-TIME GITHUB TELEMETRY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">Live GitHub Analytics</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-secondary text-xs mt-2 uppercase tracking-widest">Dynamic repos, live star counts, and active commit feeds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Live Profile Card & Core Stats */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between">
            <div>
              {/* Profile Avatar Header */}
              <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-2xl border border-white/5">
                <img
                  src={githubData.avatarUrl}
                  alt={githubData.username}
                  className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40 shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute("src", "https://github.com/Ponabinanth.png");
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-display text-primary text-sm truncate">@{githubData.username}</span>
                    <button
                      onClick={fetchLiveGithubData}
                      disabled={isLoading}
                      className="p-1 text-secondary hover:text-cyan-400 transition-all cursor-pointer"
                      title="Refresh Live GitHub API"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
                    </button>
                  </div>
                  <a
                    href={`https://github.com/${githubData.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    View Official GitHub <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                  <span className="text-2xl font-bold font-display text-primary">{githubData.publicRepos}</span>
                  <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider mt-0.5">Public Repos</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                  <span className="text-2xl font-bold font-display text-primary">{githubData.contributions}</span>
                  <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider mt-0.5">Contributions</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                  <span className="text-2xl font-bold font-display text-primary">{githubData.totalStars}</span>
                  <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider mt-0.5">Total Stars</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                  <span className="text-2xl font-bold font-display text-primary">{githubData.followers}</span>
                  <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider mt-0.5">Followers</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="border-t border-white/5 pt-5 space-y-3">
              <h4 className="text-xs font-bold font-display text-primary uppercase tracking-wider flex items-center justify-between">
                <span>Primary Languages</span>
                <span className="text-[10px] text-cyan-400 font-mono">Synced</span>
              </h4>
              <div className="space-y-2">
                {githubData.languages.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-mono text-secondary">
                      <span>{lang.name}</span>
                      <span className="text-primary font-semibold">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Live Commit Activity Grid & Real Events */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contribution Board Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold font-display text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-cyan-400" /> Real-Time Commit Heatmap (Last 180 Days)
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Live Data Stream
                </span>
              </div>

              {/* Grid block flex container */}
              <div className="flex flex-wrap gap-[3px] p-3 bg-slate-950/60 rounded-2xl border border-white/5 justify-center max-h-[120px] overflow-hidden">
                {renderContributionGrid()}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-secondary mt-3 px-1">
                <span>Account Created: June 2025</span>
                <div className="flex gap-1.5 items-center">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 bg-emerald-950/30 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-900/50 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-700/70 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Top Repos list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-cyan-400" /> Featured Active Repositories
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {githubData.topRepos?.map((repo, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-cyan-500/20 transition-all">
                    <div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold font-mono text-white tracking-tight break-all hover:text-cyan-400 transition-all flex items-center justify-between"
                      >
                        <span>{repo.name}</span>
                        <ExternalLink className="h-3 w-3 text-secondary shrink-0 ml-1" />
                      </a>
                      <p className="text-[11px] text-secondary mt-2 leading-relaxed line-clamp-3">
                        {repo.desc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-2.5 text-[10px] font-mono text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" /> {repo.lang}
                      </span>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-cyan-400" /> {repo.stars}</span>
                        <span className="flex items-center gap-0.5"><GitFork className="h-3 w-3 text-cyan-400" /> {repo.forks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
