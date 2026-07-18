import { Link } from "@tanstack/react-router";
import { getFormat } from "#/config/comics";
import { panelImageUrl } from "#/lib/comicgen";
import type { Comic } from "#/lib/content";

/**
 * The lead strip — a clipped mini-strip that reads as a real strip. Used as the
 * homepage hero and the gallery lede, so its panels load eagerly (above the
 * fold) with high fetch priority on the first image to protect LCP.
 */
export function ComicLede({ comic }: { comic: Comic }) {
	const format = getFormat(comic.format);
	const panels = comic.panels.slice(0, 3);

	return (
		<Link
			to="/comics/$slug"
			params={{ slug: comic.slug }}
			className="group flex flex-col border-[3px] border-foreground bg-card transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard)]"
		>
			<div className="grid grid-cols-3 divide-x-[3px] divide-foreground border-b-[3px] border-foreground bg-chart-3/10">
				{panels.map((panel, i) => (
					<div
						key={`${panel.character}-${panel.emotion}-${panel.pose}-${panel.dialogue ?? panel.caption ?? ""}`}
						className="flex items-end justify-center px-2 pt-4"
					>
						<img
							src={panelImageUrl(panel)}
							alt=""
							loading="eager"
							fetchPriority={i === 0 ? "high" : "auto"}
							className="h-28 w-auto max-w-full object-contain sm:h-32"
							draggable={false}
						/>
					</div>
				))}
			</div>
			<div className="p-5 sm:p-6">
				{format && (
					<span className="stamp border-2 border-foreground px-2 py-0.5 text-[0.7rem] text-foreground">
						{format.stamp}
					</span>
				)}
				<h3 className="mt-3 text-2xl font-extrabold leading-tight text-foreground group-hover:text-primary">
					{comic.title}
				</h3>
				{comic.summary && (
					<p className="mt-2 text-muted-foreground">{comic.summary}</p>
				)}
			</div>
		</Link>
	);
}
