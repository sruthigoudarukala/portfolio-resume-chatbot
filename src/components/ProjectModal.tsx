import { X, CheckCircle, ExternalLink, Globe } from 'lucide-react';
import { ProjectItem } from '../types.ts';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0c121e] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#090D14]/95 px-6 py-4 backdrop-blur">
          <div>
            <h3 id="modal-project-title" className="text-lg font-bold text-white">
              {project.title}
            </h3>
            <p className="text-xs text-amber-400 mt-0.5">
              Deployed on {project.deploymentPlatform}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close project modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full aspect-video object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Key Implementation Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Unboxed */}
          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
              {project.techStack.map((tech, idx) => (
                <span key={tech} className="flex items-center">
                  <span className="text-amber-300/90 font-mono">{tech}</span>
                  {idx < project.techStack.length - 1 && (
                    <span className="text-slate-600 ml-2" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-[#090D14]/80 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Developer: Sruthi Arukala · Hyderabad
          </span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
