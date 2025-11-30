"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { useTranslations } from "../i18n/useTranslations";
import type { SupportedLanguage } from "../../lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();

  return (
    <label style={wrapperStyle}>
      <span style={srOnly}>{t("global.language.label")}</span>
      <select
        value={locale}
        onChange={event => setLocale(event.target.value as SupportedLanguage)}
        style={selectStyle}
        aria-label={t("global.language.label")}
      >
        <option value="en">{t("global.language.en")}</option>
        <option value="hi">{t("global.language.hi")}</option>
        <option value="mr">{t("global.language.mr")}</option>
      </select>
    </label>
  );
}

const wrapperStyle: CSSProperties = {
  position: "relative"
};

const selectStyle: CSSProperties = {
  appearance: "none",
  padding: "8px 28px 8px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(58,46,122,0.2)",
  background: "rgba(255,255,255,0.92)",
  fontWeight: 600,
  color: "var(--color-deep-lavender)",
  cursor: "pointer"
};

const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0
};
