/**
 * Represents a type for supported languages.
 *
 * This type can only accept specific string values corresponding to
 * language codes. Currently, the supported languages are:
 * - `en`: English
 * - `pl`: Polish
 *
 * Use this type to ensure variables or parameters conform strictly
 * to the allowed language codes.
 */
export type Lang = "en" | "pl"

export type Theme = "light" | "dark"
export type ThemeMode = "system" | "light" | "dark"