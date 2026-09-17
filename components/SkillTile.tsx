import Image from "next/image";
import { brandIcons } from "@/content/brand-icons";
import { skillIcons } from "@/content/profile";

/**
 * Short lettermark for a technology with no logo at all. Acronyms keep their
 * letters ("FAISS" -> "FA"); ordinary names take their initial.
 */
function lettermark(name: string) {
  const stripped = name.replace(/[^A-Za-z]/g, "");
  const isAcronym = stripped.length > 1 && stripped === stripped.toUpperCase();
  return isAcronym ? stripped.slice(0, 2) : name.charAt(0).toUpperCase();
}

/**
 * One technology: its logo on a tile, its name underneath.
 *
 * Three sources, in order of preference. Most marks are inline SVG from
 * content/brand-icons.ts, so there is no network request and no icon font.
 * A few technologies Simple Icons does not carry supply their own file in
 * public/skills instead. Anything with no mark at all falls back to a
 * lettermark rather than an empty square.
 *
 * Each tile carries its own brand colour in a custom property, which the hover
 * state uses for the ring and glow - that is what makes the row read as a set
 * of distinct technologies rather than a grid of identical boxes.
 */
export default function SkillTile({ name }: { name: string }) {
  const entry = skillIcons[name];
  const custom = typeof entry === "object" ? entry : undefined;
  const brand = typeof entry === "string" ? brandIcons[entry] : undefined;
  const color = custom?.color ?? brand?.color ?? "var(--cyan)";

  return (
    <li
      className="group flex flex-col items-center gap-2.5 text-center"
      style={{ ["--brand" as string]: color }}
    >
      <span
        className="glass gradient-border grid size-14 place-items-center rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_26px_-6px_var(--brand)] sm:size-16"
        style={{ color: "var(--brand)" }}
      >
        {custom ? (
          <Image
            src={custom.src}
            alt=""
            width={32}
            height={32}
            className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
          />
        ) : brand ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
          >
            <path d={brand.path} />
          </svg>
        ) : (
          <span
            aria-hidden
            className="font-display text-base font-bold tracking-tight transition-transform duration-300 group-hover:scale-110 sm:text-lg"
          >
            {lettermark(name)}
          </span>
        )}
      </span>

      <span className="text-[11px] leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-xs">
        {name}
      </span>
    </li>
  );
}
