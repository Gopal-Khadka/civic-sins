import { Link } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";
import { Container } from "#/components/ui/Container";

/**
 * Shared full-page status screen for 404 / error states — token-styled and
 * on-brand, so the not-found and error boundaries stay DRY.
 */
export function StatusScreen({
	code,
	title,
	description,
}: {
	code: string;
	title: string;
	description: string;
}) {
	return (
		<Container as="section" className="py-24 text-center sm:py-32">
			<p className="kicker mb-4 text-rust">{code}</p>
			<h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">
				{title}
			</h1>
			<p className="mx-auto mt-4 max-w-md text-ink-soft">{description}</p>
			<Link to="/" className={`${buttonVariants({ variant: "primary" })} mt-8`}>
				Back to the comics
			</Link>
		</Container>
	);
}
