"use client";

import { useEffect, useRef } from "react";

type Particle = {
  /** Base position in normalised space, 0..1. */
  bx: number;
  by: number;
  /** Drift velocity, normalised units per second. */
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  /** Parallax weight — nearer particles react more to the pointer. */
  depth: number;
  hue: 0 | 1 | 2;
};

/** Brand ramp, matching --primary / --accent / --cyan. */
const HUES = ["99, 132, 255", "150, 95, 245", "60, 200, 225"] as const;

const COUNT_DESKTOP = 90;
const COUNT_MOBILE = 40;

/**
 * Drifting particle field rendered on a 2D canvas.
 *
 * The reference site puts a three.js point cloud here. A WebGL renderer plus
 * react-three-fiber is roughly 600KB for an ambient layer nobody looks at
 * directly, so this draws the same effect — slow drift, depth parallax, brand
 * hues — with no dependencies.
 *
 * Costs are kept down deliberately: DPR is capped at 2, the field pauses when
 * the tab is hidden, pointer input is sampled into a target and eased toward
 * on each frame (rather than handled per event), and the whole thing refuses
 * to start under prefers-reduced-motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const count = window.innerWidth < 768 ? COUNT_MOBILE : COUNT_DESKTOP;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      bx: Math.random(),
      by: Math.random(),
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012,
      radius: 0.6 + Math.random() * 1.7,
      alpha: 0.18 + Math.random() * 0.45,
      depth: 0.3 + Math.random() * 0.7,
      hue: Math.floor(Math.random() * 3) as 0 | 1 | 2,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Pointer parallax. `target` is written by events; `current` chases it on
    // the animation frame, which is what gives the layer its lag/inertia.
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let running = true;
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      // Clamp dt so a backgrounded tab does not teleport every particle.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.bx += p.vx * dt;
        p.by += p.vy * dt;

        // Wrap rather than bounce — no visible edges.
        if (p.bx < -0.05) p.bx = 1.05;
        if (p.bx > 1.05) p.bx = -0.05;
        if (p.by < -0.05) p.by = 1.05;
        if (p.by > 1.05) p.by = -0.05;

        const x = p.bx * width + currentX * 26 * p.depth;
        const y = p.by * height + currentY * 26 * p.depth;

        ctx.beginPath();
        ctx.arc(x, y, p.radius * p.depth + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${HUES[p.hue]}, ${p.alpha * p.depth})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
