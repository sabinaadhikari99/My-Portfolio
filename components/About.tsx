import { about } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A short version of the story.">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="max-w-2xl space-y-6">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-lg leading-relaxed text-foreground-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <dl className="space-y-6 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-base text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
