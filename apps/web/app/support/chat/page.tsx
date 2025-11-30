"use client";

import SupportChat from "../../../components/support/ChatPreview";
import { useTranslations } from "../../../components/i18n/useTranslations";

export default function SupportChatPage() {
  const t = useTranslations();

  return (
    <section style={{ display: "grid", gap: 24 }}>
      <header>
        <p style={{ color: "var(--color-warm-grey)", marginBottom: 8 }}>{t("supportChatPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("supportChatPage.title")}</h1>
        <p style={{ maxWidth: 600 }}>{t("supportChatPage.description")}</p>
      </header>
      <SupportChat />
    </section>
  );
}
