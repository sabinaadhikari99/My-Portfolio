import ParticleField from "./ParticleField";

/**
 * The page's ambient layer: three slowly drifting colour blobs, a panning grid
 * faded out at the edges, a particle field, and a vignette that darkens the
 * lower half so foreground text keeps its contrast.
 *
 * Fixed and behind everything (-z-10), so sections scroll over a background
 * that is itself in gentle motion. Everything here is decorative — aria-hidden
 * and pointer-events-none throughout.
 */
export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="hero-backdrop-enter pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div
        className="animate-blob absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.552 0.22 264 / 70%), transparent 65%)",
        }}
      />
      <div
        className="animate-blob absolute -right-32 top-1/4 h-[34rem] w-[34rem] rounded-full opacity-35 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.541 0.245 293 / 70%), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.715 0.135 213 / 70%), transparent 65%)",
          animationDelay: "-11s",
        }}
      />

      {/* Technical grid. Masked to an ellipse so it never reaches an edge and
          reads as depth rather than as a border. */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 9%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 9%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 78%)",
          animation: "grid-pan 14s linear infinite",
        }}
      />

      <div className="absolute inset-0 opacity-90">
        <ParticleField />
      </div>

      {/* Vignette - keeps body copy off the brightest part of the blobs. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 35%, oklch(0.115 0.038 274 / 75%) 100%)",
        }}
      />
    </div>
  );
}
