import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

/**
 * A single comic panel — "strip-as-data" (PRD §6.1).
 * Art is driven by Comicgen (character/angle/emotion/pose); language lives only
 * in `dialogue` / `caption` / `narration`, so a strip re-renders in any language
 * by swapping text alone.
 */
const panelSchema = z.object({
  character: z.string(),
  angle: z.string().optional(),
  emotion: z.string(),
  pose: z.string(),
  dialogue: z.string().optional(),
  caption: z.string().optional(),
  narration: z.string().optional(),
  /** Civic setting used to tint the panel background (bus, road, queue, …). */
  scene: z.string().optional(),
  flip: z.boolean().optional(),
})

const comics = defineCollection({
  name: 'comics',
  directory: 'src/content/comics',
  include: '*.mdx',
  schema: z.object({
    content: z.string(),
    id: z.string(),
    title: z.string(),
    format: z.string(),
    language: z.string().default('en'),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    sharePrompt: z.string().optional(),
    featured: z.boolean().default(false),
    date: z.string().optional(),
    panels: z.array(panelSchema).min(1),
  }),
  transform: async (doc, ctx) => {
    const body = await compileMDX(ctx, doc)
    return { ...doc, body, slug: doc._meta.path }
  },
})

const pages = defineCollection({
  name: 'pages',
  directory: 'src/content/pages',
  include: '*.mdx',
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
    icon: z.string().optional(),
  }),
  transform: async (doc, ctx) => {
    const body = await compileMDX(ctx, doc)
    return { ...doc, body, slug: doc._meta.path }
  },
})

export default defineConfig({ content: [comics, pages] })
