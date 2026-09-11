import { education, experience, type TimelineItem } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-border">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={`${item.org}-${item.title}`}
          delay={i * 80}
          className="relative pb-10 pl-7 last:pb-0 md:pl-10"
        >
          <span
            aria-hidden
            className="absolute -left-[4.5px] top-2 h-2 w-2 rounded-full bg-primary"
          />
          <p className="eyebrow">{item.period}</p>
          <h4 className="mt-2 text-xl text-foreground md:text-2xl">{item.title}</h4>
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
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-border-strong" />
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
            <h3 className="mb-8 font-display text-2xl text-foreground">Experience</h3>
            <Timeline items={experience} />
          </div>
        ) : null}
        {education.length ? (
          <div>
            <h3 className="mb-8 font-display text-2xl text-foreground">Education</h3>
            <Timeline items={education} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
