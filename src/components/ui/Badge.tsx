import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium tracking-[0.02em]",
	{
		variants: {
			variant: {
				solid: "bg-rust text-on-accent",
				muted: "bg-muted text-ink-soft",
				outline: "border border-border text-ink-soft",
			},
		},
		defaultVariants: { variant: "muted" },
	},
);

export interface BadgeProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
