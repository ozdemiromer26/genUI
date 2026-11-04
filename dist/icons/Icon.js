"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Icons of the design system. `Icon` draws a two-tone icon (base `ink-2`,
// accent `accent`, styled by `.gs-ic` in bundle.css); `Glyph` a single-tone
// interface sign in currentColor (`.gs-ic-1`). Both are decorative: the
// control around them carries the accessible name.
import { GLYPHS, ICONS } from "./data.js";
export const ICON_NAMES = Object.keys(ICONS);
export const GLYPH_NAMES = Object.keys(GLYPHS);
/** Stroke width per icon size: the bigger the icon, the thinner the line. */
export const ICON_STROKE = { 32: 1.25, 26: 1.4, 24: 1.5, 18: 1.6, 16: 1.7, 15: 1.6 };
export function Icon({ name, size = 16 }) {
    const [base, accent] = ICONS[name];
    return (_jsxs("svg", { className: "gs-ic", width: size, height: size, viewBox: "0 0 24 24", strokeWidth: ICON_STROKE[size] ?? 1.5, "aria-hidden": "true", children: [base ? _jsx("path", { className: "b", d: base }) : null, accent ? _jsx("path", { className: "a", d: accent }) : null] }));
}
/** `stroke` overrides the glyph's own line width. */
export function Glyph({ name, size = 14, stroke }) {
    const [d, width] = GLYPHS[name];
    return (_jsx("svg", { className: "gs-ic-1", width: size, height: size, viewBox: "0 0 24 24", strokeWidth: stroke ?? width, "aria-hidden": "true", children: _jsx("path", { d: d }) }));
}
