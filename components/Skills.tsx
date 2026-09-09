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
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 70}
            className="bg-surface p-7 md:p-8"
          >
            <h3 className="eyebrow">{group.title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-graphite transition-colors duration-300 hover:border-accent hover:text-accent"
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
