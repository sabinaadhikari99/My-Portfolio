import { heroRoles, links, person, whatsappHref } from "@/content/profile";
import HeroVisual from "./HeroVisual";
import Typewriter from "./Typewriter";
import {
  ChevronDownIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  RocketIcon,
  WhatsAppIcon,
} from "./Icons";

const socials = [
  { href: links.LINKEDIN_URL, label: "LinkedIn", Icon: LinkedInIcon },
  { href: links.GITHUB_URL, label: "GitHub", Icon: GitHubIcon },
  { href: whatsappHref, label: "WhatsApp", Icon: WhatsAppIcon },
  {
    href: links.EMAIL_ADDRESS
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.EMAIL_ADDRESS)}`
      : undefined,
    label: "Email",
    Icon: MailIcon,
  },
].filter((s): s is { href: string; label: string; Icon: typeof MailIcon } =>
  Boolean(s.href),
);

const [firstName, ...restName] = person.name.split(" ");

/**
 * Full-height opening screen. Text on the left rises in on load with a stagger;
 * the laptop on the right scales up and then tracks the pointer (see
 * HeroVisual). Static markup apart from the typewriter and the tilt, so the
 * headline is in the HTML for crawlers and renders before any JS runs.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="shell relative flex min-h-screen flex-col justify-center pb-16 pt-28 sm:pt-32"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <span
            className="animate-rise glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground"
            style={{ "--rise-delay": "60ms" } as React.CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-cyan" />
            {person.availability}
          </span>

          <h1
            className="animate-rise mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ "--rise-delay": "140ms" } as React.CSSProperties}
          >
            {firstName.toUpperCase()}
            <br />
            <span className="gradient-text">
              {restName.join(" ").toUpperCase()}
            </span>
          </h1>

          <p
            className="animate-rise mt-4 font-display text-lg text-muted-foreground sm:text-xl"
            style={{ "--rise-delay": "220ms" } as React.CSSProperties}
          >
            {person.role}
          </p>

          <div
            className="animate-rise mt-2 h-9"
            style={{ "--rise-delay": "280ms" } as React.CSSProperties}
          >
            <Typewriter
              words={heroRoles}
              className="font-display text-xl font-semibold sm:text-2xl"
            />
          </div>

          <p
            className="animate-rise mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ "--rise-delay": "360ms" } as React.CSSProperties}
          >
            {person.tagline} {person.intro.split("-")[0].trim()}.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap gap-3"
            style={{ "--rise-delay": "440ms" } as React.CSSProperties}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--gradient-brand)" }}
            >
              <RocketIcon className="h-4 w-4" />
              View Projects
            </a>
            <a
              href={links.RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass gradient-border inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <ul
            className="animate-rise mt-6 flex flex-wrap items-center gap-3"
            style={{ "--rise-delay": "520ms" } as React.CSSProperties}
          >
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="glass gradient-border group grid size-11 place-items-center rounded-xl text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-foreground hover:shadow-[0_0_24px_-4px_oklch(0.552_0.22_264/0.7)]"
                >
                  <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>

      <a
        href="#about"
        className="animate-rise mx-auto mt-12 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        style={{ "--rise-delay": "900ms" } as React.CSSProperties}
      >
        Scroll
        <span className="animate-float">
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </span>
      </a>
    </section>
  );
}
