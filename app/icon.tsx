import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

// Generates the favicon at build time — no binary asset to keep in sync.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15171c",
          color: "#f7f8fa",
          fontSize: 20,
          fontWeight: 600,
          borderRadius: 7,
        }}
      >
        {person.name.charAt(0)}
      </div>
    ),
    size,
  );
}
