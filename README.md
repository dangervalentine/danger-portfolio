# danger-portfolio

The source for **[dangervalentine.com](https://dangervalentine.com)** — the personal
portfolio of Victor Danger Valentine, Senior Software Developer.

It is a single-page site: a header, a list of projects, and a way to get in touch.
Featured work (NextQuest, Density Fitness) gets a full-width row with its grouped
tech stack and store badges; everything else — arcade games, browser tools, an npm
package — sits in the grid below with a link to the live build and, where the source
is public, the repository.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Layout

| Path | What lives there |
| --- | --- |
| `content/site.ts` | Every project, badge and contact link. Edit this to change what the site says. |
| `app/` | Route, layout, global styles, and the generated metadata (Open Graph image, sitemap, robots). |
| `components/` | The pieces the page is built from — project cards, tech stack, store buttons, structured data. |
| `public/` | Project images and store badge art. |
| `scripts/deploy.ps1` | Pull, build and restart on the production box. |

Adding a project means adding an entry to `content/site.ts` and dropping its image in
`public/projects/` — no component changes needed.
