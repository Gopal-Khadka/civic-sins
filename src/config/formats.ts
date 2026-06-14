/**
 * Framework-free comic format metadata. The single source of truth for the
 * recurring formats, shared by `comics.ts` (which attaches Lucide icons) and the
 * build-time OG image generator (which can't import React/icons).
 */

export interface FormatMeta {
	id: string;
	name: string;
	mechanic: string;
	sting: string;
}

export const FORMATS_META: FormatMeta[] = [
	{
		id: "the-ripple",
		name: "The Ripple",
		mechanic:
			"One small inconsiderate act cascades into ruining ten people’s day.",
		sting: "Makes the invisible cost of “just one wrapper” visible.",
	},
	{
		id: "civic-sense-court",
		name: "Civic Sense Court",
		mechanic: "An offender on trial gives an absurdly self-righteous defense.",
		sting: "Reusable cast; comedy rides the emotion swings.",
	},
	{
		id: "expectation-vs-reality",
		name: "Expectation vs Reality",
		mechanic:
			"What the offender thinks they look like vs what they actually look like.",
		sting: "Brutal, instant, infinitely repeatable.",
	},
	{
		id: "the-smug-narrator",
		name: "The Smug Narrator",
		mechanic:
			"A character lectures everyone and is secretly the worst offender present.",
		sting: "Dramatic irony — the reader sees what the character can’t.",
	},
	{
		id: "todays-confession",
		name: "Today's Confession",
		mechanic: "The mascot owns one of their own civic sins.",
		sting: "Builds trust; models the self-aware-hypocrite tone.",
	},
	{
		id: "cosmic-karma",
		name: "Cosmic Karma",
		mechanic: "The serial offender faces escalating, exaggerated comeuppance.",
		sting: "Memorable through absurd escalation.",
	},
];

export const getFormatMeta = (id: string) =>
	FORMATS_META.find((f) => f.id === id);
