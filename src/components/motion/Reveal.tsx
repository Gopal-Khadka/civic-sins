import type { ElementType, HTMLAttributes } from "react";
import { useInView } from "#/lib/useInView";
import { cn } from "#/lib/utils";

interface RevealProps extends HTMLAttributes<HTMLElement> {
	as?: ElementType;
	/** Stagger offset in ms — the transition delay for this element's entry. */
	delay?: number;
}

/**
 * Fade-up-on-enter wrapper. The visual behaviour lives in motion.css
 * (`[data-reveal]`); this just toggles `.is-visible` when the element enters
 * the viewport. Safe to nest — the entry transform sits on this wrapper, so a
 * rotated child inside keeps its own transform.
 */
export function Reveal({
	as: Tag = "div",
	delay,
	className,
	children,
	...rest
}: RevealProps) {
	const { ref, inView } = useInView<HTMLElement>();
	const Component = Tag as ElementType;

	return (
		<Component
			ref={ref as never}
			data-reveal=""
			className={cn(inView && "is-visible", className)}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
			{...rest}
		>
			{children}
		</Component>
	);
}
