import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px circle at 20% 0%, #1E1B4B, #030712 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#A5B4FC",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#4F46E5",
            }}
          />
          {profile.location}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 108,
            fontWeight: 700,
            color: "white",
            letterSpacing: -3,
          }}
        >
          {profile.name}
        </div>

        <div style={{ marginTop: 20, fontSize: 38, color: "#818CF8" }}>
          {profile.roles.join("  •  ")}
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#9CA3AF",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    size,
  );
}
