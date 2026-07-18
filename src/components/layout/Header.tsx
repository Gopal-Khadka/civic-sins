import { List, X } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "#/components/theme/ThemeToggle";
import { Container } from "#/components/ui/Container";
import { siteConfig } from "#/config/site";

export function Header() {
	const BrandIcon = siteConfig.brandIcon;
	const [open, setOpen] = useState(false);

	// Lock body scroll and close on Escape while the notice menu is open.
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 pt-4">
			<Container>
				{/* Floating paper ticket — detached from the top edge. */}
				<div className="flex h-14 items-center justify-between gap-4 rounded-lg border-[3px] border-foreground bg-background/85 px-4 shadow-[var(--shadow-hard)] backdrop-blur">
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
							aria-label="Open menu"
							aria-expanded={open}
							onClick={() => setOpen(true)}
							className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:text-primary md:hidden"
						>
							<List className="size-[18px]" weight="bold" />
						</button>
					</div>
				</div>
			</Container>

			<MobileNotice open={open} onClose={() => setOpen(false)} />
		</header>
	);
}

function MobileNotice({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const BrandIcon = siteConfig.brandIcon;

	return (
		<div
			className={`fixed inset-0 z-50 bg-background transition-opacity duration-300 ease-[var(--ease-settle)] md:hidden ${
				open ? "visible opacity-100" : "invisible opacity-0"
			}`}
			aria-hidden={!open}
		>
			<div className="halftone pointer-events-none absolute inset-0 opacity-[0.04]" />
			<div className="relative flex h-full flex-col">
				<Container className="flex h-[calc(3.5rem+1rem)] items-center justify-between pt-4">
					<span className="flex items-center gap-2 text-foreground">
						<BrandIcon weight="fill" className="size-6 text-primary" />
						<span className="text-lg font-extrabold tracking-tight">
							{siteConfig.name}
						</span>
					</span>
					<button
						type="button"
						aria-label="Close menu"
						onClick={onClose}
						className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground"
					>
						<X className="size-[18px]" weight="bold" />
					</button>
				</Container>

				<Container className="flex flex-1 flex-col justify-center gap-1 pb-24">
					{siteConfig.nav.map((item, i) => (
						<Link
							key={item.to}
							to={item.to}
							onClick={onClose}
							style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
							className={`display-title py-2 text-4xl transition-all duration-500 ease-[var(--ease-settle)] motion-reduce:transition-none ${
								open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
							}`}
							activeProps={{ className: "text-primary" }}
						>
							{item.label}
						</Link>
					))}

					<ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
						{siteConfig.more.map((item, i) => (
							<li key={item.to}>
								<Link
									to={item.to}
									onClick={onClose}
									style={{
										transitionDelay: open
											? `${(siteConfig.nav.length + i) * 60 + 80}ms`
											: "0ms",
									}}
									className={`stamp text-muted-foreground transition-all duration-500 ease-[var(--ease-settle)] hover:text-foreground motion-reduce:transition-none ${
										open
											? "translate-y-0 opacity-100"
											: "translate-y-6 opacity-0"
									}`}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</Container>
			</div>
		</div>
	);
}
