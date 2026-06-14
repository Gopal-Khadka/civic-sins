import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "#/components/analytics/Analytics";
import { Footer } from "#/components/layout/Footer";
import { Header } from "#/components/layout/Header";
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
		],
		// Canonical is owned per-route (leaf seo()); the root only sets defaults.
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "alternate",
				type: "application/rss+xml",
				title: `${seoConfig.name} — comics`,
				href: "/rss.xml",
			},
		],
		scripts: [
			jsonLdScript(websiteJsonLd()),
			jsonLdScript(organizationJsonLd()),
		],
	}),
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
