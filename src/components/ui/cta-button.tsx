import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * The reserved accent action, as a ticket-shaped object. The trailing icon
 * never sits naked — it rides in its own capsule that shifts on hover, and the
 * whole ticket presses down on `:active`. Composed at call sites so `Link`
 * (internal) and `button` (share/copy) keep their own precise typing:
 *   <Link className={ctaButtonClasses({ withIcon: true })}>
 *     <CtaLabel icon={ArrowRight}>Read comics</CtaLabel>
 *   </Link>
 */

type Variant = "primary" | "outline";

const base =
	"group inline-flex items-center justify-center gap-3 rounded-full border-[3px] border-foreground font-extrabold whitespace-nowrap transition-all duration-300 ease-[var(--ease-settle)] active:translate-y-[3px] active:shadow-none";

const variants: Record<Variant, string> = {
	primary:
		"bg-primary text-primary-foreground shadow-[var(--shadow-hard)] hover:-translate-x-0.5 hover:-translate-y-0.5",
	outline:
		"bg-background text-foreground hover:bg-foreground hover:text-background",
};

export function ctaButtonClasses({
	variant = "primary",
	withIcon = false,
	className,
}: {
	variant?: Variant;
	withIcon?: boolean;
	className?: string;
} = {}) {
	return cn(
		base,
		variants[variant],
		withIcon ? "py-2 pl-6 pr-2" : "px-7 py-3",
		className,
	);
}

export function CtaLabel({
	icon: IconComponent,
	children,
}: {
	icon?: Icon;
	children: ReactNode;
}) {
	return (
		<>
			<span>{children}</span>
			{IconComponent && (
				<span className="grid size-9 place-items-center rounded-full bg-background/20 transition-transform duration-300 ease-[var(--ease-settle)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
					<IconComponent className="size-4" weight="bold" />
				</span>
			)}
		</>
	);
}
