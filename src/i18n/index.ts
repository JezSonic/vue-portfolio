import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import pl from '../locales/pl.json'
import type { Lang } from "@/types/utils.d.ts";

export const allowedLanguages = ['en', 'pl'];

/**
 * Retrieves the browser's language setting and verifies it against a predefined list of allowed languages.
 * If the browser's primary language is not within the allowed list, defaults to 'en'.
 *
 * @function
 * @returns {string} The browser's language if it is included in the list of allowed languages; otherwise, returns 'en'.
 */
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  return allowedLanguages.includes(browserLang) ? browserLang : 'en';
};

/**
 * Retrieves the stored language preference from local storage.
 *
 * This function checks the local storage for a stored language value under the key 'language'.
 * If the stored value exists and is part of the allowed languages, it returns that value.
 * Otherwise, it falls back to the browser's default language.
 *
 * @returns {string} The stored language if valid, or the browser's default language.
 */
const getStoredLanguage = (): string => {
  const storedLang = localStorage.getItem('language');
  return storedLang && allowedLanguages.includes(storedLang)
    ? storedLang 
    : getBrowserLanguage();
};

const i18n = createI18n({
  legacy: false, // Use Composition API
  globalInjection: true, // Make $t, $d, etc. available in templates
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  }
});

export default i18n;

/**
 * Updates the application's language setting.
 *
 * This function sets a new language preference by performing the following actions:
 * 1. Stores the selected language in the local storage under the key 'language'.
 * 2. Updates the `i18n` global locale value to reflect the new language.
 * 3. Adjusts the `lang` attribute of the HTML document's root element to match the selected language.
 *
 * @function
 * @param {Lang} lang - The language code to set as the current language (e.g., 'en', pl').
 */
export const setLanguage = (lang: Lang) => {
  localStorage.setItem('language', lang);
  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang);
};