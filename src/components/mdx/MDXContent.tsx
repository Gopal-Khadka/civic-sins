import { useMDXComponent } from "@content-collections/mdx/react";
import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";

/** Map of components available to all MDX documents (extend as needed). */
const mdxComponents = {
	a: ({ href, ...props }: ComponentProps<"a">) => {
		const external = typeof href === "string" && /^https?:\/\//.test(href);
		return (
			<a
				href={href}
				{...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
				{...props}
				className="text-primary underline-offset-2 hover:text-primary/80"
			/>
		);
	},
};

const proseClasses =
	"prose max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-foreground " +
	"prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-semibold " +
	"prose-a:text-primary prose-blockquote:border-primary prose-blockquote:text-muted-foreground " +
	"prose-code:text-foreground prose-hr:border-border marker:text-primary";

export function MDXContent({
	code,
	className,
}: {
	code: string;
	className?: string;
}) {
	const Component = useMDXComponent(code);
	return (
		<div className={cn(proseClasses, className)}>
			<Component components={mdxComponents} />
		</div>
	);
}
