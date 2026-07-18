import { createFileRoute } from "@tanstack/react-router";
import { PageWrap } from "#/components/layout/PageWrap";
import { MDXContent } from "#/components/mdx/MDXContent";
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

			{/* Writer's room board — one row per format */}
			<div className="border-[3px] border-foreground">
				{FORMATS.map((format, i) => (
					<div
						key={format.id}
						className={`grid gap-4 p-6 sm:grid-cols-[8rem_1fr] ${
							i > 0 ? "border-t-[3px] border-foreground" : ""
						}`}
					>
						<div>
							<span className="stamp inline-block bg-foreground px-2 py-0.5 text-[0.7rem] text-background">
								{format.stamp}
							</span>
							<h2 className="mt-3 text-lg font-extrabold leading-tight text-foreground">
								{format.name}
							</h2>
						</div>
						<div>
							<p className="text-foreground">{format.mechanic}</p>
							<p className="mt-2 text-sm text-muted-foreground">
								<span className="stamp text-primary">Why it stings</span>{" "}
								{format.sting}
							</p>
						</div>
					</div>
				))}
			</div>
		</PageWrap>
	);
}
