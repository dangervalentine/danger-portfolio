# Quickstart: validating the Riftwyrm featured project

## 0. Before coding

Read the installed Next.js guides for the APIs these files touch (constitution
principle I): Image component and `getImageProps`, and Metadata / OG image file
conventions, under `node_modules/next/dist/docs/01-app/`.

## 1. Assets present

```sh
ls public/projects/riftwyrm.webp public/projects/riftwyrm-square.webp public/projects/riftwyrm/
sips -g pixelWidth -g pixelHeight public/projects/riftwyrm/*.webp | grep pixel   # all 1920 x 1080
```

To check determinism in the game repo, run the portfolio capture twice and confirm the
images match. See `contracts/screenshot-assets.md`.

## 2. Lint and build

```sh
npm run lint
npm run build      # /products/riftwyrm must appear among the statically generated routes
```

## 3. Home page (`npm run start`, http://localhost:3000)

- At 390px, 768px and 1440px, the "Products" block shows NextQuest, Density Fitness, then
  Riftwyrm, in the same style.
- The Riftwyrm band reads "App Store, Google Play & Web App · coming soon". Density's line
  still reads "App Store & Google Play · coming soon".
- "Private repository" appears beside "How it's built". There is no repository button.
- The card and "How it's built" both go to `/products/riftwyrm`. Nothing else is a link.
- Tab through the row: the focus is visible and the order makes sense.

## 4. Case study (`/products/riftwyrm`)

- The carousel shows the frames with labels. Arrow keys work.
- The diagram has the three bands and no server or database box.
- The exhibits include platform achievements and the Leaderboard, plus progress sync. Sync
  names both Game Center and Google Play Games. Before publishing, dragon-hunter specs/038
  must have landed (spec FR-007c, task T034).
- The footer shows four dimmed links, each with its own reason.

## 5. Em dash check

```sh
grep -rl $'\u2014' .next/server/app --include=*.html    # no output
grep -n $'\u2014' content/site.ts content/case-studies.ts   # none in Riftwyrm entries
```

Check the case-study summary by eye in the OG card at `/products/riftwyrm/opengraph-image`, and
check every baked-in carousel headline.

## 6. IP check

Search the Riftwyrm copy for the publisher's name, the designer's name and the original's
terms listed in research R8. The only allowed mention is the single "inspired by" credit.

## 7. Regression

The NextQuest and Density Fitness rows and case studies look identical before and after
(compare screenshots at the three widths).
