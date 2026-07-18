import { createFileRoute } from "@tanstack/react-router";
import { MdxPage } from "#/components/layout/MdxPage";
import { getPage } from "#/lib/content";
import { mdxPageHead } from "#/lib/seo";

const FALLBACK_TITLE = "Colophon";

export const Route = createFileRoute("/colophon")({
	loader: () => ({ page: getPage("colophon") }),
	head: ({ loaderData }) =>
		mdxPageHead(loaderData?.page, {
			slug: "colophon",
			path: "/colophon",
			fallbackTitle: FALLBACK_TITLE,
		}),
	component: ColophonPage,
});

function ColophonPage() {
	const { page } = Route.useLoaderData();
	return (
		<MdxPage page={page} kicker="Colophon" fallbackTitle={FALLBACK_TITLE} />
	);
}
