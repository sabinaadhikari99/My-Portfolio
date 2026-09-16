"use client";

import { useEffect, useRef } from "react";
import { person } from "@/content/profile";
import HeroLaptopImage from "./HeroLaptopImage";
import HeroWireframes from "./HeroWireframes";
import SkillOrbit from "./SkillOrbit";

/**
 * The hero stage, composed in three depth layers:
 *
 *   z-0   wireframe solids + starfield   (HeroWireframes, canvas)
 *   z-20  technology labels and nodes    (SkillOrbit, DOM)
 *   z-30  the laptop render              (HeroLaptopImage)
 *
 * Each layer runs its own cursor parallax at a different weight, which is what
 * separates them in space rather than leaving them looking like stacked flat
 * images. The pointer tilt and idle float on the laptop itself live inside
 * HeroLaptopImage.
 *
 * Scroll progress is owned here and shared with the skill layer through a ref,
 * so one measurement drives the whole scene and the layers stay in step.
 */
export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    const drift = driftRef.current;
    if (!stage || !drift) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 0;
    let current = 0;
    let frame = 0;
    let visible = true;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      // 0 while the stage sits in view, 1 once it has scrolled fully past.
      target = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
    };

    const tick = () => {
      current += (target - current) * 0.09;
      progressRef.current = current;

      // The laptop drifts toward centre, scales down a touch and fades as the
      // hero leaves — it hands off to the next section rather than just
      // scrolling away.
      const y = current * 54;
      const scale = 1 - current * 0.06;

      drift.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      drift.style.opacity = (1 - current * 0.35).toFixed(3);

      if (glowRef.current) {
        // The render carries its own glow; a second one at full strength just
        // washes out the screen. Kept in step with the class on the element.
        glowRef.current.style.opacity = (0.28 * (1 - current)).toFixed(3);
      }

      if (Math.abs(target - current) < 0.0005 || !visible || document.hidden) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      measure();
      if (!frame && visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      },
      { threshold: 0 },
    );
    io.observe(stage);

    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto flex w-full max-w-[38rem] items-center justify-center sm:max-w-[46rem] lg:max-w-none"
    >
      {/* Background layer - wireframe solids and stars. Last of the entrance
          phases to arrive, so it settles in behind an already-placed laptop. */}
      <div className="hero-wire-enter absolute inset-0 z-0">
        <HeroWireframes />
      </div>

      {/* Atmospheric glow sitting under the laptop. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-10 z-10 rounded-full opacity-[0.28] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.552 0.22 264 / 55%), transparent 70%)",
        }}
      />

      {/* Midground - technology labels and glowing nodes. */}
      <SkillOrbit progressRef={progressRef} />

      {/* Foreground - the laptop.
          Two nested wrappers on purpose: the scroll loop writes an inline
          transform to the outer one, and a running CSS animation would
          override that. The entrance therefore gets an element of its own. */}
      <div
        ref={driftRef}
        className="relative z-30 flex w-full justify-center px-[9%] will-change-transform sm:px-[11%]"
      >
        <div className="hero-laptop-enter flex w-full justify-center">
          <HeroLaptopImage
            alt={`A laptop showing the code “const engineer { name: ${person.name}, stack: Next.js, Django }” beside a photograph of ${person.name}.`}
          />
        </div>
      </div>
    </div>
  );
}
