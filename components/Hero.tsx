import Image from "next/image";
import { emailHref, links, person, skillGroups } from "@/content/profile";
import SocialLinks from "./SocialLinks";
import { ArrowDownIcon, ArrowIcon, LocationIcon, MailIcon } from "./Icons";

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
      className="relative overflow-hidden bg-card pt-32 pb-20 md:pt-40 md:pb-28"
      aria-label="Introduction"
    >
      {/* Decorative accent shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent-light opacity-60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[20rem] w-[20rem] rounded-full bg-muted opacity-80 blur-3xl"
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <p
              className="animate-rise inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-light-foreground"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {person.availability}
            </p>

            <h1
              className="animate-rise mt-6 font-display text-display font-bold text-foreground"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              Hi, I&rsquo;m{" "}
              <span className="text-accent">{person.name.split(" ")[0]}</span>,
              <br />
              <span className="text-muted-foreground">{person.role}</span>
            </h1>

            <p
              className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl"
              style={{ "--rise-delay": "140ms" } as React.CSSProperties}
            >
              {person.tagline}
            </p>

            <p
              className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
              style={{ "--rise-delay": "180ms" } as React.CSSProperties}
            >
              {person.intro}
            </p>

            <ul
              className="animate-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
              style={{ "--rise-delay": "220ms" } as React.CSSProperties}
            >
              <li className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 shrink-0 text-accent" />
                {person.location}
              </li>
              {emailHref ? (
                <li>
                  <a
                    href={emailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline flex items-center gap-2 transition-colors duration-300 hover:text-accent"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-accent" />
                    {links.EMAIL_ADDRESS}
                  </a>
                </li>
              ) : null}
            </ul>

            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ "--rise-delay": "280ms" } as React.CSSProperties}
            >
              <SocialLinks variant="solid" />
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover"
              >
                Get in touch
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground"
              >
                View my work
              </a>
              {links.RESUME_URL ? (
                <a
                  href={links.RESUME_URL}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground"
                >
                  R&eacute;sum&eacute;
                </a>
              ) : null}
            </div>
          </div>

          {/* Portrait */}
          {person.photo ? (
            <div
              className="animate-rise order-first lg:order-last"
              style={{ "--rise-delay": "120ms" } as React.CSSProperties}
            >
              <div className="relative mx-auto w-56 sm:w-72 lg:w-full lg:max-w-sm">
                <div className="relative aspect-square overflow-hidden rounded-2xl border-[5px] border-card bg-muted shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 24rem"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -right-3 top-6 rounded-full bg-card px-3 py-2 shadow-lg animate-float" style={{ animationDelay: "0s" }}>
                  <span className="text-xs font-semibold text-foreground">{person.role}</span>
                </div>

                <p className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-[0_8px_24px_-8px_rgba(217,119,6,0.5)]">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-accent-foreground"
                  />
                  Open to work
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Technology strip */}
        <div
          className="animate-rise mt-16 border-t border-border pt-6"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="eyebrow">Working with</span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {marquee.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground-muted"
                >
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
          className="animate-rise mt-12 inline-flex h-10 w-10 items-center justify-center rounded-full text-subtle transition-colors duration-300 hover:bg-accent-light hover:text-accent"
          style={{ "--rise-delay": "400ms" } as React.CSSProperties}
        >
          <ArrowDownIcon className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
