"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SOSModal from "../components/support/SOSModal";
import { useTranslations } from "../components/i18n/useTranslations";
import type { DirectoryEntry } from "../lib/help/directoryData";
import { lawyerEntries, ngoEntries, volunteerEntries } from "../lib/help/directoryData";
import "../styles/home.css";
import { useLanguage } from "../components/i18n/LanguageProvider";

type CardConfig = {
  href: string;
  titleKey: string;
  copyKey: string;
  ctaKey: string;
};

const cardConfigs: CardConfig[] = [
  {
    href: "/support/chat",
    titleKey: "home.cards.chat.title",
    copyKey: "home.cards.chat.copy",
    ctaKey: "home.cards.chat.cta"
  },
  {
    href: "/learn/legal-support",
    titleKey: "home.cards.legal.title",
    copyKey: "home.cards.legal.copy",
    ctaKey: "home.cards.legal.cta"
  },
  {
    href: "/support/evidence-locker",
    titleKey: "home.cards.locker.title",
    copyKey: "home.cards.locker.copy",
    ctaKey: "home.cards.locker.cta"
  }
];

export default function HomePage() {
  const t = useTranslations();
  const [sosOpen, setSosOpen] = useState(false);
  const { locale } = useLanguage();

  const cards = useMemo(
    () =>
      cardConfigs.map(card => ({
        ...card,
        title: t(card.titleKey),
        copy: t(card.copyKey),
        cta: t(card.ctaKey)
      })),
    [t]
  );

  const directorySections = useMemo(() => {
    const resolveNotes = (entry: DirectoryEntry) =>
      entry.notes ? entry.notes[locale] ?? entry.notes.en : undefined;

    return [
      {
        id: "ngos",
        title: t("help.sections.ngos"),
        entries: ngoEntries.slice(0, 2).map(entry => ({
          name: entry.name,
          pointOfContact: entry.pointOfContact,
          phone: entry.phone,
          email: entry.email,
          address: entry.address,
          note: resolveNotes(entry)
        }))
      },
      {
        id: "volunteers",
        title: t("help.sections.volunteers"),
        entries: volunteerEntries.slice(0, 2).map(entry => ({
          name: entry.name,
          pointOfContact: entry.pointOfContact,
          phone: entry.phone,
          email: entry.email,
          address: entry.address,
          note: resolveNotes(entry)
        }))
      },
      {
        id: "lawyers",
        title: t("help.sections.lawyers"),
        entries: lawyerEntries.slice(0, 2).map(entry => ({
          name: entry.name,
          pointOfContact: entry.pointOfContact,
          phone: entry.phone,
          email: entry.email,
          address: entry.address,
          note: resolveNotes(entry)
        }))
      }
    ];
  }, [locale, t]);

  return (
    <>
      <section className="home-page">
      <div className="home-hero">
        <div className="home-hero__visual">
          <div className="home-hero__sticker" aria-hidden="true" />
          <span className="home-hero__eyebrow">{t("home.eyebrow")}</span>
        </div>
        <div className="home-hero__copy">
          <h1 className="home-hero__headline">{t("home.headline")}</h1>
          <p className="home-hero__tagline">{t("home.tagline")}</p>
          <div className="home-hero__actions">
            <Link className="button button--primary" href="/support/chat">
              {t("home.heroPrimaryCta")}
            </Link>
            <Link className="button button--ghost" href="/learn/legal-support">
              {t("home.heroSecondaryCta")}
            </Link>
          </div>
        </div>
      </div>

      <div className="home-grid">
        {cards.map(card => (
          <article className="home-card" key={card.titleKey}>
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
            <Link className="home-card__link" href={{ pathname: card.href }}>
              {card.cta}
            </Link>
          </article>
        ))}
      </div>

        <section className="home-support" aria-label={t("home.support.title")}>
          <div className="home-support__header">
            <h2 className="home-support__title">{t("home.support.title")}</h2>
            <button
              type="button"
              className="home-support__sosButton"
              onClick={() => setSosOpen(true)}
              aria-label={t("home.support.sosAria")}
            >
              {t("home.support.sosCta")}
            </button>
          </div>
          <p className="home-support__intro">{t("home.support.intro")}</p>
          <div className="home-support__directory">
            {directorySections.map(section => (
              <article key={section.id} className="home-support__section">
                <h3>{section.title}</h3>
                <ul>
                  {section.entries.map(entry => (
                    <li key={`${section.id}-${entry.name}`} className="home-support__entry">
                      <strong>{entry.name}</strong>
                      <span>{entry.pointOfContact}</span>
                      <span>{entry.phone}</span>
                      <span>{entry.address}</span>
                      {entry.note ? <span>{entry.note}</span> : null}
                    </li>
                  ))}
                </ul>
                <Link className="home-support__link" href="/help">
                  {t("home.support.viewAll")}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
      <SOSModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}
