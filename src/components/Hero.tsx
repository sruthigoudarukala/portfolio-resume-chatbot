import { ArrowUpRight, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function Hero() {
  return (
    <section id="overview" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <MapPin className="h-3.5 w-3.5" />
                {PERSONAL_INFO.location}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Innomatics Research Labs (Trainee)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>M.Tech Structural Engineering</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-amber-400 tracking-tight">
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Real Summary */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-pretty">
              {PERSONAL_INFO.summary}
            </p>

            {/* Quick Profile Links (LinkedIn, GitHub, Email) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 pt-1">
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <span>{PERSONAL_INFO.linkedInHandle}</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.gitHub}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <span>{PERSONAL_INFO.gitHubHandle}</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
              >
                <span>Explore ML Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                <span>Contact via Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0E1420] p-2 shadow-2xl">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover rounded-xl"
                  loading="eager"
                />

                <div className="mt-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-slate-200 font-medium">Aspiring Data Professional</span>
                  </div>
                  <span className="text-slate-400">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Banner Strip: Target Role */}
        <div className="mt-12 rounded-xl border border-slate-800/80 bg-[#0c121e]/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Career Objective
              </p>
              <p className="text-xs text-slate-400">
                Seeking an entry-level Data Scientist or Data Analyst role
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
