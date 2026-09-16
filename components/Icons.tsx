/**
 * Inline SVG icons — no icon package, no extra bytes on the wire.
 * Each is decorative; the accessible name always comes from the link label.
 */

type IconProps = { className?: string };

const base = "h-[1.05em] w-[1.05em]";

export function GitHubIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.23c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.93 2.88 9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.41 9.82-9.81 9.82ZM20.46 3.5A11.72 11.72 0 0 0 12.05 0C5.58 0 .31 5.27.3 11.75c0 2.07.54 4.09 1.57 5.87L.2 24l6.53-1.71a11.7 11.7 0 0 0 5.31 1.35h.01c6.47 0 11.74-5.27 11.75-11.75a11.68 11.68 0 0 0-3.44-8.32Z" />
    </svg>
  );
}

export function MailIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.2 5.6a1.5 1.5 0 0 0 1.6 0L21 7" />
    </svg>
  );
}

export function ArrowIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  );
}

export function LocationIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M20 10.5c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </svg>
  );
}

export function PlayIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export function ArrowDownIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </svg>
  );
}

export function DownloadIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function SkypeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.069 18.87c-3.425 0-5.594-1.742-5.594-4.661 0-1.609.888-3.362 2.428-4.809.479-.451.862-.771 1.154-.967a5.767 5.767 0 0 1-.412-.696c-.019-.036-.038-.07-.058-.104l-.135.131c-1.186 1.098-2.136 2.626-2.136 4.445 0 2.964 1.946 4.59 4.799 4.59.37 0 .731-.042 1.079-.112-.242.471-.537.915-.882 1.318-.577.291-1.2.465-1.863.465zm7.386.721c-.086.056-.185.088-.289.088-.136 0-.265-.054-.371-.155-.735-.696-1.732-1.053-2.843-1.053h-.138c-.214.426-.479.819-.791 1.169.762.217 1.334.582 1.612 1.064.063.108.026.244-.082.307l-2.013 1.169c-.063.037-.129.054-.196.054-.082 0-.159-.029-.224-.084l-2.012-1.169c-.108-.063-.144-.199-.082-.307.682-1.196 2.143-1.975 3.831-1.975h.138c.055 0 .109.003.163.009a5.769 5.769 0 0 1 .248-1.397h-1.595c-.181 0-.328-.147-.328-.328s.147-.328.328-.328h2.073c.181 0 .328.147.328.328v.027c.424.138.818.342 1.171.608l.039.032c.061.052.068.144.016.205l-1.283 1.492c-.053.061-.144.068-.205.016a4.127 4.127 0 0 0-2.392-.849h-.283c-.181 0-.328.147-.328.328s.147.328.328.328h.167c1.726 0 3.125 1.111 3.125 2.483 0 .096-.016.19-.046.281l.085.056zM12.042 14.226c-1.741 0-3.152 1.225-3.152 2.735 0 .837.458 1.576 1.17 2.043.273.18.574.317.894.409-.022.083-.046.164-.072.245-.016.051.003.106.047.132l1.449.841c.056.032.121.032.177 0l1.449-.841c.044-.026.063-.081.047-.132a3.359 3.359 0 0 0-.072-.245c.32-.092.621-.229.894-.409.712-.467 1.17-1.206 1.17-2.043 0-1.51-1.411-2.735-3.152-2.735zm-1.058 4.091c-.619 0-1.121-.502-1.121-1.121 0-.619.502-1.121 1.121-1.121.619 0 1.121.502 1.121 1.121 0 .619-.502 1.121-1.121 1.121z" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Stroked icons. 24x24 grid, 2px stroke, round caps and joins — the same
   construction as the rest of the set, sized by the `em`-based `base` class.
-------------------------------------------------------------------------- */

type StrokeProps = IconProps & { children: React.ReactNode };

function Stroke({ className = base, children }: StrokeProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function RocketIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </Stroke>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="m6 9 6 6 6-6" />
    </Stroke>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Stroke>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </Stroke>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </Stroke>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </Stroke>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </Stroke>
  );
}

export function AwardIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </Stroke>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </Stroke>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </Stroke>
  );
}

export function FacebookIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </Stroke>
  );
}

export function RepoBranchIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </Stroke>
  );
}

export function GraduationCapIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M22 9 12 5 2 9l10 4 10-4Z" />
      <path d="M6 10.6V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.4" />
      <path d="M22 9v5" />
    </Stroke>
  );
}
