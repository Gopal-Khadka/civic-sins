import { getCharacter } from "#/config/comics";

/**
 * The ONLY place coupled to the comic renderer (Comicgen). Swapping to the
 * self-hosted `comicgen` npm package or the PRD's Satori graduation path means
 * changing this file alone — components stay untouched.
 */
const COMICGEN_BASE = "https://gramener.com/comicgen/v1/comic";

export interface ComicgenOptions {
	name: string;
	angle?: string;
	emotion: string;
	pose: string;
	ext?: "svg" | "png";
}

/** Build a Comicgen image URL from raw renderer options. */
export function comicgenUrl({
	name,
	angle,
	emotion,
	pose,
	ext = "svg",
}: ComicgenOptions): string {
	const params = new URLSearchParams({ name, emotion, pose, ext });
	if (angle) params.set("angle", angle);
	return `${COMICGEN_BASE}?${params.toString()}`;
}

export interface PanelLike {
	character: string;
	angle?: string;
	emotion: string;
	pose: string;
}

/** Resolve an author-facing panel (config character id) into a renderable URL. */
export function panelImageUrl(
	panel: PanelLike,
	ext: "svg" | "png" = "svg",
): string {
	const char = getCharacter(panel.character);
	return comicgenUrl({
		name: char.name,
		angle: panel.angle ?? char.angle,
		emotion: panel.emotion,
		pose: panel.pose,
		ext,
	});
}
