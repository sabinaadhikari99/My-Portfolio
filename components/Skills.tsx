import { skillGroups } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      surface
      eyebrow="Skills"
      title="The tools I reach for."
      lead="Grouped by where they sit in a project, not ranked by a percentage bar. Everything listed here appears in work I have actually shipped."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 70}
            className="rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:border-border-strong hover:shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-sm font-bold text-accent">
                {group.title.charAt(0)}
              </span>
              <h3 className="text-base font-bold text-foreground">{group.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
