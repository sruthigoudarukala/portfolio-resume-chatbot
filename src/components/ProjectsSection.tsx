import { useState } from 'react';
import { ArrowUpRight, Cloud, Globe } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData.ts';
import { ProjectItem } from '../types.ts';
import ProjectModal from './ProjectModal.tsx';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            Machine Learning Applications
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Deployed Projects
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            End-to-end machine learning projects developed with Python, Scikit-learn, Streamlit, and Vercel.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0c121e]/80 overflow-hidden hover:border-slate-700 transition-all duration-200"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950 border-b border-slate-800/80">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* Unboxed Tech Stack Tags (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-amber-400 font-mono mb-2.5">
                    {project.techStack.map((tech, idx) => (
                      <span key={tech} className="flex items-center">
                        <span>{tech}</span>
                        {idx < project.techStack.length - 1 && (
                          <span className="text-slate-600 ml-2" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Deployment badge & Interactive Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Cloud className="h-3.5 w-3.5 text-amber-400" />
                    <span>Deployed on {project.deploymentPlatform}</span>
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
