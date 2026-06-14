import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

/**
 * Button styles. Exported separately so links (TanStack <Link>) can reuse the
 * exact same look via `className={buttonVariants(...)}` — DRY across button/anchor.
 */
export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				// The single reserved accent action (design.md: one Tertiary action per screen).
				primary: "bg-rust text-on-accent hover:bg-rust-hover",
				outline:
					"border border-border bg-transparent text-ink hover:border-rust/50 hover:text-rust",
				ghost: "bg-transparent text-ink-soft hover:bg-muted hover:text-ink",
			},
			size: {
				sm: "h-9 px-3 text-sm",
				md: "h-11 px-5 text-[0.95rem]",
				lg: "h-12 px-6 text-base",
			},
		},
		defaultVariants: { variant: "primary", size: "md" },
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
