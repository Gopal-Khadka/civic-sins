import type { Comic } from "#/lib/content";
import { cn } from "#/lib/utils";
import { ComicCharacter } from "./ComicCharacter";
import { SpeechBubble } from "./SpeechBubble";

type Panel = Comic["panels"][number];

/** Optional per-panel scene tint. Uses the chart/scene tokens (panels only). */
const SCENE_BG: Record<string, string> = {
	bus: "bg-chart-2/10",
	road: "bg-chart-3/10",
	traffic: "bg-chart-3/10",
	street: "bg-chart-4/10",
	queue: "bg-chart-4/10",
	parking: "bg-chart-2/10",
	court: "bg-chart-3/15",
	supermarket: "bg-chart-2/10",
};

export function ComicPanel({ panel }: { panel: Panel }) {
	const sceneBg = (panel.scene && SCENE_BG[panel.scene]) || "bg-card";

	return (
		<figure className="flex flex-col overflow-hidden border-[3px] border-foreground bg-card">
			{panel.narration && (
				<div className="stamp bg-foreground px-3 py-1.5 text-[0.7rem] text-background">
					{panel.narration}
				</div>
			)}

			<div
				className={cn(
					"relative flex flex-1 flex-col items-center justify-end gap-4 px-5 pb-5 pt-8",
					sceneBg,
				)}
			>
				{panel.dialogue && <SpeechBubble>{panel.dialogue}</SpeechBubble>}
				<ComicCharacter panel={panel} />
			</div>

			{panel.caption && (
				<figcaption className="border-t-[3px] border-foreground bg-card px-4 py-3 text-sm font-medium text-foreground">
					{panel.caption}
				</figcaption>
			)}
		</figure>
	);
}
