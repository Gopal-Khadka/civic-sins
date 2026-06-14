import { env } from "#/config/env";
import { DEFAULT_SITE_URL, seoConfig } from "#/config/seo";
import type { Comic } from "#/lib/content";

/**
 * Centralized SEO helpers. Routes call `seo()` for meta + canonical, and the
 * `*JsonLd` builders for structured data — keeping every page's <head> DRY and
 * consistent. Follows the TanStack Start head() API (meta / links / scripts).
 */

/** Resolved public origin (no trailing slash). */
export const siteUrl = (env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(
	/\/$/,
	"",
);

/** Turn a path into an absolute URL. */
export function absoluteUrl(path = "/"): string {
	return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetaTag {
	title?: string;
	name?: string;
	property?: string;
	content?: string;
}

interface LinkTag {
	rel: string;
	href: string;
}

export interface SeoOptions {
	title?: string;
	description?: string;
	/** Site-relative path, e.g. "/comics". Drives canonical + og:url. */
	path?: string;
	/** Absolute image URL for the social card. */
	image?: string;
	type?: "website" | "article";
	keywords?: string[];
}

/**
 * Build the meta + canonical link for a page. Site-wide tags (og:site_name,
 * twitter:card, locale, theme-color, JSON-LD) live in the root route.
 */
export function seo({
	title,
	description = seoConfig.description,
	path = "/",
	image = absoluteUrl(seoConfig.defaultOgImage),
	type = "website",
	keywords,
}: SeoOptions = {}): { meta: MetaTag[]; links: LinkTag[] } {
	const fullTitle = title
		? `${title} — ${seoConfig.name}`
		: `${seoConfig.name} — ${seoConfig.tagline}`;
	const url = absoluteUrl(path);

	const meta: Array<MetaTag | null> = [
		{ title: fullTitle },
		{ name: "description", content: description },
		keywords?.length
			? { name: "keywords", content: keywords.join(", ") }
			: null,
		// Open Graph
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:type", content: type },
		{ property: "og:url", content: url },
		{ property: "og:image", content: image },
		// Twitter
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	];

	return {
		meta: meta.filter((t): t is MetaTag => t !== null),
		links: [{ rel: "canonical", href: url }],
	};
}

/** Wrap structured data as a head() script entry. */
export function jsonLdScript(data: Record<string, unknown>) {
	return { type: "application/ld+json", children: JSON.stringify(data) };
}

/** OG image for a comic: its generated social card (absolute URL). */
export function comicOgImage(comic: Comic): string {
	return absoluteUrl(`/og/${comic.slug}.png`);
}

/* ----------------------------------------------------------- JSON-LD builders */

export function websiteJsonLd(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: seoConfig.name,
		description: seoConfig.description,
		url: siteUrl,
		inLanguage: seoConfig.language,
	};
}

export function organizationJsonLd(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: seoConfig.name,
		url: siteUrl,
		logo: absoluteUrl("/logo512.png"),
	};
}

export function articleJsonLd(comic: Comic): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: comic.title,
		description: comic.summary ?? seoConfig.description,
		image: comicOgImage(comic),
		datePublished: comic.date,
		inLanguage: comic.language ?? seoConfig.language,
		keywords: comic.tags.join(", "),
		author: { "@type": "Organization", name: seoConfig.author },
		publisher: { "@type": "Organization", name: seoConfig.name },
		mainEntityOfPage: absoluteUrl(`/comics/${comic.slug}`),
	};
}

export function breadcrumbJsonLd(
	crumbs: Array<{ name: string; path: string }>,
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.name,
			item: absoluteUrl(c.path),
		})),
	};
}

export function collectionPageJsonLd(opts: {
	name: string;
	description: string;
	path: string;
	items: Array<{ title: string; path: string }>;
}): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: opts.name,
		description: opts.description,
		url: absoluteUrl(opts.path),
		mainEntity: {
			"@type": "ItemList",
			itemListElement: opts.items.map((it, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: it.title,
				url: absoluteUrl(it.path),
			})),
		},
	};
}
