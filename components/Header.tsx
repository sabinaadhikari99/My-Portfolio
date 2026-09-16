"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";
import { CloseIcon, MenuIcon } from "./Icons";

const sectionIds = ["top", ...nav.map((item) => item.href.slice(1))];

/**
 * Floating navigation card. Sits over the hero rather than on a bar, tightens
 * its padding once the page scrolls, and marks the section currently in view
 * with a pill that sits behind the label.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

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

  // Lock the page behind the mobile sheet, and let Escape close it.
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5">
      <nav
        aria-label="Primary"
        className={`glass-strong gradient-border animate-rise-down w-full max-w-6xl rounded-2xl px-4 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <a href="#top" className="group flex items-center gap-2.5">
            <span
              className={`relative overflow-hidden rounded-xl border border-border bg-background/40 transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "size-7" : "size-8"
              }`}
            >
              <Image
                src={person.avatar}
                alt=""
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              {person.name}
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-lg bg-secondary"
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div id="mobile-menu" hidden={!open} className="lg:hidden">
          <ul className="mt-3 grid gap-1 border-t border-border pt-3">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={
                    { "--rise-delay": `${i * 40}ms` } as React.CSSProperties
                  }
                  className="animate-rise block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
