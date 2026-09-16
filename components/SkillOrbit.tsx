"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { heroSkills, type HeroSkill } from "@/content/profile";

/** Per-pattern offset, in the item's own local units (-1..1 each axis). */
function offset(motion: HeroSkill["motion"], phase: number) {
  switch (motion) {
    case "orbit":
      return [Math.cos(phase), Math.sin(phase) * 0.72];
    case "sweepX":
      // Wide horizontal travel, barely any vertical.
      return [Math.sin(phase), Math.sin(phase * 2) * 0.16];
    case "sweepY":
      return [Math.sin(phase * 2) * 0.18, Math.sin(phase)];
    case "figure8":
      return [Math.sin(phase), Math.sin(phase * 2) * 0.5];
  }
}

/**
 * Technology labels drifting around the laptop, each on its own path.
 *
 * Positioning is anchor-plus-offset rather than a shared orbit: every chip
 * keeps a fixed station around the laptop's perimeter and wanders a short
 * distance around it. That is what guarantees the two things a real orbit
 * cannot — labels never cross the screen, and they never leave the stage,
 * however long the page is left open.
 *
 * One rAF loop writes transforms straight to the DOM nodes. No React state is
 * involved after mount, so a hundred frames a second cost zero re-renders.
 */
export default function SkillOrbit({
  progressRef,
}: {
  /** Shared 0..1 scroll progress for the hero, read each frame. */
  progressRef?: React.RefObject<number>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Five labels on a phone, all ten from `sm` up. Memoised so the effect below
  // does not tear down on unrelated renders.
  const skills = useMemo(
    () => (isMobile ? heroSkills.filter((s) => s.mobile) : heroSkills),
    [isMobile],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const items = itemRefs.current.slice(0, skills.length);
    if (items.some((el) => !el)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Settled state: anchors, full opacity, no drift, no parallax.
    if (reduced) {
      items.forEach((el) => {
        if (!el) return;
        el.style.transform = "translate3d(-50%, -50%, 0)";
      });
      return;
    }

    let targetMx = 0;
    let targetMy = 0;
    let mx = 0;
    let my = 0;

    const onPointer = (e: PointerEvent) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMy = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Phone: no cursor to track, so skip the listener entirely.
    const usePointer = !window.matchMedia("(max-width: 640px)").matches;
    if (usePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      mx += (targetMx - mx) * 0.045;
      my += (targetMy - my) * 0.045;

      const scroll = progressRef?.current ?? 0;

      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        const skill = skills[i];
        // Skip a missing node rather than returning — a bare `return` here
        // would abandon the whole loop without rescheduling it.
        if (!el || !skill) continue;

        const phase = (t / skill.period) * Math.PI * 2 + i * 1.7;
        const [ox, oy] = offset(skill.motion, phase);

        // Chips push outward and fade as the hero scrolls away.
        const outX = (skill.x - 50) * scroll * 1.1;
        const outY = (skill.y - 50) * scroll * 0.5;

        const x = ox * skill.amplitude + mx * 11 * (0.4 + (i % 3) * 0.3) + outX;
        const y =
          oy * skill.amplitude * 0.8 + my * 11 * (0.4 + (i % 4) * 0.22) + outY;

        // Breathing scale, slightly out of phase with the drift.
        const breathe = 1 + Math.sin(phase * 0.5) * 0.035;

        el.style.transform =
          `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) ` +
          `scale(${breathe.toFixed(3)})`;
      }

      // One opacity write for the whole layer as the hero scrolls away, rather
      // than ten that would each have to re-implement the entrance.
      host.style.opacity = (1 - scroll).toFixed(3);

      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame && visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    wake();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (usePointer) window.removeEventListener("pointermove", onPointer);
    };
  }, [skills, progressRef]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40"
    >
      <ul className="relative h-full w-full">
        {skills.map((skill, i) => (
          <li
            key={skill.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="animate-chip-in absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-[oklch(16%_0.04_274/0.72)] px-2.5 py-1 text-[10px] font-medium text-white/85 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              // Resting position. The loop overwrites transform each frame;
              // if it never runs, this is already the correct placement.
              transform: "translate3d(-50%, -50%, 0)",
              willChange: "transform",
              ["--rise-delay" as string]: `${400 + i * 90}ms`,
            } as React.CSSProperties}
          >
            <span
              className="size-1.5 shrink-0 rounded-full sm:size-2"
              style={{
                background: skill.hue,
                boxShadow: `0 0 8px ${skill.hue}, 0 0 14px ${skill.hue}66`,
                animation: "node-pulse 2.6s ease-in-out infinite",
                animationDelay: `${i * 0.28}s`,
              }}
            />
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
