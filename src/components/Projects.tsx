import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard, ProjectItem } from "./ProjectCard";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "RAG",
    number: "01",
    year: "2026",
    title: "RAG-LMX",
    imageUrl: "/rag-lmx-logo-banner.png",
    subtitle: "AI Document Assistant",
    category: "AI WEB APP",
    categoryTag: "WEB APP →",
    description:
      "Full-stack Retrieval-Augmented Generation system built as a  document assistant, combining hybrid search, cross-encoder reranking, and secure multi-user access for accurate, grounded answers over institutional documents.",
    tags: [
      "Next.js 14",
      "FastAPI",
      "LangChain",
      "ChromaDB",
      "Supabase",
      "OpenAI",
    ],
    gradient: "from-violet-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#8b5cf6",
    liveUrl: undefined,
    githubUrl: "https://github.com/lemix7/RAG-LMX",
    stats: [
      { label: "Retrieval", value: "Hybrid BM25 + MMR" },
      { label: "Reranking", value: "Cross-Encoder" },
      { label: "Auth", value: "JWT + RLS" },
    ],
    type: "ennea",
  },
  {
    id: "shaheen",
    number: "03",
    year: "2025",
    title: "SHAHEEN AI",
    imageUrl: "/shaheen-portfolio-logo.png",
    subtitle: "AI Marketing Platform",
    category: "AI CONTENT PLATFORM",
    categoryTag: "AI PLATFORM →",
    description:
      "Bilingual marketing platform for creating product advertisements with AI-generated images and Arabic captions. Includes an image editor, brand and post management, and Instagram Business publishing.",
    tags: [
      "Next.js 15",
      "React 19",
      "Gemini",
      "ComfyUI",
      "Supabase",
      "Clerk",
      "AWS S3",
      "next-intl",
    ],
    gradient: "from-indigo-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#7F4BF3",
    stats: [
      { label: "Creation", value: "AI Product Ads" },
      { label: "Publishing", value: "Instagram" },
      { label: "Languages", value: "Arabic + English" },
    ],
    type: "shaheen",
  },
  {
    id: "scrolla",
    number: "02",
    year: "2025",
    title: "SCROLLA",
    subtitle: "Share Your Moments",
    category: "SOCIAL MEDIA API",
    categoryTag: "SOCIAL MEDIA API →",
    description:
      "Modern async social feed API with JWT authentication, cloud-based media uploads, and a fully asynchronous backend for high-performance chronological feeds.",
    tags: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "SQLite",
      "FastAPI-Users",
      "ImageKit",
      "JWT",
    ],
    gradient: "from-sky-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#0ea5e9",
    githubUrl: "https://github.com/lemix7/Scrolla",
    stats: [
      { label: "Auth", value: "JWT-Based" },
      { label: "Media", value: "Image + Video" },
      { label: "Backend", value: "Fully Async" },
    ],
    type: "scrolla",
  },
];

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const openProject = (project: ProjectItem) => {
    window.location.hash = `project/${project.id}`;
  };

  // GSAP ScrollTrigger Setup
  useGSAP(
    () => {
      if (!triggerRef.current || typeof window === "undefined") return;

      const totalProjects = PROJECTS_DATA.length;
      if (totalProjects <= 1) return;

      const createPin = (scrollMultiplier: number, scrub: number) =>
        ScrollTrigger.create({
          id: "projects-scroll-trigger",
          trigger: triggerRef.current,
          // Pin the outer wrapper so pinSpacing can push the footer down.
          // Pinning the inner overflow-hidden section clips the spacer and the footer overlaps.
          pin: triggerRef.current,
          anticipatePin: 1,
          start: "top top",
          end: () =>
            `+=${(totalProjects - 1) * window.innerHeight * scrollMultiplier}`,
          scrub,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              totalProjects - 1,
              Math.max(0, Math.round(self.progress * (totalProjects - 1))),
            );
            setActiveIndex((prev) => (prev === newIndex ? prev : newIndex));
          },
        });

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const st = createPin(1.35, 1.15);
        return () => st.kill();
      });

      mm.add("(min-width: 768px)", () => {
        const st = createPin(1, 0.7);
        return () => st.kill();
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        mm.revert();
      };
    },
    { scope: triggerRef },
  );

  const activeProject = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0];

  return (
    <div
      id="projects"
      ref={triggerRef}
      className="relative z-10 w-full bg-[#0d0d0d] text-white select-none border-t border-neutral-900"
    >
      {/* Section Container matching exact padding & rhythm of Hero & About */}
      <section
        ref={containerRef}
        className="relative h-screen min-h-[640px] w-full bg-gradient-dark text-white flex flex-col px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans"
      >
        {/* Subtle Ambient Background Gradient */}
        {/* <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 to-transparent pointer-events-none" /> */}

        {/* TOP BAR / SECTION HEADER */}
        <header className="relative z-20 flex items-center justify-between w-full shrink-0">
          <div className="flex items-center gap-4 text-neutral-100">
          <TextReveal
              as="h2"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold tracking-tight text-gradient-primary"
              duration={1}
              ease="power4.out"
              animateOnScroll={true}
            >
              <span>Projects</span>
            </TextReveal>
          </div>
        </header>

        {/* MAIN BODY: 2-COLUMN LAYOUT ON DESKTOP, COMPACT ADAPTIVE STACK ON MOBILE */}
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-4 sm:gap-6 lg:gap-16 xl:gap-20 items-center justify-between flex-1 min-h-0 w-full overflow-hidden mt-4 sm:mt-5 lg:mt-6">
          {/* DESKTOP LEFT COLUMN (Hidden on mobile/tablet < lg) */}
          <div className="hidden lg:flex flex-col justify-center h-full">
            {/* Big Dynamic Counter: "01 / 05" */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-semibold tracking-tight text-neutral-800 transition-all duration-300 lg:text-6xl">
                {activeProject.number}
              </span>
              <span className="text-base font-light text-neutral-600">
                / {String(PROJECTS_DATA.length).padStart(2, "0")}
              </span>
            </div>

            {/* Vertically Stacked Project Titles */}
            <div className="space-y-3 lg:space-y-3 relative">
              {PROJECTS_DATA.map((proj, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={proj.id}
                    onClick={() => openProject(proj)}
                    className={`group cursor-pointer transition-all duration-500 relative pl-4 sm:pl-5 border-l-2 ${
                      isActive
                        ? "border-white opacity-100 translate-x-1"
                        : "border-transparent opacity-30 hover:opacity-75 translate-x-0"
                    }`}
                  >
                    {/* Year & Status Dot */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono tracking-wider ${
                          isActive
                            ? "text-neutral-300 font-semibold"
                            : "text-neutral-500"
                        }`}
                      >
                        {proj.year}
                      </span>
                      {proj.isNew && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl lg:text-2xl font-extrabold tracking-tight uppercase leading-none transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-neutral-400 group-hover:text-neutral-200"
                      }`}
                    >
                      {proj.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-neutral-400 font-light mt-0.5 tracking-normal">
                      {proj.subtitle}
                    </p>

                    {/* Category Action Link */}
                    <div className="mt-0.5 flex items-center gap-1">
                      <span
                        className={`text-[11px] font-mono tracking-wider uppercase transition-colors ${
                          isActive
                            ? "text-neutral-300 font-medium"
                            : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      >
                        {proj.categoryTag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE/TABLET COMPACT HEADER (< lg) */}
          <div className="flex lg:hidden flex-col w-full shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white transition-all duration-300">
                  {activeProject.number}
                </span>
                <span className="text-sm sm:text-base font-light text-neutral-600">
                  / {String(PROJECTS_DATA.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">
                  {activeProject.year}
                </span>
                {activeProject.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {activeProject.category}
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight leading-none">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Mobile Quick Action Pill */}
              <button
                onClick={() => openProject(activeProject)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-400/80 bg-transparent text-xs font-medium tracking-wider uppercase text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-sm active:scale-95"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Project Card Showcase */}
          <div className="w-full flex-1 h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] max-h-[600px] relative rounded-2xl sm:rounded-2xl border border-neutral-800/90 bg-[#111111]/70 shadow-2xl overflow-hidden flex flex-col justify-between group">
            {/* Ambient project glowing backdrop */}
            {/* <div
              className="absolute inset-0 transition-opacity duration-700 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 60% 40%, ${activeProject.accentColor} 0%, transparent 70%)`,
              }}
            /> */}

            {/* STACK OF PROJECT PREVIEW SCREENSHOTS (Layered GSAP transition) */}
            <div className="relative w-full h-full flex-1 overflow-hidden">
              {PROJECTS_DATA.map((proj, idx) => {
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={proj.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className={`absolute inset-0 will-change-transform transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isCurrent
                        ? "opacity-100 scale-100 pointer-events-auto z-10 translate-y-0"
                        : idx < activeIndex
                          ? "opacity-0 scale-95 pointer-events-none -translate-y-3 z-0"
                          : "opacity-0 scale-105 pointer-events-none translate-y-3 z-0"
                    }`}
                  >
                    <ProjectCard
                      project={proj}
                      onOpenDetails={() => openProject(proj)}
                    />
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* BOTTOM PAGINATION BAR */}
      </section>

    </div>
  );
};

export default Projects;
