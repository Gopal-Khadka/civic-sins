import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { ComicLede } from "#/components/comic/ComicLede";
import { PageWrap } from "#/components/layout/PageWrap";
import { Reveal } from "#/components/motion/Reveal";
import { PaperTray } from "#/components/ui/PaperTray";
import { FORMATS, getFormat, TAGS } from "#/config/comics";
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
				"stamp border-2 border-foreground px-3 py-1.5 transition-colors active:translate-y-px",
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
	const [lead, ...others] = comics;
	const medium = others.slice(0, 2);
	const archive = others.slice(2);

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
					{format
						? `Format: ${getFormat(format)?.stamp ?? format}`
						: "Filter by format"}
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
				/* A wall of posted strips — lead runs large, then medium, then a
				   compact archive row. Slight rotations on desktop only. */
				<div className="flex flex-col gap-10">
					{lead && (
						<Reveal>
							<PaperTray className="transition-transform duration-500 ease-[var(--ease-settle)] motion-reduce:rotate-0 lg:-rotate-1 lg:hover:rotate-0">
								<ComicLede comic={lead} />
							</PaperTray>
						</Reveal>
					)}

					{medium.length > 0 && (
						<div className="grid gap-6 sm:grid-cols-2">
							{medium.map((comic, i) => (
								<Reveal key={comic.slug} delay={i * 80}>
									<ComicCard
										comic={comic}
										className={cn(
											"h-full motion-reduce:rotate-0",
											i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1",
										)}
									/>
								</Reveal>
							))}
						</div>
					)}

					{archive.length > 0 && (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{archive.map((comic, i) => (
								<Reveal key={comic.slug} delay={i * 70}>
									<ComicCard
										comic={comic}
										variant="compact"
										className={cn(
											"h-full motion-reduce:rotate-0",
											i % 2 === 0 ? "lg:rotate-1" : "lg:-rotate-1",
										)}
									/>
								</Reveal>
							))}
						</div>
					)}
				</div>
			)}
		</PageWrap>
	);
}
