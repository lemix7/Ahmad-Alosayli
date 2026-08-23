import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ExternalLink,
  ArrowUpRight,
  Github,
  X,
} from "lucide-react";
import TextReveal from "./TextReveal";
import { ProjectCard, ProjectItem } from "./ProjectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS_DATA: ProjectItem[] = [
 
  {
    id: "RAG",
    number: "01",
    year: "2026",
    title: "RAG-LMX",
    subtitle: "AI Document Assistant",
    category: "AI WEB APP",
    categoryTag: "WEB APP →",
    description:
      "Full-stack Retrieval-Augmented Generation system built as a  document assistant, combining hybrid search, cross-encoder reranking, and secure multi-user access for accurate, grounded answers over institutional documents.",
    tags: ["Next.js 14", "FastAPI", "LangChain", "ChromaDB", "Supabase", "OpenAI"],
    gradient: "from-violet-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#8b5cf6",
    liveUrl: "https://TODO-add-live-url.example.com",
    githubUrl: "https://github.com/TODO-your-repo",
    stats: [
      { label: "Retrieval", value: "Hybrid BM25 + MMR" },
      { label: "Reranking", value: "Cross-Encoder" },
      { label: "Auth", value: "JWT + RLS" },
    ],
    type: "ennea",
  },
  {
    id: "casino",
    number: "02",
    year: "2023",
    title: "CASINO",
    subtitle: "Play & Earn",
    category: "CRYPTO PLATFORM",
    categoryTag: "CRYPTO PLATFORM →",
    description:
      "Provably fair decentralized gaming platform with instant on-chain settlement, real-time multiplayer lobbies, and audited smart contracts.",
    tags: ["React", "Node.js", "Socket.io", "PostgreSQL", "Web3.js", "Tailwind CSS"],
    gradient: "from-amber-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#f59e0b",
    liveUrl: "https://casino-web3.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Jackpot Pool", value: "$1.48M" },
      { label: "Provably Fair", value: "100% Audited" },
      { label: "Active Players", value: "48,200+" },
    ],
    type: "casino",
  },
  {
    id: "nftfest",
    number: "03",
    year: "2023",
    title: "NFT FEST",
    subtitle: "Digital Art Festival",
    category: "WEB3 EVENT",
    categoryTag: "WEB3 EVENT →",
    description:
      "Interactive international digital art festival platform featuring live VR galleries, generative art drops, and dynamic pass ticketing.",
    tags: ["React", "GSAP ScrollTrigger", "WebXR", "Supabase", "Tailwind CSS"],
    gradient: "from-rose-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#f43f5e",
    liveUrl: "https://nftfest-global.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Featured Artists", value: "120+" },
      { label: "Virtual Attendees", value: "85,000" },
      { label: "Artworks Minted", value: "3,400+" },
    ],
    type: "nftfest",
  },
];


export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  // GSAP ScrollTrigger Setup
  useGSAP(
    () => {
      if (!triggerRef.current || typeof window === "undefined") return;

      const totalProjects = PROJECTS_DATA.length;
      if (totalProjects <= 1) return;

      // Pin the section cleanly and scrub through project indices without anticipatePin jumping
      const st = ScrollTrigger.create({
        id: "projects-scroll-trigger",
        trigger: triggerRef.current,
        pin: containerRef.current || triggerRef.current,
        start: "top top",
        end: () => `+=${(totalProjects - 1) * window.innerHeight}`,
        scrub: 0.5,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            totalProjects - 1,
            Math.max(0, Math.floor(progress * totalProjects))
          );
          setActiveIndex(newIndex);
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: triggerRef }
  );

  // Smooth scroll to a specific project index on click
  const scrollToProject = (index: number) => {
    if (!triggerRef.current) return;
    const totalProjects = PROJECTS_DATA.length;
    const st = ScrollTrigger.getById("projects-scroll-trigger");

    if (st) {
      const targetScroll = st.start + (index / (totalProjects - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(index);
    }
  };

  const activeProject = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0];

  return (
    <div id="projects" ref={triggerRef} className="relative w-full bg-[#0d0d0d] text-white select-none border-t border-neutral-900">
      
      {/* Section Container matching exact padding & rhythm of Hero & About */}
      <section
        ref={containerRef}
        className="relative h-screen min-h-[640px] w-full bg-[#0d0d0d] text-white flex flex-col px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans"
      >
        {/* Subtle Ambient Background Gradient */}
        {/* <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 to-transparent pointer-events-none" /> */}

        {/* TOP BAR / SECTION HEADER */}
        <header className="relative z-20 flex items-center justify-between w-full shrink-0">
          <TextReveal
            as="h2"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold tracking-tight text-white"
            duration={1}
            ease="power4.out"
            animateOnScroll={true}
          >
            <span>My Projects</span>
          </TextReveal>
        </header>

        {/* MAIN BODY: 2-COLUMN LAYOUT ON DESKTOP, COMPACT ADAPTIVE STACK ON MOBILE */}
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 items-center justify-between flex-1 min-h-0 w-full overflow-hidden mt-4 sm:mt-5 lg:mt-6">
          
          {/* DESKTOP LEFT COLUMN (Hidden on mobile/tablet < lg) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full">
            {/* Big Dynamic Counter: "01 / 05" */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white transition-all duration-300">
                {activeProject.number}
              </span>
              <span className="text-lg sm:text-xl font-light text-neutral-600">
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
                    onClick={() => scrollToProject(idx)}
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
                          isActive ? "text-neutral-300 font-semibold" : "text-neutral-500"
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
                        isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
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
                <span className="text-[11px] font-mono text-neutral-400">{activeProject.year}</span>
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
                onClick={() => setSelectedProjectModal(activeProject)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 text-xs font-semibold text-white hover:bg-white hover:text-black transition-all shadow-md active:scale-95"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Project Card Showcase */}
          <div className="w-full lg:col-span-7 flex-1 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[540px] max-h-[560px] relative rounded-2xl sm:rounded-3xl border border-neutral-800/90 bg-[#111111]/70 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between group">
            
            {/* Ambient project glowing backdrop */}
            {/* <div
              className="absolute inset-0 transition-opacity duration-700 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 60% 40%, ${activeProject.accentColor} 0%, transparent 70%)`,
              }}
            /> */}

            {/* STACK OF PROJECT PREVIEW SCREENSHOTS (Layered GSAP transition) */}
            <div className="relative w-full flex-1 overflow-hidden">
              {PROJECTS_DATA.map((proj, idx) => {
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={proj.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                      isCurrent
                        ? "opacity-100 scale-100 pointer-events-auto z-10 translate-y-0"
                        : idx < activeIndex
                        ? "opacity-0 scale-95 pointer-events-none -translate-y-4 z-0"
                        : "opacity-0 scale-105 pointer-events-none translate-y-4 z-0"
                    }`}
                  >
                    <ProjectCard
                      project={proj}
                      onOpenDetails={() => setSelectedProjectModal(proj)}
                    />
                  </div>
                );
              })}
            </div>

            {/* FLOATING BOTTOM GLASS INFO BAR */}
            <div className="relative z-20 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-[#0c0c0c]/95 via-[#0c0c0c]/90 to-transparent border-t border-neutral-800/60 flex flex-row items-center justify-between gap-2 sm:gap-4 backdrop-blur-md shrink-0">
              <div className="max-w-[62%] sm:max-w-md">
                <p className="text-[10px] sm:text-xs md:text-sm text-neutral-200 font-light leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {activeProject.description}
                </p>

                <div className="hidden sm:flex items-center gap-2 mt-1 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  <span>{activeProject.category}</span>
                  <span>•</span>
                  <span>{activeProject.year}</span>
                </div>
              </div>

              {/* Action Button: "View Project ↗" */}
              <button
                onClick={() => setSelectedProjectModal(activeProject)}
                className="group/btn inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-700 bg-neutral-900/90 text-xs sm:text-sm font-semibold tracking-wide text-neutral-200 hover:text-black hover:bg-white hover:border-white transition-all duration-300 shrink-0 shadow-lg active:scale-95"
              >
                <span className="whitespace-nowrap">View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM PAGINATION BAR */}
        
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#121212] border border-neutral-800 rounded-2xl p-5 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-neutral-400">
                {selectedProjectModal.year} // {selectedProjectModal.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {selectedProjectModal.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">{selectedProjectModal.subtitle}</p>

            {/* Modal Description */}
            <div className="my-4 sm:my-5 p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed">
              {selectedProjectModal.description}
            </div>

            {/* Stats Row */}
            {selectedProjectModal.stats && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {selectedProjectModal.stats.map((stat, i) => (
                  <div key={i} className="p-2.5 sm:p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase font-mono">{stat.label}</div>
                    <div className="text-xs sm:text-base font-bold text-white mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="mb-4 sm:mb-6">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">Technologies Used</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProjectModal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-neutral-800/80 border border-neutral-700 text-[11px] sm:text-xs font-mono text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-neutral-800">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
              {selectedProjectModal.githubUrl && (
                <a
                  href={selectedProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {selectedProjectModal.liveUrl && (
                <a
                  href={selectedProjectModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-colors shadow-md"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
