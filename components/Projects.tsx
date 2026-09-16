import Image from "next/image";
import { projects, sections, type Project } from "@/content/profile";
import Reveal from "./Reveal";
import { CheckIcon, ExternalIcon, GitHubIcon } from "./Icons";
import Section from "./Section";

function ProjectCard({ project }: { project: Project }) {
  const initials = project.name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <article className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-[var(--shadow-glow)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} interface screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
        ) : (
          /* No screenshot: a typographic plate rather than a broken image or a
             stock photo unrelated to the project. */
          <div className="relative flex h-full w-full items-center justify-center bg-muted">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(1 0 0 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 8%) 1px, transparent 1px)",
                backgroundSize: "2.5rem 2.5rem",
              }}
            />
            <span className="gradient-text relative font-display text-6xl font-bold md:text-7xl">
              {initials}
            </span>
          </div>
        )}
        {/* Scrim, so the screenshot sits against the dark card instead of
            ending at a bright edge. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.115 0.038 274 / 88%), transparent 62%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
            >
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors hover:text-cyan"
            >
              <ExternalIcon className="h-3.5 w-3.5" />
              Live demo
            </a>
          ) : null}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" copy={sections.projects}>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
