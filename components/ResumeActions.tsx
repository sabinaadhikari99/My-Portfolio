"use client";

import Link from "next/link";
import { ArrowIcon } from "./Icons";

export default function ResumeActions() {
  return (
    <div className="no-print mt-10 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover"
      >
        Download PDF
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent">
        Get in touch
      </Link>
      <p className="text-sm text-subtle">Opens your browser&rsquo;s print dialog - choose &ldquo;Save as PDF&rdquo;.</p>
    </div>
  );
}
