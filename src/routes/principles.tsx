import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "#/components/layout/PageWrap";
import { MDXContent } from "#/components/mdx/MDXContent";
import { getPage } from "#/lib/content";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/principles")({
	loader: () => ({ page: getPage("principles") }),
	head: ({ loaderData }) =>
		seo({
			title: loaderData?.page?.title ?? "Principles",
			description: loaderData?.page?.description,
			path: "/principles",
		}),
	component: PrinciplesPage,
});

function PrinciplesPage() {
	const { page } = Route.useLoaderData();

	return (
		<PageWrap
			kicker="Why this exists"
			title={page?.title ?? "The craft pillars"}
			description={page?.description}
			size="narrow"
		>
			{page?.body ? (
				<MDXContent code={page.body} />
			) : (
				<p className="text-muted-foreground">Coming soon.</p>
			)}
		</PageWrap>
	);
}
