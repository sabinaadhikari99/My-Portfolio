import { education, experience, type TimelineItem } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l-2 border-border">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={`${item.org}-${item.title}`}
          delay={i * 80}
          className="relative pb-10 pl-8 last:pb-0 md:pl-10"
        >
          <span
            aria-hidden
            className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-card"
          />
          <p className="eyebrow">{item.period}</p>
          <h4 className="mt-2 text-xl font-bold text-foreground md:text-2xl">{item.title}</h4>
          <p className="mt-1 text-base text-foreground-muted">
            {item.org}
            {item.meta ? (
              <span className="text-subtle"> · {item.meta}</span>
            ) : null}
          </p>
          {item.points.length ? (
            <ul className="mt-4 space-y-2">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      surface
      eyebrow="Experience & education"
      title="Where I have been learning."
    >
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        {experience.length ? (
          <div>
            <h3 className="mb-8 font-display text-2xl font-bold text-foreground">Experience</h3>
            <Timeline items={experience} />
          </div>
        ) : null}
        {education.length ? (
          <div>
            <h3 className="mb-8 font-display text-2xl font-bold text-foreground">Education</h3>
            <Timeline items={education} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
