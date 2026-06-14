import { Link } from "@tanstack/react-router";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";

export function Footer() {
	return (
		<footer className="mt-20 border-t border-border bg-surface">
			<Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
				<div className="max-w-sm">
					<p className="font-serif text-lg text-ink">{siteConfig.name}</p>
					<p className="mt-2 text-sm text-ink-soft">{siteConfig.footer.note}</p>
				</div>

				<nav className="flex flex-col gap-2">
					{siteConfig.nav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="text-sm text-ink-soft transition-colors hover:text-rust"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex gap-3">
					{siteConfig.social.map((s) => {
						const Icon = s.icon;
						return (
							<a
								key={s.label}
								href={s.href}
								aria-label={s.label}
								target="_blank"
								rel="noreferrer"
								className="inline-flex size-9 items-center justify-center rounded-md border border-border text-ink-soft transition-colors hover:border-rust/40 hover:text-rust"
							>
								<Icon className="size-[18px]" strokeWidth={1.75} />
							</a>
						);
					})}
				</div>
			</Container>
		</footer>
	);
}
