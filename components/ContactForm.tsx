"use client";

import { useState } from "react";
import {
  emailComposeHref,
  emailHref,
  whatsappComposeHref,
} from "@/content/profile";
import { SendIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-sm transition-colors duration-300 placeholder:text-subtle focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring";

const FALLBACK_SUBJECT = "Hello from your portfolio";

function composeBody({ name, email, subject, message }: Record<string, string>) {
  const lead = `Hi Sabina, I'm ${name} (${email}).`;
  return subject ? `${lead}\n\nRe: ${subject}\n\n${message}` : `${lead}\n\n${message}`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    const name = String(data.name ?? "");
    const email = String(data.email ?? "");
    const subject = String(data.subject ?? "").trim();
    const message = String(data.message ?? "");

    const body = composeBody({ name, email, subject, message });
    const target =
      whatsappComposeHref(body) ??
      emailComposeHref(subject || FALLBACK_SUBJECT, body);

    const handOff = () => {
      if (!target) return false;
      setHandoff(target);
      window.open(target, "_blank", "noopener,noreferrer");
      return true;
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          // The API stores name, email and message only. Folding the subject
          // into the message keeps it rather than dropping it on the floor,
          // and avoids a schema migration for one line of text.
          message: subject ? `Subject: ${subject}\n\n${message}` : message,
          website: data.website,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        handOff();
        setStatus("sent");
        form.reset();
        return;
      }

      if (result.error === "storage-unconfigured") {
        if (handOff()) {
          setStatus("sent");
          form.reset();
        } else {
          setStatus("error");
          setError("Contact storage is not configured. Please try again later.");
        }
        return;
      }

      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try WhatsApp instead.");
    } catch {
      setStatus("error");
      setError("Network error. Please message me on WhatsApp instead.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="glass gradient-border rounded-2xl p-8">
        <h3 className="font-display text-2xl font-bold">Message received.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thanks - I read everything and reply to all of it.
          {handoff
            ? " WhatsApp should have opened with your message ready to send. If your browser blocked it, use the button below."
            : null}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          {handoff ? (
            <a
              href={handoff}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--gradient-brand)" }}
            >
              Send on WhatsApp
            </a>
          ) : null}
          {emailHref ? (
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-cyan hover:underline"
            >
              or email me directly
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            setHandoff(undefined);
            setStatus("idle");
          }}
          className="mt-6 block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass gradient-border flex h-full flex-col rounded-2xl p-5 sm:p-6"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="you@company.com"
            className={field}
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-muted-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={160}
          placeholder="Opportunity, collaboration, project..."
          className={field}
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="Tell me a bit about the role or project..."
          className={`${field} min-h-[8rem] flex-1 resize-y`}
        />
      </div>

      {/* Honeypot. Real people leave this empty; bots fill everything in. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-cyan">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        style={{ background: "var(--gradient-brand)" }}
      >
        <SendIcon className="h-4 w-4" />
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
