// Generates css/tokens.css from src/tokens.json, the design system's tokens
// ("genarch + genurban"): the shared scales on :root, one block of custom
// properties per theme, and a `.ty-<style>` class per type style.
//   node scripts/tokens.mjs          write css/tokens.css
//   node scripts/tokens.mjs --check  fail if css/tokens.css is out of date

import { readFileSync, writeFileSync } from "node:fs";

const source = new URL("../src/tokens.json", import.meta.url);
const target = new URL("../css/tokens.css", import.meta.url);

/** `{accent}` refers to another token. */
const ref = (value) => String(value).replace(/\{([A-Za-z0-9_.-]+)\}/g, "var(--$1)");

/** A token's value in `theme`; a missing theme takes the first theme's value. */
function valueFor(token, theme, first) {
  if (typeof token.value === "string") return token.value;
  const value = token.value[theme] ?? token.value[first];
  if (value === undefined) throw new Error(`token ${token.name} has no value for ${theme}`);
  return value;
}

export function tokensCss(file) {
  const themes = file.color.themes.map((t) => t.id);
  const first = themes[0];
  const out = ["/* Generated from src/tokens.json by scripts/tokens.mjs. Do not edit. */", "", ":root {"];
  // An app may load Geist under a variable of its own (next/font); otherwise the name.
  out.push(`  --font-sans: var(--font-geist-sans, Geist), ${file.type.families.sans};`);
  out.push(`  --font-mono: var(--font-geist-mono, "Geist Mono"), ${file.type.families.mono};`);
  for (const group of [file.spacing, file.radius, file.size]) {
    for (const token of group.tokens) out.push(`  --${token.name}: ${ref(valueFor(token, first, first))};`);
  }
  out.push("}");
  for (const theme of themes) {
    out.push("", `[data-theme="${theme}"] {`, `  color-scheme: ${theme.endsWith("-dark") ? "dark" : "light"};`);
    for (const token of [...file.color.tokens, ...file.shadow.tokens]) {
      out.push(`  --${token.name}: ${ref(valueFor(token, theme, first))};`);
    }
    out.push("}");
  }
  out.push("");
  for (const group of file.type.groups) {
    for (const style of group.styles) {
      const mono = style.name.startsWith("mono-");
      const decl = [`font-size: ${style.fontSize}`, `line-height: ${style.lineHeight}`, `font-weight: ${style.fontWeight}`];
      if (style.letterSpacing) decl.push(`letter-spacing: ${style.letterSpacing}`);
      if (mono) decl.push("font-family: var(--font-mono)");
      if (style.name === "mono-overline" || style.name === "mono-label") decl.push("text-transform: uppercase");
      if (style.name === "hero-num" || mono) decl.push("font-variant-numeric: tabular-nums");
      out.push(`.ty-${style.name} { ${decl.join("; ")}; }`);
    }
  }
  return out.join("\n") + "\n";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const css = tokensCss(JSON.parse(readFileSync(source, "utf8")));
  if (process.argv.includes("--check")) {
    if (readFileSync(target, "utf8") !== css) {
      console.error("css/tokens.css is out of date: run `pnpm tokens`.");
      process.exit(1);
    }
  } else {
    writeFileSync(target, css);
  }
}
