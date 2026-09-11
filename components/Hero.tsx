import Image from "next/image";
import { emailHref, links, person, skillGroups } from "@/content/profile";
import SocialLinks from "./SocialLinks";
import { ArrowDownIcon, ArrowIcon, LocationIcon, MailIcon } from "./Icons";

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
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      aria-label="Introduction"
    >
      {/* A single, very soft accent wash — the only decorative element on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent blur-3xl opacity-60"
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <p
              className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              <span aria-hidden>👋</span>
              Welcome to my portfolio
            </p>

            <h1
              className="animate-rise mt-6 font-display text-display text-foreground"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              Hi, I&rsquo;m <span className="text-primary">{person.name}</span>
            </h1>

            <p
              className="animate-rise mt-5 text-2xl leading-snug text-muted-foreground md:text-3xl"
              style={{ "--rise-delay": "140ms" } as React.CSSProperties}
            >
              {person.role}
              <span className="block text-primary">{person.tagline}</span>
            </p>

            <p
              className="animate-rise mt-7 max-w-2xl text-lg leading-relaxed text-foreground-muted"
              style={{ "--rise-delay": "200ms" } as React.CSSProperties}
            >
              {person.intro}
            </p>

            {/* Location and email — the two things a recruiter checks first. */}
            <ul
              className="animate-rise mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
              style={{ "--rise-delay": "260ms" } as React.CSSProperties}
            >
              <li className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 shrink-0 text-subtle" />
                {person.location}
              </li>
              {emailHref ? (
                <li>
                  <a
                    href={emailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-subtle" />
                    {links.EMAIL_ADDRESS}
                  </a>
                </li>
              ) : null}
            </ul>

            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ "--rise-delay": "320ms" } as React.CSSProperties}
            >
              <SocialLinks variant="solid" />
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
              >
                Get in touch
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm text-foreground transition-colors duration-300 hover:border-primary"
              >
                View my work
              </a>
              {links.RESUME_URL ? (
                <a
                  href={links.RESUME_URL}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm text-foreground transition-colors duration-300 hover:border-primary"
                >
                  R&eacute;sum&eacute;
                </a>
              ) : null}
            </div>
          </div>

          {/* Portrait. Sits above the copy on phones, beside it from lg up. */}
          {person.photo ? (
            <div
              className="animate-rise order-first lg:order-last"
              style={{ "--rise-delay": "120ms" } as React.CSSProperties}
            >
              <div className="relative mx-auto w-56 sm:w-72 lg:w-full lg:max-w-sm">
                <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-card bg-muted shadow-[0_18px_50px_-24px_rgba(21,23,28,0.35)]">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 24rem"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Availability, stated plainly rather than as an invented statistic. */}
                <p className="absolute -bottom-2 right-0 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-[0_10px_24px_-12px_rgba(11,98,214,0.9)] sm:right-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
                  />
                  Open to work
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Technology strip — the 5-second answer to "what does she work with?" */}
        <div
          className="animate-rise mt-16 border-t border-border pt-6"
          style={{ "--rise-delay": "380ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="eyebrow">Working with</span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {marquee.map((tech) => (
                <li key={tech} className="text-sm text-foreground-muted">
                  {tech}
                </li>
              ))}
              <li className="text-sm text-subtle">
                +{Math.max(skillCount - marquee.length, 0)} more
              </li>
            </ul>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to the About section"
          className="animate-rise mt-12 inline-flex h-10 w-10 items-center justify-center rounded-full text-subtle transition-colors duration-300 hover:bg-accent hover:text-primary"
          style={{ "--rise-delay": "440ms" } as React.CSSProperties}
        >
          <ArrowDownIcon className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
