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

/**
 * Represents a type for supported themes.
 *
 * This type can only accept specific string values corresponding to
 * theme options. Currently, the supported themes are:
 * - `light`: Light theme
 * - `dark`: Dark theme
 */
export type Theme = "light" | "dark"

/**
 * Represents a type for theme mode selection.
 *
 * This type can only accept specific string values corresponding to
 * theme mode options. Currently, the supported theme modes are:
 * - `system`: Follow system preference
 * - `light`: Always use light theme
 * - `dark`: Always use dark theme
 */
export type ThemeMode = "system" | "light" | "dark"
