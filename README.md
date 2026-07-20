# B. Nandini — Portfolio

Personal site for B. Nandini, CTO / Head of Engineering at HireHappi.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4,
Framer Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Before going live

**Update `data/portfolio.ts`** — `profile.github` and `profile.siteUrl` still
hold placeholder values. `siteUrl` drives canonical URLs, the sitemap and OG
metadata.

## Where content lives

All copy is in `data/portfolio.ts` — sections, project case studies, the OG
image and the nav all read from it. Editing a project there updates the home
page card, its `/projects/[slug]` page and the sitemap together.

The AI assistant answers from `data/knowledge-base.json` via a local keyword
matcher in `lib/assistant.ts`. No API key, no network call. To teach it
something new, add an entry with distinctive `keywords` — avoid generic words
like "about" or "she", which match too many questions.

## Structure

```
app/                    routes, metadata, sitemap, robots, OG image
  projects/[slug]/      statically generated case studies
components/
  sections/             one file per home-page section
  ui/                   Section, Reveal, GlassCard, Button, Badge
data/                   portfolio content + chatbot knowledge base
lib/                    utils, assistant matcher, generated brand icons
scripts/                regenerate brand icons from simple-icons
legacy/                 the previous static HTML/CSS/JS site
```

## Notes

- `lib/brand-icons.ts` is generated. Re-run `node scripts/generate-icons.mjs`
  after changing the tech list. OpenAI and AWS have no simple-icons entry
  (trademark removals) and render as monogram tiles.
- Palette lives on `:root` in `app/globals.css`, deliberately not in `@theme` —
  a `--color-base` theme key would shadow Tailwind's `text-base` font size.
- All animations honour `prefers-reduced-motion`.
