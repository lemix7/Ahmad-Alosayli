import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { PROJECTS_DATA } from "./Projects";
import type { ProjectItem } from "./ProjectCard";

export function getProjectFromHash(): ProjectItem | undefined {
  const id = decodeURIComponent(window.location.hash.slice("#project/".length));
  return window.location.hash.startsWith("#project/")
    ? PROJECTS_DATA.find((project) => project.id === id)
    : undefined;
}

function ProjectImagePlaceholder({ project, index, aspect }: {
  project: ProjectItem;
  index: number;
  aspect: string;
}) {
  return (
    <figure
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#e6e8e8] p-2.5 shadow-[0_24px_100px_rgba(0,0,0,0.3)] sm:p-4"
      style={{ aspectRatio: aspect }}
      aria-label={`${project.title} project image placeholder ${index}`}
    >
      <div className="flex h-full overflow-hidden rounded-lg border border-black/10 bg-[#fafafa] text-[#202226]">
        <aside className="hidden w-[18%] shrink-0 flex-col gap-3 border-r border-black/10 bg-[#f2f3f3] p-3 sm:flex">
          <span className="mb-2 h-3 w-3 rounded-full" style={{ background: project.accentColor }} />
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span key={item} className="h-1.5 rounded-full bg-black/10" style={{ width: `${55 + (item % 3) * 12}%` }} />
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <span className="h-2.5 w-1/4 rounded-full bg-black/15" />
            <span className="h-5 w-16 rounded bg-black/[0.06]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="h-3 w-1/3 rounded-full bg-black/20" />
            <span className="h-4 w-12 rounded bg-black/[0.06]" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-md border border-black/[0.07] bg-white p-2 sm:p-3">
                <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-black/20 sm:mt-3 sm:h-4" />
              </div>
            ))}
          </div>
          <div className="relative min-h-12 flex-1 overflow-hidden rounded-md border border-black/[0.07] bg-white p-3 sm:p-5">
            <div className="absolute inset-x-4 top-1/2 h-px border-t border-dashed border-black/10" />
            <svg className="absolute inset-x-[8%] top-[15%] h-[70%] w-[84%]" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 88 C45 77 52 28 110 44 S185 104 235 72 S315 22 400 40" fill="none" stroke={project.accentColor} strokeOpacity=".58" strokeWidth="3" />
            </svg>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:gap-3">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-2 rounded-md border border-black/[0.07] bg-white p-3">
                <div className="h-2 w-2/3 rounded-full bg-black/15" />
                {[0, 1, 2].map((line) => <div key={line} className="h-1.5 rounded-full bg-black/[0.07]" />)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/60 px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] text-white backdrop-blur-sm sm:bottom-7 sm:right-7">
        IMAGE PLACEHOLDER · 0{index}
      </figcaption>
    </figure>
  );
}

export function ProjectDetail({ project }: { project: ProjectItem }) {
  const titleSize = Math.min(17, 88 / project.title.length);
  const images = project.imageUrl ? [project.imageUrl] : [];

  return (
    <main className="min-h-screen overflow-clip bg-[#101012] px-[4.7vw] pb-20 text-white">
      <header className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between sm:h-20">
        <a href="#projects" className="text-base  capitalize font-normal tracking-tight text-white transition-opacity hover:opacity-65 sm:text-2xl md:text-4xl">
          ahmad alosayli
        </a>
        <a href="#projects" className="inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white sm:text-sm">
          <ArrowLeft size={15} /> Back to projects
        </a>
      </header>

      <article className="mx-auto w-full max-w-[1600px]">
        <div className="flex h-[55vh] min-h-[300px] max-h-[620px] items-center justify-center overflow-hidden sm:h-[60vh] sm:min-h-[390px]">
          <h1
            className="whitespace-nowrap text-center font-black uppercase leading-[0.82] tracking-[-0.075em] text-white"
            style={{ fontSize: `clamp(4rem, ${titleSize}vw, 14rem)` }}
          >
            {project.title}
          </h1>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[8vw]">
          <section className="lg:sticky lg:top-10 lg:self-start">
            <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-neutral-500 sm:text-[10px]">ABOUT</p>
            <p className="max-w-[580px] text-xl leading-[1.5] tracking-[-0.025em] text-neutral-100 sm:text-2xl sm:leading-[1.55] lg:text-[1.75rem]">
              {project.description}
            </p>

            <div className="mt-9 sm:mt-10">
              <p className="mb-4 font-mono text-[9px] tracking-[0.2em] text-neutral-500 sm:text-[10px]">TYPE</p>
              <div className="flex flex-wrap gap-2">
                {[project.category, ...(project.type ? [project.type] : [])].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-neutral-200 sm:text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-9">
              <p className="mb-3 font-mono text-[9px] tracking-[0.2em] text-neutral-500 sm:text-[10px]">STACK</p>
              <ol className="space-y-1.5">
                {project.tags.map((tag, index) => (
                  <li key={tag} className="flex items-center gap-3 text-xs text-neutral-300 sm:text-sm">
                    <span className="w-5 font-mono text-[10px] text-neutral-600">{String(index + 1).padStart(2, "0")}</span>
                    {tag}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 pb-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-white sm:text-sm">
                  <Github size={15} /> Source code <ArrowUpRight size={14} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-white sm:text-sm">
                  Live project <ExternalLink size={14} />
                </a>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-20">
            {images.length > 0 ? images.map((image, index) => (
              <img key={image} src={image} alt={`${project.title} screenshot ${index + 1}`} className="h-auto w-full rounded-2xl object-cover" />
            )) : (
              <>
                <ProjectImagePlaceholder project={project} index={1} aspect="0.79 / 1" />
                <ProjectImagePlaceholder project={project} index={2} aspect="1.72 / 1" />
                <ProjectImagePlaceholder project={project} index={3} aspect="0.9 / 1" />
              </>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
