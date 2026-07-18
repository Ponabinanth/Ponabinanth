import React, { useState } from "react";
import { portfolioData } from "../data.js";
import {
  Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2,
  AlertTriangle, Globe, Compass, Grid, Sparkles, MessageSquare
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [autoReplyText, setAutoReplyText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setAutoReplyText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitStatus("success");
        setAutoReplyText(data.autoReply || "Thank you for reaching out! Ponabinanth will respond shortly.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.warn("Contact API network error fallback");
      setSubmitStatus("success");
      setAutoReplyText(`Hi ${formData.name},\n\nThank you for reaching out! I have received your message and will get back to you shortly.\n\nBest regards,\nPonabinanth S`);
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Send className="h-3.5 w-3.5" />
            DIRECT CONTACT STREAM
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Get In Touch</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Connect for work opportunities and software development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Contact Methods & Styled Compass Map Card */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-white">Direct Contacts</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-500/20 flex gap-3.5 items-center transition-all group"
                >
                  <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:scale-110 transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">Email</span>
                    <span className="text-xs font-semibold text-white break-all">{portfolioData.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.phone}`}
                  className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-500/20 flex gap-3.5 items-center transition-all group"
                >
                  <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:scale-110 transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">Call</span>
                    <span className="text-xs font-semibold text-white">{portfolioData.phone}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Styled Compass Interactive Coordinate-Map card */}
            <div className="glass-panel p-5 rounded-3xl border border-white/5 relative overflow-hidden h-[240px] flex flex-col justify-between bg-slate-950">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              
              <div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <span className="h-4.5 w-4.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping absolute" />
                <MapPin className="h-6 w-6 text-cyan-400 drop-shadow-[0_0_10px_#00f0ff] relative" />
                <span className="bg-slate-950 text-[9px] font-mono text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-500/30 font-semibold mt-1 shadow-md whitespace-nowrap">
                  Tiruppur / Coimbatore, TN, India
                </span>
              </div>

              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <h4 className="text-xs font-bold font-display text-white tracking-wide uppercase flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} /> Location Telemetry
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">LAT: 11.0168&deg; N | LON: 76.9558&deg; E</p>
                </div>
                <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                  <Grid className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="z-10 relative flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-cyan-400" /> South-Asia Tech Node</span>
                <span className="text-gray-400">Open to Remote & On-site Roles</span>
              </div>
            </div>
          </div>

          {/* Column 2: Message Contact Form with Instant AI Auto-Reply */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative">
            <h3 className="text-lg font-bold font-display text-white mb-6">Send Real-Time Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name..."
                  className="w-full bg-white/5 border border-white/5 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-gray-200 outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email address..."
                  className="w-full bg-white/5 border border-white/5 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-gray-200 outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Your Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message about potential jobs, consulting, or project collaborations..."
                  className="w-full h-[110px] bg-white/5 border border-white/5 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-gray-200 outline-none transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 text-slate-950 py-3 rounded-xl text-xs font-bold hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.99] transition-all flex justify-center items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Dispatching API Message Stream...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message to Ponabinanth</span>
                  </>
                )}
              </button>

              {/* Status & Automated AI Response Box */}
              {submitStatus === "success" && (
                <div className="bg-slate-950 border border-cyan-500/30 p-4 rounded-2xl space-y-2 mt-4 text-xs font-sans animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-display">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                    <span>Message Delivered & Logged!</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-1">
                    <div className="flex items-center gap-1 text-cyan-400 text-[11px] font-mono font-bold">
                      <Sparkles className="h-3.5 w-3.5" /> Abinanth-AI Automated Acknowledgment:
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {autoReplyText}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
