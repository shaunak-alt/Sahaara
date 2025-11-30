"use client";

import { useCallback } from "react";
import { translate } from "../../lib/i18n/translations";
import { useLanguage } from "./LanguageProvider";

export function useTranslations() {
  const { locale } = useLanguage();

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  return t;
}
