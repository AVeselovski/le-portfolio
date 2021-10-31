import en from "./en.json";
import fi from "./fi.json";

const locales = { en, fi };

export function getLocale(locale) {
  return locales[locale];
}
