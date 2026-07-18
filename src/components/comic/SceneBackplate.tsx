import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * Graphic backplates that place a panel's character in a real civic setting —
 * a bus, a curb, a parking bay — instead of a flat colour wash. Simple line
 * art, drawn in the scene's token colour (the `--chart-*` scene palette,
 * panels only). Anchored to the bottom so the ground sits behind the
 * character's feet. Decorative, so `aria-hidden`.
 */

type SceneArt = { color: string; art: ReactNode };

const bus: SceneArt = {
	color: "text-chart-2",
	art: (
		<>
			{/* windows + sill */}
			<path d="M8 14 H92 M8 42 H92 M30 14 V42 M52 14 V42 M74 14 V42" />
			{/* hanging handles */}
			<path d="M38 14 V30" />
			<circle cx="38" cy="35" r="5" />
			<path d="M66 14 V26" />
			<circle cx="66" cy="31" r="5" />
			{/* seat backs */}
			<path d="M6 74 H50 V64 M54 74 H94 V64" />
		</>
	),
};

const street: SceneArt = {
	color: "text-chart-4",
	art: (
		<>
			{/* curb + gutter */}
			<path d="M0 74 H100 M0 82 H100" />
			{/* storm drain */}
			<path d="M10 76 H34 V88 H10 Z M16 76 V88 M22 76 V88 M28 76 V88" />
			{/* stray wrapper */}
			<path d="M68 86 q4 -6 9 -3 q6 -1 4 5 q-8 4 -13 -2 Z" />
		</>
	),
};

const parking: SceneArt = {
	color: "text-chart-2",
	art: (
		<>
			{/* bay stripes */}
			<path d="M2 88 L30 40 M34 88 L62 40 M66 88 L94 40" />
			{/* cart-return sign on a post */}
			<path d="M82 22 V44" />
			<path d="M70 10 H94 V24 H70 Z" />
			<path d="M74 17 H90" />
		</>
	),
};

const road: SceneArt = {
	color: "text-chart-3",
	art: (
		<>
			{/* traffic light */}
			<path d="M78 12 H92 V50 H78 Z M85 50 V64" />
			<circle cx="85" cy="21" r="3.5" />
			<circle cx="85" cy="31" r="3.5" />
			<circle cx="85" cy="41" r="3.5" />
			{/* lane dashes */}
			<path d="M34 52 V64 M34 72 V84 M34 92 V100" />
		</>
	),
};

const court: SceneArt = {
	color: "text-chart-3",
	art: (
		<>
			{/* bench */}
			<path d="M20 72 H80 M26 72 V88 M74 72 V88 M20 64 H80 V72" />
			{/* seal / stamp */}
			<circle cx="24" cy="24" r="12" />
			<circle cx="24" cy="24" r="6" />
		</>
	),
};

const queue: SceneArt = {
	color: "text-chart-4",
	art: (
		<>
			{/* stanchion posts + draped rope */}
			<path d="M24 44 V84 M76 44 V84" />
			<circle cx="24" cy="40" r="4" />
			<circle cx="76" cy="40" r="4" />
			<path d="M24 46 q26 22 52 0" />
			<path d="M4 88 H96" />
		</>
	),
};

const supermarket: SceneArt = {
	color: "text-chart-2",
	art: (
		<>
			{/* shelves + stock */}
			<path d="M8 38 H92 M8 62 H92 M8 86 H92" />
			<path d="M18 26 H30 V38 H18 Z M46 26 H58 V38 H46 Z M74 50 H86 V62 H74 Z M22 74 H34 V86 H22 Z" />
		</>
	),
};

const SCENES: Record<string, SceneArt> = {
	bus,
	street,
	parking,
	road,
	traffic: road,
	court,
	queue,
	supermarket,
};

export function SceneBackplate({ scene }: { scene?: string }) {
	const config = scene ? SCENES[scene] : undefined;
	if (!config) return null;

	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMax slice"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full opacity-55",
				config.color,
			)}
		>
			<title>Scene</title>
			{config.art}
		</svg>
	);
}
