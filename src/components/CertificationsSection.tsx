import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData.ts';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#0c121e]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Professional Development
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Certifications
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Ongoing and completed technical training programs and industry certifications.
          </p>
        </div>

        {/* Small Card Display */}
        <div className="mt-10 max-w-md">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-slate-800/90 bg-[#0c121e] p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{cert.period}</span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white leading-snug">
                {cert.name}
              </h3>

              <div className="mt-4 pt-3 border-t border-slate-800/70 text-xs">
                <span className="text-slate-500 block text-[11px] mb-0.5">Issuer</span>
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{cert.issuer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
