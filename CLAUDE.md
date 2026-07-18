# CLAUDE.md — civic-sense (Civic Sins)

Satirical comics that teach civic sense by making the reader wince at themselves,
not the stranger next to them. Static-first content site: TanStack Start (SSR) +
React 19 + TypeScript strict, MDX content, a config-driven design system.

## Non-negotiables

These are strict. Each names the file that owns a kind of value — read it and add
to it, never re-create the value inline. If a change forces you to break one,
stop and surface it; the rule is wrong or the change is.

1. **Config is the single source of truth.** Branding, nav, CTAs, social links →
   `src/config/site.ts`. Comic catalog, formats, tag vocabulary →
   `src/config/comics.ts` + `src/config/formats.ts`. Theme options →
   `src/config/theme.ts`. SEO/brand text → `src/config/seo.ts`. Env → `src/env.ts`
   (validated). Never hardcode a label, path, option list, or URL in a component.
2. **Semantic tokens only — no raw values.** Colors come from the shadcn/Base UI
   semantic set in `src/styles/tokens.css` (`--background`, `--foreground`,
   `--primary`, `--muted`, `--border`, …), surfaced as Tailwind utilities in
   `src/styles/app.css` (`bg-background`, `text-foreground`, `bg-primary`,
   `text-muted-foreground`, …). Fonts/type scale live in `typography.css`. No raw
   hex, no one-off font sizes, no comic-era classes (`bg-rust`, `text-ink`). See
   `design.md`.
3. **Content lives in MDX, not components.** Comics → `src/content/comics/`, pages
   → `src/content/pages/`. Content-collections generates typed data; read it via
   `src/lib/content.ts`. Never inline copy that belongs in a `.mdx` file.
4. **SEO is generated, not hand-written.** Page `<head>` comes from `src/lib/seo.ts`
   helpers (`seo()`, JSON-LD builders). OG cards and SEO assets are built by
   `scripts/generate-*.ts` via `pnpm assets:generate`. Don't hardcode `<title>`,
   meta, or OG image paths in routes.
5. **One responsibility per file.** Components → `src/components/<feature>/`, route
   trees → `src/routes/`, utils/mappers → `src/lib/`, config → `src/config/`. No
   single-file dumps.

## Commands

- `pnpm dev` — dev server on :3000 (regenerates SEO/OG assets first)
- `pnpm build` — production build (regenerates assets first)
- `pnpm check` — `biome check && tsc --noEmit`. Run before every commit.
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm assets:generate` — regenerate SEO metadata + Satori OG cards

## Tech stack

- **Framework**: TanStack Start (SSR) + TanStack Router (file-based, `src/routes/`)
- **UI primitives**: Base UI (`@base-ui/react`) — accessible, unstyled. Styled with
  our tokens via `class-variance-authority`.
- **Icons**: Phosphor (`@phosphor-icons/react`) only.
- **Styling**: Tailwind CSS v4 + `@tailwindcss/typography`
- **Content**: content-collections (MDX) — `src/content/`, read via `src/lib/content.ts`
- **Comics**: comicgen (`src/lib/comicgen.ts`)
- **Analytics**: PostHog (`src/lib/analytics.ts`)
- **Tooling**: Biome (lint + format), Vitest, Netlify adapter

## UI rules

- **Read `design.md` before building or changing UI.** It owns the visual direction:
  the "Heritage" system — architectural minimalism meets journalistic gravitas. Deep
  ink (`#1A1C1E`) on warm limestone (`#F7F5F2`), one terracotta accent (`#B8422E`)
  reserved for a single action per screen. Fraunces (display), Public Sans (body),
  Space Grotesk (labels). Flat, no gradients, negative space is a feature.
- **Add UI components with the shadcn CLI, don't hand-roll them.** Run
  `pnpm dlx shadcn@latest add <component>` (registry `base-nova`, Base UI + Phosphor).
  Components land in `src/components/ui/` as lowercase files (`button.tsx`,
  `badge.tsx`, `card.tsx`). Only write a component by hand when the registry has no
  equivalent (e.g. `Container.tsx`, the page-width wrapper).
- **The palette lives in the tokens, not in each component.** shadcn components use
  the semantic token names (`bg-primary`, `bg-card`, `text-muted-foreground`, …);
  `tokens.css` gives those the Heritage values and `app.css` maps them to Tailwind,
  so added components render on-brand unmodified. `--primary` is the terracotta
  accent, so a default `<Button>` is the reserved action. Need a token that isn't
  defined yet? Add it in `tokens.css` (light + dark) — never hardcode a hex in a
  component.
- **Icons: Phosphor, imported from `@phosphor-icons/react`.** Type icon props/props
  maps with the exported `Icon` type. Size with a `className` (`size-4`), not the
  `size` prop; adjust stroke look with Phosphor's `weight` prop — there is no
  `strokeWidth`. Never reintroduce lucide.
- **No raw hex in UI.** Add or reuse a token in `styles/`, then consume it.
- **One accent action per screen** (terracotta `--primary`). Everything else is
  `outline` / `ghost` / ink text.
- **File naming**: shadcn `ui/` components are lowercase (`button.tsx`, `card.tsx`);
  feature components are PascalCase (`ComicCard.tsx`, `Container.tsx`).

## Code quality

- TypeScript strict. Run `pnpm check` before commits (also enforced by lefthook).
- Biome formatting: tabs, double quotes, imports auto-organized. Don't hand-fight it —
  run `pnpm biome check --write`.
- Import alias: `#/*` → `src/*`.
- Co-locate tests as `*.test.ts` next to the unit; run under Vitest (`src/test/setup.ts`).
- Add comments only for non-obvious intent. No noise.

## Structure

```
src/
├── routes/       # TanStack Router file routes (__root, index, comics/, formats, principles)
├── components/   # By feature: ui/ (Base UI wrappers), comic/, layout/, theme/, mdx/, analytics/
├── config/       # Single sources of truth: site, comics, formats, seo, theme
├── content/      # MDX: comics/, pages/ (content-collections)
├── lib/          # content, seo, comicgen, analytics, utils
├── styles/       # tokens.css, typography.css, app.css (token → Tailwind mapping)
└── env.ts        # validated environment
```
