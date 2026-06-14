import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { PageWrap } from "#/components/layout/PageWrap";
import { FORMATS, TAGS } from "#/config/comics";
import { filterComics } from "#/lib/content";
import { cn } from "#/lib/utils";

interface ComicsSearch {
	format?: string;
	tag?: string;
}

export const Route = createFileRoute("/comics/")({
	validateSearch: (search: Record<string, unknown>): ComicsSearch => ({
		format: typeof search.format === "string" ? search.format : undefined,
		tag: typeof search.tag === "string" ? search.tag : undefined,
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
					? "border-rust bg-rust text-on-accent"
					: "border-border text-ink-soft hover:border-rust/40 hover:text-rust",
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
			title="Every sin, on the record"
			description="Find yourself in one. Then send it to someone else."
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
				<p className="text-ink-soft">No comics match that filter yet.</p>
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
