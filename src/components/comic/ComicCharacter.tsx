import { type PanelLike, panelImageUrl } from "#/lib/comicgen";
import { cn } from "#/lib/utils";

interface ComicCharacterProps {
	panel: PanelLike & { flip?: boolean };
	className?: string;
}

export function ComicCharacter({ panel, className }: ComicCharacterProps) {
	return (
		<img
			src={panelImageUrl(panel)}
			alt=""
			loading="lazy"
			onError={(event) => {
				event.currentTarget.hidden = true;
			}}
			className={cn(
				"h-44 w-auto select-none sm:h-52",
				panel.flip && "-scale-x-100",
				className,
			)}
			draggable={false}
		/>
	);
}
