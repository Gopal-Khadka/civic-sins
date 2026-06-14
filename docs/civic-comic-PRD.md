---
title: Product Requirements Document
description:
author:
  - Gopal Khadka
  - "[[Claude]]"
source:
tags: []
date created: Friday, June 12th 2026, 7:56:17 pm
date modified: Friday, June 12th 2026, 8:00:03 pm
aliases: []
---
# Product Requirements Document

**Working title:** *Civic Sins* (placeholder — TBD)
**Type:** Web-based satirical comic platform teaching civic sense
**Owner:** Solo developer (Nepal), hobby project, weekend cadence
**Status:** Draft v1
**Last updated:** June 2026

---

## 1. Summary

A website that teaches civic sense through short, satirical comics that are funny, memorable, and deliberately *uncomfortable* — designed to make the reader recognize themselves in the offender. The project is a social-responsibility effort, not a commercial product. It exists because everyday incivility is rising, direct correction provokes fights, and a comic is the one form of "saying something" that lands without starting an argument on the street.

Comics are generated **programmatically** from structured data (not hand-drawn), which makes them fast to produce, easy to remix, and trivially **multilingual** — the same strip renders in multiple languages by swapping a single text layer.

---

## 2. Problem

- Civic sense (queuing, littering, noise, public space, traffic courtesy) is visibly eroding in shared spaces.
- Correcting people directly triggers defensiveness and conflict — the issue is the *posture* of being lectured, not the litter itself.
- Existing civic content is preachy and finger-wagging, so people tune it out or react with hostility.
- There is no widely shared, genuinely funny, self-aware body of civic-sense content — especially none that implicates the audience instead of scolding them.

---

## 3. Goals & Non-Goals

### Goals
- Make civic-sense lessons **memorable through humor** rather than instruction.
- Disarm the defensiveness reflex by satirizing from *inside* the crowd ("we're all guilty, me included").
- Produce strips **programmatically** so a new comic costs minutes of writing, not hours of drawing.
- Be **language-agnostic** at the architecture level so reach is never capped by language.
- Build a **self-sustaining content loop** via audience-submitted grievances.

### Non-Goals
- **Not political.** No parties, leaders, or partisan framing.
- **Not targeted at any group.** Targets are *behaviors*, never nationalities, classes, regions, or communities.
- **Not a lecture platform.** No moralizing tone, no "rules of conduct" pages as the core.
- **Not monetized** (at least initially). Success is behavioral and cultural, not revenue.
- **Not a CMS/account system** at launch. Complexity is deferred until the content proves it works.

---

## 4. Audience

**No primary audience — universal by design.** This is a deliberate stance, not an omission: incivility is universal, so the mission is too.

The one constraint this imposes: while the *mission* is universal, every individual strip must be **specific to bite**. You never draw "rude people in general" — you draw the one person reclining their seat into your knees. **Universal mission, specific punchlines.**

---

## 5. Guiding Principles (the craft pillars)

These are non-negotiable and should be reviewable on every single strip.

1. **Sting through self-recognition.** The strip should make the reader wince at *themselves*, not feel superior to a stranger. Favor the last-panel turn: laugh at the offender for three panels, then reveal the offender is "you" / the narrator.
2. **Specificity is the weapon.** Exact, observed behavior ("turns the reel volume *up* when you glance over") beats generic complaint ("loud people") every time.
3. **Satire from inside the crowd.** The narrator/mascot is a self-aware hypocrite who gets caught committing the very sin they preached against. This earns the right to sting everyone else.
4. **Punch across, never down.** Targets cut across class. The joke is never the vendor or the laborer; it's the behavior. When in doubt, make the mascot the offender.
5. **No saints.** The creator/mascot openly owns their own civic sins. Audiences forgive an honest hypocrite; they never forgive a fraud.

---

## 6. Content System

### 6.1 Strip-as-data (the core idea)

Every comic is a JSON object describing panels. A render function turns it into a shareable image. Writing a new strip = writing a few lines of dialogue. Example schema:

```json
{
  "id": "litter-ripple-001",
  "title": "It's Just One Wrapper",
  "format": "the-ripple",
  "language": "en",
  "panels": [
    {
      "character": "ethan",
      "emotion": "smug",
      "pose": "holdingmobile",
      "dialogue": "It's just one wrapper. The city has cleaners for this.",
      "caption": null
    },
    {
      "character": "ethan",
      "emotion": "facepalm",
      "pose": "shrug",
      "dialogue": "...",
      "caption": "Three hours later, a drain is blocked."
    }
  ],
  "tags": ["littering", "self-implicating"],
  "share_prompt": "Tag the person who says this."
}
```

Because language lives in `dialogue`/`caption` only, the same strip re-renders in Nepali, Hindi, or English with zero redraws.

### 6.2 Recurring formats

| Format | Mechanic | Why it stings |
|---|---|---|
| **The Ripple** | One small inconsiderate act cascades into ruining ten people's day | Makes the invisible cost of "just one wrapper" visible |
| **Civic Sense Court** | Offender on trial gives an absurdly self-righteous defense | Reusable cast; comedy rides the emotion swings |
| **Expectation vs Reality** | Two panels: what the offender thinks they look like / what they actually look like | Brutal, instant, infinitely repeatable |
| **The Smug Narrator** | A character lectures everyone and is secretly the worst offender present | Dramatic irony — reader sees what the character can't |
| **Today's Confession** | The creator/mascot owns one of *their own* civic sins | Builds trust; models the self-aware-hypocrite tone |
| **Cosmic Karma** | The serial-offender mascot faces escalating, exaggerated comeuppance | Memorable through absurd escalation |

### 6.3 Mascot

A recurring, self-aware hypocrite. Delivers righteous lectures, then commits the same sin in the final frame (e.g. rants about people who don't return shopping carts, then leaves their own cart drifting across the lot). Loosely modeled on the creator.

---

## 7. Technical Architecture

**Primary renderer: Comicgen (Gramener).** Composable SVG characters with a large emotion/pose library, available as an npm package and REST/HTML API. Chosen for speed-to-first-strip — characters and expressions already exist, so the effort goes entirely into the writing.

**Backup / graduation path: Satori (Vercel).** When Comicgen's fixed art style becomes limiting, migrate to Satori (JSX + CSS → SVG → PNG via resvg) to control every pixel with custom art assets. The strip-as-data layer stays the same; only the renderer changes.

**Stack (lean):**
- Static site (no backend at launch). Strips stored as JSON + pre-rendered PNG/SVG.
- Render pipeline: JSON script → renderer (Comicgen) → PNG/SVG → shareable card.
- Hosting: any static host (free tier).
- Multilingual: text layer keyed by language; renderer selects at build time.

**Deliberately deferred:** accounts, database, CMS, comment systems. Add only after content is validated.

---

## 8. Distribution & Growth

The growth engine is **passive-aggressive sharing** — people forwarding a strip to the specific person who commits that sin. Every strip is designed to be *sendable to an offender*.

Mechanics:

- **"Tag the person who does this"** caption on shareable strips.
- **Sin of the Week** — a regular cadence that gives people a reason to return and share.
- **Civic Sins Quiz** — scores *your own* civic sins and outputs a shareable result card. Self-implicating and inherently spreadable. (Likely the single strongest distribution lever for a no-budget project.)
- **Grievance submissions** — readers submit real-life incivilities; the best become strips. Free content engine + a community that feels co-authored.
- **"Make your own grievance" tool** (later) — user picks a sin, gets a Comicgen strip to share. User-generated content that runs itself.

Channels: image-first social (Instagram, Reddit, regional groups). Treat social posts as the front door; the site is home base.

---

## 9. Success Metrics

Humble and behavior-focused, not vanity metrics. Early on, the real metric is simply **does the comedy land**.

- **Primary:** shares — especially "sent to a specific person" (the passive-aggressive forward).
- Grievance submissions per week (proxy for resonance + content supply).
- Quiz completions and result-card shares.
- Return visits to "Sin of the Week."
- Qualitative: anecdotes of a strip changing one person's behavior, or being used to defuse a real situation.

Explicitly *not* chasing follower counts or pageviews as goals in themselves.

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **Comedy doesn't land** (the real make-or-break — mediocre comedy is worse than none) | Ship tiny first; validate laughs before building infrastructure. Recruit a funny co-writer if needed. |
| **Reads as punching down / offends a group** | Principle #4 enforced per-strip; target behaviors only; make the mascot the offender when unsure. |
| **Comes across as preachy** | Principle #3 (self-implicating narrator) + Today's Confession thread. |
| **Solo-dev burnout / weekend-only cadence** | Strip-as-data keeps per-strip cost low; grievance submissions outsource ideation. |
| **Drifts political** | Hard non-goal; review gate before publishing anything topical. |
| **Renderer lock-in** | Strip-as-data layer abstracts the renderer; Satori path already planned. |

---

## 11. Roadmap

### Phase 0 — Validate the funny (this/next weekend)
- 8–10 strips across 2–3 formats, rendered via Comicgen.
- One Civic Sins quiz with a shareable result card.
- Bare static page + share buttons. **No CMS, no accounts.**
- Goal: find out if people laugh and forward. Nothing else matters yet.

### Phase 1 — Cadence & loop
- "Sin of the Week" publishing rhythm.
- Grievance submission form → strip pipeline.
- Multilingual text-swap (start: English + Nepali, then Hindi).

### Phase 2 — Scale & ownership
- "Make your own grievance" generator (user-facing).
- Migrate select strips/custom art to Satori for a distinct visual identity.
- Light community features only if demand is proven.

---

## 12. Open Questions

1. **First strip:** which civic sin does the creator personally commit most? That's the most honest opening strip and sets the self-implicating tone.
2. **Name:** is *Civic Sins* the direction, or something softer/funnier?
3. **Launch language:** English-first for reach, or Nepali-first for authenticity of voice, then expand?
4. **Visual identity:** stay on Comicgen's look long-term, or treat it purely as the prototyping layer before custom Satori art?
5. **Mascot design:** single recurring hypocrite, or a small ensemble (offender + exasperated bystander + smug narrator)?
