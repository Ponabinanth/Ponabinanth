import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileText, Terminal, ArrowRight, Sparkles, Volume2, VolumeX, Pause, Play, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenCli: () => void;
  onOpenResume: () => void;
  isSpeakingIntro: boolean;
  onToggleVoiceIntro: () => void;
}

export default function HeroSection({
  onScrollToSection,
  onOpenCli,
  onOpenResume,
  isSpeakingIntro,
  onToggleVoiceIntro
}: HeroSectionProps) {
  const titles = [
    "UG Computer Science Engineering Student",
    "Java Full Stack Developer",
    "AI Systems Engineer",
    "Blockchain Enthusiast",
    "Algorithmic Problem Solver"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [imgSrc, setImgSrc] = useState("/ponabinanth.jpg");

  // Typing effect engine
  useEffect(() => {
    let timer: any;
    const fullText = titles[currentTitleIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      if (typedText === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);

      if (typedText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTitleIndex]);

  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col justify-center px-6 overflow-hidden">
      {/* Immersive Cyber background assets */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl -z-10 animate-pulse delay-700" />
      
      {/* Code-Like floating indicators */}
      <div className="absolute top-10 left-10 text-cyan-500/20 font-mono text-xs select-none">
        public class PonabinanthS &#123;
      </div>
      <div className="absolute bottom-10 right-10 text-purple-500/20 font-mono text-xs select-none">
        &#125; // Future Software Engineer
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 relative z-10">
        
        {/* Left Col: Info details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 font-semibold mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            REAL-TIME NODE ACTIVE | AVAILABLE FOR RECRUITMENT
          </div>

          <p className="text-gray-400 text-sm font-mono tracking-wider uppercase">Hi there, my name is</p>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-display text-white mt-1 select-all leading-none">
            PONABINANTH S
          </h1>

          {/* Running typing effects */}
          <div className="h-10 mt-2 flex items-center">
            <p className="text-md md:text-xl font-mono text-cyan-400 flex items-center">
              <span className="text-white opacity-60 mr-2">&gt;</span>
              {typedText}
              <span className="w-2 h-5 bg-cyan-400 animate-ping ml-1" />
            </p>
          </div>

          <p className="text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed font-sans">
            I am an undergraduate Computer Science Engineering student passionate about building highly robust, scalable Java backend microservices, intelligent Generative AI agents, and secure decentralized blockchain networks.
          </p>

          {/* CTA Buttons & 30-Second AI Voice Introduction Button */}
          <div className="flex flex-wrap gap-3 pt-4 items-center">
            {/* 30s AI Voice Intro Button */}
            <button
              onClick={onToggleVoiceIntro}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all cursor-pointer text-xs shadow-lg ${
                isSpeakingIntro
                  ? "bg-red-500 text-white animate-pulse shadow-red-500/20"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:scale-105 active:scale-95 shadow-cyan-500/20"
              }`}
            >
              {isSpeakingIntro ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop 30s Voice Intro</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>🔊 Play 30s AI Intro Voice</span>
                </>
              )}
            </button>

            <button
              onClick={() => onScrollToSection("ai-recruiter-mode")}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4.5 py-3 rounded-2xl font-semibold hover:scale-102 active:scale-98 transition-all cursor-pointer text-xs"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              AI Assistant Chat
            </button>

            <button
              onClick={onOpenCli}
              className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 px-4 py-3 rounded-2xl font-semibold hover:scale-102 active:scale-98 transition-all cursor-pointer text-xs font-mono"
            >
              <Terminal className="h-4 w-4" />
              CLI Shell [Ctrl+K]
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-4 py-3 rounded-2xl font-semibold hover:scale-102 active:scale-98 transition-all cursor-pointer text-xs"
            >
              <FileText className="h-4 w-4 text-purple-400" />
              CV Preview
            </button>
          </div>
        </motion.div>

        {/* Right Col: Photo Format Portrait Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group max-w-[300px] w-full">
            {/* Ambient cyber glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            
            {/* Photo Format Frame Container */}
            <div className="relative bg-slate-900/90 border-2 border-cyan-500/40 rounded-[2rem] overflow-hidden p-3.5 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              
              {/* Top Photo Frame Header Tag */}
              <div className="flex justify-between items-center px-2 py-1 mb-2 bg-slate-950/80 rounded-xl border border-white/5 font-mono text-[9px]">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>OFFICIAL PORTRAIT</span>
                </div>
                <span className="text-gray-400">PONABINANTH S</span>
              </div>

              {/* Main Photo Container */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner group-hover:shadow-cyan-500/20 transition-all">
                <img
                  src={imgSrc}
                  alt="Ponabinanth S Official Photo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  onError={() => {
                    if (imgSrc !== "/assets/ponabinanth.jpg") {
                      setImgSrc("/assets/ponabinanth.jpg");
                    }
                  }}
                />
                
                {/* Visual scanline & gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Photo Tag Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-slate-950/90 border border-cyan-500/30 px-3 py-1.5 rounded-xl backdrop-blur-md text-[10px] font-mono">
                  <span className="text-white font-bold tracking-wider">JAVA & AI DEV</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> VERIFIED
                  </span>
                </div>
              </div>

              {/* Photo Frame Footer Details */}
              <div className="mt-3 px-1 pt-1 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-gray-400">
                <span>Computer Science Engg</span>
                <span className="text-cyan-400 font-semibold">Tiruppur, India</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
