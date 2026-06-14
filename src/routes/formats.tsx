import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "#/components/layout/PageWrap";
import { MDXContent } from "#/components/mdx/MDXContent";
import { Card } from "#/components/ui/Card";
import { FORMATS } from "#/config/comics";
import { getPage } from "#/lib/content";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/formats")({
	loader: () => ({ page: getPage("formats") }),
	head: ({ loaderData }) =>
		seo({
			title: loaderData?.page?.title ?? "Formats",
			description: loaderData?.page?.description,
			path: "/formats",
		}),
	component: FormatsPage,
});

function FormatsPage() {
	const { page } = Route.useLoaderData();

	return (
		<PageWrap
			kicker="The recurring formats"
			title={page?.title ?? "Six ways to sting"}
			description={page?.description}
		>
			{page?.body && <MDXContent code={page.body} className="mb-12" />}

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				{FORMATS.map((format) => (
					<Card key={format.id} className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<span className="inline-flex size-10 items-center justify-center rounded-md bg-muted text-rust">
								<format.icon className="size-5" strokeWidth={1.75} />
							</span>
							<h2 className="font-serif text-xl font-medium text-ink">
								{format.name}
							</h2>
						</div>
						<p className="text-ink">{format.mechanic}</p>
						<p className="text-sm text-ink-soft">
							<span className="font-semibold text-ink">Why it stings:</span>{" "}
							{format.sting}
						</p>
					</Card>
				))}
			</div>
		</PageWrap>
	);
}
