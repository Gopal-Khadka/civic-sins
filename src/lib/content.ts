import { allComics, allPages } from "content-collections";

/** Typed accessors over the content-collections data. Routes use these only. */

export type Comic = (typeof allComics)[number];
export type Page = (typeof allPages)[number];

function byDateDesc(a: Comic, b: Comic): number {
	return (b.date ?? "").localeCompare(a.date ?? "");
}

export function getComics(): Comic[] {
	return [...allComics].sort(byDateDesc);
}

export function getComic(slug: string): Comic | undefined {
	return allComics.find((c) => c.slug === slug);
}

export function getFeaturedComics(limit = 3): Comic[] {
	const featured = getComics().filter((c) => c.featured);
	return (featured.length ? featured : getComics()).slice(0, limit);
}

export interface ComicFilter {
	format?: string;
	tag?: string;
}

export function filterComics({ format, tag }: ComicFilter): Comic[] {
	return getComics().filter(
		(c) => (!format || c.format === format) && (!tag || c.tags.includes(tag)),
	);
}

export function getPages(): Page[] {
	return [...allPages].sort((a, b) => a.order - b.order);
}

export function getPage(slug: string): Page | undefined {
	return allPages.find((p) => p.slug === slug);
}
