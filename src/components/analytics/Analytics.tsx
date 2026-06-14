import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { capturePageview, initAnalytics } from "#/lib/analytics";

/**
 * Mounts once in the root. Initializes analytics on the client and sends a
 * pageview on every resolved navigation. Renders nothing.
 */
export function Analytics() {
	const router = useRouter();

	useEffect(() => {
		initAnalytics();
		capturePageview(router.state.location.href);
		return router.subscribe("onResolved", (event) => {
			capturePageview(event.toLocation.href);
		});
	}, [router]);

	return null;
}
