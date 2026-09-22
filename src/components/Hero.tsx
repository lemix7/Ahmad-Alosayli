import React from "react";
import TextReveal from "./TextReveal";
import AnimatedGradient from "./AnimatedGradadient";
import StaggerButton from "./StaggerButton";

interface HeroProps {
  name?: string;
  titleLine1?: string;
  titleLine2?: string;
  resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  name = "Ahmad Alosayli",
  titleLine1 = "FULL-STACK",
  titleLine2 = "DEVELOPER",
  resumeUrl = "/my-cv.pdf",
}) => {
  return (
    <section className="relative h-screen min-h-[640px] w-full bg-transparent text-gradient-light flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans">
      <AnimatedGradient config={{ preset: "Prism" }} />

      {/* TOP NAVIGATION / HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full">
        {/* Name / Brand */}
        <div className="flex flex-col">
          <a
            href="#"
            className="text-base sm:text-2xl  md:text-4xl font-normal tracking-tight text-gradient-light hover:text-gradient-light transition-colors"
          >
            {name}
          </a>
        </div>

        {/* Nav actions: Resume */}
        <div className="flex items-center gap-3">
          <StaggerButton
            href={resumeUrl}
            label="Resume"
            variant="resume"
          />
        </div>
      </header>

      {/* CENTER HERO MAIN HEADLINE */}
      <main className="relative z-10 my-auto flex flex-col justify-center max-w-full">
        <TextReveal
          as="h1"
          className="font-sans font-semibold tracking-[-0.035em] uppercase text-gradient-light leading-[0.88] text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[10.2vw] 2xl:text-[9.8vw]"
          duration={1.2}
          stagger={0.15}
          delay={0.1}
          ease="power4.out"
        >
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </TextReveal>
      </main>

      {/* BOTTOM SCROLL CUE */}
      <div className="relative z-20 flex w-full justify-center">
        <p className="scroll-cue text-xs sm:text-sm font-medium tracking-widest uppercase text-gradient-light">
          Scroll Down
        </p>
      </div>
    </section>
  );
};

export default Hero;
