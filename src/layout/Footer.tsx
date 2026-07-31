import { portfolioData } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-primary)] py-12 text-center text-sm text-[var(--text-secondary)] mt-32 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© 2026 Ponabinanth S. Built with React, Spring Boot & Gemini 3.5 API.</p>
        <div className="flex gap-6">
          <a href="https://github.com/Ponabinanth" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/ponabinanths/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
          <a href={`mailto:${portfolioData.email}`} className="hover:text-[var(--text-primary)] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
