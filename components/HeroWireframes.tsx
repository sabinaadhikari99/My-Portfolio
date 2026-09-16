"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Minimal 3D: vertices, edges, a rotation matrix and a perspective divide.

   This is the same maths a WebGL pipeline runs, just rasterised with canvas
   line drawing. For two wireframe solids and a starfield that is far cheaper
   than shipping three.js, and it keeps the hero free of a GL context that
   would otherwise sit alongside the laptop's DOM/CSS 3D.
--------------------------------------------------------------------------- */

type Vec3 = [number, number, number];
type Shape = { points: Vec3[]; edges: [number, number][] };

/** Icosahedron built from the three golden-ratio rectangles. */
function icosahedron(): Shape {
  const t = (1 + Math.sqrt(5)) / 2;
  const points: Vec3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  // Every pair at the minimum separation is an edge — avoids hand-listing 30.
  const edges: [number, number][] = [];
  let min = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(
        points[i][0] - points[j][0],
        points[i][1] - points[j][1],
        points[i][2] - points[j][2],
      );
      if (d < min - 1e-6) min = d;
    }
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(
        points[i][0] - points[j][0],
        points[i][1] - points[j][1],
        points[i][2] - points[j][2],
      );
      if (Math.abs(d - min) < 1e-6) edges.push([i, j]);
    }
  }
  const scale = 1 / Math.hypot(1, t);
  return { points: points.map(([x, y, z]) => [x * scale, y * scale, z * scale]), edges };
}

/** Torus as a ring of rings, wired along both the tube and the sweep. */
function torus(major = 1, minor = 0.36, seg = 16, ring = 8): Shape {
  const points: Vec3[] = [];
  const edges: [number, number][] = [];
  for (let i = 0; i < seg; i++) {
    const u = (i / seg) * Math.PI * 2;
    for (let j = 0; j < ring; j++) {
      const v = (j / ring) * Math.PI * 2;
      const r = major + minor * Math.cos(v);
      points.push([r * Math.cos(u), minor * Math.sin(v), r * Math.sin(u)]);
      const here = i * ring + j;
      edges.push([here, i * ring + ((j + 1) % ring)]);
      edges.push([here, ((i + 1) % seg) * ring + j]);
    }
  }
  return { points, edges };
}

function rotate([x, y, z]: Vec3, rx: number, ry: number, rz: number): Vec3 {
  let a = y * Math.cos(rx) - z * Math.sin(rx);
  let b = y * Math.sin(rx) + z * Math.cos(rx);
  y = a; z = b;
  a = x * Math.cos(ry) + z * Math.sin(ry);
  b = -x * Math.sin(ry) + z * Math.cos(ry);
  x = a; z = b;
  a = x * Math.cos(rz) - y * Math.sin(rz);
  b = x * Math.sin(rz) + y * Math.cos(rz);
  return [a, b, z];
}

type Solid = {
  shape: Shape;
  /** Centre as a fraction of the canvas box. */
  cx: number;
  cy: number;
  /** Radius in px at a 520px-tall stage; scaled with the box. */
  size: number;
  speed: Vec3;
  colour: string;
  /** Parallax weight — further objects move less under the cursor. */
  depth: number;
};

const STARS = 46;

/**
 * Background layer for the hero: two slowly rotating wireframe solids and a
 * drifting starfield, both reacting to the cursor at their own parallax rate.
 *
 * Sits behind the laptop and never in front of it, so it reads as depth rather
 * than as clutter. Parks its frame loop when off-screen or the tab is hidden,
 * and does not start at all under prefers-reduced-motion — the shapes are
 * drawn once, static, so the composition still holds.
 */
export default function HeroWireframes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const solids: Solid[] = [
      {
        shape: icosahedron(),
        cx: 0.2, cy: 0.16, size: 74,
        speed: [0.055, 0.075, 0.02],
        colour: "120, 150, 255",
        depth: 0.55,
      },
      {
        shape: torus(),
        cx: 0.84, cy: 0.8, size: 70,
        speed: [0.07, 0.04, 0.03],
        colour: "168, 128, 250",
        depth: 0.8,
      },
    ];

    const stars = Array.from({ length: STARS }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.4,
      a: 0.2 + Math.random() * 0.5,
      twinkle: 0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      depth: 0.15 + Math.random() * 0.6,
    }));

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let targetX = 0;
    let targetY = 0;
    let mx = 0;
    let my = 0;

    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      wake();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // The stage is designed at 520px tall; scale everything from that so the
      // composition holds at tablet and phone sizes.
      const k = Math.min(w / 560, h / 520, 1);

      for (const s of stars) {
        const px = s.x * w + mx * 14 * s.depth;
        const py = s.y * h + my * 14 * s.depth;
        const flicker = reduced
          ? 1
          : 0.65 + 0.35 * Math.sin(t * s.twinkle + s.phase);
        ctx.beginPath();
        ctx.arc(px, py, s.r * k, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 210, 255, ${s.a * flicker})`;
        ctx.fill();
      }

      for (const solid of solids) {
        const [sx, sy, sz] = solid.speed;
        const rx = reduced ? 0.4 : t * sx;
        const ry = reduced ? 0.7 : t * sy;
        const rz = reduced ? 0.1 : t * sz;

        const cx = solid.cx * w + mx * 30 * solid.depth;
        const cy = solid.cy * h + my * 30 * solid.depth;
        const size = solid.size * k;

        const projected = solid.shape.points.map((p) => {
          const [x, y, z] = rotate(p, rx, ry, rz);
          // Perspective divide. 3.2 is far enough back that the solid reads as
          // 3D without the near vertices ballooning.
          const persp = 3.2 / (3.2 + z);
          return { x: cx + x * size * persp, y: cy + y * size * persp, z };
        });

        ctx.lineWidth = 1;
        for (const [a, b] of solid.shape.edges) {
          const p1 = projected[a];
          const p2 = projected[b];
          // Fade edges that have rotated to the back — cheap depth cueing.
          const depth = (p1.z + p2.z) / 2;
          const alpha = 0.1 + 0.26 * (1 - (depth + 1) / 2);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${solid.colour}, ${alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }
    };

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const tick = (now: number) => {
      mx += (targetX - mx) * 0.05;
      my += (targetY - my) * 0.05;
      draw((now - start) / 1000);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    function wake() {
      if (!frame && !reduced && visible && !document.hidden) {
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
    io.observe(canvas);

    const onResize = () => {
      resize();
      if (reduced) draw(0);
      else wake();
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    };

    if (reduced) draw(0);
    else wake();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
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
