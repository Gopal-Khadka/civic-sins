import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { PageWrap } from "#/components/layout/PageWrap";
import { FORMATS, TAGS } from "#/config/comics";
import { filterComics, getComics } from "#/lib/content";
import { collectionPageJsonLd, jsonLdScript, seo } from "#/lib/seo";
import { cn } from "#/lib/utils";

interface ComicsSearch {
	format?: string;
	tag?: string;
}

const GALLERY_TITLE = "Every sin, on the record";
const GALLERY_DESC =
	"Find yourself in one. Then send it to someone who needs it.";

export const Route = createFileRoute("/comics/")({
	validateSearch: (search: Record<string, unknown>): ComicsSearch => ({
		format: typeof search.format === "string" ? search.format : undefined,
		tag: typeof search.tag === "string" ? search.tag : undefined,
	}),
	head: () => ({
		...seo({
			title: GALLERY_TITLE,
			description: GALLERY_DESC,
			path: "/comics",
		}),
		scripts: [
			jsonLdScript(
				collectionPageJsonLd({
					name: GALLERY_TITLE,
					description: GALLERY_DESC,
					path: "/comics",
					items: getComics().map((c) => ({
						title: c.title,
						path: `/comics/${c.slug}`,
					})),
				}),
			),
		],
	}),
	component: ComicsPage,
});

function FilterChip({
	label,
	active,
	search,
}: {
	label: string;
	active: boolean;
	search: ComicsSearch;
}) {
	return (
		<Link
			to="/comics"
			search={search}
			className={cn(
				"stamp border-2 border-foreground px-3 py-1.5 transition-colors",
				active
					? "bg-primary text-primary-foreground"
					: "text-foreground hover:bg-foreground hover:text-background",
			)}
		>
			{label}
		</Link>
	);
}

function ComicsPage() {
	const { format, tag } = Route.useSearch();
	const comics = filterComics({ format, tag });

	return (
		<PageWrap
			kicker="The gallery"
			title={GALLERY_TITLE}
			description={GALLERY_DESC}
		>
			{/* Offence filters — the primary axis */}
			<div className="mb-4 flex flex-wrap gap-2">
				<FilterChip label="All" active={!tag} search={{ format }} />
				{TAGS.map((t) => (
					<FilterChip
						key={t.id}
						label={t.label}
						active={tag === t.id}
						search={{ format, tag: t.id }}
					/>
				))}
			</div>

			{/* Format filters — secondary, tucked into a collapsible row */}
			<details className="mb-10 border-b-[3px] border-foreground pb-4">
				<summary className="stamp cursor-pointer select-none text-muted-foreground">
					Filter by format {format ? "(1)" : ""}
				</summary>
				<div className="mt-3 flex flex-wrap gap-2">
					<FilterChip label="Any format" active={!format} search={{ tag }} />
					{FORMATS.map((f) => (
						<FilterChip
							key={f.id}
							label={f.stamp}
							active={format === f.id}
							search={{ format: f.id, tag }}
						/>
					))}
				</div>
			</details>

			{comics.length === 0 ? (
				<p className="border-[3px] border-dashed border-foreground p-8 text-center text-lg font-bold text-muted-foreground">
					No public offences found. Suspiciously well-behaved.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{comics.map((comic) => (
						<ComicCard key={comic.slug} comic={comic} />
					))}
				</div>
			)}
		</PageWrap>
	);
}
