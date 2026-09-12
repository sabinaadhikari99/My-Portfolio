"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";

const sectionIds = nav.map((item) => item.href.slice(1));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-border bg-card/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-foreground"
          aria-label={`${person.name} — back to top`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
            {person.name.charAt(0)}
          </span>
          {person.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover md:inline-block"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-card md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ "--rise-delay": `${i * 45}ms` } as React.CSSProperties}
                  className="animate-rise block border-b border-border py-4 font-display text-2xl font-bold text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-accent px-6 py-3.5 text-center text-sm font-semibold text-accent-foreground"
          >
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
}
