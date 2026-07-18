import { PageWrap } from "#/components/layout/PageWrap";
import { MDXContent } from "#/components/mdx/MDXContent";
import type { Page } from "#/lib/content";

/** Renders a single MDX content page (about, privacy, …) in the narrow shell. */
export function MdxPage({
	page,
	kicker,
	fallbackTitle,
}: {
	page?: Page;
	kicker?: string;
	fallbackTitle: string;
}) {
	return (
		<PageWrap
			kicker={kicker}
			title={page?.title ?? fallbackTitle}
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
