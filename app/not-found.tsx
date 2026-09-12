import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-h2 font-bold text-foreground">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          The link may be out of date. Everything on this site lives on one
          page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
