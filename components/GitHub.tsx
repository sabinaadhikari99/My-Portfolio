import { getGitHubData } from "@/lib/github";
import { github, links } from "@/content/profile";
import Section from "./Section";
import Reveal from "./Reveal";
import { ExternalIcon, GitHubIcon } from "./Icons";

const RAMP = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function RepoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
    </svg>
  );
}

export default async function GitHub() {
  const { repos, languages, stale } = await getGitHubData();

  if (!repos.length) return null;

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title="Code, committed regularly"
      lead="Public repositories and the language distribution across them."
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        {/* Pinned repositories */}
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] md:p-8">
            <h3 className="flex items-center gap-2.5 text-sm font-bold text-foreground">
              <GitHubIcon className="h-4 w-4 text-muted-foreground" />
              Pinned repositories
            </h3>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-border-strong hover:shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)]"
                  >
                    <span className="flex items-start gap-2.5">
                      <RepoIcon className="mt-0.5 h-4 w-4 shrink-0 text-subtle transition-colors duration-300 group-hover:text-accent" />
                      <span className="min-w-0 break-words text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                        {repo.name}
                      </span>
                    </span>

                    {repo.description ? (
                      <span className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {repo.description}
                      </span>
                    ) : null}

                    {repo.language ? (
                      <span className="mt-auto pt-4 text-xs text-subtle">
                        {repo.language}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Language distribution + profile */}
        <Reveal delay={100}>
          <div className="flex h-full flex-col gap-6">
            {languages.length ? (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] md:p-8">
                <h3 className="text-sm font-bold text-foreground">Language distribution</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-subtle">
                  By bytes of code across public repositories.
                </p>

                <div
                  className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-border"
                  role="img"
                  aria-label={languages
                    .map((l) => `${l.name} ${l.percent.toFixed(0)}%`)
                    .join(", ")}
                >
                  {languages.map((language, i) => (
                    <span
                      key={language.name}
                      style={{
                        width: `${language.percent}%`,
                        backgroundColor: RAMP[i % RAMP.length],
                      }}
                    />
                  ))}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {languages.map((language, i) => (
                    <li
                      key={language.name}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: RAMP[i % RAMP.length] }}
                        />
                        <span className="truncate text-foreground-muted">{language.name}</span>
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {language.percent.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>

                {stale ? (
                  <p className="mt-5 text-xs text-subtle">
                    Showing the most recent cached figures.
                  </p>
                ) : null}
              </div>
            ) : null}

            <a
              href={links.GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-border-strong hover:shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)] md:p-8"
            >
              <span className="min-w-0">
                <span className="block text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                  GitHub profile
                </span>
                <span className="mt-1 block truncate text-sm text-muted-foreground">
                  @{github.username}
                </span>
              </span>
              <ExternalIcon className="h-4 w-4 shrink-0 text-subtle transition-colors duration-300 group-hover:text-accent" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
