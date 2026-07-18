---
version: alpha
name: Notice
description: Municipal noticeboard meets comic strip. A public warning poster with jokes.
colors:
  primary: "#1A1917"
  secondary: "#6B6558"
  tertiary: "#E23A1E"
  neutral: "#F4F1E8"
  surface: "#FFFFFF"
  on-primary: "#FFFFFF"
  scene-blue: "#2F6E8F"
  scene-yellow: "#E0A92E"
  scene-green: "#4E8A5B"
typography:
  display:
    fontFamily: Public Sans
    fontSize: 4rem
    fontWeight: 800
    letterSpacing: "-0.02em"
  h1:
    fontFamily: Public Sans
    fontSize: 2.5rem
    fontWeight: 800
  body:
    fontFamily: Public Sans
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
    letterSpacing: "0.1em"
rounded:
  panel: 0px
  chip: 6px
  card: 6px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.chip}"
    padding: 12px 20px
  panel:
    backgroundColor: "{colors.surface}"
    border: "3px solid {colors.primary}"
    rounded: "{rounded.panel}"
---
## Overview

Civic Sins is comic satire about the small public habits everyone hates and
sometimes commits. The visual language is a municipal noticeboard that someone
drew jokes on: off-white paper, heavy ink, one civic red-orange, thick panel
rules, and stamped labels. It should feel like a public warning poster, not a
broadsheet essay. Loud where it needs to be, flat everywhere else.

## Colors

- **Ink (`#1A1917`):** Text, headlines, and the thick rules around comic panels.
- **Paper (`#F4F1E8`):** The page. Warm off-white, like a printed notice.
- **Red-orange (`#E23A1E`):** The one accent. Actions, punchlines, stamps, active
  filters. Reserve it — one loud thing per screen.
- **Ink-soft (`#6B6558`):** Captions, metadata, secondary text.
- **Scene colors** (`#2F6E8F` blue, `#E0A92E` yellow, `#4E8A5B` green): used
  **only inside comic panels** to place a setting. They tint the panel *and*
  draw the scene backplate — simple graphic line art (bus windows and handles,
  a curb and storm drain, parking bays, a traffic light, a court bench). One
  reusable backplate per scene, keyed off the panel's `scene`
  (`SceneBackplate.tsx`), sitting behind the character. Never UI accents.

## Typography

- **display / h1:** Public Sans, weight 800. Heavy, tight, poster-like.
- **body:** Public Sans, 1rem, line-height 1.6.
- **label / stamp:** Space Grotesk, uppercase, wide tracking. Used for kickers,
  format stamps, and filter chips.

Fraunces is gone. This is not a heritage broadsheet.

## Shape

- **Comic panels:** square. 0px radius, 3px ink border. Flat.
- **Buttons and chips:** 6px radius. Small, deliberate.
- **Cards:** avoid the generic three-equal-card grid. Use cards only when they
  represent a real comic object, and keep the radius tight.

## Layering

The page is flat by default, but major objects sit up off the paper as physical
things — never a soft floating card, always a hard-edged printed one.

- **Paper tray (`PaperTray.tsx`):** the layered "double-bezel", adapted to paper.
  An outer ink-bordered mat with a faint halftone print texture holds an inner
  object (which brings its own 3px border), giving concentric rules and a hard
  offset shadow (`--shadow-hard`, `4px 4px 0`, no blur). Reserve it for major
  objects: the hero strip, the featured gallery lead, the share prompt. Don't
  wrap every chip or row — nesting everything reads as SaaS hardware, not satire.
- **Rotation:** a slight `±1–2°` tilt on desktop makes trays and cards read as
  posted, hand-placed strips. Straighten on hover. Remove all rotation below
  `lg` (`motion-reduce:rotate-0` too) — tilts fight touch targets on mobile.

## Nav

The header is a **floating notice bar**, not a full-width bar glued to the top:
a detached, max-width paper ticket (3px ink border, hard shadow, paper
translucency + backdrop-blur), text-only links, the warning-seal mark. On mobile
it opens a full-screen "posted notice" menu whose links stagger in.

## Motion

Editorial, not spectacle. Motion signals hierarchy and reading order.

- **Reveal on enter:** content fades up once as it scrolls in (`Reveal` +
  `motion.css`). Animate only `transform`/`opacity`; custom easing, never linear.
- **Tactile hover/press:** cards lift with a hard offset shadow; the primary CTA
  is a ticket that presses down on `:active`, its trailing icon riding its own
  capsule that shifts on hover. Filter chips press physically.
- **Always** honour `prefers-reduced-motion` (everything resolves statically) and
  never gate content behind an animation for no-JS visitors.

## Do's and Don'ts

- **Do** keep one red-orange action per screen.
- **Do** give comic panels thick ink borders — they should read as strips, not UI.
- **Do** use scene colors and backplates to place characters in a real setting.
- **Do** reserve the one rounded, ticket-shaped object for the primary CTA — it is
  the deliberate exception to the flat, square rule.
- **Don't** use Fraunces or any serif display face.
- **Don't** reach for gradients, soft/blurred shadows, or rounded app-cards. Hard
  offset shadows only.
- **Don't** decorate nav or format cards with literal icons. Text and stamps carry it.
