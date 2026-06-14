import type { ElementType, HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
	as?: ElementType;
	size?: "default" | "narrow";
}

/** Centered page container — the canonical max-width wrapper. */
export function Container({
	as: Tag = "div",
	size = "default",
	className,
	...props
}: ContainerProps) {
	return (
		<Tag
			className={cn(
				"mx-auto w-full px-4 sm:px-6",
				size === "narrow" ? "max-w-3xl" : "max-w-6xl",
				className,
			)}
			{...props}
		/>
	);
}
