import React, { useState } from "react";
import { portfolioData } from "../data.js";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-2">
            <Send className="h-3.5 w-3.5" />
            Direct Communication Stream
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-primary">
            Let's Build Something Meaningful.
          </h2>

          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />

          <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            I'm open to software engineering opportunities, internships, collaborations, hackathons, and innovative technology projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-[var(--glass-border)] shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-display text-primary">Direct Contact Details</h3>

              <div className="space-y-4 text-sm font-sans">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--accent-glow)] border border-[var(--glass-border)] hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary block">Email</span>
                    <span className="text-sm font-semibold text-primary">{portfolioData.email}</span>
                  </div>
                </a>

                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--accent-glow)] border border-[var(--glass-border)] hover:border-blue-500/40 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary block">LinkedIn</span>
                    <span className="text-sm font-semibold text-primary">linkedin.com/in/ponabinanths</span>
                  </div>
                </a>

                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--accent-glow)] border border-[var(--glass-border)] hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary block">GitHub</span>
                    <span className="text-sm font-semibold text-primary">github.com/Ponabinanth</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--accent-glow)] border border-[var(--glass-border)]">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-secondary block">Location</span>
                    <span className="text-sm font-semibold text-primary">{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--glass-border)] shadow-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-bold font-display text-primary">Send a Message</h3>
              </div>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl px-4 py-3.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl px-4 py-3.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Software Opportunity / Hackathon Collaboration"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl px-4 py-3.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Ponabinanth, I would love to discuss a project..."
                  className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl px-4 py-3.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold font-display text-sm tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
