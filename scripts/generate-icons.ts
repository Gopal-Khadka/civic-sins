import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

/**
 * Rasterizes the brand mark (public/favicon.svg — the SealWarning seal used in
 * the header) into every icon the site needs: favicon PNGs, a packed .ico,
 * apple-touch-icon, and the PWA logos. favicon.svg is the single source of
 * truth; run `pnpm icons:generate` after changing it.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "favicon.svg"));

/** Rasterize the SVG to a PNG buffer at a square size. */
function png(size: number): Buffer {
	const r = new Resvg(svg, { fitTo: { mode: "width", value: size } });
	return Buffer.from(r.render().asPng());
}

/** Pack square PNGs into a single .ico (PNG-encoded entries, Vista+). */
function ico(entries: Array<{ size: number; data: Buffer }>): Buffer {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(entries.length, 4);

	const dir = Buffer.alloc(16 * entries.length);
	let offset = 6 + 16 * entries.length;
	for (const [i, entry] of entries.entries()) {
		const e = i * 16;
		dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, e); // width
		dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, e + 1); // height
		dir.writeUInt8(0, e + 2); // palette count
		dir.writeUInt8(0, e + 3); // reserved
		dir.writeUInt16LE(1, e + 4); // color planes
		dir.writeUInt16LE(32, e + 6); // bits per pixel
		dir.writeUInt32LE(entry.data.length, e + 8);
		dir.writeUInt32LE(offset, e + 12);
		offset += entry.data.length;
	}

	return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

const outputs: Array<[string, Buffer]> = [
	["favicon-16x16.png", png(16)],
	["favicon-32x32.png", png(32)],
	["favicon-48x48.png", png(48)],
	["apple-touch-icon.png", png(180)],
	["logo192.png", png(192)],
	["logo512.png", png(512)],
];

for (const [name, data] of outputs) {
	writeFileSync(join(publicDir, name), data);
}

writeFileSync(
	join(publicDir, "favicon.ico"),
	ico([
		{ size: 16, data: png(16) },
		{ size: 32, data: png(32) },
		{ size: 48, data: png(48) },
	]),
);

console.log(
	`[icons] generated ${outputs.length} PNGs + favicon.ico from favicon.svg`,
);
