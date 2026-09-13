"use client";

import { useEffect, useRef } from "react";
import { person } from "@/content/profile";
import { PlayIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import ProfileLaptop from "./ProfileLaptop";

const particles = [
  { left: "8%", top: "12%", size: 1, opacity: 0.3, delay: "0s", dur: "6s" },
  { left: "15%", top: "65%", size: 1.5, opacity: 0.2, delay: "1s", dur: "8s" },
  { left: "22%", top: "30%", size: 1, opacity: 0.25, delay: "2s", dur: "7s" },
  { left: "35%", top: "80%", size: 1, opacity: 0.15, delay: "3s", dur: "9s" },
  { left: "45%", top: "15%", size: 1.5, opacity: 0.2, delay: "0.5s", dur: "7s" },
  { left: "55%", top: "55%", size: 1, opacity: 0.2, delay: "2.5s", dur: "6s" },
  { left: "62%", top: "85%", size: 1, opacity: 0.15, delay: "1.5s", dur: "8s" },
  { left: "70%", top: "25%", size: 1.5, opacity: 0.25, delay: "3.5s", dur: "7s" },
  { left: "78%", top: "70%", size: 1, opacity: 0.2, delay: "0.8s", dur: "9s" },
  { left: "85%", top: "40%", size: 1, opacity: 0.15, delay: "2.2s", dur: "6s" },
  { left: "90%", top: "10%", size: 1.5, opacity: 0.2, delay: "4s", dur: "8s" },
  { left: "92%", top: "75%", size: 1, opacity: 0.15, delay: "1.2s", dur: "7s" },
  { left: "5%", top: "45%", size: 2, opacity: 0.25, delay: "0.3s", dur: "10s" },
  { left: "50%", top: "8%", size: 1.5, opacity: 0.2, delay: "2.8s", dur: "8s" },
  { left: "30%", top: "92%", size: 1, opacity: 0.15, delay: "1.8s", dur: "9s" },
  { left: "68%", top: "5%", size: 1, opacity: 0.2, delay: "3.2s", dur: "7s" },
  { left: "42%", top: "60%", size: 1.5, opacity: 0.15, delay: "0.6s", dur: "8s" },
  { left: "88%", top: "55%", size: 1, opacity: 0.2, delay: "2.4s", dur: "6s" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const laptop = laptopRef.current;
    const text = textRef.current;
    if (!hero || !laptop || !text) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let currentProgress = 0;
    let targetProgress = 0;
    let frame = 0;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const scrollableDistance = heroHeight - window.innerHeight;
      if (scrollableDistance <= 0) {
        targetProgress = 0;
        return;
      }
      targetProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;

      if (currentProgress > 0.001) {
        const p = currentProgress;
        const eased = p * p * (3 - 2 * p);

        const vw = window.innerWidth;
        const laptopCenterX = vw > 768 ? vw * 0.65 : vw * 0.5;
        const centerX = vw / 2;
        const tx = (centerX - laptopCenterX) * eased;
        const ty = eased * 30;
        const s = 1 + eased * 0.15;
        const r = eased * -3;

        laptop.style.transform = `translate(${tx}px, ${ty}px) scale(${s}) rotate(${r}deg)`;
        laptop.style.opacity = `${1 - p * 0.3}`;
        text.style.opacity = `${1 - eased * 0.6}`;
        text.style.transform = `translateY(${eased * -20}px)`;
      } else {
        laptop.style.transform = "";
        laptop.style.opacity = "";
        text.style.transform = "";
        text.style.opacity = "";
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-section relative min-h-screen overflow-hidden bg-[#0b1120] pt-24"
      aria-label="Introduction"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundSize: "48px 48px",
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          }}
        />
        <div className="absolute left-[30%] top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-900/[0.07] blur-[100px]" />
        <div className="absolute right-[10%] top-[30%] h-[400px] w-[400px] rounded-full bg-purple-900/[0.05] blur-[80px]" />
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute animate-float rounded-full bg-white"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      <div className="shell relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
        {/* Left Content */}
        <div ref={textRef} className="max-w-2xl pb-20 pt-8 lg:pb-0 lg:pt-0">
          <div
            className="hero-badge animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 backdrop-blur-sm"
            style={{ "--rise-delay": "100ms" } as React.CSSProperties}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span className="text-xs font-medium text-sky-300">
              Software Development Intern @ DRDO
            </span>
          </div>

          <h1
            className="hero-title animate-rise mt-3 font-display text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            {person.name.split(" ")[0].toUpperCase()}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
              {person.name.split(" ").slice(1).join(" ").toUpperCase()}
            </span>
          </h1>

          <p
            className="hero-subtitle animate-rise mt-5 text-xl font-medium text-slate-300 sm:text-2xl"
            style={{ "--rise-delay": "340ms" } as React.CSSProperties}
          >
            Passionate Software Engineer
            <br />
            <span className="text-sky-400">
              {person.availability.split(" ").slice(0, 2).join(" ")} Enthusiast
            </span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-sky-400" />
          </p>

          <p
            className="hero-description animate-rise mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ "--rise-delay": "440ms" } as React.CSSProperties}
          >
            Building scalable software using {person.intro.split(".").slice(0, 1)}.
          </p>

          <div
            className="hero-buttons animate-rise mt-8 flex flex-wrap items-center gap-4"
            style={{ "--rise-delay": "540ms" } as React.CSSProperties}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(14,165,233,0.25)] transition-all duration-300 hover:bg-sky-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
            >
              <PlayIcon className="h-4 w-4" />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/40 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/60"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div
            className="hero-links animate-rise mt-5 flex items-center gap-4"
            style={{ "--rise-delay": "600ms" } as React.CSSProperties}
          >
            <a
              href="#github"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/40 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/40 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Visual — Laptop */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            ref={laptopRef}
            className="hero-laptop relative h-[30rem] w-full max-w-[46rem] md:h-[34rem]"
          >
            <ProfileLaptop photo={person.photo} name={person.name} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span className="block text-[10px] font-bold tracking-[0.25em] text-slate-500/60">
          SCROLL
        </span>
        <div className="mt-2 flex justify-center">
          <div className="h-3.5 w-3.5 rotate-45 border-b border-r border-slate-500/40" />
        </div>
      </div>
    </section>
  );
}
