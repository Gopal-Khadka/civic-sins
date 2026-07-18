import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "#/components/theme/ThemeToggle";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";
import { cn } from "#/lib/utils";

export function Header() {
	const BrandIcon = siteConfig.brandIcon;
	return (
		<header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-background/90 backdrop-blur">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Link to="/" className="flex items-center gap-2 text-foreground">
					<BrandIcon weight="fill" className="size-6 text-primary" />
					<span className="text-lg font-extrabold tracking-tight">
						{siteConfig.name}
					</span>
				</Link>

				<nav className="flex items-center gap-1 sm:gap-2">
					{siteConfig.nav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={cn(
								"rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
							)}
							activeProps={{ className: "text-primary" }}
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
