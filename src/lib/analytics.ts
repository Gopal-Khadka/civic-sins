import posthog from "posthog-js";
import { env } from "#/config/env";

/**
 * Minimal, cookieless analytics. No login, no PII, no cookies, no session
 * recording, no autocapture — only explicit pageviews. Disabled entirely
 * unless `VITE_POSTHOG_KEY` is set, so dev and previews stay clean.
 */
let started = false;

export function initAnalytics(): void {
	if (started || typeof window === "undefined") return;
	if (!env.VITE_POSTHOG_KEY) return;

	posthog.init(env.VITE_POSTHOG_KEY, {
		api_host: env.VITE_POSTHOG_HOST,
		// Anonymous-only: never create identified person profiles.
		person_profiles: "never",
		// No cookies / localStorage — no consent banner required.
		persistence: "memory",
		autocapture: false,
		capture_pageview: false,
		capture_pageleave: false,
		disable_session_recording: true,
	});
	started = true;
}

export function capturePageview(path: string): void {
	if (!started) return;
	posthog.capture("$pageview", { $current_url: path });
}
