<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Everything below sits outside the managed block above. `next dev` replaces
only what lies between its two markers and preserves the rest of the file, so
rules added here survive it.

## No em dashes

Never use an em dash (`&mdash;`, U+2014, the long one) anywhere a reader can
reach it: JSX text, strings in `content/`, page metadata and descriptions, the
Open Graph card copy, screen-reader-only text, console output, this file, the
README, and the résumé that `scripts/build-resume.mjs` renders to PDF. Newly
written comments and `docs/` follow the same rule. Naming the character, as
this paragraph does, is the only exception.

Use the mark the sentence actually wants:

- a colon where the sentence turns and the second half explains the first
- a comma, or parentheses, for an aside
- a full stop where neither fits, which is most of the time

Two marks are not affected. The middle dot (`·`) stays the separator inside a
run of technologies and other short lists, and the en dash (`–`) stays in date
ranges, which is the one thing it is for.

To check, search the build output rather than the source. Nearly every match in
source is a comment, and it is the rendered surface that matters:

```sh
npm run build
grep -rl $'\u2014' .next/server/app --include=*.html
```

Two rendered surfaces that grep will not reach, because the text is baked into
an image or a PDF: the Open Graph cards from `app/**/opengraph-image.tsx`, and
`public/resume.pdf`. Check those at the source.
