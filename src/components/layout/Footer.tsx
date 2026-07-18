import { Link } from "@tanstack/react-router";
import { Container } from "#/components/ui/Container";
import { seoConfig } from "#/config/seo";
import { siteConfig } from "#/config/site";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-20 border-t-[3px] border-foreground bg-card">
			<Container className="py-12">
				<div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
					<div className="max-w-sm">
						<p className="text-lg font-extrabold tracking-tight text-foreground">
							{siteConfig.name}
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							{siteConfig.footer.note}
						</p>
					</div>

					<div className="flex gap-12">
						<nav className="flex flex-col gap-2">
							<p className="stamp mb-1 text-muted-foreground">Explore</p>
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

						<nav className="flex flex-col gap-2">
							<p className="stamp mb-1 text-muted-foreground">More</p>
							{siteConfig.more.map((item) => (
								<Link
									key={item.to}
									to={item.to}
									className="text-sm text-muted-foreground transition-colors hover:text-primary"
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

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
									className="inline-flex size-9 items-center justify-center border-2 border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
								>
									<Icon className="size-[18px]" />
								</a>
							);
						})}
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-1 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} {siteConfig.name}. Made by {seoConfig.maker}.
					</p>
					<p>Satire aimed at habits, never people.</p>
				</div>
			</Container>
		</footer>
	);
}
