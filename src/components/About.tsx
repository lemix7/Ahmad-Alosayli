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
  paragraph2 = "Through my degree and hands-on project work, I've developed across the full spectrum of software development — modern full-stack web applications, authentication & security, scalable databases, cloud infrastructure, APIs, and AI integrations. Each project has pushed me to think more rigorously about how systems fit together, not just how individual pieces work.",
  paragraph3 = "What excites me most about engineering is creating systems that have purpose and solve real problems under real-world conditions. Thinking in systems, spotting bottlenecks before they emerge, and delivering high-value solutions. I work fluently in both English and Arabic, always eager to take on the next challenging problem to deconstruct and rebuild.",
  skills = [
    "JavaScript",
    "TypeScript",
    "React & Next.js",
    "Node.js",
    "Tailwind CSS",
    "Python & FastAPI",
    "PostgreSQL",
    "API Development",
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tight text-gradient-primary"
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
                className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-neutral-100 leading-[1.18] tracking-tight"
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
              <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
                {paragraph2}
              </p>
              <p className="text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.8]">
                {paragraph3}
              </p>
            </TextReveal>
          </div>

        </div>

        {/* SKILLS SECTION */}
        <div className="pt-4  flex flex-col gap-2 border-neutral-800/60">
          <TextReveal
            as="h4"
            className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  uppercase text-gradient-primary "
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
