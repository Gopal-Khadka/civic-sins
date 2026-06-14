import { describe, expect, it } from "vitest";
import { comicgenUrl, panelImageUrl } from "#/lib/comicgen";

describe("comicgenUrl", () => {
	it("builds a hosted Comicgen URL with all params", () => {
		const url = comicgenUrl({
			name: "dey",
			angle: "straight",
			emotion: "smirk",
			pose: "normal",
		});
		expect(url).toContain("https://gramener.com/comicgen/v1/comic?");
		expect(url).toContain("name=dey");
		expect(url).toContain("emotion=smirk");
		expect(url).toContain("pose=normal");
		expect(url).toContain("ext=svg");
		expect(url).toContain("angle=straight");
	});

	it("omits angle when not provided", () => {
		const url = comicgenUrl({ name: "ava", emotion: "happy", pose: "normal" });
		expect(url).not.toContain("angle=");
	});

	it("honors a png extension", () => {
		const url = comicgenUrl({
			name: "dey",
			emotion: "happy",
			pose: "normal",
			ext: "png",
		});
		expect(url).toContain("ext=png");
	});
});

describe("panelImageUrl", () => {
	it("resolves a config character's default angle", () => {
		const url = panelImageUrl({
			character: "dey",
			emotion: "smirk",
			pose: "normal",
		});
		expect(url).toContain("name=dey");
		expect(url).toContain("angle=straight");
	});

	it("drops the angle for characters without an angle layer", () => {
		const url = panelImageUrl({
			character: "ava",
			emotion: "happy",
			pose: "normal",
		});
		expect(url).toContain("name=ava");
		expect(url).not.toContain("angle=");
	});

	it("lets a panel override the character's default angle", () => {
		const url = panelImageUrl({
			character: "dey",
			angle: "side",
			emotion: "smirk",
			pose: "normal",
		});
		expect(url).toContain("angle=side");
	});
});
