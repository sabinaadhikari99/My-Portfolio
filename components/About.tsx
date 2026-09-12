import { about } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="About Me" title="The story behind the code.">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="max-w-2xl space-y-6">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-lg leading-relaxed text-foreground-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <dl className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)]">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-base font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
