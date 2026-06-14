import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ComicCard } from "#/components/comic/ComicCard";
import { buttonVariants } from "#/components/ui/Button";
import { Card } from "#/components/ui/Card";
import { Container } from "#/components/ui/Container";
import { FORMATS } from "#/config/comics";
import { siteConfig } from "#/config/site";
import { getFeaturedComics } from "#/lib/content";

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => ({ featured: getFeaturedComics(3) }),
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
				<p className="mt-6 max-w-xl text-lg text-ink-soft">
					{siteConfig.description}
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						to={siteConfig.cta.to}
						className={buttonVariants({ variant: "primary" })}
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
						<h2 className="font-serif text-2xl font-medium text-ink">
							Fresh sins
						</h2>
						<Link
							to="/comics"
							className="text-sm text-rust hover:text-rust-hover"
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
				<h2 className="font-serif text-2xl font-medium text-ink">
					Same sting, six shapes
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{FORMATS.map((format) => (
						<Card key={format.id} className="flex gap-4">
							<format.icon
								className="size-6 shrink-0 text-rust"
								strokeWidth={1.75}
							/>
							<div>
								<h3 className="font-serif text-lg font-medium text-ink">
									{format.name}
								</h3>
								<p className="mt-1 text-sm text-ink-soft">{format.mechanic}</p>
							</div>
						</Card>
					))}
				</div>
				<Link
					to="/formats"
					className="mt-6 inline-flex items-center gap-1 text-sm text-rust hover:text-rust-hover"
				>
					How each one stings <ArrowRight className="size-4" />
				</Link>
			</Container>
		</>
	);
}
