import { Badge } from "#/components/ui/badge";
import { getFormat, getTag } from "#/config/comics";
import type { Comic } from "#/lib/content";
import { cn } from "#/lib/utils";
import { ComicPanel } from "./ComicPanel";
import { SharePrompt } from "./SharePrompt";

function gridCols(count: number): string {
	if (count <= 1) return "max-w-sm";
	if (count === 2) return "sm:grid-cols-2";
	if (count === 3) return "sm:grid-cols-2 lg:grid-cols-3";
	return "sm:grid-cols-2 lg:grid-cols-4";
}

export function ComicStrip({ comic }: { comic: Comic }) {
	const format = getFormat(comic.format);

	return (
		<article>
			<header className="mb-6">
				<div className="mb-3 flex flex-wrap items-center gap-2">
					{format && (
						<Badge variant="default">
							<format.icon className="size-3.5" />
							{format.name}
						</Badge>
					)}
					{comic.tags.map((tag) => (
						<Badge key={tag} variant="outline">
							{getTag(tag)?.label ?? tag}
						</Badge>
					))}
				</div>
				<h2 className="font-serif text-3xl font-medium text-ink">
					{comic.title}
				</h2>
				{comic.summary && (
					<p className="mt-2 max-w-2xl text-ink-soft">{comic.summary}</p>
				)}
			</header>

			<div
				className={cn("grid grid-cols-1 gap-4", gridCols(comic.panels.length))}
			>
				{comic.panels.map((panel, i) => (
					<ComicPanel
						key={`${panel.character}-${panel.emotion}-${panel.pose}-${panel.dialogue ?? panel.caption ?? i}`}
						panel={panel}
						index={i}
					/>
				))}
			</div>

			<SharePrompt comic={comic} />
		</article>
	);
}
