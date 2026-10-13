import { GraduationCap, Award, Calendar, Landmark } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';

export default function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#090D14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Academic Background
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Education
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Postgraduate and undergraduate engineering degrees from Sree Dattha Institute of Engineering & Science (JNTUH affiliated).
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0c121e]/80 p-6 sm:p-7 hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Top Badge & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-base font-bold text-white">
                        {edu.degree} in {edu.specialization}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{edu.year}</span>
                  </div>
                </div>

                {/* Institution & Affiliation */}
                <div className="space-y-1 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Landmark className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    <span className="font-medium text-slate-200">{edu.institution}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-5">
                    Affiliated to {edu.affiliation}
                  </p>
                </div>
              </div>

              {/* Score / Grade */}
              <div className="mt-5 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                <span className="text-xs text-slate-500">Academic Standing</span>
                <div className="flex items-center gap-1.5 text-sm font-bold font-mono text-amber-400">
                  <Award className="h-4 w-4" />
                  <span>{edu.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
