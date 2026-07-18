import { Link } from "@tanstack/react-router";
import { getFormat } from "#/config/comics";
import { panelImageUrl } from "#/lib/comicgen";
import type { Comic } from "#/lib/content";
import { cn } from "#/lib/utils";
import { SceneBackplate } from "./SceneBackplate";

/** Compact preview used in the gallery grid — a clipped comic panel. */
export function ComicCard({
	comic,
	variant = "default",
	className,
}: {
	comic: Comic;
	variant?: "default" | "compact";
	className?: string;
}) {
	const format = getFormat(comic.format);
	const cover = comic.panels[comic.panels.length - 1] ?? comic.panels[0];
	const compact = variant === "compact";

	return (
		<Link
			to="/comics/$slug"
			params={{ slug: comic.slug }}
			className={cn(
				"group flex h-full flex-col border-[3px] border-foreground bg-card transition-transform duration-300 ease-[var(--ease-settle)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[var(--shadow-hard)]",
				className,
			)}
		>
			<div
				className={cn(
					"relative flex items-end justify-center overflow-hidden border-b-[3px] border-foreground bg-chart-3/10 px-4 pt-6",
				)}
			>
				<SceneBackplate scene={cover?.scene} />
				<img
					src={panelImageUrl(cover)}
					alt={comic.title}
					loading="lazy"
					className={cn("relative z-10 w-auto", compact ? "h-32" : "h-40")}
					draggable={false}
				/>
			</div>
			<div
				className={cn("flex flex-1 flex-col gap-2", compact ? "p-4" : "p-5")}
			>
				{format && (
					<span className="stamp self-start border-2 border-foreground px-2 py-0.5 text-[0.7rem] text-foreground">
						{format.stamp}
					</span>
				)}
				<h3
					className={cn(
						"font-extrabold leading-tight text-foreground transition-colors group-hover:text-primary",
						compact ? "text-lg" : "text-xl",
					)}
				>
					{comic.title}
				</h3>
				{comic.summary && (
					<p className="text-sm text-muted-foreground">{comic.summary}</p>
				)}
			</div>
		</Link>
	);
}
