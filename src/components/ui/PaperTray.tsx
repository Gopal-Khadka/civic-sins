import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * A layered paper object — the Notice-adapted "double-bezel". An outer ink-
 * bordered mat with a faint halftone print texture holds an inner object (which
 * brings its own border), giving concentric rules and a hard offset shadow.
 * Reserved for major objects: the hero strip, featured gallery cards.
 */
export function PaperTray({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative border-[3px] border-foreground bg-secondary p-2 shadow-[var(--shadow-hard)] sm:p-3",
				className,
			)}
		>
			<div className="halftone pointer-events-none absolute inset-0 opacity-[0.06]" />
			<div className="relative">{children}</div>
		</div>
	);
}
