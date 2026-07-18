import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view. SSR-safe (starts false, flips
 * after mount) and self-disabling under reduced-motion or missing
 * IntersectionObserver — in those cases it resolves to true immediately so
 * content is never gated behind an animation that won't run.
 */
export function useInView<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const reduce = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce || typeof IntersectionObserver === "undefined") {
			setInView(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return { ref, inView };
}
