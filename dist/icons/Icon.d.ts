import { GLYPHS, ICONS } from "./data.js";
export type IconName = keyof typeof ICONS;
export type GlyphName = keyof typeof GLYPHS;
export declare const ICON_NAMES: IconName[];
export declare const GLYPH_NAMES: GlyphName[];
/** Stroke width per icon size: the bigger the icon, the thinner the line. */
export declare const ICON_STROKE: Readonly<Record<number, number>>;
export declare function Icon({ name, size }: {
    name: IconName;
    size?: number;
}): import("react").JSX.Element;
/** `stroke` overrides the glyph's own line width. */
export declare function Glyph({ name, size, stroke }: {
    name: GlyphName;
    size?: number;
    stroke?: number;
}): import("react").JSX.Element;
