"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Certification } from "@/content/profile";
import { CloseIcon, ExternalIcon } from "./Icons";

/**
 * Opens a certificate in a framed dialog rather than navigating to the raw
 * JPEG, which is what a bare link to an image does: full-bleed, unstyled, on
 * the browser's own grey background.
 *
 * The scan is held inside a white mat with a thin border, capped at a size that
 * keeps the whole document on screen, and captioned with the issuer and date.
 * Uses a native <dialog>, so focus trapping, Escape and the top layer come from
 * the platform instead of being reimplemented.
 */
export default function CertificateViewer({
  cert,
  children,
  className,
}: {
  cert: Certification;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const href = cert.credentialUrl ?? cert.image;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        // Clicking the backdrop closes it; clicks inside the panel stop there.
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false);
        }}
        aria-label={`${cert.name} certificate`}
        className="m-auto w-[min(92vw,44rem)] rounded-2xl bg-transparent p-0 backdrop:bg-[oklch(6%_0.02_274/0.82)] backdrop:backdrop-blur-sm"
      >
        <div className="glass-strong gradient-border relative rounded-2xl p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:text-foreground"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          {cert.image ? (
            /* A white mat behind the scan. Certificates are printed on paper;
               floating one straight on a dark panel looks like a mistake. */
            <div className="rounded-xl bg-white p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] sm:p-3">
              <div className="relative max-h-[68vh] overflow-hidden rounded-lg">
                <Image
                  src={cert.image}
                  alt={`${cert.name}, issued by ${cert.issuer}`}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 768px) 92vw, 44rem"
                  className="max-h-[68vh] w-full object-contain"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 px-1">
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold leading-snug">
                {cert.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {cert.issuer} · {cert.date}
              </p>
            </div>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-cyan hover:underline"
              >
                <ExternalIcon className="h-3.5 w-3.5" />
                Open full size
              </a>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
