"use client";

// The account control at the top right of both apps. Signed out it is a
// "Sign in" button; signed in, the user's avatar opens a menu with their name
// and e-mail and the entries the app gives it (account settings, the other
// app, sign out). The package knows nothing of accounts: who is signed in,
// where the links lead and every text come from the app.

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Glyph, type GlyphName } from "../icons/Icon.js";

export interface ProfileUser {
  name: string;
  email?: string;
  /** Address of the user's picture; without one the avatar shows initials. */
  picture?: string;
}

export interface ProfileMenuItem {
  id: string;
  label: string;
  glyph?: GlyphName;
  /** A link (account settings, the other app); otherwise `onSelect` runs. */
  href?: string;
  onSelect?: () => void;
  /** Drawn in the danger colour (sign out everywhere, delete account). */
  danger?: boolean;
  /** A rule above this entry. */
  separated?: boolean;
}

export interface ProfileMenuProps {
  /** `null` while nobody is signed in. */
  user: ProfileUser | null;
  signInLabel: string;
  onSignIn: () => void;
  /** Accessible name of the avatar button ("Hesap"). */
  menuLabel: string;
  items: readonly ProfileMenuItem[];
  /** Language of the user's name, for the initials (Turkish "i" → "İ"). */
  locale?: string;
}

/** The first letters of the first and last word of a name: "Ömer Özdemir" → "ÖÖ". */
export function initialsOf(name: string, locale?: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = (w: string) => [...w][0] ?? "";
  const letters = words.length === 1 ? first(words[0]!) : first(words[0]!) + first(words[words.length - 1]!);
  return letters.toLocaleUpperCase(locale);
}

export function ProfileMenu(p: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  // A press outside or Escape closes the menu; Escape gives the focus back.
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
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
    if (open) root.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [open]);

  if (!p.user) {
    return (
      <button type="button" className="gs-btn sm gs-profile-signin" onClick={p.onSignIn}>
        {p.signInLabel}
      </button>
    );
  }

  const user = p.user;
  const arrows = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    const edge = e.key === "Home" ? 0 : e.key === "End" ? -1 : null;
    if (!step && edge === null) return;
    const entries = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]')];
    if (entries.length === 0) return;
    e.preventDefault();
    const at = entries.indexOf(document.activeElement as HTMLElement);
    const next = edge !== null ? (edge + entries.length) % entries.length : (at + step + entries.length) % entries.length;
    entries[next]?.focus();
  };
  const choose = (item: ProfileMenuItem) => {
    setOpen(false);
    item.onSelect?.();
  };

  return (
    <div className="gs-profile" ref={root}>
      <button
        ref={button}
        type="button"
        className="gs-avatar"
        aria-label={p.menuLabel}
        title={user.name}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {user.picture ? <img src={user.picture} alt="" referrerPolicy="no-referrer" /> : initialsOf(user.name, p.locale)}
      </button>
      {open ? (
        <div className="gs-menu gs-profile-menu" id={menuId} role="menu" aria-label={p.menuLabel} onKeyDown={arrows}>
          <div className="gs-profile-head">
            <b>{user.name}</b>
            {user.email ? <span>{user.email}</span> : null}
          </div>
          {p.items.map((item, i) => {
            const cls = "gs-menu-item" + (item.danger ? " danger" : "");
            const inner = (
              <>
                {item.glyph ? <Glyph name={item.glyph} size={15} /> : null}
                {item.label}
              </>
            );
            return (
              <div key={item.id} role="none">
                {item.separated || i === 0 ? <div className="gs-menu-sep" role="separator" /> : null}
                {item.href ? (
                  <a className={cls} role="menuitem" tabIndex={-1} href={item.href} onClick={() => choose(item)}>
                    {inner}
                  </a>
                ) : (
                  <button type="button" className={cls} role="menuitem" tabIndex={-1} onClick={() => choose(item)}>
                    {inner}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
