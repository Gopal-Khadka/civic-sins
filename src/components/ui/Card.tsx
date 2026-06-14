import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-lg border border-border bg-surface p-6 shadow-[var(--shadow-sm)]",
				interactive &&
					"transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-rust/40 hover:shadow-[var(--shadow-md)]",
				className,
			)}
			{...props}
		/>
	);
}
