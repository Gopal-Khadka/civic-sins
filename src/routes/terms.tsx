import { createFileRoute } from "@tanstack/react-router";
import { MdxPage } from "#/components/layout/MdxPage";
import { getPage } from "#/lib/content";
import { mdxPageHead } from "#/lib/seo";

const FALLBACK_TITLE = "Terms of use";

export const Route = createFileRoute("/terms")({
	loader: () => ({ page: getPage("terms") }),
	head: ({ loaderData }) =>
		mdxPageHead(loaderData?.page, {
			slug: "terms",
			path: "/terms",
			fallbackTitle: FALLBACK_TITLE,
		}),
	component: TermsPage,
});

function TermsPage() {
	const { page } = Route.useLoaderData();
	return <MdxPage page={page} kicker="Legal" fallbackTitle={FALLBACK_TITLE} />;
}
