import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

// Social preview card, rendered at build time.
export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f8fa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#676d7b" }}>
          {person.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, color: "#15171c", lineHeight: 1.05 }}>
            {person.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#565d6a", marginTop: 16 }}>
            {`${person.role} · ${person.tagline}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#0b62d6" }}>
          Next.js · React · Django · FastAPI · PostgreSQL
        </div>
      </div>
    ),
    size,
  );
}
