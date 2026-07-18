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
				<div className="mb-4 flex flex-wrap items-center gap-2">
					{format && (
						<span className="stamp border-2 border-foreground bg-foreground px-2 py-0.5 text-[0.7rem] text-background">
							{format.stamp}
						</span>
					)}
					{comic.tags.map((tag) => (
						<span
							key={tag}
							className="stamp border-2 border-foreground px-2 py-0.5 text-[0.7rem] text-foreground"
						>
							{getTag(tag)?.label ?? tag}
						</span>
					))}
				</div>
				<h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
					{comic.title}
				</h2>
				{comic.summary && (
					<p className="mt-3 max-w-2xl text-lg text-muted-foreground">
						{comic.summary}
					</p>
				)}
			</header>

			<div
				className={cn("grid grid-cols-1 gap-4", gridCols(comic.panels.length))}
			>
				{comic.panels.map((panel, i) => (
					<ComicPanel
						key={`${panel.character}-${panel.emotion}-${panel.pose}-${panel.dialogue ?? panel.caption ?? i}`}
						panel={panel}
					/>
				))}
			</div>

			<SharePrompt comic={comic} />
		</article>
	);
}
