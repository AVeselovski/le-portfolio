import en from "./en.json";
import fi from "./fi.json";

import type { ITranslation } from "../types";

const locales: { [key: string]: ITranslation } = { en, fi };

export function getLocale(locale: string | undefined): ITranslation {
  return locales[locale || "en"];
}
