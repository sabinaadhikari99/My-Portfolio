import Image from "next/image";
import { projects, type Project } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import { ExternalIcon, GitHubIcon } from "./Icons";

/**
 * Cover panel for a project. Uses a real screenshot when one is provided in
 * content/profile.ts, and otherwise a typographic panel — so the page never
 * ships a broken or placeholder image.
 */
function Cover({ project, index }: { project: Project; index: number }) {
  const initials = project.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="group/cover relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-accent-soft">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} — interface screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        >
          <span className="font-display text-7xl text-accent/35 md:text-8xl">
            {initials}
          </span>
        </div>
      )}
      <span className="absolute left-5 top-5 font-display text-sm text-accent/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute right-5 top-5 rounded-full bg-surface/80 px-3 py-1 text-xs text-graphite backdrop-blur-sm">
        {project.year}
      </span>
    </div>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal as="article" className="group border-t border-line pt-12 md:pt-16">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div className={flipped ? "md:order-2" : ""}>
          <Cover project={project} index={index} />
        </div>

        <div className={flipped ? "md:order-1" : ""}>
          <h3 className="font-display text-3xl text-ink md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-graphite">
            {project.summary}
          </p>

          <div className="mt-6">
            <h4 className="eyebrow">The problem</h4>
            <p className="mt-2 leading-relaxed text-muted">{project.problem}</p>
          </div>

          <div className="mt-6">
            <h4 className="eyebrow">Key features</h4>
            <ul className="mt-3 space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-graphite"
                >
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted"
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
                className="link-underline inline-flex items-center gap-2 text-sm text-ink"
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
                className="link-underline inline-flex items-center gap-2 text-sm text-accent"
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
      title="Projects, and what they had to solve."
      lead="A few things I have built end to end — the problem behind each one, how it works, and where to read the code."
    >
      <div className="space-y-16 md:space-y-24">
        {projects.map((project, i) => (
          <ProjectEntry key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
