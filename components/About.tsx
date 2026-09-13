import Image from "next/image";
import { about, person, links } from "@/content/profile";
import Reveal from "./Reveal";
import { DownloadIcon } from "./Icons";

const skills = [
  "UX/UI Design",
  "Mobile App Design",
  "Website Design",
  "Design System",
  "Prototype",
  "Dashboard",
  "Wireframe Design",
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#2D4A3E] py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left - Profile image with floating tags */}
          <Reveal delay={0}>
            <div className="relative mx-auto max-w-md lg:mx-0">
              {/* Yellow circular background */}
              <div className="absolute inset-0 -m-4 rounded-full bg-accent sm:-m-6 lg:-m-8" />

              {/* Profile image */}
              {person.photo && (
                <div className="relative z-10 h-80 w-80 overflow-hidden rounded-full border-4 border-white shadow-2xl sm:h-96 sm:w-96">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 20rem, 24rem"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Floating skill tags */}
              {skills.map((skill, i) => {
                const positions = [
                  "top-2 right-0 sm:right-4",
                  "top-16 -right-6 sm:right-0",
                  "bottom-24 -left-4 sm:left-0",
                  "bottom-12 -right-8 sm:-right-4",
                  "bottom-4 left-8 sm:left-12",
                  "bottom-2 right-4 sm:right-8",
                  "-bottom-2 left-1/2 -translate-x-1/2",
                ];
                const colors = [
                  "bg-accent text-white",
                  "bg-[#1E293B] text-white",
                  "bg-accent text-white",
                  "bg-[#1E293B] text-white",
                  "bg-accent text-white",
                  "bg-[#1E293B] text-white",
                  "bg-accent text-white",
                ];
                return (
                  <div
                    key={skill}
                    className={`absolute z-20 rounded-full px-4 py-2 text-xs font-semibold shadow-lg animate-float ${positions[i]} ${colors[i]}`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Right - Content */}
          <div className="text-white">
            <Reveal delay={80}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="text-sm font-semibold tracking-wider text-accent">About Me</span>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <h2
                id="about-heading"
                className="mt-4 font-display text-4xl font-bold md:text-5xl"
              >
                Who is{" "}
                <span className="text-accent italic">{person.name.split(" ")[0]}{" "}
                  {person.name.split(" ").slice(1).join(" ")}?</span>
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-6 space-y-4">
                {about.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Download CV */}
            <Reveal delay={320}>
              <div className="mt-10">
                {links.RESUME_URL && (
                  <a
                    href={links.RESUME_URL}
                    className="group inline-flex items-center gap-3 rounded-full border-2 border-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent"
                  >
                    Download CV
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 group-hover:bg-white group-hover:text-accent">
                      <DownloadIcon className="h-4 w-4" />
                    </span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
