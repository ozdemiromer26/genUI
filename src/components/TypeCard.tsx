"use client";

// The type selector at the top of Properties (as in Revit): the family
// ("Sistem ailesi: Yol"), a large drop-down of its types and, under it, the
// category of the selection ("Yollar (3)") or a note, with the type editor's
// button. Every text comes from the app.

import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon.js";

export interface TypeOption {
  value: string;
  label: string;
  /** Heading the option is listed under (project types, library…). */
  group?: string;
}

export interface TypeCardProps {
  icon: IconName;
  /** "Sistem ailesi: Yol", "Aile: Duvar", "Sıradaki duvar"… */
  family: string;
  types: readonly TypeOption[];
  /** The current type. */
  value: string;
  onChange: (value: string) => void;
  /** Shown when `value` is none of `types`: "Karışık", "Özel (tipsiz)"… */
  fallback?: string;
  /** Accessible name of the type list. */
  typeLabel: string;
  /** Categories of the selection; the list is off with fewer than two. */
  categories?: readonly { value: string; label: string }[];
  category?: string;
  onCategory?: (value: string) => void;
  categoryLabel?: string;
  /** Instead of the categories: a short note ("Sıradaki duvar bu tipte çizilir"). */
  note?: ReactNode;
  /** The type editor's button. */
  editLabel?: string;
  onEdit?: () => void;
  disabled?: boolean;
}

export function TypeCard(p: TypeCardProps) {
  const groups: string[] = [];
  for (const o of p.types) if (!groups.includes(o.group ?? "")) groups.push(o.group ?? "");
  const option = (o: TypeOption) => (
    <option key={o.value} value={o.value}>
      {o.label}
    </option>
  );
  const known = p.types.some((o) => o.value === p.value);
  const row = p.categories || p.note !== undefined || p.onEdit;
  return (
    <div className="gs-typecard">
      <div className="top">
        <span className="sw" aria-hidden="true">
          <Icon name={p.icon} size={26} />
        </span>
        <div className="body">
          <div className="fam">{p.family}</div>
          <select className="gs-select big" aria-label={p.typeLabel} value={p.value} disabled={p.disabled} onChange={(e) => p.onChange(e.target.value)}>
            {known ? null : <option value={p.value}>{p.fallback ?? p.value}</option>}
            {groups.map((g) =>
              g ? (
                <optgroup key={g} label={g}>
                  {p.types.filter((o) => o.group === g).map(option)}
                </optgroup>
              ) : (
                p.types.filter((o) => !o.group).map(option)
              ),
            )}
          </select>
        </div>
      </div>
      {row ? (
        <div className="row">
          {p.categories ? (
            <select
              className="gs-select"
              aria-label={p.categoryLabel}
              value={p.category ?? p.categories[0]?.value}
              disabled={p.categories.length < 2}
              onChange={(e) => p.onCategory?.(e.target.value)}
            >
              {p.categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          ) : p.note !== undefined ? (
            <span className="note">{p.note}</span>
          ) : (
            <span />
          )}
          {p.onEdit ? (
            <button className="gs-btn sm" type="button" onClick={p.onEdit}>
              {p.editLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
