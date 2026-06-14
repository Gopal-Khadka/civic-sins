import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "#/components/theme/ThemeToggle";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";
import { cn } from "#/lib/utils";

export function Header() {
	const BrandIcon = siteConfig.brandIcon;
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-page/85 backdrop-blur">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Link to="/" className="flex items-center gap-2 text-ink">
					<BrandIcon className="size-5 text-rust" strokeWidth={1.75} />
					<span className="font-serif text-lg font-medium">
						{siteConfig.name}
					</span>
				</Link>

				<nav className="flex items-center gap-1 sm:gap-2">
					{siteConfig.nav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={cn(
								"rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink",
							)}
							activeProps={{ className: "text-rust" }}
						>
							{item.label}
						</Link>
					))}
					<ThemeToggle className="ml-1" />
				</nav>
			</Container>
		</header>
	);
}
