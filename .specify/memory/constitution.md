# danger-portfolio Constitution

## Core Principles

### I. Read the Installed Next.js Docs First

This project runs a Next.js release (16.x) whose APIs, conventions, and file
structure differ from older versions and from general training knowledge.

- Before writing or changing code that touches Next.js, the relevant guide in
  `node_modules/next/dist/docs/` MUST be read.
- Deprecation notices in those docs MUST be heeded; deprecated APIs MUST NOT be
  introduced in new code.
- The managed block at the top of `AGENTS.md` is owned by `next dev` and MUST NOT
  be hand-edited; project rules go below it.

Rationale: assumptions about "the Next.js you know" are the most likely source of
subtle breakage in this repo.

### II. No Em Dashes on Any Reader Surface (NON-NEGOTIABLE)

The em dash (U+2014) MUST NOT appear anywhere a reader can reach it: JSX text,
strings in `content/`, page metadata and descriptions, Open Graph card copy,
screen-reader-only text, console output, `AGENTS.md`, the README, the résumé PDF,
newly written comments, and `docs/`. Specs, plans, and tasks produced by Spec Kit
follow the same rule.

- Use a colon where the sentence turns and the second half explains the first; a
  comma or parentheses for an aside; a full stop otherwise.
- The middle dot (`·`) remains the separator in short lists such as tech stacks.
- The en dash (`–`) remains in date ranges and nowhere else.
- Verification MUST be done against build output
  (`npm run build`, then `grep -rl $'\u2014' .next/server/app --include=*.html`),
  plus a source check of `app/**/opengraph-image.tsx` and the résumé source, since
  their text is baked into images and PDF.

Rationale: it is a deliberate house style, and the rendered surface is what counts.

### III. Content Lives in `content/`

Site copy and data (projects, case studies, résumé, site metadata) MUST live in
`content/` and be rendered by components. Components in `components/` MUST NOT
hard-code copy that belongs to a project, case study, or résumé entry.

- The résumé has a single source in `content/` that feeds both the `/resume` page
  and `public/resume.pdf` (via `npm run resume`); the PDF MUST be regenerated
  whenever résumé content changes.
- Project images are imported statically from `public/` so Next.js can size and
  optimize them.

Rationale: one place to edit copy keeps the site, the PDF, and the OG cards in step.

### IV. Static, Server-First, No Backend

The portfolio is a single Next.js app with no backend, database, or API of its own.

- Pages MUST be server components and statically renderable unless a feature
  genuinely requires otherwise; `"use client"` MUST be limited to components that
  need interactivity (navigation, carousels, buttons, error boundaries).
- New runtime dependencies MUST be justified; the dependency list stays small.
- Secrets MUST NOT be committed; `.env.example` documents any required variables.

Rationale: a static site is fast, cheap to host, and has nothing to break at runtime.

### V. Accessible and Discoverable by Default

- Interactive elements MUST be keyboard reachable with visible focus, and links MUST
  be distinguishable without relying on color alone.
- Images MUST have meaningful `alt` text (or empty `alt` when decorative).
- Every route MUST provide metadata (title, description, Open Graph), and new
  routes MUST be reflected in `app/sitemap.ts` and structured data where relevant.

Rationale: the site is a hiring artifact; accessibility and SEO are part of the work
being shown.

## Technology & Deployment Constraints

- Stack: Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, ESLint
  (`eslint-config-next`). New tooling MUST fit this stack rather than replace it.
- Deployment: a push to `main` runs `.github/workflows/deploy.yml`, which builds the
  Docker image and has the remote server run it on port 3100 behind its Caddy (the
  `server-edge` repository). The port MUST match `server-edge`'s
  `sites/danger-portfolio.caddy`.
- `main` is the deploy branch; it MUST always build.

## Development Workflow & Quality Gates

Before a change is considered done:

1. `npm run lint` passes with no new errors.
2. `npm run build` succeeds.
3. The em dash check from Principle II returns no matches.
4. If résumé content changed, `npm run resume` has been run and `public/resume.pdf`
   is committed alongside it.
5. Visual changes have been checked in a browser at mobile and desktop widths.

Spec Kit artifacts (`specs/`) MUST cite which principles a plan touches, and any
deviation MUST be recorded with its justification in the plan's complexity section.

## Governance

This constitution supersedes conflicting practice in this repo. `AGENTS.md` remains
the runtime guidance file for coding agents; where the two overlap they MUST agree,
and an amendment to one MUST be mirrored in the other.

- Amendments are made by editing this file, with a version bump and an updated
  Last Amended date, in the same commit as any matching `AGENTS.md` change.
- Versioning follows semantic versioning: MAJOR for removing or redefining a
  principle, MINOR for adding a principle or materially expanding guidance, PATCH
  for clarifications and wording.
- Every plan produced by `/speckit-plan` MUST pass a constitution check before
  implementation, and reviews MUST verify compliance with the quality gates above.

**Version**: 1.0.0 | **Ratified**: 2026-11-02 | **Last Amended**: 2026-11-02
