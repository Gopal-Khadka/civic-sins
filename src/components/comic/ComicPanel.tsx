import type { Comic } from "#/lib/content";
import { ComicCharacter } from "./ComicCharacter";
import { SpeechBubble } from "./SpeechBubble";

type Panel = Comic["panels"][number];

export function ComicPanel({ panel, index }: { panel: Panel; index: number }) {
	return (
		<figure className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
			{panel.narration && (
				<div className="border-b border-border bg-card px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground">
					{panel.narration}
				</div>
			)}

			<div className="relative flex flex-1 flex-col items-center justify-end gap-4 px-5 pb-4 pt-6">
				<span className="absolute left-3 top-3 text-xs font-semibold text-muted-foreground/60">
					{index + 1}
				</span>
				{panel.dialogue && <SpeechBubble>{panel.dialogue}</SpeechBubble>}
				<ComicCharacter panel={panel} />
			</div>

			{panel.caption && (
				<figcaption className="border-t border-border bg-card px-4 py-3 text-sm italic text-muted-foreground">
					{panel.caption}
				</figcaption>
			)}
		</figure>
	);
}
