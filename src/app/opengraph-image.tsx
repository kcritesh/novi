import { ImageResponse } from "next/og";

import { hero, site } from "@/content/content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const palette = {
  paper: "#fafaf7",
  ink: "#16161a",
  muted: "#6b6b76",
  accent: "#5b5bd6",
  hairline: "#e7e6e1",
};

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: palette.paper,
        borderLeft: `2px solid ${palette.hairline}`,
        borderRight: `2px solid ${palette.hairline}`,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", position: "relative", width: 48, height: 48 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 30,
              height: 30,
              borderRadius: 10,
              background: palette.ink,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              width: 30,
              height: 30,
              borderRadius: 10,
              background: palette.accent,
            }}
          />
        </div>
        <span style={{ fontSize: 40, fontWeight: 600, color: palette.ink, letterSpacing: -1.5 }}>novi</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{ fontSize: 84, fontWeight: 700, color: palette.ink, letterSpacing: -3, lineHeight: 1.02 }}
        >
          {`${hero.headline.lead} ${hero.headline.emphasis}`}
        </div>
        <div style={{ width: 360, height: 6, borderRadius: 6, background: palette.accent }} />
        <div style={{ fontSize: 30, color: palette.muted, maxWidth: 900 }}>{site.description}</div>
      </div>
    </div>,
    size,
  );
}
