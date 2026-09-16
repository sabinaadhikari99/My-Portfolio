import {
  education,
  experience,
  sections,
  type TimelineItem,
} from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

type Entry = TimelineItem & { kind: string };

/**
 * Work first, then education. Both arrays are optional in the profile data —
 * `education` is currently empty, so only the work entries render and the
 * timeline shortens rather than showing an empty heading.
 */
const entries: Entry[] = [
  ...experience.map((item) => ({ ...item, kind: "Experience" })),
  ...education.map((item) => ({ ...item, kind: "Education" })),
];

export default function Experience() {
  if (entries.length === 0) return null;

  return (
    <Section id="experience" copy={sections.experience}>
      <div className="relative pl-6 sm:pl-10">
        {/* The spine. Fades to transparent at the bottom so it reads as
            "ongoing" rather than stopping at a hard edge. */}
        <div
          aria-hidden
          className="absolute left-1.5 top-2 h-full w-px sm:left-3.5"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.552 0.22 264), oklch(0.541 0.245 293), transparent)",
          }}
        />

        <ol className="space-y-5">
          {entries.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.org}-${item.title}`}
              delay={i * 90}
              from="left"
            >
              <article className="glass gradient-border group relative rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] sm:p-6">
                <span
                  aria-hidden
                  className="absolute -left-[1.4rem] top-7 size-3 rounded-full ring-4 ring-background sm:-left-[2.15rem]"
                  style={{ background: "var(--gradient-brand)" }}
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {item.org}
                  </h3>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    {item.period}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-cyan">
                  {item.title}
                  {item.meta ? (
                    <span className="text-muted-foreground"> · {item.meta}</span>
                  ) : null}
                </p>

                {/* Detail is collapsed on desktop and expands on hover, which
                    keeps the timeline scannable. Touch devices get no hover, so
                    below `sm` it is always open. */}
                {item.points.length ? (
                  <ul className="mt-3 max-h-0 space-y-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-60 group-hover:opacity-100 max-sm:max-h-60 max-sm:opacity-100">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-px w-3 shrink-0 bg-cyan"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
