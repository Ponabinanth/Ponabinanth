import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData, Project } from "../data.js";
import {
  Github, ExternalLink, Cpu, Layers, ShieldAlert, Sparkles, Code2,
  CheckCircle2, ArrowRight, Play, Terminal, HelpCircle, Plus, Minus,
  RefreshCw, Volume2, ShieldCheck, Zap, Server, Database, Activity
} from "lucide-react";

interface ProjectsSectionProps {
  onScrollToSection: (id: string) => void;
}

export default function ProjectsSection({ onScrollToSection }: ProjectsSectionProps) {
  const [expandedArchitecture, setExpandedArchitecture] = useState<string | null>(null);
  const [runningDemo, setRunningDemo] = useState<string | null>("inventory");

  // 1. INVENTORY SYSTEM DEMO STATE
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Enterprise Server Blades", stock: 12, threshold: 5, status: "OK" },
    { id: 2, name: "DDR5 ECC RAM Modules", stock: 4, threshold: 5, status: "LOW_STOCK" },
    { id: 3, name: "NVMe SSD Array (2TB)", stock: 18, threshold: 5, status: "OK" }
  ]);
  const [inventoryLogs, setInventoryLogs] = useState<string[]>([
    "[SPRING_BOOT] Transactional Manager initialized.",
    "[MYSQL] AWS RDS Pool Connected: 20 active connections.",
    "[ALERT] Item #2 DDR5 ECC RAM Modules fell below threshold (4 < 5)."
  ]);

  // 2. EDUREACH AI DEMO STATE
  const [selectedTopic, setSelectedTopic] = useState("Spring Boot Microservices");
  const [generatedRoadmap, setGeneratedRoadmap] = useState<string[]>([
    "1. Dependency Injection & Inversion of Control (IoC)",
    "2. RESTful Controller Annotations & DTO Mappings",
    "3. Spring Data JPA & Database Connection Pooling",
    "4. Spring Security JWT Authorization Filters",
    "5. Dockerization & AWS ECS Cloud Deployment"
  ]);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  // 3. SECURECHAIN DEMO STATE
  const [blocks, setBlocks] = useState([
    { blockNo: 29401, hash: "0x8f19...c3a1", txCount: 14, tfAnomalyScore: 0.02, status: "SECURE" },
    { blockNo: 29402, hash: "0x3a4b...e90f", txCount: 22, tfAnomalyScore: 0.04, status: "SECURE" },
    { blockNo: 29403, hash: "0xd901...88ab", txCount: 18, tfAnomalyScore: 0.01, status: "SECURE" }
  ]);
  const [isSimulatingThreat, setIsSimulatingThreat] = useState(false);

  // Inventory Stock Adjustment Handler
  const handleAdjustStock = (id: number, delta: number) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + delta);
        const status = newStock <= item.threshold ? "LOW_STOCK" : "OK";
        
        const timestamp = new Date().toLocaleTimeString();
        setInventoryLogs(logs => [
          `[${timestamp}] [STOCK_UPDATE] ${item.name} quantity modified: ${item.stock} -> ${newStock}.`,
          ...(newStock <= item.threshold ? [`[${timestamp}] ⚠️ [ALERT] ${item.name} fell below threshold (${newStock} <= ${item.threshold})! Triggering reorder mailer.`] : []),
          ...logs.slice(0, 4)
        ]);
        
        return { ...item, stock: newStock, status };
      }
      return item;
    }));
  };

  // Reorder Stock Trigger
  const handleReorderStock = (id: number) => {
    handleAdjustStock(id, 15);
    const timestamp = new Date().toLocaleTimeString();
    setInventoryLogs(logs => [
      `[${timestamp}] ⚡ [SPRING_TX] Transactional reorder executed (+15 units). Stock replenished.`,
      ...logs.slice(0, 4)
    ]);
  };

  // EduReach AI Roadmap Generator Handler
  const handleGenerateRoadmap = (topic: string) => {
    setSelectedTopic(topic);
    setIsGeneratingRoadmap(true);
    setTimeout(() => {
      if (topic.includes("RAG")) {
        setGeneratedRoadmap([
          "1. Document Chunking & Text Embedding Vectorization",
          "2. Vector Database Indexing (Pinecone / FAISS / Chroma)",
          "3. Similarity Search & Context Retrieval",
          "4. Gemini API Context Injection & Prompt Construction",
          "5. Streaming UI Feedback & Grounded Verification"
        ]);
      } else if (topic.includes("Java")) {
        setGeneratedRoadmap([
          "1. JVM Memory Layout: Heap vs Stack vs Metaspace",
          "2. Garbage Collection & Generational GC Algorithms",
          "3. Multithreading & Java Concurrency Executors",
          "4. Collections Framework Internal Hash Maps",
          "5. Design Patterns: Singleton, Factory, Builder, Strategy"
        ]);
      } else {
        setGeneratedRoadmap([
          "1. Dependency Injection & Inversion of Control (IoC)",
          "2. RESTful Controller Annotations & DTO Mappings",
          "3. Spring Data JPA & Database Connection Pooling",
          "4. Spring Security JWT Authorization Filters",
          "5. Dockerization & AWS ECS Cloud Deployment"
        ]);
      }
      setIsGeneratingRoadmap(false);
    }, 600);
  };

  // SecureChain Threat Packet Simulator
  const handleSimulateThreat = () => {
    setIsSimulatingThreat(true);
    setTimeout(() => {
      const nextBlockNo = blocks[blocks.length - 1].blockNo + 1;
      const newBlock = {
        blockNo: nextBlockNo,
        hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        txCount: Math.floor(Math.random() * 50) + 10,
        tfAnomalyScore: 0.94,
        status: "THREAT_BLOCKED"
      };
      setBlocks(prev => [...prev.slice(1), newBlock]);
      setIsSimulatingThreat(false);
    }, 800);
  };

  return (
    <section id="projects" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            LIVE INTERACTIVE CASE STUDIES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Full Stack & AI Projects</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Test live interactive sandboxes directly in the portfolio</p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {portfolioData.projects.map((proj, idx) => {
            const isArchitectureExpanded = expandedArchitecture === proj.id;
            const isSelectedDemo = runningDemo === proj.id;

            return (
              <div
                key={proj.id}
                className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 hover:border-cyan-500/20 transition-all duration-300"
              >
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-3xl -z-10" />

                {/* Left Column: Project Overview */}
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-wider font-bold bg-cyan-500/10 px-2.5 py-1 rounded-md">
                      FEATURED CASE #{idx + 1}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-3 flex items-center gap-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium font-sans mt-1">{proj.description}</p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono bg-white/5 text-cyan-300 px-2 py-0.5 rounded-md border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Implementation Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-display text-white uppercase tracking-wider">Key Implementations</h4>
                    <ul className="space-y-1.5">
                      {proj.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2 text-xs text-gray-400">
                          <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={() => setRunningDemo(proj.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelectedDemo
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                          : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5"
                      }`}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      {isSelectedDemo ? "Active Interactive Sandbox" : "Launch Sandbox"}
                    </button>

                    <button
                      onClick={() => setExpandedArchitecture(isArchitectureExpanded ? null : proj.id)}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-xs font-semibold border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                      {isArchitectureExpanded ? "Hide Architecture" : "View Tech Architecture"}
                    </button>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold border border-white/5 hover:border-white/10 transition-all"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub Repo
                    </a>
                  </div>

                  {/* Architecture Accordion */}
                  <AnimatePresence>
                    {isArchitectureExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 overflow-hidden mt-4"
                      >
                        <h4 className="text-xs font-bold font-display text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Cpu className="h-4 w-4 text-cyan-400" /> Layered System Architecture
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans mb-3">
                          {proj.architecture}
                        </p>
                        <button
                          onClick={() => onScrollToSection("ai-recruiter-mode")}
                          className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Ask AI Assistant about this architecture &gt;&gt;
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Column: Dynamic Real-Time Sandbox Screen */}
                <div className="w-full lg:w-[420px] flex flex-col">
                  
                  {/* SANDBOX 1: INVENTORY MANAGEMENT SYSTEM */}
                  {proj.id === "inventory" && (
                    <div className="bg-[#080d19] border border-cyan-500/30 rounded-2xl p-4 space-y-4 shadow-xl flex-1 flex flex-col justify-between select-none">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-bold font-mono text-white">SPRING BOOT CONSOLE</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          🟢 DB ACTIVE
                        </span>
                      </div>

                      {/* Stock Items Counter Controls */}
                      <div className="space-y-2">
                        <p className="text-[11px] text-gray-400 font-mono">Stock Depletion Control Simulator:</p>
                        {inventoryItems.map((item) => (
                          <div key={item.id} className="bg-slate-900 border border-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
                            <div className="min-w-0 flex-1 mr-2">
                              <span className="text-white font-semibold block truncate">{item.name}</span>
                              <span className="text-[10px] text-gray-400">Qty: <strong className={item.stock <= item.threshold ? "text-red-400" : "text-cyan-400"}>{item.stock}</strong> (Min: {item.threshold})</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleAdjustStock(item.id, -1)}
                                className="p-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded hover:text-white cursor-pointer"
                                title="Deplete stock by 1"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleAdjustStock(item.id, 1)}
                                className="p-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded hover:text-white cursor-pointer"
                                title="Add stock by 1"
                              >
                                <Plus className="h-3 w-3" />
                              </button>

                              {item.stock <= item.threshold && (
                                <button
                                  onClick={() => handleReorderStock(item.id)}
                                  className="ml-1 bg-red-500 text-white text-[9px] px-2 py-1 rounded font-bold hover:bg-red-400 animate-pulse cursor-pointer"
                                >
                                  Reorder
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Logs View */}
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5 font-mono text-[10px] text-cyan-300 max-h-[90px] overflow-y-auto space-y-1">
                        {inventoryLogs.map((log, lidx) => (
                          <div key={lidx} className="leading-tight">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SANDBOX 2: EDUREACH AI TUTOR */}
                  {proj.id === "edureach" && (
                    <div className="bg-[#080d19] border border-cyan-500/30 rounded-2xl p-4 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-bold font-mono text-white">AI ROADMAP & VOICE TUTOR</span>
                        </div>
                        <span className="text-[9px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          GEMINI 3.5 API
                        </span>
                      </div>

                      {/* Topic Selection Buttons */}
                      <div className="space-y-1.5">
                        <p className="text-[11px] text-gray-400 font-mono">Select Academic Topic to Synthesize:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Spring Boot Microservices",
                            "RAG Vector Search",
                            "Java Core & JVM"
                          ].map((topic) => (
                            <button
                              key={topic}
                              onClick={() => handleGenerateRoadmap(topic)}
                              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                selectedTopic === topic
                                  ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Synthesized Output */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-white/5 font-mono text-xs text-cyan-300 max-h-[140px] overflow-y-auto space-y-1.5">
                        {isGeneratingRoadmap ? (
                          <div className="flex items-center gap-2 text-gray-400 py-4 justify-center">
                            <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                            <span>Synthesizing learning nodes...</span>
                          </div>
                        ) : (
                          generatedRoadmap.map((step, sidx) => (
                            <div key={sidx} className="text-gray-200 leading-snug">
                              {step}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* SANDBOX 3: SECURECHAIN BLOCKCHAIN & TF.JS */}
                  {proj.id === "securechain" && (
                    <div className="bg-[#080d19] border border-cyan-500/30 rounded-2xl p-4 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-bold font-mono text-white">WEB3 & TENSORFLOW.JS EDGE</span>
                        </div>
                        <button
                          onClick={handleSimulateThreat}
                          disabled={isSimulatingThreat}
                          className="text-[9px] font-mono bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-0.5 rounded border border-red-500/30 font-bold transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSimulatingThreat ? "Mining..." : "Simulate Threat Burst"}
                        </button>
                      </div>

                      {/* Live Block Cards */}
                      <div className="space-y-2">
                        <p className="text-[11px] text-gray-400 font-mono">Live Cryptographic Block Ledger Stream:</p>
                        {blocks.map((blk) => (
                          <div key={blk.blockNo} className="bg-slate-900 border border-white/5 p-2.5 rounded-xl flex items-center justify-between font-mono text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold">Block #{blk.blockNo}</span>
                                <span className="text-[10px] text-gray-500">{blk.hash}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 block mt-0.5">
                                Txns: {blk.txCount} | TF Anomaly: <strong className={blk.tfAnomalyScore > 0.5 ? "text-red-400" : "text-emerald-400"}>{blk.tfAnomalyScore}</strong>
                              </span>
                            </div>

                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                              blk.status === "SECURE"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse"
                            }`}>
                              {blk.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
