import React, { useState } from "react";
import { Sparkles, ArrowRight, Sun, Moon, User, GraduationCap, Cpu, FolderGit2, Mail, Code2, Heart } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

interface DigitalGateLandingProps {
  onEnter: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export default function DigitalGateLanding({ onEnter, onNavigateToSection }: DigitalGateLandingProps) {
  const { theme, toggleTheme } = useTheme();
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleEnterClick = (sectionId?: string) => {
    setIsUnlocking(true);
    setTimeout(() => {
      onEnter();
      if (sectionId && onNavigateToSection) {
        onNavigateToSection(sectionId);
      }
    }, 600);
  };

  const isLight = theme === "light";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none bg-slate-950 font-sans">

      {/* Top Controls Overlay: Theme Toggle & Skip Intro */}
      <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center max-w-7xl mx-auto pointer-events-auto">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full border transition-all cursor-pointer shadow-lg flex items-center gap-2 text-xs font-mono font-bold ${
            isLight 
              ? "bg-white/95 border-amber-600/40 text-amber-950 hover:bg-white hover:shadow-amber-500/20" 
              : "bg-slate-900/90 border-purple-500/50 text-purple-300 hover:bg-slate-800"
          }`}
          title="Switch Light / Dark Theme Gate"
        >
          {isLight ? <Sun className="h-4 w-4 text-amber-600" /> : <Moon className="h-4 w-4 text-purple-400" />}
          <span>{isLight ? "LIGHT GATE" : "DARK GATE"}</span>
        </button>

        <button
          onClick={() => handleEnterClick()}
          className={`text-xs font-mono font-bold tracking-wider px-5 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
            isLight
              ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-900/30"
              : "bg-slate-900/90 text-cyan-400 border-cyan-500/40 hover:bg-slate-800"
          }`}
        >
          <span>{isUnlocking ? "OPENING..." : "SKIP INTRO"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 1. LIGHT THEME GATE (NO BLUR OVERLAYS - CRISP PERFECT ALIGNMENT) */}
      {isLight ? (
        <div className="relative w-full h-full flex flex-col justify-between items-center transition-all duration-300">
          
          {/* Full-Bleed Clean Background Image */}
          <img
            src="/gate-light.jpg"
            alt="Light Theme Gate"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />

          {/* Unlocking Flash Effect */}
          {isUnlocking && (
            <div className="absolute inset-0 bg-emerald-500/20 z-20 animate-pulse pointer-events-none" />
          )}

          {/* Interactive Layer for Light Gate */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between items-center p-4 sm:p-6">
            
            {/* Top Name Header (Crisp, No Blur Filter) */}
            <div className="pt-14 text-center">
              <div className="bg-amber-100/95 border-2 border-amber-800/40 px-6 py-2 rounded-full shadow-md inline-flex items-center gap-2 max-w-full overflow-hidden">
                <span className="font-display font-extrabold text-emerald-950 text-sm sm:text-base tracking-wider uppercase whitespace-nowrap">
                  PONABINANTH S
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-900 uppercase hidden md:inline">
                  • Software Engineer | Full Stack Developer | AI Enthusiast
                </span>
              </div>
            </div>

            {/* Central Interactive Click Zone (Invisible hotspot over the artwork's button) */}
            <div 
              className="my-auto cursor-pointer group flex flex-col items-center justify-center w-full h-64" 
              onClick={() => handleEnterClick()}
              title="Enter Portfolio"
            >
              {/* Invisible box to act as a large clickable area over the painted button */}
              <div className="w-full max-w-sm h-40"></div>
            </div>

            {/* Bottom Navigation Buttons (Aligned directly across the bottom) */}
            <div className="w-full max-w-4xl mx-auto pb-3">
              <div className="bg-amber-100/95 border-2 border-amber-800/40 rounded-2xl p-2 shadow-lg grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
                <button onClick={() => handleEnterClick("about")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <User className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">About Me</span>
                </button>

                <button onClick={() => handleEnterClick("education")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <GraduationCap className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">Education</span>
                </button>

                <button onClick={() => handleEnterClick("skills")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <Cpu className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">Skills</span>
                </button>

                <button onClick={() => handleEnterClick("projects")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <FolderGit2 className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">Projects</span>
                </button>

                <button onClick={() => handleEnterClick("experience")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <Sparkles className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">Experience</span>
                </button>

                <button onClick={() => handleEnterClick("contact")} className="py-2 px-1 hover:bg-amber-200/80 rounded-xl transition-colors cursor-pointer flex flex-col items-center">
                  <Mail className="h-4 w-4 text-emerald-950 mb-0.5" />
                  <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase">Contact</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* 2. DARK THEME GATE (NO TEXT WRAPPING BUGS - CRISP PERFECT ALIGNMENT) */
        <div 
          className="relative min-h-screen flex flex-col justify-between items-center px-4 py-16 bg-cover bg-center bg-no-repeat transition-all duration-500" 
          style={{ backgroundImage: `url('/gate-dark.jpg')` }}
        >
          {/* Main Hero & Profile Card Row */}
          <div className="relative z-10 w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-950/80 px-4 py-1.5 rounded-full border border-purple-500/40 inline-block shadow-lg">
                WELCOME TO MY PORTFOLIO
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white whitespace-nowrap">
                PONABINANTH <span className="text-purple-400">S</span>
              </h1>

              <p className="text-base sm:text-xl font-bold text-cyan-300 font-sans tracking-wide">
                Software Engineer | Full Stack Developer | AI Enthusiast
              </p>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans max-w-xl border-l-2 border-purple-500/60 pl-3.5 bg-slate-950/80 py-2 rounded-r-2xl border border-slate-800/80">
                I build intelligent, scalable and user-focused software solutions by combining creativity, code and cutting-edge technologies.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleEnterClick("projects")}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleEnterClick()}
                  className="px-7 py-3.5 rounded-full bg-slate-900 border border-slate-700/80 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Enter Portfolio</span>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Right Profile Card (Ponabinanth's Photo) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-slate-950/90 border border-purple-500/40 rounded-3xl p-5 shadow-2xl w-full max-w-[320px] space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400 flex-shrink-0">
                    <img src="/ponabinanth-circle.png" alt="Ponabinanth S" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/ponabinanth-profile.jpg"; }} />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white font-display">Hi, I'm Ponabinanth S</h3>
                    <p className="text-[11px] font-mono text-purple-300">Computer Science Student</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-sans text-slate-200 border-t border-slate-800/80 pt-3">
                  <p className="flex items-center gap-2"><Code2 className="h-3.5 w-3.5 text-cyan-400" /> Passionate about coding</p>
                  <p className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-purple-400" /> Love building real-world solutions</p>
                  <p className="flex items-center gap-2"><Heart className="h-3.5 w-3.5 text-pink-400" /> Explorer of AI, Full-Stack & Cloud</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Destination Navigation Cards */}
          <div className="relative z-10 w-full max-w-6xl mx-auto pb-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <button onClick={() => handleEnterClick("about")} className="bg-slate-950/90 border border-slate-800/80 hover:border-purple-500/60 p-3.5 rounded-2xl text-left transition-all cursor-pointer group shadow-xl">
              <User className="h-4 w-4 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white block">About Me</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Journey & goals →</span>
            </button>

            <button onClick={() => handleEnterClick("education")} className="bg-slate-950/90 border border-slate-800/80 hover:border-purple-500/60 p-3.5 rounded-2xl text-left transition-all cursor-pointer group shadow-xl">
              <GraduationCap className="h-4 w-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white block">Education</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Academic degree →</span>
            </button>

            <button onClick={() => handleEnterClick("skills")} className="bg-slate-950/90 border border-slate-800/80 hover:border-purple-500/60 p-3.5 rounded-2xl text-left transition-all cursor-pointer group shadow-xl">
              <Cpu className="h-4 w-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white block">Skills</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Tech stack →</span>
            </button>

            <button onClick={() => handleEnterClick("projects")} className="bg-slate-950/90 border border-slate-800/80 hover:border-purple-500/60 p-3.5 rounded-2xl text-left transition-all cursor-pointer group shadow-xl">
              <FolderGit2 className="h-4 w-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white block">Projects</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Real-world work →</span>
            </button>

            <button onClick={() => handleEnterClick("contact")} className="bg-slate-950/90 border border-slate-800/80 hover:border-purple-500/60 p-3.5 rounded-2xl text-left transition-all cursor-pointer group shadow-xl">
              <Mail className="h-4 w-4 text-pink-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white block">Contact</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Build together →</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
