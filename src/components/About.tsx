import React from "react";
import TextReveal from "./TextReveal";

interface AboutProps {
  heading?: string;
  subheadline?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  quote?: string;
  quoteReflection?: string;
  experienceItems?: {
    main: string[];
    subHeading: string;
    subItems: string[];
  };
  skills?: string[];
}

export const About: React.FC<AboutProps> = ({
  heading = "About Me",
  subheadline = "I'm Ahmad. A full-stack engineer, systems thinker and problem solver.",
  paragraph1 = "The cusp of engineering, AI, and systems architecture has always fascinated me, and I've never been afraid to dive straight into complex technical challenges and build from the ground up. Whether it's crafting responsive, intuitive frontends or designing scalable backend services, APIs, and databases, I build with precision and purpose.",
  paragraph2 = "Over the years, I've worked across the full spectrum of software development — from modern full-stack web applications, authentication & security, and scalable databases to cloud infrastructure, APIs, and AI integrations. Everything I have engineered has been a vital stepping stone for crafting robust, high-performance digital products.",
  paragraph3 = "What excites me most about engineering is creating systems that have purpose and solve real problems under real-world conditions. Managing operations at a factory alongside software engineering has fundamentally shaped my philosophy: thinking in systems, spotting bottlenecks before they emerge, and delivering resilient, high-value solutions. I work fluently in both English and Arabic, always eager to take on the next challenging problem to deconstruct and rebuild.",
  skills = [
    "React & Next.js",
    "TypeScript",
    "Python & FastAPI",
    "PostgreSQL",
    "System Architecture",
    "Cloud & DevOps",
    "Tailwind CSS",
    "GSAP",
    "REST API",
    "Security & Auth",
    "UI/UX Prototyping",
  ],
}) => {
  return (
    <section className="relative min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-28 font-sans overflow-hidden border-t border-neutral-900 select-none">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl lg:max-w-5xl w-full flex flex-col">
        {/* Section Header — kept exactly as before */}
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tight text-white mb-8 sm:mb-12"
          duration={1}
          ease="power4.out"
          animateOnScroll={true}
        >
          <span>{heading}</span>
        </TextReveal>

        {/* Serif-style large subheadline */}
        <div className="mb-10 sm:mb-14 overflow-hidden">
          <TextReveal
            as="h3"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-light text-neutral-100 leading-[1.18] tracking-tight"
            duration={1.1}
            ease="power4.out"
            animateOnScroll={true}
            splitType="lines"
            stagger={0.08}
          >
            <span>{subheadline}</span>
          </TextReveal>
        </div>

        {/* Narrative Paragraphs */}
        <TextReveal
          as="div"
          className="space-y-6 sm:space-y-8 max-w-4xl"
          duration={1.1}
          stagger={0.06}
          delay={0.1}
          ease="power4.out"
          splitType="lines"
          animateOnScroll={true}
        >
          <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
            {paragraph1}
          </p>
          <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
            {paragraph2}
          </p>
          <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
            {paragraph3}
          </p>
        </TextReveal>


        {/* SKILLS SECTION */}
        <div className="pt-4  flex flex-col gap-2 border-neutral-800/60">
          <TextReveal
            as="h4"
            className="text-sm sm:text-lg font-semibold tracking-[0.25em] uppercase text-white"
            duration={1}
            ease="power4.out"
            animateOnScroll={true}
          >
            <span>Skills</span>
          </TextReveal>

          <TextReveal
            as="p"
            className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.9]"
            duration={1}
            stagger={0.06}
            delay={0.05}
            ease="power4.out"
            animateOnScroll={true}
            splitType="lines"
          >
            <span>{skills.join("  ,  ")}</span>
          </TextReveal>
        </div>

      </div>
    </section>
  );
};

export default About;
