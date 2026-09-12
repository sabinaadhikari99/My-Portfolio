import Image from "next/image";
import { projects, type Project } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import { ExternalIcon, GitHubIcon } from "./Icons";

function Cover({ project, index }: { project: Project; index: number }) {
  const initials = project.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (project.name === "Office Management System") {
    return (
      <div className="group/cover relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-secondary">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:2rem_2rem]" />
        <div className="relative flex h-full flex-col items-center justify-center">
          <span className="font-display text-7xl font-bold text-primary/20 md:text-8xl">
            OM
          </span>
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-accent-foreground backdrop-blur-sm">
          FEATURED
        </span>
      </div>
    );
  }

  if (project.name === "Online Pharmacy") {
    return (
      <div className="group/cover relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#edf8f8] via-card to-[#f0fafb] text-[#123b45]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_42%,rgba(181,229,231,0.85),transparent_42%)]" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-border bg-white/65 px-4 py-3 backdrop-blur-sm md:px-6">
            <span className="font-display text-xl font-bold tracking-tight">
              Shop<span className="text-accent">.</span>
            </span>
            <div className="ml-auto hidden h-8 w-2/5 items-center rounded-lg border border-border bg-muted px-3 text-[0.55rem] text-muted-foreground sm:flex">
              Search medicines, health products...
              <span className="ml-auto rounded-full bg-accent px-2 py-1 font-semibold text-white">
                Search
              </span>
            </div>
            <span className="text-[0.58rem] text-muted-foreground">About</span>
            <span className="text-[0.58rem] text-muted-foreground">Contact</span>
            <span className="rounded-md bg-accent px-2.5 py-1.5 text-[0.58rem] font-semibold text-white">
              Login
            </span>
          </div>
          <div className="grid flex-1 grid-cols-[1.05fr_0.95fr] items-center gap-3 px-5 py-5 md:px-8">
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-white/85 px-2.5 py-1 text-[0.48rem] font-semibold text-accent shadow-sm">
                Nepal&apos;s Trusted Online Pharmacy
              </span>
              <h3 className="mt-3 max-w-[15rem] font-display text-3xl font-bold leading-[0.92] tracking-tight text-foreground md:text-4xl">
                Genuine Medicines,
                <br />
                <span className="text-accent">Delivered</span> to Your Door
              </h3>
              <p className="mt-3 max-w-[13rem] text-[0.58rem] leading-relaxed text-muted-foreground">
                Your trusted online pharmacy for authentic medicines and health
                products, delivered fast across Nepal.
              </p>
              <span className="mt-4 inline-flex rounded-lg bg-accent px-3.5 py-2 text-[0.58rem] font-semibold text-white shadow-md shadow-accent/20">
                Browse Products &nbsp;›
              </span>
            </div>
            <div className="relative flex h-full items-center justify-center">
              <span className="absolute right-1 top-2 h-9 w-9 rotate-6 rounded-lg bg-white p-2 text-center text-[0.42rem] shadow-lg">
                💊
              </span>
              <span className="absolute bottom-3 left-0 h-10 w-10 -rotate-6 rounded-lg bg-white p-2 text-center text-[0.42rem] shadow-lg">
                🧴
              </span>
              <div className="relative w-[9.5rem] rounded-2xl bg-white/75 p-3 text-center shadow-xl backdrop-blur-sm md:w-44">
                <div className="mx-auto flex aspect-square w-3/4 items-center justify-center rounded-xl bg-white text-4xl">
                  🧴
                </div>
                <p className="mt-2 text-[0.43rem] font-semibold uppercase tracking-wide text-accent">
                  Personal Care
                </p>
                <p className="mt-1 font-display text-sm font-bold leading-tight text-foreground">
                  Health products
                </p>
              </div>
            </div>
          </div>
          <div className="mx-5 mb-4 grid grid-cols-3 divide-x divide-border rounded-xl bg-white/80 py-2 shadow-sm backdrop-blur-sm md:mx-8">
            <div className="px-2 text-center text-[0.45rem] font-semibold">
              ✓ Genuine
              <br />
              <span className="font-normal text-muted-foreground">
                Verified suppliers
              </span>
            </div>
            <div className="px-2 text-center text-[0.45rem] font-semibold">
              ▣ Fast Delivery
              <br />
              <span className="font-normal text-muted-foreground">
                1–3 business days
              </span>
            </div>
            <div className="px-2 text-center text-[0.45rem] font-semibold">
              ◷ 24/7 Support
              <br />
              <span className="font-normal text-muted-foreground">
                Always here to help
              </span>
            </div>
          </div>
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-accent-foreground backdrop-blur-sm">
          FEATURED
        </span>
      </div>
    );
  }

  if (project.name === "Prakritik Ayurveda Spa") {
    return (
      <div className="group/cover relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#3f594e] bg-[#4b665a] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out-soft group-hover/cover:scale-[1.04]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(32, 35, 29, 0.72), rgba(32, 35, 29, 0.18)), url(https://prakritikayurvedicspa.com/_next/static/media/hero-treatment-table-mountain-lake-view.0kc-t_wcixhfi.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#20241f]/60 via-transparent to-[#314a3f]/35" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center border-b border-white/15 bg-[#3f594e]/90 px-5 py-3 backdrop-blur-sm md:px-8">
            <div className="text-center leading-none">
              <span className="block font-serif text-[0.7rem] font-bold tracking-[0.28em]">
                PRAKRITIK
              </span>
              <span className="mt-1 block text-[0.34rem] tracking-[0.34em] text-white/75">
                AYURVEDIC SPA
              </span>
            </div>
            <div className="ml-auto hidden items-center gap-5 text-[0.55rem] font-semibold tracking-wide text-white/80 sm:flex">
              <span className="border-b border-white pb-1 text-white">
                HOME
              </span>
              <span>THERAPIES⌋</span>
              <span>PACKAGES</span>
              <span>ABOUT</span>
              <span>BLOG</span>
              <span>CONTACT</span>
            </div>
            <span className="ml-auto text-lg sm:hidden">☰</span>
          </div>
          <div className="flex flex-1 items-center px-7 py-7 md:px-12">
            <div className="max-w-[18rem]">
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-white/75">
                Wellness, naturally
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
                Authentic Ayurvedic massage &amp; Panchakarma in Pokhara
              </h3>
              <p className="mt-4 max-w-[16rem] text-[0.58rem] leading-relaxed text-white/80">
                Traditional therapies, thoughtful care and a peaceful space in
                the heart of Lakeside.
              </p>
              <span className="mt-5 inline-flex rounded-sm bg-white px-4 py-2.5 text-[0.58rem] font-semibold text-[#3f594e] shadow-lg">
                Book an appointment
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 pb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
            <span className="h-1.5 w-5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
          </div>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-accent-foreground backdrop-blur-sm">
          FEATURED
        </span>
      </div>
    );
  }

  return (
    <div
      className={`group/cover relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-secondary`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} — interface screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover object-left transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="relative flex h-full w-full items-center justify-center overflow-hidden transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        >
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:3rem_3rem]" />
          <span className="relative font-display text-7xl font-bold text-primary/15 md:text-8xl">
            {initials}
          </span>
        </div>
      )}
      <span className="absolute left-5 top-5 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-accent-foreground backdrop-blur-sm">
        FEATURED
      </span>
    </div>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal as="article" className="group">
      <div className="grid items-center gap-7 rounded-3xl border border-border bg-card p-4 shadow-[0_4px_30px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)] md:grid-cols-2 md:gap-12 md:p-5">
        <div className={flipped ? "md:order-2" : ""}>
          <Cover project={project} index={index} />
        </div>

        <div
          className={`px-2 py-3 md:px-5 md:py-8 ${flipped ? "md:order-1" : ""}`}
        >
          <p className="eyebrow">Featured project</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted md:text-lg">
            {project.summary}
          </p>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={`${project.name} technologies`}
          >
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium tracking-wide text-foreground-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
                Source code
                <span className="sr-only">{` for ${project.name}`}</span>
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                <ExternalIcon className="h-4 w-4" />
                Live demo
                <span className="sr-only">{` of ${project.name}`}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Featured Projects"
      lead="A showcase of recent work, from AI-powered career tools to practical digital products built for real users."
    >
      <div className="space-y-8 md:space-y-10">
        {projects.map((project, i) => (
          <ProjectEntry key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
