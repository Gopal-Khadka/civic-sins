import type { ReactNode } from "react";
import { Container } from "#/components/ui/Container";

interface PageWrapProps {
	kicker?: string;
	title?: string;
	description?: string;
	size?: "default" | "narrow";
	children: ReactNode;
}

/** Shared page shell: optional kicker/title/description header + content. */
export function PageWrap({
	kicker,
	title,
	description,
	size = "default",
	children,
}: PageWrapProps) {
	return (
		<Container as="section" size={size} className="py-12 sm:py-16">
			{(kicker || title || description) && (
				<header className="mb-10 max-w-2xl">
					{kicker && <p className="kicker mb-3">{kicker}</p>}
					{title && <h1 className="display-title text-balance">{title}</h1>}
					{description && (
						<p className="mt-4 text-lg text-ink-soft">{description}</p>
					)}
				</header>
			)}
			{children}
		</Container>
	);
}
