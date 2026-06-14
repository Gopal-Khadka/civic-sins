# Civic Sins

> We are all guilty. Especially me.

Satirical comics that teach civic sense by making you wince at **yourself** — not the
stranger next to you. The narrator is always the worst offender. It is not political,
not for profit, and targets behaviours, never people.

Built on **TanStack Start** (React 19) with a config-driven, DRY architecture:
content is data, design is tokens, and SEO/feeds/social cards are generated from the
content at build time.

---

## Tech stack

| Area        | Choice                                                              |
| ----------- | ------------------------------------------------------------------ |
| Framework   | TanStack Start + TanStack Router (file-based routes, SSR)           |
| Build       | Vite, deployed on Netlify                                           |
| Styling     | Tailwind CSS v4 with custom semantic tokens (light + dark)         |
| Content     | `content-collections` + MDX (strip-as-data frontmatter)            |
| Comic art   | [Comicgen](https://gramener.com/comicgen/) over our CSS bubbles    |
| Icons       | lucide-react                                                        |
| Analytics   | PostHog (cookieless, anonymous-only, opt-in via env)               |
| Tooling     | Biome, Vitest, Lefthook, commitlint, release-please                |

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Node 22+ and pnpm are required (`.nvmrc` + `packageManager` are pinned).

## Scripts

| Script                 | What it does                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `pnpm dev`             | Dev server (regenerates SEO/OG assets first)                     |
| `pnpm build`           | Production build (regenerates SEO/OG assets first)               |
| `pnpm preview`         | Preview the production build                                       |
| `pnpm test`            | Run the Vitest suite (`test:watch`, `test:coverage` also exist)   |
| `pnpm typecheck`       | `tsc --noEmit`                                                     |
| `pnpm check`           | Biome lint + format check (`pnpm format` to autofix)             |
| `pnpm assets:generate` | Regenerate sitemap, RSS, robots, llms.txt, and OG cards          |

## Project structure

```
src/
  config/      # single source of truth: site, comics (cast/tags), formats, seo, theme, env
  content/     # the comics + prose pages as MDX (this is the content)
  styles/      # design tokens — tokens.css (color), typography.css, app.css (Tailwind)
  components/  # ui/ layout/ theme/ comic/ analytics/ mdx/ (reusable, token-driven)
  lib/         # comicgen (renderer URL), content (typed accessors), seo (meta + JSON-LD)
  routes/      # file-based routes
scripts/       # generate-seo.ts (feeds/sitemap/llms), generate-og.ts (Satori social cards)
assets/fonts/  # static TTFs used by the OG card generator
```

---

## Adding a comic

A comic is a single MDX file in `src/content/comics/`. The **frontmatter is the strip**
(panels → Comicgen art + our speech bubbles); the Markdown body below `---` is optional
"Behind the strip" commentary. The filename becomes the URL (`my-new-sin.mdx` →
`/comics/my-new-sin`).

```mdx
---
id: unique-id-001          # any unique string
title: It's Just One Wrapper
format: the-ripple         # MUST be a format id in src/config/formats.ts
summary: One-line gallery blurb.
tags: [littering, self-implicating]   # MUST be tag ids in src/config/comics.ts
sharePrompt: Tag the person who...
featured: true             # shows on the homepage
date: '2026-06-14'         # controls sort order (newest first)
panels:
  - character: ethan       # MUST be a key in CHARACTERS (src/config/comics.ts)
    emotion: smirk         # valid Comicgen emotion
    pose: normal           # valid Comicgen pose
    dialogue: It's just one wrapper.   # rendered in a speech bubble
  - character: ethan
    emotion: shocked
    pose: normal
    narration: That evening            # the between-panel beat
    caption: The flooded street is his own.   # caption under the art
---

Optional commentary about the strip, rendered below it on the detail page.
```

The schema in `content-collections.ts` validates every file on `pnpm dev`/`build` — an
invalid `format`, `tag`, or `character`, or missing `panels`, fails the build with a clear
error. Valid Comicgen `emotion`/`pose` values come from the `comicgen` package.

To add new **formats**, **characters**, or **tags**, edit the config first
(`src/config/formats.ts` and `src/config/comics.ts`), then reference them in frontmatter.
Prose pages (Formats / Principles) live in `src/content/pages/`.

---

## Theming

All color and type live as CSS custom properties in `src/styles/`:

- `tokens.css` — semantic color tokens; `:root` is the light "Paper White" palette,
  `.dark` is the derived dark palette.
- `typography.css` — fonts + type scale.
- `app.css` — maps the raw tokens into Tailwind v4 (`@theme inline`) so utilities like
  `bg-page text-ink text-rust font-serif` resolve to tokens and flip with `.dark`.

Theme is no-FOUC (an inline script applies the class before paint) and toggles
light → dark → system.

## Analytics

Cookieless and off by default. Set `VITE_POSTHOG_KEY` to enable anonymous-only,
memory-persisted pageview tracking — no cookies, no PII, no consent banner. See
`src/lib/analytics.ts` and `.env.example`.

## SEO & GEO

- Per-route `<head>` (titles, descriptions, canonical, Open Graph, Twitter cards, and
  JSON-LD: WebSite / Organization / Article / BreadcrumbList / CollectionPage) via
  `src/lib/seo.ts`.
- `scripts/generate-seo.ts` emits `sitemap.xml`, `rss.xml`, `robots.txt`, and `llms.txt`
  from the MDX content.
- `scripts/generate-og.ts` renders 1200×630 social cards (`public/og/<slug>.png`) with
  Satori — one per comic plus a default.
- These assets are generated (gitignored) and rebuilt on every dev/build.

Set **`VITE_SITE_URL`** to your real origin (e.g. `https://yourdomain`) so canonical
URLs, OG tags, sitemap, and feeds are correct. Defaults to a placeholder otherwise.

## Conventions

- **Commits**: Conventional Commits, enforced by commitlint (scopes: `comics`, `content`,
  `ui`, `theme`, `config`, `analytics`, `ci`, `deps`, `release`, `test`).
- **Hooks** (Lefthook): pre-commit runs Biome + typecheck on staged files; commit-msg
  runs commitlint. Installed via `pnpm install`.
- **CI** (GitHub Actions): lint, typecheck, test, build on every PR + commitlint on PRs.
- **Releases**: release-please opens a release PR with the version bump + `CHANGELOG.md`
  on merge to `master`.

## Deployment

Deploys to Netlify (`@netlify/vite-plugin-tanstack-start`). Set environment variables in
the Netlify dashboard:

- `VITE_SITE_URL` — your public origin (required for correct SEO)
- `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` — optional analytics

## License

Dual-licensed:

- **Code** — [MIT](./LICENSE)
- **Comic content** (`src/content/`) — [CC BY-NC 4.0](./LICENSE-content)

Comicgen character artwork is © Gramener and subject to its own terms.
