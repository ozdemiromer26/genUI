// The stylesheets the package ships: tokens.css is what src/tokens.json
// generates, every theme has every colour, and bundle.css uses no variable
// the tokens do not define.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { tokensCss } from "../scripts/tokens.mjs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = JSON.parse(read("../src/tokens.json"));
const tokensFile = read("../css/tokens.css");
const bundle = read("../css/bundle.css");

/** Custom properties a stylesheet declares (`--name:`). */
const declared = (css) => new Set([...css.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));

describe("tokens.css", () => {
  it("is what src/tokens.json generates", () => {
    expect(tokensFile).toBe(tokensCss(tokens));
  });

  it("gives every theme every colour and shadow", () => {
    const themes = tokens.color.themes.map((t) => t.id);
    expect(themes).toEqual(["genarch-light", "genarch-dark", "genurban-light", "genurban-dark"]);
    for (const token of [...tokens.color.tokens, ...tokens.shadow.tokens]) {
      if (typeof token.value === "string") continue;
      for (const theme of themes) expect(token.value[theme], `${token.name} in ${theme}`).toBeTruthy();
    }
  });

  it("chooses no theme by itself: the app sets data-theme", () => {
    expect(tokensFile).not.toMatch(/:root\s*,/);
  });
});

describe("bundle.css", () => {
  it("uses only variables the tokens or the bundle declare", () => {
    const known = new Set([...declared(tokensFile), ...declared(bundle)]);
    // A variable with a fallback (`var(--x, …)`) may be absent.
    const used = [...bundle.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*\)/g)].map((m) => m[1]);
    const missing = [...new Set(used.filter((name) => !known.has(name)))];
    expect(missing).toEqual([]);
  });
});
