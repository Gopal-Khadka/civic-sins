import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "#/components/layout/PageWrap";
import { MDXContent } from "#/components/mdx/MDXContent";
import { siteConfig } from "#/config/site";
import { getPage } from "#/lib/content";

export const Route = createFileRoute("/principles")({
	loader: () => ({ page: getPage("principles") }),
	head: () => ({ meta: [{ title: `Principles — ${siteConfig.name}` }] }),
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
				<p className="text-ink-soft">Coming soon.</p>
			)}
		</PageWrap>
	);
}
