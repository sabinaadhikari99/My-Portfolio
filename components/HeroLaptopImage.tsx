"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SRC = "/hero-laptop.png";

/**
 * The hero's rendered laptop.
 *
 * The source image ships with its own opaque blue field, which would otherwise
 * sit on the site's near-black ground as a hard-edged rectangle. A radial mask
 * dissolves the outer third so the render's background bleeds into the page
 * instead of ending at a seam — the backdrop's wireframes and particles show
 * through around it.
 *
 * Motion is a spring, not a transition: pointer and scroll handlers only write
 * targets, and a single rAF loop integrates toward them. That gives the tilt a
 * short overshoot and lets it keep drifting for a beat after the cursor stops.
 * The loop parks itself when settled, off-screen, or the tab is hidden, and
 * never starts under prefers-reduced-motion.
 */
export default function HeroLaptopImage({ alt }: { alt: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const tilt = tiltRef.current;
    if (!host || !tilt) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;
    let velX = 0;
    let velY = 0;

    const STIFFNESS = 0.05;
    const DAMPING = 0.84;

    const onPointer = (e: PointerEvent) => {
      // No tilt on phones — there is no cursor, and the listener would only
      // fire on taps.
      if (window.innerWidth < 768) return;
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      // Clamped so a cursor far to one side cannot swing the render over.
      targetRotY = Math.max(-1, Math.min(1, nx)) * 7;
      targetRotX = Math.max(-1, Math.min(1, ny)) * -5;
      wake();
    };

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // Normalised to 60fps steps so the spring feels the same on a 120Hz
      // panel, and clamped so a stalled tab cannot fling it.
      const steps = Math.min((now - (last || now)) / 16.67, 3);
      last = now;

      velX = (velX + (targetRotX - rotX) * STIFFNESS * steps) * DAMPING;
      velY = (velY + (targetRotY - rotY) * STIFFNESS * steps) * DAMPING;
      rotX += velX * steps;
      rotY += velY * steps;

      // Idle float, so the object is never completely still.
      const floatY = Math.sin(t * 0.55) * 7;
      const floatRot = Math.sin(t * 0.37) * 0.7;

      tilt.style.transform =
        `perspective(1400px) translate3d(0, ${floatY.toFixed(2)}px, 0) ` +
        `rotateX(${(rotX + floatRot * 0.4).toFixed(3)}deg) ` +
        `rotateY(${(rotY + floatRot).toFixed(3)}deg)`;

      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    let last = 0;

    function wake() {
      if (!frame && visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

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

    wake();
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative w-full max-w-[38rem] sm:max-w-[46rem] lg:max-w-[56rem]"
    >
      <div
        ref={tiltRef}
        className="relative aspect-[1557/1010] w-full will-change-transform"
      >
        <Image
          src={SRC}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 66vw, 56rem"
          className="object-contain"
          style={{
            // Dissolve the render's own background into the page. Kept in sync
            // with the -webkit- copy below for Safari.
            maskImage:
              "radial-gradient(ellipse 82% 78% at 50% 48%, #000 62%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 82% 78% at 50% 48%, #000 62%, transparent 92%)",
          }}
        />
      </div>
    </div>
  );
}
