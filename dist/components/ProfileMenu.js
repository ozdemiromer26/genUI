"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// The account control at the top right of both apps. Signed out it is a
// "Sign in" button; signed in, the user's avatar opens a menu with their name
// and e-mail and the entries the app gives it (account settings, the other
// app, sign out). The package knows nothing of accounts: who is signed in,
// where the links lead and every text come from the app.
import { useEffect, useId, useRef, useState } from "react";
import { Glyph } from "../icons/Icon.js";
/** The first letters of the first and last word of a name: "Ömer Özdemir" → "ÖÖ". */
export function initialsOf(name, locale) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0)
        return "?";
    const first = (w) => [...w][0] ?? "";
    const letters = words.length === 1 ? first(words[0]) : first(words[0]) + first(words[words.length - 1]);
    return letters.toLocaleUpperCase(locale);
}
export function ProfileMenu(p) {
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    const button = useRef(null);
    const menuId = useId();
    // A press outside or Escape closes the menu; Escape gives the focus back.
    useEffect(() => {
        if (!open)
            return;
        const outside = (e) => {
            if (root.current && !root.current.contains(e.target))
                setOpen(false);
        };
        const key = (e) => {
            if (e.key !== "Escape")
                return;
            setOpen(false);
            button.current?.focus();
        };
        document.addEventListener("pointerdown", outside);
        document.addEventListener("keydown", key);
        return () => {
            document.removeEventListener("pointerdown", outside);
            document.removeEventListener("keydown", key);
        };
    }, [open]);
    // Opened from the keyboard or the mouse, the first entry takes the focus.
    useEffect(() => {
        if (open)
            root.current?.querySelector('[role="menuitem"]')?.focus();
    }, [open]);
    if (!p.user) {
        return (_jsx("button", { type: "button", className: "gs-btn sm gs-profile-signin", onClick: p.onSignIn, children: p.signInLabel }));
    }
    const user = p.user;
    const arrows = (e) => {
        const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
        const edge = e.key === "Home" ? 0 : e.key === "End" ? -1 : null;
        if (!step && edge === null)
            return;
        const entries = [...e.currentTarget.querySelectorAll('[role="menuitem"]')];
        if (entries.length === 0)
            return;
        e.preventDefault();
        const at = entries.indexOf(document.activeElement);
        const next = edge !== null ? (edge + entries.length) % entries.length : (at + step + entries.length) % entries.length;
        entries[next]?.focus();
    };
    const choose = (item) => {
        setOpen(false);
        item.onSelect?.();
    };
    return (_jsxs("div", { className: "gs-profile", ref: root, children: [_jsx("button", { ref: button, type: "button", className: "gs-avatar", "aria-label": p.menuLabel, title: user.name, "aria-haspopup": "menu", "aria-expanded": open, "aria-controls": open ? menuId : undefined, onClick: () => setOpen((o) => !o), children: user.picture ? _jsx("img", { src: user.picture, alt: "", referrerPolicy: "no-referrer" }) : initialsOf(user.name, p.locale) }), open ? (_jsxs("div", { className: "gs-menu gs-profile-menu", id: menuId, role: "menu", "aria-label": p.menuLabel, onKeyDown: arrows, children: [_jsxs("div", { className: "gs-profile-head", children: [_jsx("b", { children: user.name }), user.email ? _jsx("span", { children: user.email }) : null] }), p.items.map((item, i) => {
                        const cls = "gs-menu-item" + (item.danger ? " danger" : "");
                        const inner = (_jsxs(_Fragment, { children: [item.glyph ? _jsx(Glyph, { name: item.glyph, size: 15 }) : null, item.label] }));
                        return (_jsxs("div", { role: "none", children: [item.separated || i === 0 ? _jsx("div", { className: "gs-menu-sep", role: "separator" }) : null, item.href ? (_jsx("a", { className: cls, role: "menuitem", tabIndex: -1, href: item.href, onClick: () => choose(item), children: inner })) : (_jsx("button", { type: "button", className: cls, role: "menuitem", tabIndex: -1, onClick: () => choose(item), children: inner }))] }, item.id));
                    })] })) : null] }));
}
