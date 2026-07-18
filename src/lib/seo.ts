import { env } from "#/config/env";
import { DEFAULT_SITE_URL, seoConfig, socialLinks } from "#/config/seo";
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
	/** Alt text for the social card image. */
	imageAlt?: string;
	type?: "website" | "article";
	keywords?: string[];
}

/** OG card dimensions — every card is rendered at this size (see scripts/generate-og.ts). */
const OG_WIDTH = "1200";
const OG_HEIGHT = "630";

/**
 * Build the meta + canonical link for a page. Site-wide tags (og:site_name,
 * twitter:card, locale, theme-color, JSON-LD) live in the root route.
 */
export function seo({
	title,
	description = seoConfig.description,
	path = "/",
	image = absoluteUrl(seoConfig.defaultOgImage),
	imageAlt,
	type = "website",
	keywords,
}: SeoOptions = {}): { meta: MetaTag[]; links: LinkTag[] } {
	const fullTitle = title
		? `${title} | ${seoConfig.name}`
		: `${seoConfig.name}: ${seoConfig.tagline}`;
	const url = absoluteUrl(path);
	const alt = imageAlt ?? `${seoConfig.name}: ${title ?? seoConfig.tagline}`;

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
		{ property: "og:image:width", content: OG_WIDTH },
		{ property: "og:image:height", content: OG_HEIGHT },
		{ property: "og:image:alt", content: alt },
		// Twitter
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
		{ name: "twitter:image:alt", content: alt },
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

/** OG image for a static content page: its generated social card (absolute URL). */
export function pageOgImage(slug: string): string {
	return absoluteUrl(`/og/${slug}.png`);
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
		founder: { "@type": "Person", name: seoConfig.maker },
		sameAs: socialLinks.map((s) => s.href),
	};
}

/**
 * Structured data for a static content page (about, privacy, …). Uses the
 * WebPage type, or AboutPage when `about` is set.
 */
export function webPageJsonLd(opts: {
	name: string;
	description: string;
	path: string;
	about?: boolean;
}): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": opts.about ? "AboutPage" : "WebPage",
		name: opts.name,
		description: opts.description,
		url: absoluteUrl(opts.path),
		inLanguage: seoConfig.language,
		isPartOf: { "@type": "WebSite", name: seoConfig.name, url: siteUrl },
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

/**
 * Full head() payload for a static MDX content page — meta + canonical + its own
 * OG card + WebPage/AboutPage and breadcrumb JSON-LD. Keeps the info routes tiny.
 */
export function mdxPageHead(
	page: { title?: string; description?: string } | undefined,
	opts: { slug: string; path: string; fallbackTitle: string; about?: boolean },
) {
	const title = page?.title ?? opts.fallbackTitle;
	const description = page?.description ?? seoConfig.description;
	return {
		...seo({
			title,
			description,
			path: opts.path,
			image: pageOgImage(opts.slug),
		}),
		scripts: [
			jsonLdScript(
				webPageJsonLd({
					name: title,
					description,
					path: opts.path,
					about: opts.about,
				}),
			),
			jsonLdScript(
				breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: title, path: opts.path },
				]),
			),
		],
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
