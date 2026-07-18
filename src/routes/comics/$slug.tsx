import { ArrowLeft } from "@phosphor-icons/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ComicStrip } from "#/components/comic/ComicStrip";
import { MDXContent } from "#/components/mdx/MDXContent";
import { Container } from "#/components/ui/Container";
import { getComic } from "#/lib/content";
import {
	articleJsonLd,
	breadcrumbJsonLd,
	comicOgImage,
	jsonLdScript,
	seo,
} from "#/lib/seo";

export const Route = createFileRoute("/comics/$slug")({
	loader: ({ params }) => {
		const comic = getComic(params.slug);
		if (!comic) throw notFound();
		return { comic };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const { comic } = loaderData;
		return {
			...seo({
				title: comic.title,
				description: comic.summary,
				path: `/comics/${comic.slug}`,
				image: comicOgImage(comic),
				type: "article",
				keywords: comic.tags,
			}),
			scripts: [
				jsonLdScript(articleJsonLd(comic)),
				jsonLdScript(
					breadcrumbJsonLd([
						{ name: "Home", path: "/" },
						{ name: "Comics", path: "/comics" },
						{ name: comic.title, path: `/comics/${comic.slug}` },
					]),
				),
			],
		};
	},
	component: ComicDetail,
});

function ComicDetail() {
	const { comic } = Route.useLoaderData();

	return (
		<Container as="section" size="narrow" className="py-12 sm:py-16">
			<Link
				to="/comics"
				className="mb-8 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-rust"
			>
				<ArrowLeft className="size-4" /> All comics
			</Link>

			<ComicStrip comic={comic} />

			{comic.body && (
				<section className="mt-12 border-t border-border pt-8">
					<p className="kicker mb-4">Behind the strip</p>
					<MDXContent code={comic.body} />
				</section>
			)}
		</Container>
	);
}
