import React from 'react';

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
  statusText = "OPEN TO WORK",
  locationText = "Based in France",
  resumeUrl = "/Ahmad_Sabil_Resume.pdf",
}) => {
  return (
    <section className="relative h-screen min-h-[640px] w-full bg-[#0d0d0d] text-white flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans">
      {/* Subtle background ambient grain & gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 to-transparent pointer-events-none" />

      {/* TOP NAVIGATION / HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full">
        {/* Name / Brand */}
        <div className="flex flex-col">
          <a
            href="#"
            className="text-base sm:text-2xl md:text-4xl font-normal tracking-tight text-white/95 hover:text-white transition-colors"
          >
            {name}
          </a>
        </div>

        {/* Resume Pill Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 px-6 py-2 rounded-full border border-neutral-700 bg-neutral-900/60 backdrop-blur-sm text-[14px] font-semibold tracking-wider uppercase text-neutral-300 hover:text-white hover:border-neutral-400 transition-all duration-200"
        >
          <span>My Resume</span>
          <span className="text-[14px] text-neutral-400 group-hover:translate-x-0.5 transition-transform duration-200">
            &gt;
          </span>
        </a>
      </header>

      {/* CENTER HERO MAIN HEADLINE */}
      <main className="relative z-10 my-auto flex flex-col justify-center max-w-full">
        <h1 className="font-sans font-semibold tracking-[-0.035em] uppercase text-white leading-[0.88] text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[10.2vw] 2xl:text-[9.8vw]">
          <span className="block">
            {titleLine1}
          </span>
          <span className="block">
            {titleLine2}
          </span>
        </h1>
      </main>

  
      {/* BOTTOM BAR */}
      <div className="relative z-20 flex flex-row items-end justify-between w-full">

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

        {/* Right: "OPEN TO WORK" & Location Status */}
        <div className="flex flex-col items-end text-right">
          <div className="flex items-center gap-2 text-white">
            <span className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight uppercase">
              {statusText}
            </span>
            <span className="text-white text-xl sm:text-2xl md:text-3xl leading-none">
              ✱
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal tracking-wide mt-1">
            {locationText}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
