import { useState } from 'react';
import { Mail, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subjectTemplate, setSubjectTemplate] = useState('Data Scientist / Analyst Role Opportunity');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subjectTemplate)}`;

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#0c121e]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Contact & Profiles
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Currently seeking an entry-level Data Scientist or Data Analyst role. Reach out directly via email or connect on LinkedIn and GitHub.
          </p>
        </div>

        {/* Contact Container */}
        <div className="mt-10 max-w-2xl rounded-2xl border border-slate-800 bg-[#090D14] p-6 sm:p-8">
          
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Direct Email Communication
              </h3>
              <p className="text-xs text-slate-400">
                Primary channel for interview inquiries and career opportunities
              </p>
            </div>
          </div>

          {/* Email Address Display Box */}
          <div className="rounded-xl border border-slate-800 bg-[#0c121e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-xs text-slate-500 block mb-0.5">Email Address</span>
              <span className="text-base sm:text-lg font-mono font-bold text-white truncate block selection:bg-amber-500/30">
                {PERSONAL_INFO.email}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Direct Mailto Launcher */}
              <a
                href={mailtoHref}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Open Mail</span>
              </a>
            </div>
          </div>

          {/* Professional Social Links (LinkedIn & GitHub) */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={PERSONAL_INFO.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#0c121e] hover:border-slate-700 hover:bg-slate-900/60 transition-colors group"
            >
              <div>
                <span className="text-xs text-slate-400 block">LinkedIn Profile</span>
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {PERSONAL_INFO.linkedInHandle}
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
            </a>

            <a
              href={PERSONAL_INFO.gitHub}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#0c121e] hover:border-slate-700 hover:bg-slate-900/60 transition-colors group"
            >
              <div>
                <span className="text-xs text-slate-400 block">GitHub Profile</span>
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {PERSONAL_INFO.gitHubHandle}
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
            </a>
          </div>

          {/* Quick Subject Selectors */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Select subject template for fast compose:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Data Scientist / Analyst Role Opportunity',
                'Technical Interview Invitation',
                'Collaboration / Project Discussion'
              ].map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSubjectTemplate(subj)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    subjectTemplate === subj
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
