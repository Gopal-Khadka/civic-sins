import type { LucideIcon } from "lucide-react";
import {
	Gavel,
	HeartHandshake,
	Megaphone,
	Scale,
	Waves,
	Zap,
} from "lucide-react";

/**
 * Comic catalog config — the single source of truth for the recurring formats,
 * the character cast (mapped to Comicgen), and the tag vocabulary.
 * Schemas, gallery filters and the Formats page all derive from this.
 */

/* ------------------------------------------------------------------ formats */

export interface ComicFormat {
	id: string;
	name: string;
	mechanic: string;
	sting: string;
	icon: LucideIcon;
}

export const FORMATS: ComicFormat[] = [
	{
		id: "the-ripple",
		name: "The Ripple",
		mechanic:
			"One small inconsiderate act cascades into ruining ten people’s day.",
		sting: "Makes the invisible cost of “just one wrapper” visible.",
		icon: Waves,
	},
	{
		id: "civic-sense-court",
		name: "Civic Sense Court",
		mechanic: "An offender on trial gives an absurdly self-righteous defense.",
		sting: "Reusable cast; comedy rides the emotion swings.",
		icon: Gavel,
	},
	{
		id: "expectation-vs-reality",
		name: "Expectation vs Reality",
		mechanic:
			"What the offender thinks they look like vs what they actually look like.",
		sting: "Brutal, instant, infinitely repeatable.",
		icon: Scale,
	},
	{
		id: "the-smug-narrator",
		name: "The Smug Narrator",
		mechanic:
			"A character lectures everyone and is secretly the worst offender present.",
		sting: "Dramatic irony — the reader sees what the character can’t.",
		icon: Megaphone,
	},
	{
		id: "todays-confession",
		name: "Today's Confession",
		mechanic: "The mascot owns one of their own civic sins.",
		sting: "Builds trust; models the self-aware-hypocrite tone.",
		icon: HeartHandshake,
	},
	{
		id: "cosmic-karma",
		name: "Cosmic Karma",
		mechanic: "The serial offender faces escalating, exaggerated comeuppance.",
		sting: "Memorable through absurd escalation.",
		icon: Zap,
	},
];

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
