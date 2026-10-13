import { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#090D14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element brand wordmark */}
        <a 
          href="#overview" 
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0c121e] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors w-full"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email Sruthi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
