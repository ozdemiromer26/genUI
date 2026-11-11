"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "../icons/Icon.js";
export function TypeCard(p) {
    const groups = [];
    for (const o of p.types)
        if (!groups.includes(o.group ?? ""))
            groups.push(o.group ?? "");
    const option = (o) => (_jsx("option", { value: o.value, children: o.label }, o.value));
    const known = p.types.some((o) => o.value === p.value);
    const row = p.categories || p.note !== undefined || p.onEdit;
    return (_jsxs("div", { className: "gs-typecard", children: [_jsxs("div", { className: "top", children: [_jsx("span", { className: "sw", "aria-hidden": "true", children: _jsx(Icon, { name: p.icon, size: 26 }) }), _jsxs("div", { className: "body", children: [_jsx("div", { className: "fam", children: p.family }), _jsxs("select", { className: "gs-select big", "aria-label": p.typeLabel, value: p.value, disabled: p.disabled, onChange: (e) => p.onChange(e.target.value), children: [known ? null : _jsx("option", { value: p.value, children: p.fallback ?? p.value }), groups.map((g) => g ? (_jsx("optgroup", { label: g, children: p.types.filter((o) => o.group === g).map(option) }, g)) : (p.types.filter((o) => !o.group).map(option)))] })] })] }), row ? (_jsxs("div", { className: "row", children: [p.categories ? (_jsx("select", { className: "gs-select", "aria-label": p.categoryLabel, value: p.category ?? p.categories[0]?.value, disabled: p.categories.length < 2, onChange: (e) => p.onCategory?.(e.target.value), children: p.categories.map((c) => (_jsx("option", { value: c.value, children: c.label }, c.value))) })) : p.note !== undefined ? (_jsx("span", { className: "note", children: p.note })) : (_jsx("span", {})), p.onEdit ? (_jsx("button", { className: "gs-btn sm", type: "button", onClick: p.onEdit, children: p.editLabel })) : null] })) : null] }));
}
