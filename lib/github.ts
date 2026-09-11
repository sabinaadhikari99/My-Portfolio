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
    3600,
  );
}

/**
 * Byte counts per language across every non-fork repository. One request per
 * repo, so it is cached for a day rather than an hour.
 */
async function fetchLanguages(repos: ApiRepo[]): Promise<LanguageSlice[] | null> {
  const results = await Promise.all(
    repos
      .filter((repo) => !repo.fork)
      .map((repo) => get<Record<string, number>>(repo.languages_url, 86400)),
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
 * Featured repositories in the order listed in content/profile.ts. A curated
 * description there wins over GitHub's, so repos with an empty description on
 * GitHub still read well here.
 */
function selectPinned(repos: ApiRepo[]): Repo[] {
  const byName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));

  return github.pinned
    .map(({ repo: name, description }) => {
      const found = byName.get(name.toLowerCase());
      if (!found) return null;
      return {
        name: found.name,
        description: description || found.description || "",
        language: found.language,
        url: found.html_url,
        updatedAt: found.updated_at,
      };
    })
    .filter((repo): repo is Repo => repo !== null);
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

  const pinned = selectPinned(repos);
  if (!pinned.length) return fallback();

  const languages = await fetchLanguages(repos);

  return {
    repos: pinned,
    languages: languages ?? github.languageSnapshot.slice(0, github.maxLanguages),
    stale: false,
  };
}
