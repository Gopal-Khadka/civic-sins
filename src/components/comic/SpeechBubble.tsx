import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * Comic speech bubble — thick ink outline, small radius, pointed tail. Dialogue
 * is real DOM text (not baked into the art), so a strip re-renders in any
 * language by swapping data alone (PRD §6.1).
 */
export function SpeechBubble({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative max-w-[18rem] rounded-md border-2 border-foreground bg-card px-4 py-2.5 text-center",
				"text-sm font-semibold leading-snug text-foreground",
				// tail: before = ink outline, after = card fill sitting on top
				"before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-[9px] before:border-transparent before:border-t-foreground before:content-['']",
				"after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:-translate-y-[3px] after:border-[7px] after:border-transparent after:border-t-card after:content-['']",
				className,
			)}
		>
			{children}
		</div>
	);
}
