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

/**
 * Site-wide configuration. Single source of truth for branding, navigation,
 * footer and social links. Nothing here should be hardcoded in components —
 * Header / Footer / <head> meta all read from this object.
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

export const siteConfig = {
	name: "Civic Sins",
	shortName: "Civic Sins",
	tagline: "We are all guilty. Especially me.",
	description:
		"Satirical comics that teach civic sense by making you wince at yourself — not the stranger next to you.",
	url: "https://civicsins.example",
	brandIcon: Sparkles as LucideIcon,

	nav: [
		{ label: "Comics", to: "/comics", icon: BookOpen },
		{ label: "Formats", to: "/formats", icon: Layers },
		{ label: "Principles", to: "/principles", icon: ScrollText },
	] satisfies NavItem[],

	cta: { label: "Read the comics", to: "/comics", icon: Send },

	social: [
		{ label: "Instagram", href: "https://instagram.com", icon: Instagram },
		{ label: "GitHub", href: "https://github.com", icon: Github },
	] satisfies SocialLink[],

	footer: {
		note: "A social-responsibility hobby project. Not political. Not for profit. Targets behaviours, never people.",
	},
} as const;
