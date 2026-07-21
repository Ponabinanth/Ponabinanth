import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, FileText, Briefcase, Calendar, Github, ChevronRight } from "lucide-react";

interface FloatingAssistantProps {
  onNavigateSection: (id: string) => void;
  onOpenResume: () => void;
}

export default function FloatingAssistant({ onNavigateSection, onOpenResume }: FloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-72 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30"
          >
            <div className="bg-slate-900/80 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-bold text-primary font-display">Recruiter Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-3 bg-slate-950/60">
              <p className="text-xs text-secondary font-medium mb-2">How can I help you today?</p>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5 text-sm text-secondary group-hover:text-cyan-400">
                  <FileText className="w-4 h-4 text-purple-400" /> Need my Resume?
                </div>
                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateSection("projects");
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5 text-sm text-secondary group-hover:text-cyan-400">
                  <Briefcase className="w-4 h-4 text-emerald-400" /> View Projects
                </div>
                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateSection("contact");
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5 text-sm text-secondary group-hover:text-cyan-400">
                  <Calendar className="w-4 h-4 text-amber-400" /> Book Interview
                </div>
                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://github.com/Ponabinanth"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5 text-sm text-secondary group-hover:text-cyan-400">
                  <Github className="w-4 h-4 text-secondary group-hover:text-white" /> View GitHub
                </div>
                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-colors z-50 ${
          isOpen ? "bg-slate-800 text-white border border-white/10" : "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
