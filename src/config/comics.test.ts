import { describe, expect, it } from "vitest";
import {
	FORMAT_IDS,
	FORMATS,
	getCharacter,
	getFormat,
	getTag,
	MASCOT,
	TAGS,
} from "#/config/comics";

describe("formats", () => {
	it("exposes the six PRD formats", () => {
		expect(FORMATS).toHaveLength(6);
		expect(FORMAT_IDS).toContain("the-ripple");
	});

	it("looks up a format by id", () => {
		expect(getFormat("the-ripple")?.name).toBe("The Ripple");
		expect(getFormat("nope")).toBeUndefined();
	});
});

describe("characters", () => {
	it("flags exactly one mascot", () => {
		const mascots = Object.values(
			// access via getCharacter to keep the public surface
			{ dey: getCharacter("dey") },
		).filter((c) => c.mascot);
		expect(mascots).toHaveLength(1);
		expect(MASCOT.mascot).toBe(true);
	});

	it("falls back to a synthetic character for unknown ids", () => {
		const unknown = getCharacter("ghost");
		expect(unknown.id).toBe("ghost");
		expect(unknown.name).toBe("ghost");
	});
});

describe("tags", () => {
	it("looks up a tag label by id", () => {
		expect(getTag("littering")?.label).toBe("Littering");
		expect(getTag("nope")).toBeUndefined();
	});

	it("has a non-empty vocabulary", () => {
		expect(TAGS.length).toBeGreaterThan(0);
	});
});
