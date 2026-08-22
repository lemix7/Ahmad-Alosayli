"use client";

import React, { useRef, ElementType, ReactNode, CSSProperties } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export type SplitTypeOption =
  | "lines"
  | "words"
  | "chars"
  | "lines,words"
  | "lines,words,chars"
  | "words,chars";

export interface TextRevealProps {
  /** Text, React element(s), or nodes to animate. */
  children: ReactNode;
  /** Whether to trigger animation when scrolled into view. Default: true */
  animateOnScroll?: boolean;
  /** Delay before animation starts in seconds. Default: 0 */
  delay?: number;
  /** Duration of the slide-up animation in seconds. Default: 1 */
  duration?: number;
  /** Stagger interval between lines/items in seconds. Default: 0.1 */
  stagger?: number;
  /** GSAP easing function. Default: "power4.out" */
  ease?: string;
  /** Initial Y offset before animating to 0. Default: "100%" */
  y?: string | number;
  /** SplitText split type. Default: "lines" */
  splitType?: SplitTypeOption;
  /** Whether to wrap lines/elements in overflow-hidden masks. Default: true */
  mask?: boolean;
  /** Sensitivity threshold for line wrapping detection. Default: 0.1 */
  lineThreshold?: number;
  /** CSS class prefix assigned to each split line. Default: "line++" */
  lineClass?: string;
  /** Custom GSAP ScrollTrigger configuration object. */
  scrollTrigger?: ScrollTrigger.Vars;
  /** HTML tag or component to render for the wrapper. Default: "div" */
  as?: ElementType;
  /** CSS class for the wrapper element. */
  className?: string;
  /** Inline styles for the wrapper element. */
  style?: CSSProperties;
  /** If true, disables the animation and renders static text. Default: false */
  disabled?: boolean;
  /** Whether to revert SplitText modifications after animation completes so text reflows natively on resize. Default: true */
  revertOnComplete?: boolean;
  /** Callback when animation starts. */
  onStart?: () => void;
  /** Callback when animation completes. */
  onComplete?: () => void;
}

/**
 * TextReveal Component
 * 
 * Reveals text with a smooth sliding mask animation powered by GSAP SplitText & ScrollTrigger.
 */
export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  ease = "power4.out",
  y = "100%",
  splitType = "lines",
  mask = true,
  lineThreshold = 0.1,
  lineClass = "line++",
  scrollTrigger = {},
  as: Component = "div",
  className,
  style,
  disabled = false,
  revertOnComplete = true,
  onStart,
  onComplete,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const splitRefs = useRef<SplitText[]>([]);
  const targetsRef = useRef<HTMLElement[]>([]);
  const isCompletedRef = useRef(false);

  useGSAP(
    () => {
      if (disabled || !containerRef.current || typeof window === "undefined") return;

      isCompletedRef.current = false;
      let tween: gsap.core.Tween | null = null;

      const createSplits = () => {
        splitRefs.current.forEach((split) => {
          if (split && typeof split.revert === "function") {
            split.revert();
          }
        });
        splitRefs.current = [];
        targetsRef.current = [];

        // Determine which DOM elements to split
        let elements: HTMLElement[] = [];
        if (containerRef.current?.hasAttribute("data-reveal-wrapper")) {
          elements = Array.from(containerRef.current.children) as HTMLElement[];
        } else if (containerRef.current) {
          elements = [containerRef.current as HTMLElement];
        }

        // Filter out non-element nodes or elements without text
        elements = elements.filter(
          (el) => el && el.nodeType === Node.ELEMENT_NODE && (el.textContent || "").trim().length > 0
        );

        if (elements.length === 0) return;

        elements.forEach((element) => {
          // Create SplitText instance
          const splitConfig: SplitText.Vars = {
            type: splitType,
            lineThreshold,
          };

          if (splitType.includes("lines")) {
            splitConfig.linesClass = lineClass;
            if (mask) {
              splitConfig.mask = "lines";
            }
          }
          if (splitType.includes("words")) {
            splitConfig.wordsClass = "word++";
          }
          if (splitType.includes("chars")) {
            splitConfig.charsClass = "char++";
          }

          const split = SplitText.create(element, splitConfig);
          splitRefs.current.push(split);

          // Handle CSS text-indent if present on the element
          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;
          if (textIndent && textIndent !== "0px" && split.lines && split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
            element.style.textIndent = "0";
          }

          // Collect animation targets based on splitType
          let targets: HTMLElement[] = [];
          if (splitType.includes("chars") && split.chars && split.chars.length > 0) {
            targets = split.chars as HTMLElement[];
          } else if (splitType.includes("words") && split.words && split.words.length > 0) {
            targets = split.words as HTMLElement[];
          } else if (split.lines && split.lines.length > 0) {
            targets = split.lines as HTMLElement[];
          }

          targets.forEach((target) => {
            target.style.willChange = "transform";
          });

          targetsRef.current.push(...targets);
        });

        if (targetsRef.current.length === 0) return;

        // Set initial position
        gsap.set(targetsRef.current, { y });
      };

      createSplits();

      if (targetsRef.current.length === 0) return;

      const handleComplete = () => {
        isCompletedRef.current = true;
        if (revertOnComplete) {
          splitRefs.current.forEach((split) => {
            if (split && typeof split.revert === "function") {
              split.revert();
            }
          });
          splitRefs.current = [];
          targetsRef.current = [];
        }
        onComplete?.();
      };

      const animationProps: gsap.TweenVars = {
        y: "0%",
        duration,
        stagger,
        ease,
        delay,
        onStart,
        onComplete: handleComplete,
      };

      const startAnimation = () => {
        if (animateOnScroll) {
          tween = gsap.to(targetsRef.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
              ...scrollTrigger,
            },
          });
        } else {
          tween = gsap.to(targetsRef.current, animationProps);
        }
      };

      startAnimation();

      // Debounced resize handler for pre-animation responsive reflow
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        if (isCompletedRef.current) return;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (isCompletedRef.current || !containerRef.current) return;
          if (tween) {
            tween.kill();
          }
          createSplits();
          startAnimation();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
        if (tween) tween.kill();
        splitRefs.current.forEach((split) => {
          if (split && typeof split.revert === "function") {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        duration,
        stagger,
        ease,
        y,
        splitType,
        mask,
        disabled,
        revertOnComplete,
      ],
    }
  );

  // If a single valid React element was provided (e.g. <h1>Title</h1>), clone it and attach ref
  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    const child = React.Children.only(children) as React.ReactElement<{
      ref?: React.Ref<any>;
      className?: string;
      style?: CSSProperties;
    }>;
    return React.cloneElement(child, {
      ref: containerRef,
      className: [child.props.className, className].filter(Boolean).join(" ") || undefined,
      style: { ...child.props.style, ...style },
    });
  }

  // Otherwise, wrap children in the specified container
  return (
    <Component
      ref={containerRef}
      data-reveal-wrapper="true"
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

export { TextReveal };
