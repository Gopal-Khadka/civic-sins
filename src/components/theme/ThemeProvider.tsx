import { ScriptOnce } from "@tanstack/react-router";
import {
	createContext,
	type ReactNode,
	use,
	useCallback,
	useEffect,
	useState,
} from "react";
import { type Theme, themeConfig } from "#/config/theme";

interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: "light" | "dark";
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const { storageKey, defaultTheme } = themeConfig;

/* Inline script injected once, runs before paint -> no flash of wrong theme. */
const initScript = `(function(){try{var k=${JSON.stringify(storageKey)};var t=localStorage.getItem(k)||${JSON.stringify(
	defaultTheme,
)};var s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var r=t==="system"?s:t;var d=document.documentElement;d.classList.toggle("dark",r==="dark");d.style.colorScheme=r;}catch(e){}})();`;

function systemTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function resolve(theme: Theme): "light" | "dark" {
	return theme === "system" ? systemTheme() : theme;
}

function applyTheme(resolved: "light" | "dark") {
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

	// Hydrate the selected theme from storage after mount (SSR-safe).
	useEffect(() => {
		const stored = localStorage.getItem(storageKey) as Theme | null;
		if (stored && themeConfig.themes.includes(stored)) setThemeState(stored);
	}, []);

	// Apply whenever the selection changes.
	useEffect(() => {
		const next = resolve(theme);
		setResolvedTheme(next);
		applyTheme(next);
	}, [theme]);

	// Follow OS changes while in "system" mode.
	useEffect(() => {
		if (theme !== "system") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			const next = mq.matches ? "dark" : "light";
			setResolvedTheme(next);
			applyTheme(next);
		};
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [theme]);

	const setTheme = useCallback((next: Theme) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			<ScriptOnce>{initScript}</ScriptOnce>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const ctx = use(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
	return ctx;
}
