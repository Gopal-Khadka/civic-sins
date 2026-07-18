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
  **only inside comic panels** to tint a setting — a bus, a street, a queue.
  Never as UI accents.

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

## Do's and Don'ts

- **Do** keep one red-orange action per screen.
- **Do** give comic panels thick ink borders — they should read as strips, not UI.
- **Do** use scene colors to place characters in a real civic setting.
- **Don't** use Fraunces or any serif display face.
- **Don't** reach for gradients, soft shadows, or rounded app-cards. Flat and hard.
- **Don't** decorate nav or format cards with literal icons. Text and stamps carry it.
