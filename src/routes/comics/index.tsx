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
const GALLERY_DESC = "Find yourself in one. Then send it to someone else.";

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
				"rounded-md border px-3 py-1.5 text-sm transition-colors",
				active
					? "border-primary bg-primary text-primary-foreground"
					: "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
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
			{/* Format filters */}
			<div className="mb-3 flex flex-wrap gap-2">
				<FilterChip label="All formats" active={!format} search={{ tag }} />
				{FORMATS.map((f) => (
					<FilterChip
						key={f.id}
						label={f.name}
						active={format === f.id}
						search={{ format: f.id, tag }}
					/>
				))}
			</div>

			{/* Tag filters */}
			<div className="mb-10 flex flex-wrap gap-2">
				<FilterChip label="All topics" active={!tag} search={{ format }} />
				{TAGS.map((t) => (
					<FilterChip
						key={t.id}
						label={t.label}
						active={tag === t.id}
						search={{ format, tag: t.id }}
					/>
				))}
			</div>

			{comics.length === 0 ? (
				<p className="text-muted-foreground">
					No comics match that filter yet.
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
