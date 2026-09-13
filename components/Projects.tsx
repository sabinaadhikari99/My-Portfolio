import Image from "next/image";
import { projects } from "@/content/profile";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const initials = project.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Reveal as="article" delay={index * 100}>
      <div className="group rounded-3xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-xl md:p-5">
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} — interface screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:3rem_3rem]" />
              <span className="relative font-display text-7xl font-bold text-primary/15 md:text-8xl">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title + Arrow */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-bold leading-tight text-[#1a1a2e] md:text-2xl">
            {project.name}
          </h3>
          <a
            href={project.demo || project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 hover:bg-accent-hover"
            aria-label={`View ${project.name}`}
          >
            <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="shell">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-sm font-semibold tracking-wider text-accent">
                My Portfolio
              </span>
            </div>
            <h2
              id="projects-heading"
              className="mt-4 font-display text-4xl font-bold md:text-5xl"
            >
              My Latest{" "}
              <span className="text-accent italic">Projects</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-accent px-6 py-3 text-sm font-semibold text-[#1a1a2e] transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              View All Projects
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 group-hover:bg-white group-hover:text-accent">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>

        {/* Projects grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
