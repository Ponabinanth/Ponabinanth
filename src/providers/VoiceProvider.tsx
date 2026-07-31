import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface VoiceContextType {
  isSpeakingIntro: boolean;
  toggleVoiceIntro: () => void;
  stopVoiceIntro: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isSpeakingIntro, setIsSpeakingIntro] = useState(false);
  const hasSpokenOnFirstClickRef = useRef(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const introSpeechScript = `Welcome to my portfolio! I am Pon Abinanth, a Computer Science Engineering student and Java Full Stack Developer specializing in Spring Boot, AI engineering, and decentralized blockchain systems. I build high-performance microservices, RAG-powered intelligent tutors, and edge TensorFlow security applications. Feel free to explore my case studies, test live sandboxes, or chat with my AI twin. Thank you for visiting!`;

  const playVoiceIntro = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(introSpeechScript);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeakingIntro(true);
    utterance.onend = () => setIsSpeakingIntro(false);
    utterance.onerror = () => setIsSpeakingIntro(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stopVoiceIntro = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeakingIntro(false);
    }
  };

  const toggleVoiceIntro = () => {
    if (isSpeakingIntro) {
      stopVoiceIntro();
    } else {
      playVoiceIntro();
    }
  };

  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!hasSpokenOnFirstClickRef.current) {
        hasSpokenOnFirstClickRef.current = true;
        playVoiceIntro();
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ isSpeakingIntro, toggleVoiceIntro, stopVoiceIntro }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
