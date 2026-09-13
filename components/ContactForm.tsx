"use client";

import { useState } from "react";
import {
  emailComposeHref,
  emailHref,
  links,
  whatsappComposeHref,
} from "@/content/profile";
import { ArrowIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-gray-400 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const selectField = `${field} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;

const SUBJECT = "Hello from your portfolio";

function composeBody({ name, email, message }: Record<string, string>) {
  return `Hi Sabina, I'm ${name} (${email}).\n\n${message}`;
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

    const body = composeBody({
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      message: String(data.message ?? ""),
    });
    const target = whatsappComposeHref(body) ?? emailComposeHref(SUBJECT, body);

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
        className="rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="font-display text-2xl font-bold text-white">Message received.</h3>
        <p className="mt-3 leading-relaxed text-gray-300">
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
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
            >
              Send on WhatsApp
            </a>
          ) : null}
          {emailHref ? (
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
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
          className="mt-6 block text-sm text-gray-400 underline underline-offset-4 hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="Ex. John Doe"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="example@gmail.com"
            className={field}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white">
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            maxLength={20}
            placeholder="Enter Phone Number"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="interest" className="mb-2 block text-sm font-medium text-white">
            I&rsquo;m Interested in <span className="text-accent">*</span>
          </label>
          <select
            id="interest"
            name="interest"
            required
            className={selectField}
            defaultValue=""
          >
            <option value="" disabled>Select</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile App</option>
            <option value="design">UI/UX Design</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-white">
            Budget Range (USD) <span className="text-accent">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            required
            className={selectField}
            defaultValue=""
          >
            <option value="" disabled>Select Range</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2500">$1,000 - $2,500</option>
            <option value="2500-5000">$2,500 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-medium text-white">
            Country <span className="text-accent">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            className={selectField}
            defaultValue=""
          >
            <option value="" disabled>Select Country</option>
            <option value="NP">Nepal</option>
            <option value="US">United States</option>
            <option value="IN">India</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
          Your Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Enter here.."
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full border-2 border-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit"}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 group-hover:bg-white group-hover:text-accent">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
