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
      {/* `items-start` matters here: the prose runs to five paragraphs, and
          without it the cards column would stretch to match and leave each card
          half-empty. */}
      {/* The cards take the larger share of the row. At the previous ratio each
          card sat around 240px, which wrapped "Bachelor of Software Engineering"
          onto two lines; the prose still has a comfortable measure at this
          width. */}
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        {/* The cards' top edge sits on the grid line, but the first line of
            text sits below its own half-leading, so the two read as misaligned.
            Pulling the prose up by that leading squares them off. */}
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

        <div className="grid gap-4 sm:grid-cols-2">
          {aboutCards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const { href } = card;

            const body = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid size-10 place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    {card.highlight}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {card.lines.map((line) => (
                    <li
                      key={line}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </>
            );

            return (
              <Reveal key={card.title} delay={i * 80}>
                {href ? (
                  <a
                    href={href}
                    className="glass gradient-border card-hover group block h-full rounded-2xl p-6"
                  >
                    {body}
                  </a>
                ) : (
                  <article className="glass gradient-border card-hover h-full rounded-2xl p-6">
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
