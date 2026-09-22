import type { CSSProperties } from "react";

/**
 * The livery every generated Open Graph card shares.
 *
 * There are two cards now — the site's own (app/opengraph-image.tsx) and one
 * per case study (app/products/[slug]/opengraph-image.tsx) — and they are
 * different layouts, deliberately: the site card leads with the name, a case
 * study leads with the product. What they must not differ on is the palette,
 * the frame and the chip, or the two read as coming from different sites when
 * they turn up in the same feed.
 *
 * The hexes mirror globals.css. Satori cannot read CSS custom properties, so
 * they are restated as literals; keep them in step with the `:root` block
 * there. This file is the only copy on the OG side.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const OG_BACKGROUND = "#011627";
export const OG_HEADING = "#ffffff";
export const OG_MUTED = "#8badc1";
export const OG_ACCENT = "#7fdbca";
export const OG_EDGE = "#2c4f6b";
export const OG_RAISED = "#122a3d";
export const OG_FOREGROUND = "#d6deeb";

/** The card itself. `justifyContent: center` rather than a top-aligned stack
 * so a short case-study summary and a long one both sit optically centred
 * instead of the card growing a footer-sized hole. */
export const OG_FRAME: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: OG_BACKGROUND,
  padding: "72px 80px",
};

/** One technology chip, the same plate the site uses for a tag. */
export const OG_CHIP: CSSProperties = {
  display: "flex",
  fontSize: 23,
  color: OG_FOREGROUND,
  background: OG_RAISED,
  border: `1px solid ${OG_EDGE}`,
  borderRadius: 8,
  padding: "7px 16px",
};

/** The row the chips wrap inside. */
export const OG_CHIP_ROW: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
};

/**
 * How many chips a card may carry.
 *
 * Both featured projects flatten to thirteen or more technologies, and a card
 * is read at thumbnail size in a feed. Ten is what the site card already
 * carries and what fits two rows without the type having to shrink; past that
 * the row is texture rather than information.
 */
export const OG_CHIP_LIMIT = 10;

/**
 * Pick `limit` technologies out of a project's layered stack.
 *
 * Not a flatten-and-slice, which is what this was first and which quietly got
 * the content wrong: the groups are ordered front to back, so taking the first
 * ten off the front spent the whole budget on the client. Density's card came
 * out listing React Native, Expo Router, Skia, MMKV, Next.js, React, Recharts
 * and the shared core, and never reached the Backend group at all — a card for
 * a full-stack case study with no backend on it.
 *
 * So it takes one from each group in turn instead, round-robin, until the
 * budget runs out. Every layer is represented before any layer gets a second
 * chip, which is the claim the card is there to make. Within a layer the
 * content file's order is preserved, so the most telling technology in each
 * still comes first.
 */
export function sampleStack(
  groups: readonly { items: readonly string[] }[],
  limit: number,
) {
  const deepest = Math.max(0, ...groups.map((group) => group.items.length));
  const picked: string[] = [];

  for (let rank = 0; rank < deepest && picked.length < limit; rank += 1) {
    for (const group of groups) {
      if (picked.length === limit) break;
      const item = group.items[rank];
      if (item) picked.push(item);
    }
  }

  return picked;
}
