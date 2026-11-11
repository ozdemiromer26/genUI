import type { ReactNode } from "react";
import { type IconName } from "../icons/Icon.js";
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
    categories?: readonly {
        value: string;
        label: string;
    }[];
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
export declare function TypeCard(p: TypeCardProps): import("react").JSX.Element;
