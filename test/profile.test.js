// ProfileMenu as the server renders it (closed), and the initials.

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProfileMenu, initialsOf } from "../dist/index.js";

const base = { signInLabel: "Giriş yap", onSignIn: () => {}, menuLabel: "Hesap", items: [{ id: "out", label: "Çıkış" }] };

describe("initialsOf", () => {
  it("takes the first letters of the first and last word", () => {
    expect(initialsOf("Ömer Özdemir")).toBe("ÖÖ");
    expect(initialsOf("  ayşe  nur   kaya ")).toBe("AK");
    expect(initialsOf("Deniz")).toBe("D");
  });

  it("follows the language: Turkish i becomes İ", () => {
    expect(initialsOf("irem ılgaz", "tr")).toBe("İI");
    expect(initialsOf("irem ılgaz", "en")).toBe("II");
  });

  it("keeps a letter outside the basic plane whole and survives an empty name", () => {
    expect(initialsOf("𝒜da")).toBe("𝒜");
    expect(initialsOf("   ")).toBe("?");
  });
});

describe("ProfileMenu", () => {
  it("is a sign-in button while nobody is signed in", () => {
    const html = renderToStaticMarkup(createElement(ProfileMenu, { ...base, user: null }));
    expect(html).toBe('<button type="button" class="gs-btn sm gs-profile-signin">Giriş yap</button>');
  });

  it("shows the initials on a closed menu button when signed in", () => {
    const html = renderToStaticMarkup(createElement(ProfileMenu, { ...base, user: { name: "Ömer Özdemir", email: "o@example.com" }, locale: "tr" }));
    expect(html).toContain('aria-label="Hesap"');
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain(">ÖÖ</button>");
    // closed: neither the menu nor the e-mail is in the page
    expect(html).not.toContain('role="menu"');
    expect(html).not.toContain("o@example.com");
  });

  it("shows the picture instead of initials, without sending a referrer", () => {
    const html = renderToStaticMarkup(createElement(ProfileMenu, { ...base, user: { name: "Ömer", picture: "https://example.com/p.png" } }));
    expect(html).toContain('<img src="https://example.com/p.png" alt="" referrerPolicy="no-referrer"/>');
  });
});
