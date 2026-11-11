import { type GlyphName } from "../icons/Icon.js";
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
export declare function initialsOf(name: string, locale?: string): string;
export declare function ProfileMenu(p: ProfileMenuProps): import("react").JSX.Element;
