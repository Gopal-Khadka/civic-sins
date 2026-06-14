import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { DEFAULT_SITE_URL, seoConfig } from "../src/config/seo.ts";

/**
 * Generates the static SEO/GEO assets into `public/` from the MDX content:
 *   sitemap.xml, rss.xml, robots.txt, llms.txt
 * Run via the `predev` / `prebuild` hooks so they always reflect the content.
 * The MDX files remain the single source of truth.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const comicsDir = join(root, "src/content/comics");
const pagesDir = join(root, "src/content/pages");
const publicDir = join(root, "public");

const siteUrl = (process.env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(
	/\/$/,
	"",
);
const abs = (path: string) => `${siteUrl}${path}`;

const xmlEscape = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

interface Doc {
	slug: string;
	title: string;
	description: string;
	date?: string;
}

function readDocs(dir: string, descKey: "summary" | "description"): Doc[] {
	return readdirSync(dir)
		.filter((f) => f.endsWith(".mdx"))
		.map((file) => {
			const { data } = matter(readFileSync(join(dir, file), "utf8"));
			return {
				slug: file.replace(/\.mdx$/, ""),
				title: String(data.title ?? file),
				description: String(data[descKey] ?? seoConfig.description),
				date: data.date ? String(data.date) : undefined,
			};
		});
}

const comics = readDocs(comicsDir, "summary").sort((a, b) =>
	(b.date ?? "").localeCompare(a.date ?? ""),
);
readDocs(pagesDir, "description"); // validates pages parse; routes are static below

const latest = comics[0]?.date;

/* --------------------------------------------------------------- sitemap.xml */

interface SitemapEntry {
	path: string;
	priority: string;
	lastmod?: string;
}

const sitemapEntries: SitemapEntry[] = [
	{ path: "/", priority: "1.0", lastmod: latest },
	{ path: "/comics", priority: "0.9", lastmod: latest },
	{ path: "/formats", priority: "0.7" },
	{ path: "/principles", priority: "0.7" },
	...comics.map((c) => ({
		path: `/comics/${c.slug}`,
		priority: "0.8",
		lastmod: c.date,
	})),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
	.map(
		(e) =>
			`\t<url>\n\t\t<loc>${abs(e.path)}</loc>${
				e.lastmod ? `\n\t\t<lastmod>${e.lastmod}</lastmod>` : ""
			}\n\t\t<priority>${e.priority}</priority>\n\t</url>`,
	)
	.join("\n")}
</urlset>
`;

/* ------------------------------------------------------------------- rss.xml */

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
\t<channel>
\t\t<title>${xmlEscape(seoConfig.name)}</title>
\t\t<link>${siteUrl}</link>
\t\t<description>${xmlEscape(seoConfig.description)}</description>
\t\t<language>${seoConfig.language}</language>
\t\t<atom:link href="${abs("/rss.xml")}" rel="self" type="application/rss+xml" />
${comics
	.map(
		(c) =>
			`\t\t<item>\n\t\t\t<title>${xmlEscape(c.title)}</title>\n\t\t\t<link>${abs(
				`/comics/${c.slug}`,
			)}</link>\n\t\t\t<guid>${abs(`/comics/${c.slug}`)}</guid>\n\t\t\t<description>${xmlEscape(
				c.description,
			)}</description>${
				c.date
					? `\n\t\t\t<pubDate>${new Date(c.date).toUTCString()}</pubDate>`
					: ""
			}\n\t\t</item>`,
	)
	.join("\n")}
\t</channel>
</rss>
`;

/* ---------------------------------------------------------------- robots.txt */

const robots = `User-agent: *
Allow: /

Sitemap: ${abs("/sitemap.xml")}
`;

/* ------------------------------------------------------------------ llms.txt */

const llms = `# ${seoConfig.name}

> ${seoConfig.description}

${seoConfig.name} is a satirical comic project that teaches civic sense through self-implicating humor — the narrator is always the worst offender. It is not political, not for profit, and targets behaviours, never people.

## Pages

- [Comics](${abs("/comics")}): the full gallery of strips
- [Formats](${abs("/formats")}): the recurring comic formats and why each one works
- [Principles](${abs("/principles")}): the craft pillars behind the project

## Comics

${comics.map((c) => `- [${c.title}](${abs(`/comics/${c.slug}`)}): ${c.description}`).join("\n")}

## Feeds

- RSS: ${abs("/rss.xml")}
- Sitemap: ${abs("/sitemap.xml")}
`;

/* --------------------------------------------------------------------- write */

writeFileSync(join(publicDir, "sitemap.xml"), sitemap);
writeFileSync(join(publicDir, "rss.xml"), rss);
writeFileSync(join(publicDir, "robots.txt"), robots);
writeFileSync(join(publicDir, "llms.txt"), llms);

console.log(
	`[seo] generated sitemap.xml, rss.xml, robots.txt, llms.txt (${comics.length} comics) for ${siteUrl}`,
);
