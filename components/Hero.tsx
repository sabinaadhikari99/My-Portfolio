import { person, skillGroups } from "@/content/profile";
import SocialLinks from "./SocialLinks";
import { ArrowIcon } from "./Icons";

/** The technologies a recruiter should see without scrolling. */
const marquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Django",
  "FastAPI",
  "PostgreSQL",
];

export default function Hero() {
  const skillCount = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
      aria-label="Introduction"
    >
      {/* A single, very soft warm wash — the only decorative element on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent-soft blur-3xl opacity-60"
      />

      <div className="shell relative">
        <p
          className="animate-rise eyebrow"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {person.location} · {person.availability}
        </p>

        <h1
          className="animate-rise mt-6 max-w-5xl font-display text-display text-ink"
          style={{ "--rise-delay": "80ms" } as React.CSSProperties}
        >
          Hi, I&rsquo;m {person.name}.
          <br />
          <span className="text-muted">{person.tagline}</span>
        </h1>

        <p
          className="animate-rise mt-8 max-w-2xl text-lg leading-relaxed text-graphite md:text-xl"
          style={{ "--rise-delay": "160ms" } as React.CSSProperties}
        >
          {person.intro}
        </p>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ "--rise-delay": "240ms" } as React.CSSProperties}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
          >
            View my work
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm text-ink transition-colors duration-300 hover:border-ink"
          >
            Get in touch
          </a>
          <SocialLinks className="ml-1" />
        </div>

        {/* Technology strip — the 5-second answer to "what does she work with?" */}
        <div
          className="animate-rise mt-16 border-t border-line pt-6"
          style={{ "--rise-delay": "320ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="eyebrow">Working with</span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {marquee.map((tech) => (
                <li key={tech} className="text-sm text-graphite">
                  {tech}
                </li>
              ))}
              <li className="text-sm text-faint">
                +{Math.max(skillCount - marquee.length, 0)} more
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
