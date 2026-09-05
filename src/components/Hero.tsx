import React from "react";
import TextReveal from "./TextReveal";
import AnimatedGradient from "./AnimatedGradadient";

interface HeroProps {
  name?: string;
  titleLine1?: string;
  titleLine2?: string;
  statusText?: string;
  locationText?: string;
  resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  name = "Ahmad Alosayli",
  titleLine1 = "FULL-STACK",
  titleLine2 = "DEVELOPER",
  statusText = "Open to Work",
  locationText = "Based in saudi arabia",
  resumeUrl = "/my-cv.pdf",
}) => {
  return (
    <section className="relative h-screen min-h-[640px] w-full bg-transparent text-white flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans">
      <AnimatedGradient config={{ preset: "Prism" }} />

      {/* TOP NAVIGATION / HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full">
        {/* Name / Brand */}
        <div className="flex flex-col">
          <a
            href="#"
            className="text-base sm:text-2xl  md:text-4xl font-normal tracking-tight text-white/95 hover:text-white transition-colors"
          >
            {name}
          </a>
        </div>

        {/* Nav actions: Resume */}
        <div className="flex items-center gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-4 py-2  sm:px-5 sm:py-2  rounded-full border border-neutral-400/80 hover:border-white bg-transparent hover:bg-white text-white hover:text-black transition-all duration-300 shadow-sm active:scale-95 text-sm sm:text-base  font-medium tracking-tight leading-none"
          >
            <span>Resume</span>
          </a>
        </div>
      </header>

      {/* CENTER HERO MAIN HEADLINE */}
      <main className="relative z-10 my-auto flex flex-col justify-center max-w-full">
        <TextReveal
          as="h1"
          className="font-sans font-semibold tracking-[-0.035em] uppercase text-white leading-[0.88] text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[10.2vw] 2xl:text-[9.8vw]"
          duration={1.2}
          stagger={0.15}
          delay={0.1}
          ease="power4.out"
        >
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </TextReveal>
      </main>

      {/* BOTTOM BAR */}
      <div className="relative z-20 flex flex-row items-center justify-between w-full">
        {/* Left: Rotating Circular "SCROLL DOWN" Badge */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
            {/* SVG Circular Text */}
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="scrollCirclePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text className="text-[10px] font-mono uppercase fill-neutral-400 tracking-[0.24em] font-medium">
                <textPath href="#scrollCirclePath" startOffset="0%">
                  SCROLL DOWN • SCROLL DOWN •
                </textPath>
              </text>
            </svg>

            {/* Central Asterisk / Star */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl font-light pointer-events-none">
              ✱
            </div>
          </div>
        </div>

        {/* Right: Availability & Location */}
        <div className="flex flex-col items-end text-right">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white">
              {statusText}
            </span>
          </div>
          <p className="text-xs sm:text-sm capitalize text-neutral-500 font-normal tracking-wide mt-1">
            {locationText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
