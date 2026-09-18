import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/** File-convention Open Graph image. Next picks this up automatically and
 * emits the og:image / twitter:image tags, so `metadata` in layout.tsx does
 * not declare an image of its own.
 *
 * Drawn from the site's own tokens rather than a screenshot: the card has to
 * carry a name and a stack at thumbnail size in a LinkedIn feed, and a
 * shrunken page render carries neither. The two featured projects have their
 * own promotional art, but that art is theirs — this one has to be Victor's. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Senior Software Developer`;

// Mirrors globals.css. Satori cannot read CSS custom properties, so the
// palette is restated here; keep the two in step.
const BACKGROUND = "#011627";
const HEADING = "#ffffff";
const MUTED = "#8badc1";
const ACCENT = "#7fdbca";
const EDGE = "#2c4f6b";
const RAISED = "#122a3d";
const FOREGROUND = "#d6deeb";

const CHIPS = [
  ".NET",
  "ASP.NET Core",
  "PostgreSQL",
  "Elasticsearch",
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "TypeScript",
  "Docker",
];

export default function Image() {
  return new ImageResponse(
    (
      // Satori needs an explicit display:flex on every element with more than
      // one child — it has no block layout to fall back on.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BACKGROUND,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ fontSize: 86, color: HEADING, letterSpacing: "-0.03em" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 86, color: ACCENT, letterSpacing: "-0.03em" }}>
            .
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 20, fontSize: 36, color: MUTED }}>
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 27,
            color: FOREGROUND,
            maxWidth: 940,
            lineHeight: 1.45,
          }}
        >
          Full-stack products shipped end to end — web, iOS and Android, on one
          backend I build and run myself.
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 44,
          }}
        >
          {CHIPS.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 23,
                color: FOREGROUND,
                background: RAISED,
                border: `1px solid ${EDGE}`,
                borderRadius: 8,
                padding: "7px 16px",
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: 48, fontSize: 24, color: ACCENT }}>
          dangervalentine.com
        </div>
      </div>
    ),
    size,
  );
}
