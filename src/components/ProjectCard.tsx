import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  number: string;
  year: string;
  isNew?: boolean;
  title: string;
  subtitle: string;
  category: string;
  categoryTag: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  stats?: { label: string; value: string }[];
  type?: string;
}

export interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <button
      type="button"
      onClick={onOpenDetails}
      aria-label={`Open ${project.title} project details`}
      className="group/card relative flex h-full w-full cursor-pointer select-none flex-col justify-end overflow-hidden bg-[#17171b] text-left"
    >
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={`${project.title} Screenshot`}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover/card:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_72%_20%,rgba(112,129,151,0.34),transparent_42%),linear-gradient(135deg,#343943,#191b20_55%,#111214)]">
          <div className="absolute inset-0 overflow-hidden bg-[#dce1e3]/90 transition-transform duration-700 group-hover/card:scale-[1.02]">
            <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-white/70 px-3">
              <i className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <i className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <i className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <div className="ml-3 h-3 w-2/5 rounded-sm bg-black/10" />
            </div>
            <div className="grid h-[calc(100%-2rem)] grid-cols-[22%_1fr] text-neutral-800">
              <div className="space-y-3 border-r border-black/10 bg-white/35 p-3">
                {[0, 1, 2, 3, 4].map((line) => <div key={line} className="h-2 rounded-sm bg-black/10" />)}
              </div>
              <div className="space-y-3 p-4 sm:p-6">
                <div className="h-3 w-1/3 rounded-sm bg-black/15" />
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((card) => <div key={card} className="h-12 rounded border border-black/10 bg-white/55 sm:h-16" />)}
                </div>
                <div className="h-[38%] rounded border border-black/10 bg-[linear-gradient(165deg,transparent_46%,rgba(86,146,174,0.45)_47%,rgba(86,146,174,0.45)_49%,transparent_50%)]" />
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1].map((table) => <div key={table} className="h-12 rounded border border-black/10 bg-white/45 sm:h-16" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 via-45% to-transparent" />
      <div className="relative z-10 w-full px-6 pb-7 pt-24 sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
        <div className="max-w-3xl">
          <h3 className="line-clamp-2 text-left text-lg font-medium leading-[1.4] tracking-tight text-white sm:text-xl lg:text-2xl">
            {project.description}
          </h3>
          <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-white/65 sm:mt-6 sm:text-xs">
            {project.categoryTag.replace(" →", "")} <span className="px-2">•</span> {project.year}
          </p>
          <div className="mt-7 inline-flex items-center gap-4 rounded-full border border-white/30 py-2 pl-5 pr-2 text-sm font-medium text-white transition-colors group-hover/card:bg-white group-hover/card:text-black sm:mt-8 sm:py-2.5 sm:pl-6">
            View Project
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors group-hover/card:bg-black/10">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
