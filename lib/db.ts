import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres access for the contact form.
 *
 * The site is designed to run with or without a database: when DATABASE_URL is
 * absent (local development, a preview deploy without secrets) `getSql()`
 * returns null and the contact form falls back to a mailto link instead of
 * failing. Set DATABASE_URL in .env.local to turn storage on.
 */

let cached: ReturnType<typeof neon> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!cached) cached = neon(url);
  return cached;
}

export const isDatabaseConfigured = () => Boolean(process.env.DATABASE_URL);

let tableReady = false;

/** Creates the messages table on first write. Cheap, and keeps setup to one env var. */
export async function ensureContactTable(sql: NonNullable<ReturnType<typeof getSql>>) {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          BIGSERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      email       TEXT        NOT NULL,
      message     TEXT        NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  tableReady = true;
}

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export async function saveContactMessage({ name, email, message }: ContactMessage) {
  const sql = getSql();
  if (!sql) return false;

  await ensureContactTable(sql);
  await sql`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${name}, ${email}, ${message})
  `;
  return true;
}
