"use client";

import { getLegalContent } from "@sahaara/config";
import LegalRightsBot from "../../../components/legal/LegalRightsBot";
import { useLanguage } from "../../../components/i18n/LanguageProvider";
import "../../../styles/legal.css";

const AlertIcon = () => (
  <svg aria-hidden focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.2" fill="currentColor" />
  </svg>
);

const FileIcon = () => (
  <svg aria-hidden focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-4-4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg aria-hidden focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.1 2.2 2.9 4 5.1 5.1l1.7-1.7a1 1 0 0 1 1-.24c1.1.37 2.3.56 3.6.56a1 1 0 0 1 1 1v2.9a1 1 0 0 1-1 1c-8.3 0-15-6.7-15-15a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1c0 1.3.19 2.5.56 3.6a1 1 0 0 1-.24 1l-1.7 1.7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LegalSupportPage() {
  const { locale } = useLanguage();
  const content = getLegalContent(locale);

  return (
    <div className="legal-page">
      <section className="legal-notice">
        <span className="legal-notice__icon">
          <AlertIcon />
        </span>
        <div>
          <h2>{content.disclaimerHeading}</h2>
          <p>{content.disclaimer}</p>
        </div>
      </section>

      <header className="legal-heading">
        <h1>{content.heroTitle}</h1>
        <p>{content.heroSubtitle}</p>
      </header>

      <div className="legal-grid" role="list">
        {content.primaryCards.map(card => (
          <article key={card.title} className="legal-card" role="listitem">
            <div className="legal-card__header">
              <span className="legal-card__icon legal-card__icon--file">
                <FileIcon />
              </span>
              <h3>{card.title}</h3>
            </div>
            <p className="legal-card__summary">{card.summary}</p>
            <ul className="legal-card__list">
              {card.bullets.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}

        <article className="legal-card legal-card--helplines" role="listitem">
          <div className="legal-card__header">
            <span className="legal-card__icon legal-card__icon--phone">
              <PhoneIcon />
            </span>
            <h3>{content.helplineTitle}</h3>
          </div>
          <p className="legal-card__summary">{content.helplineSummary}</p>
          <div className="legal-helpline-list">
            {content.helplines.map(entry => (
              <div key={entry.number} className="legal-helpline-item">
                <span>{entry.label}</span>
                <a href={`tel:${entry.number}`}>{entry.number}</a>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="legal-faq" aria-label="Frequently asked questions">
        <h2 className="legal-faq__title">{content.faqTitle}</h2>
        {content.faqs.map(item => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <LegalRightsBot />
    </div>
  );
}
