"use client";

import { useMemo } from "react";
import { useTranslations } from "../../components/i18n/useTranslations";
import { useLanguage } from "../../components/i18n/LanguageProvider";
import { lawyerEntries, ngoEntries, volunteerEntries } from "../../lib/help/directoryData";
import "../../styles/help.css";

export default function HelpDirectoryPage() {
  const t = useTranslations();
  const { locale } = useLanguage();

  const directory = useMemo(
    () => [
      { id: "ngos", title: t("help.sections.ngos"), entries: ngoEntries },
      { id: "volunteers", title: t("help.sections.volunteers"), entries: volunteerEntries },
      { id: "lawyers", title: t("help.sections.lawyers"), entries: lawyerEntries }
    ],
    [t]
  );

  return (
    <section className="help-page">
      <header className="help-intro">
        <h1>{t("help.title")}</h1>
        <p>{t("help.intro")}</p>
      </header>

      {directory.map(section => (
        <section key={section.id} className="help-section" aria-labelledby={`help-${section.id}`}>
          <h2 id={`help-${section.id}`}>{section.title}</h2>
          <ul className="help-list">
            {section.entries.map(entry => (
              <li key={`${section.id}-${entry.name}`} className="help-entry">
                <strong>{entry.name}</strong>
                <span>{entry.pointOfContact}</span>
                <span>{entry.address}</span>
                <span>{entry.phone}</span>
                {entry.email ? (
                  <span>
                    <a href={`mailto:${entry.email}`}>{entry.email}</a>
                  </span>
                ) : null}
                {entry.notes ? <span>{entry.notes[locale] ?? entry.notes.en}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
