import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        .cursor {
          z-index: 100;
          background-color: #EFEEEC;
          border: 1px solid #EFEEEC;
          border-radius: 100em;
          width: 1em;
          height: 1em;
          transition: background-color .375s cubic-bezier(.625, .05, 0, 1),
                      height .375s cubic-bezier(.625, .05, 0, 1),
                      width .375s cubic-bezier(.625, .05, 0, 1);
          position: fixed;
          inset: 0% auto auto 0%;
          pointer-events: none;
        }
        body:has(a:hover) .cursor,
        body:has(button:hover) .cursor,
        body:has([data-cursor]:hover) .cursor {
          width: 3em;
          height: 3em;
          background-color: rgba(102, 179, 255, 0.3);
          border: 1px solid #66B3FF
        }
        @media (hover: none) and (pointer: coarse) {
          .cursor {
            display: none;
          }
        }
      `}</style>
      <div ref={cursorRef} className="cursor" />
    </>
  );
}