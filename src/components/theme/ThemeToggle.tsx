import { Monitor, Moon, Sun } from "@phosphor-icons/react";
import type { Theme } from "#/config/theme";
import { themeConfig } from "#/config/theme";
import { cn } from "#/lib/utils";
import { useTheme } from "./ThemeProvider";

const ICONS: Record<Theme, typeof Sun> = {
	light: Sun,
	dark: Moon,
	system: Monitor,
};

const LABELS: Record<Theme, string> = {
	light: "Light",
	dark: "Dark",
	system: "System",
};

/** Cycles light -> dark -> system. Icon reflects the current selection. */
export function ThemeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const order = themeConfig.themes;
	const Icon = ICONS[theme];

	const next = () => {
		const i = order.indexOf(theme);
		setTheme(order[(i + 1) % order.length] as Theme);
	};

	return (
		<button
			type="button"
			onClick={next}
			aria-label={`Theme: ${LABELS[theme]}. Click to switch.`}
			title={`Theme: ${LABELS[theme]}`}
			className={cn(
				"inline-flex size-9 items-center justify-center rounded-md border border-border",
				"bg-surface text-ink-soft transition-colors hover:text-rust hover:border-rust/40",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
				className,
			)}
		>
			<Icon className="size-[18px]" />
		</button>
	);
}
