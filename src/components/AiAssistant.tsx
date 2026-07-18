import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare, Mic, MicOff, Volume2, VolumeX, Sparkles, Terminal, Code,
  Award, Play, Send, ChevronRight, RefreshCw, Upload, Search, CheckCircle2,
  AlertTriangle, ArrowRight, UserCheck, Shield
} from "lucide-react";

interface Message {
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

interface AiAssistantProps {
  onSearchNavigation?: (query: string) => void;
}

export default function AiAssistant({ onSearchNavigation }: AiAssistantProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "interview" | "coach" | "codegen" | "analyzer">("chat");
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Tab-specific States
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hi, I'm **Abinanth-AI**! 🤖 I am Ponabinanth's personal digital twin and advisor. Ask me anything about my creator's skills, backend Spring Boot architectures, or deep learning initiatives. Feel free to try the tabs above to trigger specialized modules like **Interview Mode** or **Resume Analyzer**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewMessages, setInterviewMessages] = useState<Message[]>([]);
  const [currentInterviewQuestion, setCurrentInterviewQuestion] = useState(0);

  const [coachRole, setCoachRole] = useState("Java Backend Developer");
  const [coachResult, setCoachResult] = useState("");

  const [codegenQuery, setCodegenQuery] = useState("Java Double-Checked Locking Singleton");
  const [codegenResult, setCodegenResult] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);

  const [voiceNarratorPlaying, setVoiceNarratorPlaying] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize browser Web Speech APIs safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onerror = () => setIsListening(false);
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          // Auto-trigger submit after brief pause
          setTimeout(() => handleSendMessage(transcript), 400);
        };
        recognitionRef.current = rec;
      }
    }

    return () => {
      stopSpeaking();
    };
  }, []);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, interviewMessages, isLoading]);

  // Voice Speech synthesizers
  const speakText = (text: string) => {
    if (!synthRef.current || !speechEnabled) return;
    stopSpeaking();
    
    // Clean markdown characters from synthesis text
    const cleanText = text
      .replace(/\*\*|__/g, "")
      .replace(/###/g, "")
      .replace(/`/g, "")
      .replace(/[-*]\s+/g, "")
      .slice(0, 350); // limit spoken duration

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setVoiceNarratorPlaying(false);
    }
  };

  const startVoiceDictation = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        stopSpeaking();
        recognitionRef.current.start();
      }
    } else {
      alert("Speech Recognition API not fully supported in this browser. Please type your query!");
    }
  };

  const executeApiCall = async (message: string, mode: string, history?: Message[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode, history }),
      });
      const data = await response.json();
      setIsLoading(false);
      return data.text;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return "Oops! I encountered an error. Please try again later or verify your internet connection.";
    }
  };

  // Main chat sending
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    setInputText("");
    stopSpeaking();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { role: "user", content: text, timestamp };
    
    setChatMessages((prev) => [...prev, userMsg]);

    const reply = await executeApiCall(text, "normal", [...chatMessages, userMsg]);
    
    const botMsg: Message = { role: "model", content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, botMsg]);

    // Read the reply out loud if speech is enabled
    if (speechEnabled) {
      speakText(reply);
    }

    // Check for AI Portfolio Search commands
    // If the recruiter search maps to "java", "blockchain", "project", etc. we can trigger search navigation
    if (onSearchNavigation) {
      if (text.toLowerCase().includes("java") || text.toLowerCase().includes("backend") || text.toLowerCase().includes("spring")) {
        onSearchNavigation("java");
      } else if (text.toLowerCase().includes("blockchain") || text.toLowerCase().includes("securechain")) {
        onSearchNavigation("blockchain");
      } else if (text.toLowerCase().includes("ai") || text.toLowerCase().includes("edureach")) {
        onSearchNavigation("ai");
      }
    }
  };

  // Profile Voice Narration
  const startProfileNarration = () => {
    if (voiceNarratorPlaying) {
      stopSpeaking();
      return;
    }
    setVoiceNarratorPlaying(true);
    const narrative = "Hi there, I am Ponabinanth S, a highly motivated Java Full Stack Developer and AI Engineer. I specialize in building transactional microservices using Spring Boot and Hibernate on AWS, combined with cutting edge AI models like the Gemini API. In my project portfolio, I built a modular Inventory Management System, an AI tutoring ecosystem called EduReach AI, and a decentralized blockchain network named SecureChain with client-side TensorFlow detection models. I am extremely eager to join your team. Let's build something beautiful together!";
    speakText(narrative);
  };

  // Interview simulator
  const handleStartInterview = async () => {
    stopSpeaking();
    setInterviewStarted(true);
    setInterviewMessages([]);
    setIsLoading(true);

    const introMsg = "Start mock technical interview. Ask the first Java/OOP question.";
    const response = await executeApiCall(introMsg, "interview");

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInterviewMessages([
      { role: "model", content: response, timestamp }
    ]);
    if (speechEnabled) {
      speakText(response);
    }
  };

  const handleSendInterviewAnswer = async () => {
    if (!inputText.trim()) return;
    const answer = inputText.trim();
    setInputText("");
    stopSpeaking();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { role: "user", content: answer, timestamp };
    setInterviewMessages((prev) => [...prev, userMsg]);

    const reply = await executeApiCall(answer, "interview", interviewMessages);
    
    const botMsg: Message = { role: "model", content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setInterviewMessages((prev) => [...prev, botMsg]);
    
    setCurrentInterviewQuestion((prev) => prev + 1);

    if (speechEnabled) {
      speakText(reply);
    }
  };

  // Career coach role analyzer
  const handleRunCareerCoach = async (roleName: string) => {
    stopSpeaking();
    setCoachRole(roleName);
    setIsLoading(true);
    const prompt = `Analyze how Ponabinanth fits into the role of: ${roleName}. Give specific technical comparisons and ratings.`;
    const response = await executeApiCall(prompt, "coach");
    setCoachResult(response);
  };

  // Code generator
  const handleRunCodegen = async (query: string) => {
    stopSpeaking();
    setCodegenQuery(query);
    setIsLoading(true);
    const response = await executeApiCall(`Generate clean production code for: ${query}`, "codegen");
    setCodegenResult(response);
  };

  // Resume Analyzer
  const handleAnalyzeResumeText = async () => {
    if (!resumeText.trim()) return;
    stopSpeaking();
    setIsLoading(true);
    const response = await executeApiCall(resumeText, "analyzer");
    
    // Attempt to extract structured info from response or render Markdown directly
    setAnalyzerResult(response);
  };

  const handleSimulateResumeUpload = () => {
    // Simulate parsing an uploaded resume to text
    const sampleResume = `
PONABINANTH S
Computer Science Student | Web Enthusiast
Skills: Java, HTML, CSS, JavaScript, Spring Boot, Git
Projects: Simple Library Manager, Basic To-Do List React, Static landing page.
Education: BE CSE (CGPA 8.1)
Looking for entry level software developer role.
    `;
    setResumeText(sampleResume.trim());
  };

  return (
    <div id="ai-recruiter-mode" className="glass-panel rounded-3xl p-6 border-cyan-500/20 shadow-xl overflow-hidden relative">
      {/* Decorative Neon Ring */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -z-10" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">ASSISTANT ENGINE V2.5</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-white mt-1 flex items-center gap-2">
            Abinanth-AI Assistant Core <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400">Ask questions, simulate technical interviews, assess roles, and test live AI logic.</p>
        </div>

        {/* Quick Voice Narrator Launcher */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
          <button
            onClick={startProfileNarration}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              voiceNarratorPlaying
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/20"
            }`}
          >
            <Volume2 className={`h-4.5 w-4.5 ${voiceNarratorPlaying ? "animate-bounce" : ""}`} />
            {voiceNarratorPlaying ? "Stop Narration" : "🎤 Voice Introduction (1m)"}
          </button>
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            title={speechEnabled ? "Mute Speech Feedback" : "Unmute Speech Feedback"}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            {speechEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-red-400" />}
          </button>
        </div>
      </div>

      {/* Quick Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          { id: "chat", label: "Q&A Twin", icon: MessageSquare },
          { id: "interview", label: "Interview Bot", icon: Terminal },
          { id: "coach", label: "Career Coach", icon: UserCheck },
          { id: "codegen", label: "Code Gen", icon: Code },
          { id: "analyzer", label: "Resume Evaluator", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                stopSpeaking();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Main Area */}
      <div className="mt-6 bg-slate-950/60 rounded-2xl border border-white/5 min-h-[380px] flex flex-col relative">
        <AnimatePresence mode="wait">
          {/* 1. GENERAL Q&A CHAT */}
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col p-4"
            >
              <div className="flex-1 overflow-y-auto max-h-[320px] space-y-4 mb-4 pr-1">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-cyan-500 text-slate-950 rounded-tr-none font-medium"
                          : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {/* Formatted Markdown Display */}
                      <p className="whitespace-pre-wrap select-text">
                        {msg.content.split("**").map((chunk, i) =>
                          i % 2 === 1 ? <strong key={i} className="font-bold text-white">{chunk}</strong> : chunk
                        )}
                      </p>
                      <span className="block text-[10px] opacity-60 text-right mt-1.5">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 text-gray-400 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 text-sm flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                      <span>Thinking, sourcing credentials...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  "Explain Java Spring Boot skills",
                  "Tell me about SecureChain blockchain",
                  "Why should I hire Ponabinanth?",
                  "Show his coding profile stats",
                ].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[11px] bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/20 px-2.5 py-1 rounded-lg text-gray-400 transition-all"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. TECHNICAL INTERVIEW SIMULATOR */}
          {activeTab === "interview" && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col p-4"
            >
              {!interviewStarted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <Terminal className="h-12 w-12 text-cyan-400 mb-3 animate-pulse" />
                  <h3 className="text-lg font-bold text-white font-display">Technical Mock Interview Simulator</h3>
                  <p className="text-xs text-gray-400 max-w-md mt-1 mb-4">
                    Test yourself or observe the AI act as a Senior Technical Recruiter. The AI will ask Java core, Spring Boot architecture, OOP, JVM memory layout, and algorithms questions one by one and grade your answers!
                  </p>
                  <button
                    onClick={handleStartInterview}
                    className="flex items-center gap-2 bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Play className="h-4 w-4 fill-slate-950" />
                    Start Mock Interview
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* Interview Chat Panel */}
                  <div className="flex-1 overflow-y-auto max-h-[260px] space-y-4 mb-4 pr-1">
                    {interviewMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                            msg.role === "user"
                              ? "bg-cyan-500 text-slate-950 rounded-tr-none font-medium"
                              : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                          }`}
                        >
                          <div className="whitespace-pre-wrap select-text">
                            {msg.content.split("**").map((chunk, i) =>
                              i % 2 === 1 ? <strong key={i} className="font-bold text-white">{chunk}</strong> : chunk
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 text-gray-400 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 text-sm flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                          <span>Interview panel analyzing answer...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Reset Control */}
                  <div className="flex justify-between items-center gap-2 mb-2 px-1">
                    <span className="text-[11px] text-gray-400">Question cycle: {currentInterviewQuestion + 1}</span>
                    <button
                      onClick={handleStartInterview}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1.5"
                    >
                      <RefreshCw className="h-3 w-3" /> Reset Interview
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 3. RECRUITER CAREER COACH */}
          {activeTab === "coach" && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                {[
                  "Java Backend Engineer",
                  "AI Integration Engineer",
                  "Full Stack Developer",
                ].map((role, i) => (
                  <button
                    key={i}
                    onClick={() => handleRunCareerCoach(role)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      coachRole === role
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/5"
                        : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{role}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Assessment Panel */}
              <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-4 overflow-y-auto max-h-[220px]">
                {isLoading && coachResult === "" ? (
                  <div className="flex items-center justify-center h-full gap-2 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
                    <span className="text-sm">Mapping skills matrix...</span>
                  </div>
                ) : coachResult ? (
                  <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap select-text">
                    {coachResult.split("**").map((chunk, i) =>
                      i % 2 === 1 ? <strong key={i} className="font-bold text-white">{chunk}</strong> : chunk
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <UserCheck className="h-8 w-8 text-cyan-400/60 mb-2" />
                    <p className="text-xs text-gray-400">Select a career track above to execute a real-time competency alignment evaluation.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 4. ELITE CODE GENERATOR */}
          {activeTab === "codegen" && (
            <motion.div
              key="codegen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col p-4"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Java Double-Checked Locking Singleton",
                  "Binary Search in Java with JUnit",
                  "Solidity Secure NFT Mint Contract",
                  "Spring Boot REST Controller with JDBC",
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleRunCodegen(item)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      codegenQuery === item
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Code Sandbox Panel */}
              <div className="flex-1 bg-slate-950 border border-white/5 rounded-2xl p-4 overflow-y-auto max-h-[220px] font-mono text-xs text-cyan-300">
                {isLoading && codegenResult === "" ? (
                  <div className="flex items-center justify-center h-full gap-2 text-gray-400 font-sans">
                    <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
                    <span>Compiling code block templates...</span>
                  </div>
                ) : codegenResult ? (
                  <div className="whitespace-pre select-text">
                    {codegenResult}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 font-sans">
                    <Code className="h-8 w-8 text-cyan-400/60 mb-2" />
                    <p className="text-xs text-gray-400">Choose a code framework template above to trigger the AI code engine generator.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 5. ATS RESUME EVALUATOR */}
          {activeTab === "analyzer" && (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Text area paste */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] text-gray-400 font-medium">Paste Candidate Profile / Resume Text</label>
                    <button
                      onClick={handleSimulateResumeUpload}
                      className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Upload className="h-3 w-3" /> Load Sample Resume
                    </button>
                  </div>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste a CV, background bio, or Ponabinanth's resume to compare matching strength and check grammar structure..."
                    className="w-full h-[140px] bg-white/5 border border-white/5 hover:border-white/10 focus:border-cyan-500 rounded-xl p-3 text-xs text-gray-300 outline-none resize-none transition-all"
                  />
                  <button
                    onClick={handleAnalyzeResumeText}
                    disabled={!resumeText.trim()}
                    className="w-full mt-2 bg-cyan-500 text-slate-950 py-2 rounded-xl text-xs font-bold hover:bg-cyan-400 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-40"
                  >
                    Run AI ATS Match Review
                  </button>
                </div>

                {/* Score analysis panel */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 overflow-y-auto max-h-[220px]">
                  {isLoading && analyzerResult === null ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <RefreshCw className="h-6 w-6 animate-spin text-cyan-400 mb-2" />
                      <span className="text-xs">Parsing tags, scoring matches...</span>
                    </div>
                  ) : analyzerResult ? (
                    <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap select-text">
                      {analyzerResult.split("**").map((chunk: string, i: number) =>
                        i % 2 === 1 ? <strong key={i} className="font-bold text-white">{chunk}</strong> : chunk
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4">
                      <Award className="h-8 w-8 text-cyan-400/40 mb-1.5" />
                      <p className="text-[11px] max-w-xs">Match assessment is empty. Paste a resume or load a mock file and execute the check.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Control Console (Only for conversational and interview modes) */}
        {(activeTab === "chat" || (activeTab === "interview" && interviewStarted)) && (
          <div className="p-4 border-t border-white/5 bg-slate-950/80 flex gap-2 items-center">
            <button
              onClick={startVoiceDictation}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              title="Dictate message with Mic"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (activeTab === "chat") {
                    handleSendMessage();
                  } else {
                    handleSendInterviewAnswer();
                  }
                }
              }}
              placeholder={
                activeTab === "chat"
                  ? "Ask anything about Ponabinanth (e.g. 'tell me about his Java skills')..."
                  : "Type or say your interview response..."
              }
              className="flex-1 bg-white/5 border border-white/5 focus:border-cyan-500/50 hover:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-500"
            />
            <button
              onClick={() => {
                if (activeTab === "chat") {
                  handleSendMessage();
                } else {
                  handleSendInterviewAnswer();
                }
              }}
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all cursor-pointer"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
