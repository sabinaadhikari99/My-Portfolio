"use client";

import { useState } from "react";
import { links, mailtoHref } from "@/content/profile";
import { ArrowIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-faint transition-colors duration-300 focus:border-accent focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      // The site runs without a database; hand the visitor off to email instead.
      if (result.error === "storage-unconfigured") {
        const subject = encodeURIComponent("Hello from your portfolio");
        const body = encodeURIComponent(String(data.message ?? ""));
        // An anchor click, rather than a location assignment, so the browser
        // treats this as an external mailto: handoff.
        if (mailtoHref) {
          const anchor = document.createElement("a");
          anchor.href = `${mailtoHref}?subject=${subject}&body=${body}`;
          anchor.rel = "noopener";
          anchor.click();
          setStatus("idle");
        } else {
          setStatus("error");
          setError("Contact storage is not configured. Please try again later.");
        }
        return;
      }

      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try email instead.");
    } catch {
      setStatus("error");
      setError("Network error. Please email me directly instead.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-8"
      >
        <h3 className="font-display text-2xl text-ink">Message received.</h3>
        <p className="mt-3 leading-relaxed text-muted">
          Thank you for writing — I&rsquo;ll reply to you at the address you
          gave. If it&rsquo;s urgent, {" "}
          {mailtoHref ? (
            <>
              <a href={mailtoHref} className="link-underline text-accent">
                email me directly
              </a>
              .
            </>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-muted underline underline-offset-4 hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-6 md:p-8"
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
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-sm text-faint">
          Or email{" "}
          {mailtoHref ? (
            <a href={mailtoHref} className="link-underline text-muted">
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
