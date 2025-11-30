"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "../i18n/useTranslations";

export default function SupportTips() {
  const t = useTranslations();

  const cards = useMemo(
    () => [
      {
        title: t("supportTips.cards.breath.title"),
        detail: t("supportTips.cards.breath.detail")
      },
      {
        title: t("supportTips.cards.senses.title"),
        detail: t("supportTips.cards.senses.detail")
      },
      {
        title: t("supportTips.cards.contact.title"),
        detail: t("supportTips.cards.contact.detail")
      }
    ],
    [t]
  );

  return (
    <aside className="support-tips" aria-label={t("supportTips.title")}>
      <header>
        <h3>{t("supportTips.title")}</h3>
        <p style={{ margin: 0, color: "var(--color-warm-grey)" }}>{t("supportTips.subtitle")}</p>
      </header>
      <div className="tip-grid">
        {cards.map(card => (
          <div key={card.title} className="tip-card" role="note" tabIndex={0}>
            <strong>{card.title}</strong>
            <span>{card.detail}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-warm-grey)" }}>
        {t("supportTips.footerPrefix")} <Link href="/learn/legal-support">{t("supportTips.footerLink")}</Link> {t("supportTips.footerSuffix")}
      </p>
    </aside>
  );
}
