import { createFileRoute } from "@tanstack/react-router";
import { MdxPage } from "#/components/layout/MdxPage";
import { getPage } from "#/lib/content";
import { mdxPageHead } from "#/lib/seo";

const FALLBACK_TITLE = "Privacy";

export const Route = createFileRoute("/privacy")({
	loader: () => ({ page: getPage("privacy") }),
	head: ({ loaderData }) =>
		mdxPageHead(loaderData?.page, {
			slug: "privacy",
			path: "/privacy",
			fallbackTitle: FALLBACK_TITLE,
		}),
	component: PrivacyPage,
});

function PrivacyPage() {
	const { page } = Route.useLoaderData();
	return <MdxPage page={page} kicker="Legal" fallbackTitle={FALLBACK_TITLE} />;
}
