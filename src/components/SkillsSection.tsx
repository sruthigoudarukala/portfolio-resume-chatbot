import { Terminal, Library, Cloud, Wrench } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData.ts';

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Terminal className="h-5 w-5 text-amber-400" />;
      case 'Libraries':
        return <Library className="h-5 w-5 text-amber-400" />;
      case 'Deployment':
        return <Cloud className="h-5 w-5 text-amber-400" />;
      case 'Tools':
        return <Wrench className="h-5 w-5 text-amber-400" />;
      default:
        return <Terminal className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Technical Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Core technical toolset across programming, scientific computing, machine learning modeling, and web application deployment.
          </p>
        </div>

        {/* Grouped Skills Cards (No percentages, no bars) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-slate-800/90 bg-[#0c121e]/80 p-6 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {group.category}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {group.items.length} {group.items.length === 1 ? 'skill' : 'technologies'}
                    </p>
                  </div>
                </div>

                {group.description && (
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2 mb-4">
                    {group.description}
                  </p>
                )}
              </div>

              {/* Items List (Unboxed metadata with separators per design rules) */}
              <div className="pt-4 border-t border-slate-800/70">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-200">
                  {group.items.map((skill, idx) => (
                    <span key={skill} className="flex items-center">
                      <span className="font-medium text-amber-300/90 font-mono text-xs sm:text-sm">
                        {skill}
                      </span>
                      {idx < group.items.length - 1 && (
                        <span className="text-slate-600 ml-2 select-none" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
