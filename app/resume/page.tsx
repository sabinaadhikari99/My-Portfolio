import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  about,
  certifications,
  education,
  emailHref,
  experience,
  links,
  person,
  projects,
  seo,
  skillGroups,
  whatsappHref,
  type TimelineItem,
} from "@/content/profile";
import ResumeActions from "@/components/ResumeActions";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${person.name} — ${seo.description}`,
  alternates: { canonical: "/resume" },
};

/** Contact line under the name. Anything unset is simply left out. */
const contactRow = [
  { label: person.location, href: undefined },
  { label: links.EMAIL_ADDRESS, href: emailHref },
  {
    label: links.WHATSAPP_NUMBER ? `+${links.WHATSAPP_NUMBER}` : "",
    href: whatsappHref,
  },
  { label: "github.com/sabinaadhikari99", href: links.GITHUB_URL },
  { label: links.LINKEDIN_URL ? "LinkedIn" : "", href: links.LINKEDIN_URL },
].filter((item) => item.label);

/** Shared heading rule — the only structural repeat on the page. */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-block mt-12 first:mt-0">
      <h2 className="border-b border-border pb-3 font-display text-2xl text-foreground">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Experience and education share a shape, so they share a renderer. */
function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-8">
      {items.map((item) => (
        <li key={`${item.title}-${item.org}`} className="resume-item">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-base font-medium text-foreground">
              {item.title}
              <span className="text-muted-foreground"> · {item.org}</span>
            </h3>
            <p className="text-sm text-subtle">{item.period}</p>
          </div>
          {item.meta ? (
            <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
          ) : null}
          {item.points.length ? (
            <ul className="mt-3 space-y-1.5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-foreground-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong"
                  />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function ResumePage() {
  return (
    <main id="main" className="resume-sheet bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
        <Link
          href="/"
          className="no-print link-underline text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Back to portfolio
        </Link>

        {/* Masthead ------------------------------------------------------- */}
        <header className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
          {person.photo ? (
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="min-w-0">
            <h1 className="font-display text-4xl text-foreground md:text-5xl">
              {person.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{person.role}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-foreground-muted">
              {contactRow.map(({ label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-primary"
                    >
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <ResumeActions />

        <div className="mt-14">
          <Block title="Summary">
            <p className="text-[0.95rem] leading-relaxed text-foreground-muted">
              {about.paragraphs[0]}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">
              {person.availability}.
            </p>
          </Block>

          {experience.length ? (
            <Block title="Experience">
              <Timeline items={experience} />
            </Block>
          ) : null}

          <Block title="Selected projects">
            <ol className="space-y-8">
              {projects.map((project) => (
                <li key={project.name} className="resume-item">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-base font-medium text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-sm text-subtle">{project.year}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {project.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {project.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-relaxed text-foreground-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.tech.join(" · ")}
                  </p>
                  {project.github || project.demo ? (
                    <p className="mt-1.5 flex flex-wrap gap-x-4 text-sm">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-primary"
                        >
                          Source
                        </a>
                      ) : null}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-primary"
                        >
                          Live demo
                        </a>
                      ) : null}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Skills">
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="resume-item">
                  <dt className="eyebrow">{group.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          {education.length ? (
            <Block title="Education">
              <Timeline items={education} />
            </Block>
          ) : null}

          {certifications.length ? (
            <Block title="Certifications">
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-base font-medium text-foreground">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline hover:text-primary"
                          >
                            {cert.name}
                          </a>
                        ) : (
                          cert.name
                        )}
                        <span className="text-muted-foreground"> · {cert.issuer}</span>
                      </h3>
                      <p className="text-sm text-subtle">{cert.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
        </div>
      </div>
    </main>
  );
}
