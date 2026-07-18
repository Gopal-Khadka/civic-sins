import { ArrowRight } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { ComicLede } from "#/components/comic/ComicLede";
import { Reveal } from "#/components/motion/Reveal";
import { Container } from "#/components/ui/Container";
import { CtaLabel, ctaButtonClasses } from "#/components/ui/cta-button";
import { PaperTray } from "#/components/ui/PaperTray";
import { FORMATS, TAGS } from "#/config/comics";
import { siteConfig } from "#/config/site";
import { getFeaturedComics } from "#/lib/content";
import { jsonLdScript, seo, websiteJsonLd } from "#/lib/seo";

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => ({ featured: getFeaturedComics(3) }),
	head: () => ({
		...seo({ path: "/", keywords: ["civic sense", "satire", "comics"] }),
		scripts: [jsonLdScript(websiteJsonLd())],
	}),
});

function Home() {
	const { featured } = Route.useLoaderData();
	const [hero, ...rest] = featured;

	return (
		<>
			{/* Hero — the featured strip as a physical, layered paper object. */}
			<Container as="section" className="py-16 sm:py-24">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<Reveal>
						<p className="kicker mb-4">Civic sense, minus the lecture</p>
						<h1 className="display-title max-w-xl text-balance">
							{siteConfig.tagline}
						</h1>
						<p className="mt-6 max-w-md text-lg text-muted-foreground">
							{siteConfig.description}
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							<Link
								to={siteConfig.cta.to}
								className={ctaButtonClasses({ withIcon: true })}
							>
								<CtaLabel icon={ArrowRight}>{siteConfig.cta.label}</CtaLabel>
							</Link>
							<Link
								to="/principles"
								className={ctaButtonClasses({ variant: "outline" })}
							>
								Why it exists
							</Link>
						</div>
					</Reveal>

					{hero && (
						<Reveal delay={120}>
							<PaperTray className="transition-transform duration-500 ease-[var(--ease-settle)] motion-reduce:rotate-0 lg:rotate-[1.5deg] lg:hover:rotate-0">
								<ComicLede comic={hero} />
							</PaperTray>
						</Reveal>
					)}
				</div>
			</Container>

			{/* Latest strips */}
			{rest.length > 0 && (
				<Container as="section" className="py-10">
					<Reveal className="mb-6 flex items-end justify-between">
						<h2 className="text-2xl font-extrabold text-foreground">
							Latest strips
						</h2>
						<Link to="/comics" className="stamp text-primary hover:underline">
							All comics
						</Link>
					</Reveal>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						{rest.map((comic, i) => (
							<Reveal key={comic.slug} delay={i * 80}>
								<ComicCard comic={comic} className="h-full" />
							</Reveal>
						))}
					</div>
				</Container>
			)}

			{/* Browse by offence — the one section eyebrow the homepage keeps. */}
			<Container as="section" className="py-14">
				<Reveal>
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
				</Reveal>
			</Container>

			{/* Format sampler — three of six */}
			<Container as="section" className="py-14">
				<Reveal className="mb-6 flex items-end justify-between">
					<h2 className="text-2xl font-extrabold text-foreground">
						Same target, different shapes
					</h2>
					<Link to="/formats" className="stamp text-primary hover:underline">
						All six formats
					</Link>
				</Reveal>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					{FORMATS.slice(0, 3).map((format, i) => (
						<Reveal
							key={format.id}
							delay={i * 80}
							className="flex h-full flex-col gap-3 border-[3px] border-foreground bg-card p-5 transition-transform duration-300 ease-[var(--ease-settle)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard)]"
						>
							<span className="stamp self-start bg-foreground px-2 py-0.5 text-[0.7rem] text-background">
								{format.stamp}
							</span>
							<h3 className="text-lg font-extrabold text-foreground">
								{format.name}
							</h3>
							<p className="text-sm text-muted-foreground">{format.mechanic}</p>
						</Reveal>
					))}
				</div>
			</Container>

			{/* Principles */}
			<Container as="section" className="py-14">
				<Reveal className="border-[3px] border-foreground bg-foreground px-6 py-10 text-background shadow-[var(--shadow-hard)] sm:px-10">
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
				</Reveal>
			</Container>
		</>
	);
}
