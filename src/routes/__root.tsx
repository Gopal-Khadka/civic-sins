import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "#/components/analytics/Analytics";
import { Footer } from "#/components/layout/Footer";
import { Header } from "#/components/layout/Header";
import { StatusScreen } from "#/components/layout/StatusScreen";
import { ThemeProvider } from "#/components/theme/ThemeProvider";
import { seoConfig } from "#/config/seo";
import {
	jsonLdScript,
	organizationJsonLd,
	seo,
	websiteJsonLd,
} from "#/lib/seo";
import appCss from "#/styles/app.css?url";

const rootSeo = seo();

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			// Page-level defaults (leaf routes override title/description/og:*).
			...rootSeo.meta,
			// Site-wide tags.
			{ property: "og:site_name", content: seoConfig.name },
			{ property: "og:locale", content: seoConfig.locale },
			{ name: "twitter:card", content: "summary_large_image" },
			...(seoConfig.twitterHandle
				? [{ name: "twitter:site", content: seoConfig.twitterHandle }]
				: []),
			// Browser chrome color, per scheme (matches the Paper White tokens).
			{
				name: "theme-color",
				content: "#f4f1e8",
				media: "(prefers-color-scheme: light)",
			},
			{
				name: "theme-color",
				content: "#171613",
				media: "(prefers-color-scheme: dark)",
			},
		],
		// Canonical is owned per-route (leaf seo()); the root only sets defaults.
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "apple-touch-icon", href: "/logo192.png" },
			{
				rel: "alternate",
				type: "application/rss+xml",
				title: `${seoConfig.name}: comics`,
				href: "/rss.xml",
			},
		],
		scripts: [
			jsonLdScript(websiteJsonLd()),
			jsonLdScript(organizationJsonLd()),
		],
	}),
	notFoundComponent: () => (
		<StatusScreen
			code="404"
			title="This page has no civic sense"
			description="It wandered off and left the page blocked. Typical. Let's head back."
		/>
	),
	errorComponent: () => (
		<StatusScreen
			code="500"
			title="We sinned, technically"
			description="Something broke on our end. We own it. Try again in a moment."
		/>
	),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					<Analytics />
					<div className="flex min-h-dvh flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
