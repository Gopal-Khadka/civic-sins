/**
 * Framework-free comic format metadata. The single source of truth for the
 * recurring formats, shared by `comics.ts` and the build-time OG image
 * generator (which can't import React/icons). Formats are identified by a
 * typographic stamp, not an icon — see design.md "Notice".
 */

export interface FormatMeta {
	id: string;
	name: string;
	/** Short uppercase code used as a stamp label (RIPPLE, COURT, …). */
	stamp: string;
	mechanic: string;
	sting: string;
}

export const FORMATS_META: FormatMeta[] = [
	{
		id: "the-ripple",
		name: "The Ripple",
		stamp: "RIPPLE",
		mechanic:
			"One careless act rolls downhill until it wrecks ten other people's day.",
		sting: "You see the full cost of one small shortcut.",
	},
	{
		id: "civic-sense-court",
		name: "Civic Sense Court",
		stamp: "COURT",
		mechanic: "An offender takes the stand and defends the indefensible.",
		sting: "The excuse convicts them better than any verdict.",
	},
	{
		id: "expectation-vs-reality",
		name: "Expectation vs Reality",
		stamp: "VS",
		mechanic: "What the offender pictures versus what everyone else sees.",
		sting: "The gap does the whole joke.",
	},
	{
		id: "the-smug-narrator",
		name: "The Smug Narrator",
		stamp: "NARRATOR",
		mechanic: "Someone loudly judges a habit, then does it two panels later.",
		sting: "You catch the hypocrisy before they do.",
	},
	{
		id: "todays-confession",
		name: "Today's Confession",
		stamp: "CONFESSION",
		mechanic: "Dey owns up to one of his own civic sins, on the record.",
		sting: "A joke that starts with us is harder to shrug off.",
	},
	{
		id: "cosmic-karma",
		name: "Cosmic Karma",
		stamp: "KARMA",
		mechanic: "A repeat offender meets a wildly oversized payback.",
		sting: "Absurd punishment, entirely deserved.",
	},
];

export const getFormatMeta = (id: string) =>
	FORMATS_META.find((f) => f.id === id);
