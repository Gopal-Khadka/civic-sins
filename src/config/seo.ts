/**
 * Pure SEO / brand facts. NO React, env, or icon imports — this module is the
 * single source of truth for brand text and is safe to import from both the
 * app (routes, <head>) and the build-time SEO asset generator (scripts/).
 */

/** Default origin. Override per-environment with `VITE_SITE_URL`. */
export const DEFAULT_SITE_URL = "https://civicsins.example";

/** Social profiles (icons are attached in `site.ts`, which can import React). */
export const socialLinks = [
	{ label: "Instagram", href: "https://instagram.com" },
	{ label: "GitHub", href: "https://github.com" },
] as const;

export const seoConfig = {
	name: "Civic Sins",
	shortName: "Civic Sins",
	tagline: "We are all guilty. Especially me.",
	description:
		"Satirical comics that teach civic sense by making you wince at yourself — not the stranger next to you.",
	/** Open Graph locale. */
	locale: "en_US",
	/** ISO language for <html> / feeds. */
	language: "en",
	/** Twitter/X handle including the leading "@", or "" to omit. */
	twitterHandle: "",
	author: "Civic Sins",
	/**
	 * Default social-share image. A real Comicgen PNG of the mascot, so the card
	 * always resolves without shipping a binary asset. Per-comic pages override
	 * this with their own first panel.
	 */
	defaultOgImage:
		"https://gramener.com/comicgen/v1/comic?name=dey&emotion=happy&pose=normal&ext=png&angle=straight",
} as const;
