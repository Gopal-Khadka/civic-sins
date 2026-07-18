import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";

/**
 * Button styles. Built on the Base UI button primitive (accessible focus,
 * disabled, and `render`-based polymorphism) but styled entirely with our comic
 * tokens (rust / ink / border). Exported separately so links (TanStack <Link>)
 * can reuse the exact same look via `className={buttonVariants(...)}` — DRY
 * across button/anchor.
 */
export const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				// The single reserved accent action (design.md: one accent action per screen).
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
	extends ButtonPrimitive.Props,
		VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
