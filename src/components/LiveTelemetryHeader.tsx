import { useState, useEffect } from "react";
import { Activity, Clock, Cpu, Radio, Terminal, FileText, Wifi, Zap } from "lucide-react";

interface LiveTelemetryHeaderProps {
  onOpenCli: () => void;
  onOpenResume: () => void;
}

export default function LiveTelemetryHeader({ onOpenCli, onOpenResume }: LiveTelemetryHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [utcTime, setUtcTime] = useState<string>("");
  const [pingMs, setPingMs] = useState<number>(14);
  const [status, setStatus] = useState<string>("OPERATIONAL");
  const [visitorCount, setVisitorCount] = useState<number>(4);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  const tickerMessages = [
    "🟢 System Status: OPERATIONAL - Backend microservices active on port 3000",
    "⚡ Live Telemetry: 100% Uptime | Real-time GitHub sync active",
    "💼 Open for Opportunities: Java Full Stack & AI Systems Engineering roles",
    "🤖 Gemini 3.5 AI Engine integrated: Ask Abinanth-AI in real-time",
    "🚀 Edge Neural Packet Classifier: SecureChain IoT network active"
  ];

  // Clock updating every 1s
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setUtcTime(now.toISOString().substring(11, 19) + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ping & Telemetry fetcher every 8 seconds
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (res.ok) {
          const data = await res.json();
          setPingMs(data.pingMs || Math.floor(Math.random() * 10) + 12);
          setStatus(data.status || "OPERATIONAL");
          setVisitorCount(data.activeVisitorsSimulated || 4);
        }
      } catch (err) {
        // Fallback
        setPingMs(Math.floor(Math.random() * 8) + 14);
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 8000);
    return () => clearInterval(interval);
  }, []);

  // Ticker rotation every 5s
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerMessages.length);
    }, 5000);
    return () => clearInterval(tickerTimer);
  }, [tickerMessages.length]);

  return (
    <div className="w-full bg-slate-950/90 border-b border-cyan-500/20 backdrop-blur-md py-1.5 px-4 font-mono text-[11px] text-gray-300 relative z-40 select-none shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        
        {/* Left: Ticker & Live Node Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE SYSTEM</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 truncate">
            <Radio className="h-3 w-3 text-cyan-400 shrink-0 animate-pulse" />
            <span className="truncate text-cyan-300 font-medium">
              {tickerMessages[tickerIndex]}
            </span>
          </div>
        </div>

        {/* Right: Metrics & Interactive Action Triggers */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* Real-time Clock */}
          <div className="hidden md:flex items-center gap-1 text-gray-400">
            <Clock className="h-3 w-3 text-cyan-400" />
            <span className="text-white font-semibold">{currentTime}</span>
            <span className="text-[9px] text-gray-500">({utcTime})</span>
          </div>

          {/* Real-time Latency */}
          <div className="flex items-center gap-1 text-gray-400" title="Live API latency">
            <Wifi className="h-3 w-3 text-emerald-400" />
            <span className="text-emerald-400 font-bold">{pingMs}ms</span>
          </div>

          {/* Interactive Triggers */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <button
              onClick={onOpenCli}
              className="flex items-center gap-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px] font-bold transition-all hover:scale-105 cursor-pointer"
              title="Launch Real-Time Developer CLI Terminal (Ctrl + K)"
            >
              <Terminal className="h-3 w-3" />
              <span>CLI [Ctrl+K]</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold transition-all hover:scale-105 cursor-pointer"
              title="View Resume / CV Modal"
            >
              <FileText className="h-3 w-3 text-purple-400" />
              <span>CV Preview</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
