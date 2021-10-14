import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import en from "../locales/en.json";
import fi from "../locales/fi.json";

const I18nContext = createContext({
  t: {},
});

export default I18nContext;

export function useTranslation() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }) {
  const [curLocale, setCurLocale] = useState("en");
  const [t, changeLanguage] = useState(en);

  const router = useRouter();
  const { locale } = router;
  const translation = locale === "en" ? en : fi;

  useEffect(() => {
    if (locale !== curLocale) {
      changeLanguage(translation);
      setCurLocale(locale);
    }
  }, [locale, curLocale]);

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}
