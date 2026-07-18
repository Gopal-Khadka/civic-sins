import { Link } from "@tanstack/react-router";
import { Badge } from "#/components/ui/badge";
import { Card } from "#/components/ui/card";
import { getFormat } from "#/config/comics";
import { panelImageUrl } from "#/lib/comicgen";
import type { Comic } from "#/lib/content";

/** Compact preview used in the gallery grid. */
export function ComicCard({ comic }: { comic: Comic }) {
	const format = getFormat(comic.format);
	const cover = comic.panels[comic.panels.length - 1] ?? comic.panels[0];

	return (
		<Link to="/comics/$slug" params={{ slug: comic.slug }} className="group">
			<Card className="flex h-full flex-col gap-0 p-0 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
				<div className="flex items-end justify-center rounded-t-lg border-b border-border bg-card px-4 pt-6">
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
						<Badge variant="secondary" className="self-start">
							<format.icon className="size-3.5" />
							{format.name}
						</Badge>
					)}
					<h3 className="font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
						{comic.title}
					</h3>
					{comic.summary && (
						<p className="text-sm text-muted-foreground">{comic.summary}</p>
					)}
				</div>
			</Card>
		</Link>
	);
}
