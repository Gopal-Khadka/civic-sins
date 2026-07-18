import { ArrowRight } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ComicCard } from "#/components/comic/ComicCard";
import { buttonVariants } from "#/components/ui/button";
import { Container } from "#/components/ui/Container";
import { Card } from "#/components/ui/card";
import { FORMATS } from "#/config/comics";
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

	return (
		<>
			{/* Hero */}
			<Container as="section" className="py-20 sm:py-28">
				<p className="kicker mb-4">Civic sense, minus the lecture</p>
				<h1 className="display-title max-w-3xl text-balance">
					{siteConfig.tagline}
				</h1>
				<p className="mt-6 max-w-xl text-lg text-muted-foreground">
					{siteConfig.description}
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						to={siteConfig.cta.to}
						className={buttonVariants({ variant: "default" })}
					>
						{siteConfig.cta.label}
						<ArrowRight className="size-4" />
					</Link>
					<Link
						to="/principles"
						className={buttonVariants({ variant: "outline" })}
					>
						Why this exists
					</Link>
				</div>
			</Container>

			{/* Featured comics */}
			{featured.length > 0 && (
				<Container as="section" className="py-8">
					<div className="mb-6 flex items-end justify-between">
						<h2 className="font-serif text-2xl font-medium text-foreground">
							Fresh sins
						</h2>
						<Link
							to="/comics"
							className="text-sm text-primary hover:text-primary/80"
						>
							All comics →
						</Link>
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{featured.map((comic) => (
							<ComicCard key={comic.slug} comic={comic} />
						))}
					</div>
				</Container>
			)}

			{/* Formats teaser */}
			<Container as="section" className="py-16">
				<p className="kicker mb-3">The recurring formats</p>
				<h2 className="font-serif text-2xl font-medium text-foreground">
					Same sting, six shapes
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{FORMATS.map((format) => (
						<Card
							key={format.id}
							className="flex flex-row items-start gap-4 p-6"
						>
							<format.icon className="size-6 shrink-0 text-primary" />
							<div>
								<h3 className="font-serif text-lg font-medium text-foreground">
									{format.name}
								</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									{format.mechanic}
								</p>
							</div>
						</Card>
					))}
				</div>
				<Link
					to="/formats"
					className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
				>
					How each one stings <ArrowRight className="size-4" />
				</Link>
			</Container>
		</>
	);
}
