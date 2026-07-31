import { portfolioData } from "../data.js";
import { motion } from "motion/react";
import {
  Mail, Phone, MapPin, Linkedin, Github, Send,
  Globe, Compass, Grid, Calendar, Briefcase, FileText
} from "lucide-react";

export default function ContactSection() {
  const quickActions = [
    {
      title: "Book a Meeting",
      icon: <Calendar className="w-6 h-6 text-amber-400" />,
      desc: "Schedule a quick chat",
      link: "#", // Add calendly link if available
      color: "hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
    },
    {
      title: "Schedule Interview",
      icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
      desc: "For recruiters & HR",
      link: `mailto:${portfolioData.email}?subject=Interview Invitation`,
      color: "hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]"
    },
    {
      title: "Email Me",
      icon: <Mail className="w-6 h-6 text-cyan-400" />,
      desc: portfolioData.email,
      link: `mailto:${portfolioData.email}`,
      color: "hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="w-6 h-6 text-blue-400" />,
      desc: "Professional network",
      link: "https://www.linkedin.com/in/ponabinanths/",
      color: "hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]"
    },
    {
      title: "GitHub",
      icon: <Github className="w-6 h-6 text-secondary" />,
      desc: "View my repositories",
      link: "https://github.com/Ponabinanth",
      color: "hover:border-gray-400/50 hover:shadow-[0_0_15px_rgba(156,163,175,0.3)]"
    },
    {
      title: "Download Resume",
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      desc: "Get my latest CV",
      link: "/resume.pdf", // Should trigger resume download/modal ideally
      color: "hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]"
    }
  ];

  return (
    <section id="contact" className="py-20 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Send className="h-3.5 w-3.5" />
            DIRECT CONTACT STREAM ⚡
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-primary text-gradient">Let's Connect 🤝</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-secondary text-xs mt-4 uppercase tracking-widest">Available for new opportunities & collaborations 🚀</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Contact Methods & Styled Compass Map Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-primary flex items-center gap-2">
                📍 Location & Direct Contact
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="glass-panel glass-card-hover p-4 rounded-2xl flex gap-3.5 items-center group"
                >
                  <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:scale-110 transition-all group-hover:bg-cyan-500 group-hover:text-slate-900">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider">Email</span>
                    <span className="text-xs font-semibold text-primary break-all">{portfolioData.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.phone}`}
                  className="glass-panel glass-card-hover p-4 rounded-2xl flex gap-3.5 items-center group"
                >
                  <div className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl group-hover:scale-110 transition-all group-hover:bg-cyan-500 group-hover:text-slate-900">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-secondary font-mono uppercase tracking-wider">Call</span>
                    <span className="text-xs font-semibold text-primary">{portfolioData.phone}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Styled Compass Interactive Coordinate-Map card */}
            <div className="glass-panel p-5 rounded-3xl border border-white/5 relative overflow-hidden h-[240px] flex flex-col justify-between bg-slate-950/80 glass-card-hover">
              <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
              
              <div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <span className="h-4.5 w-4.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping absolute" />
                <MapPin className="h-6 w-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] relative animate-float" />
                <span className="bg-slate-950/90 backdrop-blur-md text-[9px] font-mono text-cyan-400 px-3 py-1 rounded-md border border-cyan-500/50 font-semibold mt-2 shadow-[0_0_10px_rgba(0,240,255,0.2)] whitespace-nowrap">
                  Tiruppur / Coimbatore, TN, India 🇮🇳
                </span>
              </div>

              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <h4 className="text-xs font-bold font-display text-primary tracking-wide uppercase flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} /> Location Telemetry
                  </h4>
                  <p className="text-[10px] text-secondary font-mono mt-1">LAT: 11.0168&deg; N | LON: 76.9558&deg; E</p>
                </div>
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                  <Grid className="h-4 w-4 text-secondary" />
                </div>
              </div>

              <div className="z-10 relative flex justify-between items-center text-[10px] font-mono text-secondary border-t border-white/10 pt-3">
                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-cyan-400" /> South-Asia Tech Node</span>
                <span className="text-cyan-400/80 font-bold">Open to Remote & On-site 🌍</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Action Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <h3 className="text-xl font-bold font-display text-primary mb-6 flex items-center gap-2">
              ⚡ Quick Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <motion.a
                  key={idx}
                  href={action.link}
                  target={action.title === "LinkedIn" || action.title === "GitHub" ? "_blank" : "_self"}
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-panel p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300 group cursor-pointer border border-white/10 ${action.color}`}
                >
                  <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary group-hover:text-primary mb-1">{action.title}</h4>
                    <p className="text-xs text-secondary line-clamp-1">{action.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
