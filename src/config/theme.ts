/** Theme configuration — consumed by ThemeProvider / ThemeToggle. */

export type Theme = "light" | "dark" | "system";

export const themeConfig = {
	storageKey: "civic-theme",
	defaultTheme: "system" as Theme,
	themes: ["light", "dark", "system"] as const satisfies readonly Theme[],
} as const;
