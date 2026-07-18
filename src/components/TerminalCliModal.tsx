import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Terminal, CornerDownLeft, Sparkles, Trash2, Cpu } from "lucide-react";
import { portfolioData } from "../data.js";

interface TerminalCliModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (id: string) => void;
}

interface CommandHistoryItem {
  cmd: string;
  output: React.ReactNode;
  time: string;
}

export default function TerminalCliModal({ isOpen, onClose, onNavigateSection }: TerminalCliModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      cmd: "welcome",
      output: (
        <div className="space-y-1 text-cyan-300">
          <p className="font-bold text-white">⚡ WELCOME TO ABI-CLI (v1.0.4) - RECRUITER & DEVELOPER SHELL</p>
          <p className="text-gray-400 text-xs">Type <span className="text-cyan-400 font-bold">help</span> to view available interactive terminal commands.</p>
        </div>
      ),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    const parts = rawCmd.toLowerCase().split(" ");
    const command = parts[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let outputNode: React.ReactNode = null;

    switch (command) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
              <div><span className="text-emerald-400 font-bold">bio / about</span> : Developer summary & background</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Technical stack & proficiency metrics</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : Case study architectures & links</div>
              <div><span className="text-emerald-400 font-bold">github</span> : Fetch live GitHub statistics</div>
              <div><span className="text-emerald-400 font-bold">interview</span> : Launch AI Technical Interview</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Email, Phone, Location & Socials</div>
              <div><span className="text-emerald-400 font-bold">hire</span> : Direct recruiter recruitment trigger</div>
              <div><span className="text-emerald-400 font-bold">ping</span> : Check system latency to server</div>
              <div><span className="text-emerald-400 font-bold">time</span> : Display real-time local & UTC clock</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Clear terminal screen output</div>
            </div>
          </div>
        );
        break;

      case "bio":
      case "about":
        outputNode = (
          <div className="space-y-1.5 text-xs text-gray-300">
            <p className="text-white font-bold text-sm">{portfolioData.name}</p>
            <p className="text-cyan-400">{portfolioData.title}</p>
            <p className="text-gray-400 leading-relaxed">{portfolioData.about}</p>
            <p className="text-[11px] text-gray-500">📍 Location: {portfolioData.location}</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Core Skillsets:</p>
            <div className="grid grid-cols-2 gap-2">
              {portfolioData.skillProgress.map((sk, idx) => (
                <div key={idx} className="bg-white/5 p-2 rounded border border-white/5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white font-semibold">{sk.name}</span>
                    <span className="text-cyan-400">{sk.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${sk.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Featured Engineering Case Studies:</p>
            {portfolioData.projects.map((p, idx) => (
              <div key={idx} className="border-b border-white/5 pb-2">
                <p className="text-white font-bold">{idx + 1}. {p.title}</p>
                <p className="text-gray-400 text-[11px]">{p.description}</p>
                <p className="text-cyan-300 text-[10px] font-mono mt-0.5">Stack: {p.techStack.join(", ")}</p>
              </div>
            ))}
            <button
              onClick={() => {
                onClose();
                onNavigateSection("projects");
              }}
              className="text-cyan-400 underline text-[11px] hover:text-cyan-300 mt-1 cursor-pointer"
            >
              &gt;&gt; Jump to Interactive Projects Section
            </button>
          </div>
        );
        break;

      case "github":
        outputNode = (
          <div className="space-y-1.5 text-xs text-gray-300">
            <p className="text-white font-bold">GitHub Analytics (Ponabinanth):</p>
            <p>• Repositories: <span className="text-cyan-400 font-bold">{portfolioData.githubStats.repos}</span></p>
            <p>• Total Stars: <span className="text-cyan-400 font-bold">{portfolioData.githubStats.stars}</span></p>
            <p>• Contributions: <span className="text-cyan-400 font-bold">{portfolioData.githubStats.contributions}</span></p>
            <p>• Followers: <span className="text-cyan-400 font-bold">{portfolioData.githubStats.followers}</span></p>
            <a href="https://github.com/Ponabinanth" target="_blank" rel="noreferrer" className="text-cyan-400 underline text-[11px]">
              https://github.com/Ponabinanth
            </a>
          </div>
        );
        break;

      case "interview":
        outputNode = (
          <div className="space-y-1 text-xs text-cyan-300">
            <p className="text-emerald-400 font-bold">Launching AI Technical Interview Engine...</p>
            <p>Navigating you to the Abinanth-AI Interview Module!</p>
          </div>
        );
        setTimeout(() => {
          onClose();
          onNavigateSection("ai-recruiter-mode");
        }, 800);
        break;

      case "contact":
      case "hire":
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Recruitment & Contact Details:</p>
            <p>📧 Email: <a href={`mailto:${portfolioData.email}`} className="text-white hover:underline">{portfolioData.email}</a></p>
            <p>📞 Phone: <span className="text-white">{portfolioData.phone}</span></p>
            <p>🔗 LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{portfolioData.linkedin}</a></p>
            <p>📍 Location: {portfolioData.location}</p>
          </div>
        );
        break;

      case "ping":
        outputNode = (
          <div className="text-xs text-emerald-400 font-mono">
            PONG! Reply from server: <span className="font-bold">14ms</span> (TLS v1.3 / HTTP 2.0)
          </div>
        );
        break;

      case "time":
        outputNode = (
          <div className="text-xs font-mono text-cyan-300">
            Local IST: {new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })} | UTC: {new Date().toUTCString()}
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        outputNode = (
          <div className="text-xs text-red-400">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-white font-bold">help</span> for command list.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output: outputNode, time: timeStr }]);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-3xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
        >
          {/* Terminal Titlebar */}
          <div className="bg-[#0f172a] px-4 py-3 border-b border-white/10 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold ml-2 flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-cyan-400" /> ABI-CLI Shell (ponabinanth@portfolio)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHistory([])}
                className="text-gray-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                title="Clear screen"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Terminal Screen Console */}
          <div className="flex-1 p-4 font-mono overflow-y-auto space-y-4 text-xs select-text bg-[#030712]">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">abi-cli:~ ponabinanth$</span>
                  <span className="text-white font-semibold">{item.cmd}</span>
                  <span className="text-[10px] text-gray-600 ml-auto">{item.time}</span>
                </div>
                <div className="pl-4 border-l border-cyan-500/20">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Command Input Form */}
          <form onSubmit={handleCommand} className="bg-[#0f172a] p-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-xs font-bold pl-2">abi-cli:~ ponabinanth$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'bio', 'skills', 'projects', 'interview', 'clear')..."
              className="flex-1 bg-transparent text-xs font-mono text-white outline-none placeholder:text-gray-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
