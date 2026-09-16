import { github } from "@/content/profile";

/**
 * Live GitHub data for the repositories section.
 *
 * The API is called unauthenticated by default, which GitHub rate-limits to 60
 * requests an hour *per IP* — and on shared serverless hosts that IP is shared
 * with other tenants, so a 403 is a normal outcome rather than an error. Every
 * fetch therefore degrades to the snapshot in content/profile.ts instead of
 * throwing, and the section renders identically either way.
 *
 * Set GITHUB_TOKEN (a fine-grained token with no scopes is enough for public
 * data) to raise the limit to 5,000/hour.
 */

export type Repo = {
  name: string;
  description: string;
  language: string | null;
  url: string;
  updatedAt: string;
};

export type LanguageSlice = { name: string; percent: number };

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
  languages_url: string;
};

const API = "https://api.github.com";

/**
 * How long each response is cached. The repo list is cheap (one call) and is
 * what changes when Sabina pushes, so it refreshes often. Languages cost one
 * call per repository, so they refresh hourly.
 */
const REVALIDATE = { repos: 600, languages: 3600 } as const;

/** Featured repositories shown, once the curated list is topped up. */
const MAX_REPOS = 6;

function headers() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Never throws: a failed call returns null so callers can fall back. */
async function get<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: headers(), next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchRepos(): Promise<ApiRepo[] | null> {
  return get<ApiRepo[]>(
    `${API}/users/${github.username}/repos?per_page=100&sort=updated`,
    REVALIDATE.repos,
  );
}

/**
 * Byte counts per language across every non-fork repository. One request per
 * repo, so it is cached far longer than the repo list itself.
 */
async function fetchLanguages(repos: ApiRepo[]): Promise<LanguageSlice[] | null> {
  const results = await Promise.all(
    repos
      .filter((repo) => !repo.fork)
      .map((repo) => get<Record<string, number>>(repo.languages_url, REVALIDATE.languages)),
  );

  // A partial result would skew the percentages, so treat any miss as a miss.
  if (results.some((entry) => entry === null)) return null;

  const totals = new Map<string, number>();
  for (const entry of results) {
    for (const [name, bytes] of Object.entries(entry ?? {})) {
      if (github.excludeLanguages.includes(name)) continue;
      totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }

  const sum = [...totals.values()].reduce((a, b) => a + b, 0);
  if (!sum) return null;

  return [...totals.entries()]
    .map(([name, bytes]) => ({ name, percent: (bytes / sum) * 100 }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, github.maxLanguages);
}

/**
 * The most recently updated repositories, newest first.
 *
 * The list is no longer curated: whatever Sabina touched last is what shows,
 * so the section tracks real activity instead of a hand-maintained order. The
 * descriptions in content/profile.ts are still consulted, because several
 * repos have no description on GitHub and would otherwise render as a bare
 * name - but they no longer decide which repos appear or in what order.
 *
 * Forks are excluded: they are someone else's work.
 */
function latestRepos(repos: ApiRepo[]): Repo[] {
  const curated = new Map(
    github.pinned.map(({ repo, description }) => [repo.toLowerCase(), description]),
  );

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .slice(0, MAX_REPOS)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || curated.get(repo.name.toLowerCase()) || "",
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at,
    }));
}

export type GitHubData = {
  repos: Repo[];
  languages: LanguageSlice[];
  /** True when the numbers came from the snapshot rather than the live API. */
  stale: boolean;
};

/** The snapshot, shaped exactly like a live response. */
function fallback(): GitHubData {
  return {
    repos: github.pinned.map(({ repo, description, language }) => ({
      name: repo,
      description,
      language,
      url: `https://github.com/${github.username}/${repo}`,
      updatedAt: "",
    })),
    languages: github.languageSnapshot.slice(0, github.maxLanguages),
    stale: true,
  };
}

export async function getGitHubData(): Promise<GitHubData> {
  const repos = await fetchRepos();
  if (!repos) return fallback();

  const latest = latestRepos(repos);
  if (!latest.length) return fallback();

  const languages = await fetchLanguages(repos);

  return {
    repos: latest,
    languages: languages ?? github.languageSnapshot.slice(0, github.maxLanguages),
    stale: false,
  };
}
