import { Link } from "@tanstack/react-router";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";

export function Footer() {
	return (
		<footer className="mt-20 border-t-[3px] border-foreground bg-card">
			<Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
				<div className="max-w-sm">
					<p className="text-lg font-extrabold tracking-tight text-foreground">
						{siteConfig.name}
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						{siteConfig.footer.note}
					</p>
				</div>

				<nav className="flex flex-col gap-2">
					{siteConfig.nav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
								className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
							>
								<Icon className="size-[18px]" />
							</a>
						);
					})}
				</div>
			</Container>
		</footer>
	);
}
