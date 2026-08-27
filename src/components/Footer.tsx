import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterProps {
  contactEmail?: string;
  links?: FooterLink[];
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad-sapil-576732380/?skipRedirect=true", external: true },
  { label: "Github", href: "https://github.com/lemix7", external: true },
];

export const Footer: React.FC<FooterProps> = ({
  contactEmail = "mailto:hello@ahmadalosayli.com",
  links = DEFAULT_LINKS,
}) => {
  return (
    <footer className="relative z-0 w-full bg-[#0d0d0d] text-white border-t border-neutral-900 px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-28 select-none overflow-hidden font-sans">
      {/* Main Footer Row */}
      <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 w-full">
        {/* Left: GET IN TOUCH Pill Button */}
        <div className="flex items-center shrink-0">
          <a
            href={contactEmail}
            className="group inline-flex items-center justify-center h-7 px-3 sm:h-10 sm:px-6 md:h-auto md:px-11 md:py-5 rounded-full border border-neutral-400/80 hover:border-white bg-transparent hover:bg-white text-white hover:text-black transition-all duration-300 shadow-sm active:scale-95"
          >
            <span className="text-[10px] sm:text-base md:text-3xl lg:text-4xl font-medium tracking-[0.08em] md:tracking-tight uppercase leading-none">
              GET IN TOUCH
            </span>
          </a>
        </div>

        {/* Right: List of Links with Arrow */}
        <div className="flex flex-col items-end space-y-1.5 sm:space-y-3 md:space-y-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-1 text-xs sm:text-xl md:text-2xl font-light text-neutral-300 hover:text-white transition-colors duration-200"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3 h-3 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
