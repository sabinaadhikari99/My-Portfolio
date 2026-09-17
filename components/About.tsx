import { about, aboutCards, sections } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  BriefcaseIcon,
  GraduationCapIcon,
  LayersIcon,
  TargetIcon,
} from "./Icons";

const ICONS = {
  education: GraduationCapIcon,
  focus: TargetIcon,
  stack: LayersIcon,
  availability: BriefcaseIcon,
} as const;

/**
 * The prose, with a column of fact cards alongside it.
 *
 * The grid reflows around whatever `aboutCards` contains, and any card with
 * an `href` renders as a link instead of an article.
 */
export default function About() {
  return (
    <Section id="about" copy={sections.about}>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        <Reveal className="space-y-4 lg:-mt-1.5">
          {about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="flex flex-col gap-4">
          {aboutCards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const { href } = card;
            const description = card.lines.join(" · ");

            const body = (
              <div className="flex items-center gap-4">
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-full text-primary-foreground"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            );

            return (
              <Reveal key={card.title} delay={i * 80}>
                {href ? (
                  <a
                    href={href}
                    className="glass gradient-border card-hover group block rounded-2xl p-5"
                  >
                    {body}
                  </a>
                ) : (
                  <article className="glass gradient-border card-hover rounded-2xl p-5">
                    {body}
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
