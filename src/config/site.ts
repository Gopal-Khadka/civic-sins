import type { LucideIcon } from "lucide-react";
import {
	BookOpen,
	Github,
	Instagram,
	Layers,
	ScrollText,
	Send,
	Sparkles,
} from "lucide-react";
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
	icon: LucideIcon;
}

export interface SocialLink {
	label: string;
	href: string;
	icon: LucideIcon;
}

/** Lucide icon per social profile, keyed by the label used in `seo.ts`. */
const socialIcons: Record<string, LucideIcon> = {
	Instagram,
	GitHub: Github,
};

export const siteConfig = {
	name: seoConfig.name,
	shortName: seoConfig.shortName,
	tagline: seoConfig.tagline,
	description: seoConfig.description,
	url: DEFAULT_SITE_URL,
	brandIcon: Sparkles as LucideIcon,

	nav: [
		{ label: "Comics", to: "/comics", icon: BookOpen },
		{ label: "Formats", to: "/formats", icon: Layers },
		{ label: "Principles", to: "/principles", icon: ScrollText },
	] satisfies NavItem[],

	cta: { label: "Read the comics", to: "/comics", icon: Send },

	social: socialLinks.map((s) => ({
		...s,
		icon: socialIcons[s.label] ?? Sparkles,
	})) satisfies SocialLink[],

	footer: {
		note: "A social-responsibility hobby project. Not political. Not for profit. Targets behaviours, never people.",
	},
} as const;
