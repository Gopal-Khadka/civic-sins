import { List, X } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeToggle } from "#/components/theme/ThemeToggle";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";

export function Header() {
	const BrandIcon = siteConfig.brandIcon;
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-background/90 backdrop-blur">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Link
					to="/"
					onClick={() => setOpen(false)}
					className="flex items-center gap-2 text-foreground"
				>
					<BrandIcon weight="fill" className="size-6 shrink-0 text-primary" />
					<span className="text-lg font-extrabold tracking-tight">
						{siteConfig.name}
					</span>
				</Link>

				<div className="flex items-center gap-1 sm:gap-2">
					<nav className="hidden items-center gap-1 md:flex">
						{siteConfig.nav.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
								activeProps={{ className: "text-primary" }}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<ThemeToggle className="ml-1" />

					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
						className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:text-primary md:hidden"
					>
						{open ? (
							<X className="size-[18px]" weight="bold" />
						) : (
							<List className="size-[18px]" weight="bold" />
						)}
					</button>
				</div>
			</Container>

			{open && (
				<nav className="border-t-[3px] border-foreground bg-background md:hidden">
					<Container as="ul" className="flex flex-col py-2">
						{siteConfig.nav.map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									onClick={() => setOpen(false)}
									className="block rounded-md px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
									activeProps={{ className: "text-primary" }}
								>
									{item.label}
								</Link>
							</li>
						))}
					</Container>
				</nav>
			)}
		</header>
	);
}
