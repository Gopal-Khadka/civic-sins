import { createFileRoute } from "@tanstack/react-router";
import { MdxPage } from "#/components/layout/MdxPage";
import { getPage } from "#/lib/content";
import { mdxPageHead } from "#/lib/seo";

const FALLBACK_TITLE = "About Civic Sins";

export const Route = createFileRoute("/about")({
	loader: () => ({ page: getPage("about") }),
	head: ({ loaderData }) =>
		mdxPageHead(loaderData?.page, {
			slug: "about",
			path: "/about",
			fallbackTitle: FALLBACK_TITLE,
			about: true,
		}),
	component: AboutPage,
});

function AboutPage() {
	const { page } = Route.useLoaderData();
	return <MdxPage page={page} kicker="About" fallbackTitle={FALLBACK_TITLE} />;
}
