import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";
import satori from "satori";
import { getFormatMeta } from "../src/config/formats.ts";
import { seoConfig } from "../src/config/seo.ts";

/**
 * Renders 1200×630 social-share (OG) cards into `public/og/` with Satori +
 * resvg — one per comic plus a site default. Typographic, brand-token styled,
 * fully offline (no remote fetches). Run via the asset-generation hooks.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const comicsDir = join(root, "src/content/comics");
const fontsDir = join(root, "assets/fonts");
const outDir = join(root, "public/og");

// Brand tokens ("Notice" palette — mirrors src/styles/tokens.css).
const COLOR = {
	ink: "#1a1917",
	inkSoft: "#6b6558",
	accent: "#e23a1e",
	page: "#f4f1e8",
	surface: "#ffffff",
	border: "#1a1917",
};

// Sans-only, poster-heavy. Source Sans 3 stands in for Public Sans in the
// build-time card (satori needs a static TTF; the site self-hosts the variable).
const fonts = [
	{
		name: "Source Sans 3",
		data: readFileSync(join(fontsDir, "SourceSans3-Semibold.ttf")),
		weight: 700 as const,
		style: "normal" as const,
	},
	{
		name: "Source Sans 3",
		data: readFileSync(join(fontsDir, "SourceSans3-Semibold.ttf")),
		weight: 600 as const,
		style: "normal" as const,
	},
	{
		name: "Source Sans 3",
		data: readFileSync(join(fontsDir, "SourceSans3-Regular.ttf")),
		weight: 400 as const,
		style: "normal" as const,
	},
];

/** Minimal hyperscript so we avoid JSX (Node runs this via type-stripping). */
type Node = { type: string; props: Record<string, unknown> };
const el = (
	type: string,
	style: Record<string, unknown>,
	children?: unknown,
): Node => ({ type, props: { style, children } });

const titleSize = (title: string) =>
	title.length > 42 ? 60 : title.length > 26 ? 74 : 86;

function card(opts: { title: string; footer: string }): Node {
	return el(
		"div",
		{
			width: 1200,
			height: 630,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			backgroundColor: COLOR.page,
			padding: "72px 80px",
			position: "relative",
			border: `3px solid ${COLOR.border}`,
		},
		[
			// brand accent bar
			el("div", {
				position: "absolute",
				left: 0,
				top: 0,
				width: 20,
				height: 630,
				backgroundColor: COLOR.accent,
			}),
			// kicker
			el(
				"div",
				{
					fontFamily: "Source Sans 3",
					fontWeight: 600,
					fontSize: 30,
					letterSpacing: 8,
					color: COLOR.accent,
				},
				seoConfig.name.toUpperCase(),
			),
			// headline
			el(
				"div",
				{
					display: "flex",
					fontFamily: "Source Sans 3",
					fontWeight: 700,
					fontSize: titleSize(opts.title),
					lineHeight: 1.03,
					letterSpacing: -1,
					color: COLOR.ink,
					maxWidth: 1000,
				},
				opts.title,
			),
			// footer row
			el(
				"div",
				{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				},
				[
					el(
						"div",
						{
							display: "flex",
							fontFamily: "Source Sans 3",
							fontWeight: 600,
							fontSize: 26,
							color: COLOR.accent,
						},
						opts.footer,
					),
					el(
						"div",
						{
							display: "flex",
							fontFamily: "Source Sans 3",
							fontWeight: 400,
							fontSize: 24,
							color: COLOR.inkSoft,
						},
						seoConfig.tagline,
					),
				],
			),
		],
	);
}

async function renderPng(node: Node): Promise<Buffer> {
	const svg = await satori(node as unknown as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts,
	});
	return Buffer.from(
		new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng(),
	);
}

async function main() {
	mkdirSync(outDir, { recursive: true });

	// Per-comic cards.
	const files = readdirSync(comicsDir).filter((f) => f.endsWith(".mdx"));
	for (const file of files) {
		const { data } = matter(readFileSync(join(comicsDir, file), "utf8"));
		const slug = file.replace(/\.mdx$/, "");
		const format = getFormatMeta(String(data.format));
		const png = await renderPng(
			card({
				title: String(data.title ?? slug),
				footer: format?.name ?? "Civic Sins",
			}),
		);
		writeFileSync(join(outDir, `${slug}.png`), png);
	}

	// Site default card.
	const fallback = await renderPng(
		card({ title: seoConfig.name, footer: "Civic sense, minus the lecture" }),
	);
	writeFileSync(join(outDir, "default.png"), fallback);

	console.log(
		`[og] generated ${files.length + 1} OG cards in public/og/ (${process.env.VITE_SITE_URL ?? "default origin"})`,
	);
}

main().catch((err) => {
	console.error("[og] failed:", err);
	process.exit(1);
});
