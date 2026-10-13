import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#090D14] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-base font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Data Science Learner | M.Tech Structural Engineering · Hyderabad, Telangana
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Scroll to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center sm:text-left text-[11px] text-slate-600">
          © {new Date().getFullYear()} Sruthi Arukala. All rights reserved. Designed with precision.
        </div>
      </div>
    </footer>
  );
}
