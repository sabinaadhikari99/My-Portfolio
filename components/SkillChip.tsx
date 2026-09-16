"use client";

import { useCallback } from "react";

/**
 * A skill tile with a spotlight that follows the cursor across it.
 *
 * The gradient itself lives in CSS (the `spotlight` utility); this only writes
 * --mx/--my on the element. Setting a custom property does not invalidate
 * layout or style rules that depend on it beyond the background, so the effect
 * costs a paint rather than a reflow, and no React state is involved — the
 * component never re-renders while the pointer moves.
 */
export default function SkillChip({ name }: { name: string }) {
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      onPointerMove={onPointerMove}
      className="glass gradient-border spotlight rounded-xl px-3.5 py-3 text-center text-sm font-medium transition-[transform,box-shadow] duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
    >
      <span className="relative z-10">{name}</span>
    </div>
  );
}
