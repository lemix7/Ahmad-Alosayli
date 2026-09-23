"use client";

import React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className = "",
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  style,
  ...props
}: MarqueeProps) {
  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";
  const fadeStop = Math.max(0, Math.min(50, fadeAmount));
  const mask = fade
    ? `linear-gradient(to ${isVertical ? "bottom" : "right"}, transparent 0%, black ${fadeStop}%, black ${100 - fadeStop}%, transparent 100%)`
    : undefined;

  return (
    <div
      className={`marquee flex w-full overflow-hidden ${className}`}
      data-vertical={isVertical}
      data-pause-on-hover={pauseOnHover}
      style={{ maskImage: mask, WebkitMaskImage: mask, ...style }}
      {...props}
    >
      <div
        className="marquee-scroller flex shrink-0"
        style={{
          flexDirection: isVertical ? "column" : "row",
          animationName: isVertical ? "marquee-scroll-y" : "marquee-scroll-x",
          animationDuration: `${Math.max(0.1, duration)}s`,
          animationDirection: direction === "right" || direction === "down" ? "reverse" : "normal",
        }}
      >
        {[false, true].map((duplicate) => (
          <div
            key={String(duplicate)}
            className="marquee-group flex shrink-0"
            style={{ flexDirection: isVertical ? "column" : "row" }}
            aria-hidden={duplicate || undefined}
            {...(duplicate ? { inert: "" } : {})}
          >
            {items.map((item, index) => (
              <div key={index} className="flex shrink-0">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
