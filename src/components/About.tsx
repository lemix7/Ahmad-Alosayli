import React from "react";
import TextReveal from "./TextReveal";

interface AboutProps {
  heading?: string;
  paragraph1?: string;
  paragraph2?: string;
}

export const About: React.FC<AboutProps> = ({
  heading = "About Me",
  paragraph1 = "I'm a Full-Stack Engineer who specializes in building AI-powered web applications. I work across the entire stack — from designing responsive, user-friendly frontends to building robust backend systems, APIs, and databases that power them. My focus areas include retrieval-augmented generation (RAG) systems, authentication and security, and system architecture that scales cleanly as products grow. I care about writing clean, maintainable code and approaching every project with a systems-level view — understanding how each piece fits into the bigger picture before I start building.",
  paragraph2 = "I also manage operations at a factory, which has shaped how I approach engineering: thinking in systems, spotting bottlenecks before they become problems, and valuing reliability under real-world pressure. That combination of technical depth and operational experience gives me a practical, results-driven approach to solving problems. I work fluently in both English and Arabic, and I'm always looking for the next challenging problem to take apart and rebuild.",
}) => {
  return (
    <section className="relative min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col  px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-14 lg:px-14 lg:py-28 font-sans overflow-hidden border-t border-neutral-900 select-none">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl  w-full flex flex-col  ">         
       

        {/* Section Header */}
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 sm:mb-12"
          duration={1}
          ease="power4.out"
          animateOnScroll={true}
        >
          <span>{heading}</span>
        </TextReveal>

        {/* Staggered Paragraphs */}
        <TextReveal
          as="div"
          className="flex flex-col gap-4 "
          duration={1.1}
          stagger={0.08}
          delay={0.15}
          ease="power4.out"
          splitType="lines"
          animateOnScroll={true}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-neutral-200 leading-relaxed tracking-tight">
            {paragraph1}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-neutral-200 leading-relaxed tracking-tight">
            {paragraph2}
          </p>
        </TextReveal>

      </div>

    </section>
  );
};

export default About;

