import type { Icon } from "@phosphor-icons/react";
import { GithubLogo, SealWarning } from "@phosphor-icons/react";
import { DEFAULT_SITE_URL, seoConfig, socialLinks } from "#/config/seo";

/**
 * Site-wide configuration. Single source of truth for branding, navigation,
 * footer and social links. Brand text + social URLs come from the framework-free
 * `seo.ts` (shared with the SEO generator); this file adds the React/icon layer.
 * Nothing here should be hardcoded in components — Header / Footer / <head> all
 * read from this object.
 */

export interface NavItem {
	label: string;
	to: string;
}

export interface SocialLink {
	label: string;
	href: string;
	icon: Icon;
}

/** Phosphor icon per social profile, keyed by the label used in `seo.ts`. */
const socialIcons: Record<string, Icon> = {
	GitHub: GithubLogo,
};

export const siteConfig = {
	name: seoConfig.name,
	shortName: seoConfig.shortName,
	tagline: seoConfig.tagline,
	description: seoConfig.description,
	url: DEFAULT_SITE_URL,
	brandIcon: SealWarning as Icon,

	nav: [
		{ label: "Comics", to: "/comics" },
		{ label: "Formats", to: "/formats" },
		{ label: "Principles", to: "/principles" },
		{ label: "About", to: "/about" },
	] satisfies NavItem[],

	/** Secondary footer links (meta + legal). */
	more: [
		{ label: "Colophon", to: "/colophon" },
		{ label: "Privacy", to: "/privacy" },
		{ label: "Terms", to: "/terms" },
	] satisfies NavItem[],

	cta: { label: "Read comics", to: "/comics" },

	social: socialLinks.map((s) => ({
		...s,
		icon: socialIcons[s.label] ?? SealWarning,
	})) satisfies SocialLink[],

	footer: {
		note: "A not-for-profit hobby project. Never political. Aimed at habits, never people.",
	},
} as const;
