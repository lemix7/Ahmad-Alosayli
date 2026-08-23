import React from "react";

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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center relative bg-black select-none">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={`${project.title} Screenshot`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-500">
          Project Preview
        </span>
      )}
    </div>
  );
};

export default ProjectCard;
