import { ArrowRight } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { buttonVariants } from "#/components/ui/button";
import { Container } from "#/components/ui/Container";
import { FORMATS, getFormat, TAGS } from "#/config/comics";
import { siteConfig } from "#/config/site";
import { panelImageUrl } from "#/lib/comicgen";
import { type Comic, getFeaturedComics } from "#/lib/content";
import { jsonLdScript, seo, websiteJsonLd } from "#/lib/seo";

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => ({ featured: getFeaturedComics(3) }),
	head: () => ({
		...seo({ path: "/", keywords: ["civic sense", "satire", "comics"] }),
		scripts: [jsonLdScript(websiteJsonLd())],
	}),
});

/** The hero comic asset — a clipped mini-strip that reads as a real strip. */
function FeaturedComic({ comic }: { comic: Comic }) {
	const format = getFormat(comic.format);
	const panels = comic.panels.slice(0, 3);

	return (
		<Link
			to="/comics/$slug"
			params={{ slug: comic.slug }}
			className="group flex flex-col border-[3px] border-foreground bg-card transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard)]"
		>
			<div className="grid grid-cols-3 divide-x-[3px] divide-foreground border-b-[3px] border-foreground bg-chart-3/10">
				{panels.map((panel) => (
					<div
						key={`${panel.character}-${panel.emotion}-${panel.pose}-${panel.dialogue ?? panel.caption ?? ""}`}
						className="flex items-end justify-center px-2 pt-4"
					>
						<img
							src={panelImageUrl(panel)}
							alt=""
							loading="lazy"
							className="h-28 w-auto sm:h-32"
							draggable={false}
						/>
					</div>
				))}
			</div>
			<div className="p-5 sm:p-6">
				{format && (
					<span className="stamp border-2 border-foreground px-2 py-0.5 text-[0.7rem] text-foreground">
						{format.stamp}
					</span>
				)}
				<h3 className="mt-3 text-2xl font-extrabold leading-tight text-foreground group-hover:text-primary">
					{comic.title}
				</h3>
				{comic.summary && (
					<p className="mt-2 text-muted-foreground">{comic.summary}</p>
				)}
			</div>
		</Link>
	);
}

function Home() {
	const { featured } = Route.useLoaderData();
	const [hero, ...rest] = featured;

	return (
		<>
			{/* Hero */}
			<Container as="section" className="py-14 sm:py-20">
				<div className="grid items-center gap-10 lg:grid-cols-2">
					<div>
						<p className="kicker mb-4">Civic sense, minus the lecture</p>
						<h1 className="display-title max-w-xl text-balance">
							{siteConfig.tagline}
						</h1>
						<p className="mt-6 max-w-md text-lg text-muted-foreground">
							{siteConfig.description}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								to={siteConfig.cta.to}
								className={buttonVariants({ variant: "default" })}
							>
								{siteConfig.cta.label}
								<ArrowRight className="size-4" weight="bold" />
							</Link>
							<Link
								to="/principles"
								className={buttonVariants({ variant: "outline" })}
							>
								Why it exists
							</Link>
						</div>
					</div>
					{hero && <FeaturedComic comic={hero} />}
				</div>
			</Container>

			{/* Latest strips */}
			{rest.length > 0 && (
				<Container as="section" className="py-8">
					<div className="mb-6 flex items-end justify-between">
						<div>
							<p className="kicker mb-2">Straight off the board</p>
							<h2 className="text-2xl font-extrabold text-foreground">
								Latest strips
							</h2>
						</div>
						<Link to="/comics" className="stamp text-primary hover:underline">
							All comics
						</Link>
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						{rest.map((comic) => (
							<ComicCard key={comic.slug} comic={comic} />
						))}
					</div>
				</Container>
			)}

			{/* Browse by offence */}
			<Container as="section" className="py-12">
				<p className="kicker mb-3">Browse by offence</p>
				<h2 className="text-2xl font-extrabold text-foreground">
					Pick your crime
				</h2>
				<div className="mt-6 flex flex-wrap gap-3">
					{TAGS.map((tag) => (
						<Link
							key={tag.id}
							to="/comics"
							search={{ tag: tag.id }}
							className="stamp border-2 border-foreground px-3 py-1.5 text-foreground transition-colors hover:bg-foreground hover:text-background"
						>
							{tag.label}
						</Link>
					))}
				</div>
			</Container>

			{/* Format sampler — three of six */}
			<Container as="section" className="py-12">
				<div className="mb-6 flex items-end justify-between">
					<div>
						<p className="kicker mb-2">How they sting</p>
						<h2 className="text-2xl font-extrabold text-foreground">
							Same target, different shapes
						</h2>
					</div>
					<Link to="/formats" className="stamp text-primary hover:underline">
						All six formats
					</Link>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					{FORMATS.slice(0, 3).map((format) => (
						<div
							key={format.id}
							className="flex flex-col gap-3 border-[3px] border-foreground bg-card p-5"
						>
							<span className="stamp self-start bg-foreground px-2 py-0.5 text-[0.7rem] text-background">
								{format.stamp}
							</span>
							<h3 className="text-lg font-extrabold text-foreground">
								{format.name}
							</h3>
							<p className="text-sm text-muted-foreground">{format.mechanic}</p>
						</div>
					))}
				</div>
			</Container>

			{/* Principles */}
			<Container as="section" className="py-12">
				<div className="border-[3px] border-foreground bg-foreground px-6 py-10 text-background sm:px-10">
					<p className="text-2xl font-extrabold leading-snug text-background sm:text-3xl">
						We are not here to scold you. We are here to catch you doing the
						thing you swore you never do.
					</p>
					<Link
						to="/principles"
						className="stamp mt-6 inline-flex items-center gap-1 text-primary hover:underline"
					>
						Why this exists <ArrowRight className="size-4" weight="bold" />
					</Link>
				</div>
			</Container>
		</>
	);
}
