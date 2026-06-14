import { describe, expect, it } from "vitest";
import type { Comic } from "#/lib/content";
import {
	absoluteUrl,
	articleJsonLd,
	breadcrumbJsonLd,
	comicOgImage,
	jsonLdScript,
	seo,
	siteUrl,
} from "#/lib/seo";

const comic = {
	slug: "its-just-one-wrapper",
	title: "It's Just One Wrapper",
	summary: "One dropped wrapper, one flooded street.",
	format: "the-ripple",
	language: "en",
	tags: ["littering"],
	date: "2026-06-14",
	panels: [{ character: "ethan", emotion: "smirk", pose: "normal" }],
} as unknown as Comic;

describe("absoluteUrl", () => {
	it("joins a path onto the site origin", () => {
		expect(absoluteUrl("/comics")).toBe(`${siteUrl}/comics`);
	});
	it("normalizes a missing leading slash", () => {
		expect(absoluteUrl("comics")).toBe(`${siteUrl}/comics`);
	});
});

describe("seo", () => {
	it("templates the title and sets canonical + og:url", () => {
		const { meta, links } = seo({ title: "Comics", path: "/comics" });
		expect(meta.find((m) => m.title)?.title).toContain("Comics");
		expect(links).toContainEqual({
			rel: "canonical",
			href: `${siteUrl}/comics`,
		});
		expect(meta).toContainEqual({
			property: "og:url",
			content: `${siteUrl}/comics`,
		});
	});

	it("uses the brand+tagline title on the home page", () => {
		const { meta } = seo({ path: "/" });
		const title = meta.find((m) => m.title)?.title ?? "";
		expect(title).toContain("Civic Sins");
		expect(title).toContain("—");
	});

	it("omits keywords when none are given", () => {
		const { meta } = seo({ path: "/" });
		expect(meta.find((m) => m.name === "keywords")).toBeUndefined();
	});
});

describe("jsonLdScript", () => {
	it("serializes data into an ld+json script entry", () => {
		const entry = jsonLdScript({ "@type": "Thing", name: "x" });
		expect(entry.type).toBe("application/ld+json");
		expect(JSON.parse(entry.children)).toMatchObject({ name: "x" });
	});
});

describe("structured data", () => {
	it("builds Article JSON-LD from a comic", () => {
		const ld = articleJsonLd(comic);
		expect(ld["@type"]).toBe("Article");
		expect(ld.headline).toBe(comic.title);
		expect(ld.mainEntityOfPage).toBe(`${siteUrl}/comics/${comic.slug}`);
	});

	it("uses the first panel PNG as the comic OG image", () => {
		const img = comicOgImage(comic);
		expect(img).toContain("ext=png");
		expect(img).toContain("name=ethan");
	});

	it("numbers breadcrumb positions from 1", () => {
		const ld = breadcrumbJsonLd([
			{ name: "Home", path: "/" },
			{ name: "Comics", path: "/comics" },
		]);
		const items = ld.itemListElement as Array<{ position: number }>;
		expect(items[0].position).toBe(1);
		expect(items[1].position).toBe(2);
	});
});
