// The icon set and its components, as the package ships them (dist/).

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GLYPHS, ICONS } from "../dist/icons/data.js";
import { GLYPH_NAMES, Glyph, ICON_NAMES, Icon } from "../dist/index.js";

const PATH = /^[MmLlHhVvCcSsQqTtAaZz0-9 .,-]+$/;

describe("icon set", () => {
  it("draws every two-tone icon as a base and an accent path", () => {
    expect(ICON_NAMES.length).toBe(Object.keys(ICONS).length);
    for (const name of ICON_NAMES) {
      const [base, accent] = ICONS[name];
      expect(base, name).toMatch(PATH);
      expect(accent, name).toMatch(PATH);
    }
  });

  it("gives every glyph a path and a line width", () => {
    expect(GLYPH_NAMES.length).toBe(Object.keys(GLYPHS).length);
    for (const name of GLYPH_NAMES) {
      const [d, width] = GLYPHS[name];
      expect(d, name).toMatch(PATH);
      expect(width, name).toBeGreaterThanOrEqual(1);
      expect(width, name).toBeLessThanOrEqual(3);
    }
  });

  it("keeps both apps' names: extend (lengthen) and expand (grow an area) are different icons", () => {
    expect(ICONS.extend).not.toEqual(ICONS.expand);
    for (const name of ["wall", "door", "road", "terrain", "fit", "settings", "json"]) expect(ICON_NAMES).toContain(name);
    for (const name of ["chevronDown", "chevronUp", "chevronRight", "more", "hide", "pin", "gear", "back"]) expect(GLYPH_NAMES).toContain(name);
  });
});

describe("components", () => {
  it("draw an icon in two tones with the line width of its size", () => {
    const svg = renderToStaticMarkup(createElement(Icon, { name: "wall", size: 24 }));
    expect(svg).toContain('class="gs-ic"');
    expect(svg).toContain('stroke-width="1.5"');
    expect(svg).toContain('class="b"');
    expect(svg).toContain('class="a"');
    expect(svg).toContain('aria-hidden="true"');
  });

  it("draw a glyph with its own line width unless told otherwise", () => {
    expect(renderToStaticMarkup(createElement(Glyph, { name: "chevronDown" }))).toContain('stroke-width="2.2"');
    expect(renderToStaticMarkup(createElement(Glyph, { name: "chevronDown", stroke: 1.5 }))).toContain('stroke-width="1.5"');
  });
});
