import React from "react";
import TextReveal from "./TextReveal";
import { Marquee } from "./ui/marquee";

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
  subheadline = "Hey, I'm Ahmad. I build software and spend a lot of time wondering how I can make it better.",
  paragraph1 = "I started out mostly focused on frontend development, but I quickly found myself wanting to understand what was happening behind the scenes too. That curiosity pulled me into backend development, databases, APIs, authentication, and eventually thinking more about how entire systems are put together.",
  paragraph2 = "Most of what I know came from building projects, running into problems, and figuring out how to solve them. That process is probably my favorite part of engineering. I like understanding why something works, why it breaks, and how I can make it better. I'm always learning, experimenting with new ideas, and looking for the next interesting problem to work on.",
  skills = [
    "JavaScript",
    "TypeScript",
    "React & Next.js",
    "Node.js",
    "Express",
    "Docker",
    "Tailwind CSS",
    "Python & FastAPI",
    "PostgreSQL",
    "Rest API",
    
  ],
}) => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-dark text-white flex flex-col px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-28  font-sans overflow-hidden select-none">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl lg:max-w-5xl w-full flex flex-col gap-6  sm:gap-8 ">
        <div className="flex flex-col gap-6 sm:gap-6 ">
          {/* Section Header — kept exactly as before */}
          <div className="flex flex-col space-y-4 ">
            <TextReveal
              as="h2"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold tracking-tight text-gradient-primary"
              duration={1}
              ease="power4.out"
              animateOnScroll={true}
            >
              <span>{heading}</span>
            </TextReveal>
            {/* Serif-style large subheadline */}
            <div className=" overflow-hidden">
              <TextReveal
                as="h3"
                className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-balance text-neutral-100 leading-[1.18] tracking-tight"
                duration={1.1}
                ease="power4.out"
                animateOnScroll={true}
                splitType="lines"
                stagger={0.08}
              >
                <span>{subheadline}</span>
              </TextReveal>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-4">
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
              {/* <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
                {paragraph1}
              </p> */}
              <p className="text-neutral-300 text-balance  text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
                {paragraph1}
              </p>
              <p className="text-neutral-300 text-balance text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
                {paragraph2}
              </p>
            </TextReveal>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="pt-4  flex flex-col gap-2 border-neutral-800/60">
          <TextReveal
            as="h4"
            className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold  uppercase text-gradient-primary "
            duration={1}
            ease="power4.out"
            animateOnScroll={true}
          >
            <span>TOOLS & TECHNOLOGIES</span>
          </TextReveal>

          <Marquee duration={30} pauseOnHover className="py-4 text-neutral-300">
            {skills.map((skill) => (
              <span key={skill} className="mx-6 whitespace-nowrap text-sm font-medium sm:mx-8 sm:text-base">
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default About;
