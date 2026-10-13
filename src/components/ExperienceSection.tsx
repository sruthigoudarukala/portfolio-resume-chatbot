import { Building2, Calendar, MapPin, CheckCircle, GraduationCap } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData.ts';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Career Journey
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Experience & Professional Training
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Current intensive data science specialization coupled with 18 months of academic engineering instruction.
          </p>
        </div>

        {/* Timeline List */}
        <div className="mt-12 space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-slate-800">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 sm:pl-11">
              
              {/* Timeline Marker Dot */}
              <div 
                className={`absolute left-1.5 sm:left-2.5 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 ${
                  idx === 0 
                    ? 'border-amber-400 bg-amber-500 shadow-md shadow-amber-500/30' 
                    : 'border-slate-700 bg-slate-900'
                }`}
              />

              {/* Timeline Card */}
              <div className="rounded-2xl border border-slate-800/90 bg-[#0c121e]/80 p-6 sm:p-7 hover:border-slate-700 transition-colors">
                
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/70 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {exp.organization}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                    <span aria-hidden="true" className="text-slate-700">|</span>
                    <span className="text-amber-400/90">{exp.type}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Activities & Scope
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
