import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileText, Sparkles, Volume2, VolumeX, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenResume: () => void;
  isSpeakingIntro: boolean;
  onToggleVoiceIntro: () => void;
}

export default function HeroSection({
  onScrollToSection,
  onOpenResume,
  isSpeakingIntro,
  onToggleVoiceIntro
}: HeroSectionProps) {
  const titles = [
    "Computer Science Student",
    "Full Stack Developer",
    "AI Systems Engineer",
    "Blockchain Enthusiast",
    "Problem Solver"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [imgSrc, setImgSrc] = useState("/ponabinanth.jpg");

  useEffect(() => {
    let timer: any;
    const fullText = titles[currentTitleIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(70);
      }, typingSpeed);

      if (typedText === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(30);
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl -z-10 animate-pulse" />
      
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8 text-left mt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--accent-glow)] border border-[var(--glass-border)] rounded-full text-xs font-medium text-secondary shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Available for new opportunities
          </div>

          <div className="space-y-4">
            <p className="text-secondary text-sm font-medium tracking-wide">Hi there, my name is</p>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-tight">
              Ponabinanth S
            </h1>

            <div className="h-10 flex items-center">
              <p className="text-xl md:text-2xl font-medium text-blue-500 flex items-center">
                {typedText}
                <span className="w-[2px] h-6 bg-blue-500 animate-pulse ml-1" />
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg text-secondary max-w-xl leading-relaxed">
            I am a Computer Science Engineering student passionate about building highly robust, scalable Java backend microservices, intelligent Generative AI agents, and secure decentralized blockchain networks.
          </p>

          {/* Quick Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["Java / Spring Boot", "React & TypeScript", "Gemini AI / LLMs", "MySQL & Cloud", "Web3 / Solidity"].map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-[var(--accent-glow)] border border-[var(--glass-border)] rounded-lg text-xs font-mono text-cyan-400 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2 items-center">
            <button
              onClick={onToggleVoiceIntro}
              aria-label={isSpeakingIntro ? "Stop voice intro" : "Play voice intro"}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all cursor-pointer text-sm shadow-sm hover:shadow-md ${
                isSpeakingIntro
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105 active:scale-95"
              }`}
            >
              {isSpeakingIntro ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop Intro</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Play Intro</span>
                </>
              )}
            </button>

            <button
              onClick={() => onScrollToSection("ai-recruiter-mode")}
              className="flex items-center gap-2 bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-primary px-6 py-3.5 rounded-full font-medium hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm shadow-sm hover:shadow-md group"
            >
              <Sparkles className="h-4 w-4 text-blue-500 group-hover:animate-spin" />
              AI Assistant
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 bg-[var(--glass-bg)] hover:bg-[var(--accent-glow)] border border-[var(--glass-border)] text-secondary hover:text-primary px-6 py-3.5 rounded-full font-medium hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm shadow-sm hover:shadow-md"
            >
              <FileText className="h-4 w-4 text-blue-500" />
              View Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative group max-w-[320px] w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2rem] p-3 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-transform duration-500 group-hover:-translate-y-2">
              
              <div className="flex justify-between items-center px-3 py-2 mb-3 bg-[var(--accent-glow)] rounded-xl border border-[var(--glass-border)] text-[10px] font-medium text-secondary">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span className="uppercase tracking-wider text-primary">Verified Profile</span>
                </div>
              </div>

              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--glass-border)]">
                <img
                  src={imgSrc}
                  alt="Ponabinanth S"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => {
                    if (imgSrc !== "/assets/ponabinanth.jpg") {
                      setImgSrc("/assets/ponabinanth.jpg");
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-bg)] via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-[var(--glass-bg)] border border-[var(--glass-border)] px-4 py-2 rounded-xl backdrop-blur-xl text-xs font-medium text-primary shadow-sm">
                  <span>Java & AI Dev</span>
                  <span className="flex items-center gap-1.5 text-blue-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
