import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

const EMAIL = "ahmedgeger@gmail.com"

const ContactButton = ({ContactEmail = EMAIL}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(ContactEmail);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center justify-center px-4 py-2 sm:h-9 sm:px-6 sm:py-8 rounded-full border border-neutral-400/80 hover:border-white bg-transparent hover:bg-white text-white hover:text-black transition-all duration-300 shadow-sm active:scale-95"
    >
      <span className="text-sm sm:text-base md:text-3xl lg:text-4xl font-medium tracking-tight uppercase leading-none">{copied ? "Copied" : "Get in touch"}</span>
    </button>
  );
}

export const Footer: React.FC<FooterProps> = ({
  contactEmail = EMAIL,
  links = DEFAULT_LINKS,
}) => {
  return (
    <footer className="relative z-0 w-full bg-[#0d0d0d] text-white border-t border-neutral-900 px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-28 select-none overflow-hidden font-sans">
      {/* Main Footer Row */}
      <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 w-full">
        
        {/* Left: GET IN TOUCH Pill Button */}
        <div className="flex items-center shrink-0">
          <ContactButton ContactEmail={contactEmail} />
        </div>

        {/* Right: List of Links with Arrow */}
        <div className="flex flex-col items-end space-y-1.5 sm:space-y-3 md:space-y-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-1 text-sm sm:text-xl md:text-2xl font-light text-neutral-300 hover:text-white transition-colors duration-200"
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
