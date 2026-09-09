import { certifications } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import { ExternalIcon } from "./Icons";

/**
 * Renders nothing at all when the certifications list is empty — an empty
 * section is worse than no section, and placeholder credentials are not an
 * option.
 */
export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials and achievements."
    >
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal
            as="li"
            key={`${cert.name}-${cert.issuer}`}
            delay={i * 70}
            className="bg-surface p-7"
          >
            <p className="eyebrow">{cert.date}</p>
            <h3 className="mt-3 text-lg leading-snug text-ink">{cert.name}</h3>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex items-center gap-2 text-sm text-accent"
              >
                <ExternalIcon className="h-3.5 w-3.5" />
                View credential
                <span className="sr-only">{` for ${cert.name}`}</span>
              </a>
            ) : null}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
