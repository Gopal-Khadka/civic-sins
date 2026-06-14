import { useMDXComponent } from "@content-collections/mdx/react";
import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";

/** Map of components available to all MDX documents (extend as needed). */
const mdxComponents = {
	a: (props: ComponentProps<"a">) => (
		<a
			{...props}
			className="text-rust underline-offset-2 hover:text-rust-hover"
		/>
	),
};

const proseClasses =
	"prose max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:text-ink " +
	"prose-p:text-ink prose-li:text-ink prose-strong:text-ink prose-strong:font-semibold " +
	"prose-a:text-rust prose-blockquote:border-rust prose-blockquote:text-ink-soft " +
	"prose-code:text-ink prose-hr:border-border marker:text-rust";

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
