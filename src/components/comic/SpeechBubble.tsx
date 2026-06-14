import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * CSS speech bubble. Dialogue is real DOM text (not baked into the art), so a
 * strip re-renders in any language by swapping data alone (PRD §6.1).
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
				"relative max-w-[18rem] rounded-xl border border-border bg-bubble px-4 py-2.5 text-center",
				"text-sm leading-snug font-medium text-bubble-ink shadow-[var(--shadow-sm)]",
				// tail
				"after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-bubble",
				"before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-[9px] before:border-transparent before:border-t-border",
				className,
			)}
		>
			{children}
		</div>
	);
}
