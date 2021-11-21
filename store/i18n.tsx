import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getLocale } from "../locales";

import type { ITranslation } from "../types";

type ContextType = {
  t: ITranslation;
};

const I18nContext = createContext<ContextType>({
  t: {},
});

export default I18nContext;

export function useTranslation() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: JSX.Element }) {
  const [curLocale, setCurLocale] = useState<string>("en");
  const [t, changeLanguage] = useState<ITranslation>(getLocale("en"));

  const router = useRouter();
  const { locale } = router;
  const translation = getLocale(locale);

  useEffect(() => {
    if (locale !== curLocale) {
      changeLanguage(translation);
      locale && setCurLocale(locale);
    }
  }, [locale, curLocale]);

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}
