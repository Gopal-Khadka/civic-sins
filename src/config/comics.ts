import type { Icon } from "@phosphor-icons/react";
import {
	Gavel,
	Handshake,
	Lightning,
	Megaphone,
	Scales,
	Sparkle,
	Waves,
} from "@phosphor-icons/react";
import { FORMATS_META, type FormatMeta } from "#/config/formats";

/**
 * Comic catalog config — the single source of truth for the character cast
 * (mapped to Comicgen) and the tag vocabulary. Format metadata lives in the
 * framework-free `formats.ts`; here we attach the Lucide icons.
 * Schemas, gallery filters and the Formats page all derive from this.
 */

/* ------------------------------------------------------------------ formats */

export interface ComicFormat extends FormatMeta {
	icon: Icon;
}

/** Phosphor icon per format, keyed by id. */
const FORMAT_ICONS: Record<string, Icon> = {
	"the-ripple": Waves,
	"civic-sense-court": Gavel,
	"expectation-vs-reality": Scales,
	"the-smug-narrator": Megaphone,
	"todays-confession": Handshake,
	"cosmic-karma": Lightning,
};

export const FORMATS: ComicFormat[] = FORMATS_META.map((f) => ({
	...f,
	icon: FORMAT_ICONS[f.id] ?? Sparkle,
}));

export const FORMAT_IDS = FORMATS.map((f) => f.id);
export const getFormat = (id: string) => FORMATS.find((f) => f.id === id);

/* --------------------------------------------------------------- characters */

export interface CharacterDef {
	/** Author-facing id used in comic panel data. */
	id: string;
	/** Comicgen character name. */
	name: string;
	/** Default Comicgen angle (empty when the character has no angle layer). */
	angle: string;
	label: string;
	/** The recurring self-aware hypocrite (PRD §6.3). */
	mascot?: boolean;
}

export const CHARACTERS: Record<string, CharacterDef> = {
	dey: {
		id: "dey",
		name: "dey",
		angle: "straight",
		label: "Dey, the Narrator",
		mascot: true,
	},
	ethan: { id: "ethan", name: "ethan", angle: "straight", label: "Ethan" },
	dee: { id: "dee", name: "dee", angle: "straight", label: "Dee" },
	priya: { id: "priya", name: "priya", angle: "straight", label: "Priya" },
	ava: { id: "ava", name: "ava", angle: "", label: "Ava" },
	aryan: { id: "aryan", name: "aryan", angle: "", label: "Aryan" },
};

export const MASCOT: CharacterDef =
	Object.values(CHARACTERS).find((c) => c.mascot) ?? CHARACTERS.dey;
export const getCharacter = (id: string): CharacterDef =>
	CHARACTERS[id] ?? { id, name: id, angle: "straight", label: id };

/* --------------------------------------------------------------------- tags */

export interface ComicTag {
	id: string;
	label: string;
}

export const TAGS: ComicTag[] = [
	{ id: "littering", label: "Littering" },
	{ id: "queuing", label: "Queuing" },
	{ id: "noise", label: "Noise" },
	{ id: "traffic", label: "Traffic" },
	{ id: "public-space", label: "Public Space" },
	{ id: "self-implicating", label: "Self-implicating" },
];

export const getTag = (id: string) => TAGS.find((t) => t.id === id);
