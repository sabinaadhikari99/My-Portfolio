"use client";

import { useState } from "react";
import {
  emailComposeHref,
  emailHref,
  links,
  whatsappComposeHref,
} from "@/content/profile";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-subtle transition-colors duration-300 focus:border-primary focus:outline-none";

const SUBJECT = "Hello from your portfolio";

/** One readable block of text, shared by the WhatsApp and email handoffs. */
function composeBody({ name, email, message }: Record<string, string>) {
  return `Hi Sabina, I'm ${name} (${email}).\n\n${message}`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Kept so the success card can repeat the handoff as a button — see below.
  const [handoff, setHandoff] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    const body = composeBody({
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      message: String(data.message ?? ""),
    });
    const target = whatsappComposeHref(body) ?? emailComposeHref(SUBJECT, body);

    /**
     * Best effort only. This runs after an `await`, far enough from the click
     * that popup blockers may refuse it, so the success card always repeats
     * the same link as a button the visitor can press themselves.
     */
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
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        handOff();
        setStatus("sent");
        form.reset();
        return;
      }

      // No database configured — the handoff is the delivery, not a courtesy.
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
      <div
        role="status"
        className="rounded-2xl border border-border bg-card p-8"
      >
        <h3 className="font-display text-2xl text-foreground">Message received.</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thank you for writing — I&rsquo;ll reply to you at the address you
          gave.
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
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send on WhatsApp
            </a>
          ) : null}
          {emailHref ? (
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-primary"
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
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="Jane Doe"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="jane@company.com"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="A little about the role or project…"
          className={`${field} mt-2 resize-y`}
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-primary">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-sm text-subtle">
          Or email{" "}
          {emailHref ? (
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-muted-foreground"
            >
              {links.EMAIL_ADDRESS}
            </a>
          ) : (
            "directly"
          )}
        </p>
      </div>
    </form>
  );
}
