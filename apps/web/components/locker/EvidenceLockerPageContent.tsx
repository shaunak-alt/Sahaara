"use client";

import EvidenceLocker from "./EvidenceLocker";
import { useTranslations } from "../i18n/useTranslations";
import React from "react";

const pageStyle: React.CSSProperties = {
  display: "grid",
  gap: 32,
  width: "min(960px, 100%)",
  margin: "0 auto"
};

const headerStyle: React.CSSProperties = {
  display: "grid",
  gap: 12
};

const eyebrowStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  letterSpacing: 0.6,
  textTransform: "uppercase",
  color: "var(--color-warm-grey)",
  fontWeight: 600
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "2.2rem",
  color: "var(--color-deep-lavender)"
};

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  lineHeight: 1.6,
  color: "var(--color-charcoal)"
};

const bulletListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  display: "grid",
  gap: 6,
  color: "var(--color-warm-grey)",
  lineHeight: 1.5
};

export default function EvidenceLockerPageContent() {
  const t = useTranslations();
  const bulletPoints = [
    t("lockerPage.bullets.first"),
    t("lockerPage.bullets.second"),
    t("lockerPage.bullets.third")
  ];

  return (
    <section style={pageStyle}>
      <header style={headerStyle}>
        <div style={eyebrowStyle}>{t("lockerPage.eyebrow")}</div>
        <h1 style={titleStyle}>{t("lockerPage.title")}</h1>
        <p style={descriptionStyle}>{t("lockerPage.description")}</p>
        <ul style={bulletListStyle}>
          {bulletPoints.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </header>
      <EvidenceLocker />
    </section>
  );
}
