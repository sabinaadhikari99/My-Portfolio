import Image from "next/image";
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
      lead="Courses and professional programmes behind the way I build — full-stack web development, cloud and DevOps, and security."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const href = cert.credentialUrl ?? cert.image;

          const card = (
            <>
              {cert.image ? (
                <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border bg-background">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate issued by ${cert.issuer}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col p-6">
                {cert.category ? (
                  <span className="self-start rounded-full border border-border bg-background px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {cert.category}
                  </span>
                ) : null}

                <h3 className="mt-4 text-lg leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                  {cert.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="mt-0.5 text-sm text-subtle">{cert.date}</p>

                {href ? (
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-primary">
                    <ExternalIcon className="h-3.5 w-3.5" />
                    View certificate
                  </span>
                ) : null}
              </div>
            </>
          );

          return (
            <Reveal as="li" key={`${cert.name}-${cert.issuer}`} delay={i * 70}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View the ${cert.name} certificate from ${cert.issuer}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-border-strong"
                >
                  {card}
                </a>
              ) : (
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  {card}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
