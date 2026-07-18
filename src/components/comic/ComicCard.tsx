import { Link } from "@tanstack/react-router";
import { getFormat } from "#/config/comics";
import { panelImageUrl } from "#/lib/comicgen";
import type { Comic } from "#/lib/content";

/** Compact preview used in the gallery grid — a clipped comic panel. */
export function ComicCard({ comic }: { comic: Comic }) {
	const format = getFormat(comic.format);
	const cover = comic.panels[comic.panels.length - 1] ?? comic.panels[0];

	return (
		<Link
			to="/comics/$slug"
			params={{ slug: comic.slug }}
			className="group flex h-full flex-col border-[3px] border-foreground bg-card transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard)]"
		>
			<div className="flex items-end justify-center border-b-[3px] border-foreground bg-chart-3/10 px-4 pt-6">
				<img
					src={panelImageUrl(cover)}
					alt={comic.title}
					loading="lazy"
					className="h-40 w-auto"
					draggable={false}
				/>
			</div>
			<div className="flex flex-1 flex-col gap-2 p-5">
				{format && (
					<span className="stamp self-start border-2 border-foreground px-2 py-0.5 text-[0.7rem] text-foreground">
						{format.stamp}
					</span>
				)}
				<h3 className="text-xl font-extrabold leading-tight text-foreground transition-colors group-hover:text-primary">
					{comic.title}
				</h3>
				{comic.summary && (
					<p className="text-sm text-muted-foreground">{comic.summary}</p>
				)}
			</div>
		</Link>
	);
}
