"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger, in milliseconds, applied when the element enters the viewport. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "ul";
  /**
   * Entrance direction. "up" lifts from below (the default for cards and
   * headings), "left"/"right" slide in along x (the experience timeline),
   * "scale" grows from 94% (the hero visual).
   */
  from?: "up" | "left" | "right" | "scale";
};

const OFFSETS: Record<NonNullable<Props["from"]>, React.CSSProperties> = {
  up: { "--reveal-y": "26px" } as React.CSSProperties,
  left: { "--reveal-y": "0px", "--reveal-x": "-20px" } as React.CSSProperties,
  right: { "--reveal-y": "0px", "--reveal-x": "20px" } as React.CSSProperties,
  scale: { "--reveal-y": "0px", "--reveal-scale": "0.94" } as React.CSSProperties,
};

/**
 * Plays an entrance transition the first time its children scroll into view,
 * then stops observing. Timing matches the rest of the site: 0.55s on
 * cubic-bezier(0.2, 0.8, 0.2, 1), triggered 60px before the element's edge
 * reaches the viewport so the motion finishes as it settles.
 *
 * The transform itself lives in CSS ([data-reveal] in globals.css) and is
 * composed from custom properties, so this component only sets variables and
 * flips one attribute — no per-frame JavaScript. Falls back to visible content
 * when IntersectionObserver is missing, and CSS disables the motion under
 * prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  from = "up",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal=""
      style={{
        ...OFFSETS[from],
        "--reveal-delay": `${delay}ms`,
      } as React.CSSProperties}
      className={className}
    >
      {children}
    </Component>
  );
}
