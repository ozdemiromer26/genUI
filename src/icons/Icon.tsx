"use client";

// Icons of the design system. `Icon` draws a two-tone icon (base `ink-2`,
// accent `accent`, styled by `.gs-ic` in bundle.css); `Glyph` a single-tone
// interface sign in currentColor (`.gs-ic-1`). Both are decorative: the
// control around them carries the accessible name.

import { GLYPHS, ICONS } from "./data.js";

export type IconName = keyof typeof ICONS;
export type GlyphName = keyof typeof GLYPHS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];
export const GLYPH_NAMES = Object.keys(GLYPHS) as GlyphName[];

/** Stroke width per icon size: the bigger the icon, the thinner the line. */
export const ICON_STROKE: Readonly<Record<number, number>> = { 32: 1.25, 26: 1.4, 24: 1.5, 18: 1.6, 16: 1.7, 15: 1.6 };

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const [base, accent] = ICONS[name];
  return (
    <svg className="gs-ic" width={size} height={size} viewBox="0 0 24 24" strokeWidth={ICON_STROKE[size] ?? 1.5} aria-hidden="true">
      {base ? <path className="b" d={base} /> : null}
      {accent ? <path className="a" d={accent} /> : null}
    </svg>
  );
}

/** `stroke` overrides the glyph's own line width. */
export function Glyph({ name, size = 14, stroke }: { name: GlyphName; size?: number; stroke?: number }) {
  const [d, width] = GLYPHS[name];
  return (
    <svg className="gs-ic-1" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke ?? width} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
