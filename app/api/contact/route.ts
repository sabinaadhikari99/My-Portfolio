import { NextResponse } from "next/server";
import { isDatabaseConfigured, saveContactMessage } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 200, message: 4000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real people leave this hidden field empty.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const clean = {
    name: typeof name === "string" ? name.trim() : "",
    email: typeof email === "string" ? email.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
  };

  const errors: string[] = [];
  if (clean.name.length < 2 || clean.name.length > MAX.name) {
    errors.push("Please enter your name.");
  }
  if (!EMAIL.test(clean.email) || clean.email.length > MAX.email) {
    errors.push("Please enter a valid email address.");
  }
  if (clean.message.length < 10 || clean.message.length > MAX.message) {
    errors.push("Please write a message of at least 10 characters.");
  }
  if (errors.length) {
    return NextResponse.json({ error: errors[0] }, { status: 400 });
  }

  // No database configured — tell the client to fall back to email.
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "storage-unconfigured" }, { status: 503 });
  }

  try {
    await saveContactMessage(clean);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to store contact message:", error);
    return NextResponse.json(
      { error: "Something went wrong sending that. Please email me directly." },
      { status: 500 },
    );
  }
}
