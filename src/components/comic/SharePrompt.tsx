import { Check, Copy, PaperPlaneTilt } from "@phosphor-icons/react";
import { useState } from "react";
import { CtaLabel, ctaButtonClasses } from "#/components/ui/cta-button";
import { PaperTray } from "#/components/ui/PaperTray";
import type { Comic } from "#/lib/content";

/**
 * "Tag the person who does this" — the PRD growth lever (§8). Web Share where
 * available, clipboard copy as fallback.
 */
export function SharePrompt({ comic }: { comic: Comic }) {
	const [copied, setCopied] = useState(false);

	const share = async () => {
		const url = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({
					title: comic.title,
					text: comic.sharePrompt,
					url,
				});
				return;
			} catch {
				/* user dismissed — fall through to copy */
			}
		}
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const ActionIcon = copied
		? Check
		: navigatorHasShare()
			? PaperPlaneTilt
			: Copy;

	return (
		<PaperTray className="mt-8">
			<div className="flex flex-col items-start gap-4 border-[3px] border-foreground bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-lg font-bold text-foreground">
					{comic.sharePrompt ?? "Know someone who does this?"}
				</p>
				<button
					type="button"
					onClick={share}
					className={ctaButtonClasses({
						withIcon: true,
						className: "shrink-0",
					})}
				>
					<CtaLabel icon={ActionIcon}>
						{copied ? "Link copied" : "Send it"}
					</CtaLabel>
				</button>
			</div>
		</PaperTray>
	);
}

function navigatorHasShare(): boolean {
	return typeof navigator !== "undefined" && "share" in navigator;
}
