import type { MouseEventHandler, ReactNode } from "react";

interface StaggerButtonProps {
  label: string;
  as?: "a" | "button";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  className?: string;
  textClassName?: string;
  variant?: "resume" | "plain";
  offsetIncrement?: number;
  children?: ReactNode;
}

export default function StaggerButton({
  label,
  as = "a",
  href,
  onClick,
  type = "button",
  target,
  rel,
  className = "",
  textClassName = "",
  variant = "plain",
  offsetIncrement = 0.01,
  children,
}: StaggerButtonProps) {
  const classes = `${variant === "resume" ? "resume-button" : ""} ${className}`.trim();
  const content = (
    <>
      {variant === "resume" && <span className="resume-button__bg" aria-hidden="true" />}
      <span className={`stagger-text ${textClassName}`.trim()} aria-hidden="true">
        <span className="stagger-text__measure">{label}</span>
        <span className="stagger-text__chars">
          {[...label].map((char, index) => (
            <span
              className="stagger-text__char"
              key={index}
              style={{ transitionDelay: `${index * offsetIncrement}s` }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      </span>
      {children}
    </>
  );

  if (as === "button") {
    return (
      <button type={type} onClick={onClick} aria-label={label} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} target={target} rel={rel} aria-label={label} className={classes}>
      {content}
    </a>
  );
}
