"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import QuickExitButton from "../quick-exit/QuickExitButton";
import { useTranslations } from "../i18n/useTranslations";
import LanguageSwitcher from "./LanguageSwitcher";

export function GlobalHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [canGoBack, setCanGoBack] = useState(false);

  const showBackButton = pathname !== "/";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!showBackButton) {
      setCanGoBack(false);
      return;
    }

    const updateAbility = () => {
      setCanGoBack(window.history.length > 1);
    };

    updateAbility();
    window.addEventListener("popstate", updateAbility);
    return () => window.removeEventListener("popstate", updateAbility);
  }, [showBackButton]);

  const handleBack = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const navItems = useMemo(
    (): Array<{ href: Route; label: string }> => [
      { href: "/support/chat", label: t("global.nav.chat") },
      { href: "/learn/legal-support", label: t("global.nav.legal") },
      { href: "/support/evidence-locker", label: t("global.nav.locker") },
      { href: "/help", label: t("global.nav.help") }
    ],
    [t]
  );

  return (
    <header style={headerStyle}>
      <div style={headerContent}>
        <div style={leadingGroup}>
          {showBackButton ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={!canGoBack}
              aria-label={t("global.nav.back")}
              style={{
                ...backButton,
                cursor: canGoBack ? "pointer" : "not-allowed",
                opacity: canGoBack ? 1 : 0.4
              }}
            >
              <span aria-hidden="true">←</span>
            </button>
          ) : null}
          <Link href="/" style={brandLink}>
            <DomesticSafetyLogo />
            <div style={{ display: "grid", gap: 2 }}>
              <span style={brandName}>Sahaara</span>
              <span style={brandTagline}>{t("global.brandTagline")}</span>
            </div>
          </Link>
        </div>
        <nav aria-label="Primary" style={navStyle}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={actionsGroup}>
          <LanguageSwitcher />
          <QuickExitButton />
        </div>
      </div>
    </header>
  );
}

function DomesticSafetyLogo() {
  return (
    <div style={logoWrapper} aria-hidden="true">
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6c4ba5" />
            <stop offset="100%" stopColor="#d77ba5" />
          </linearGradient>
        </defs>
        <path
          d="M18 4c-4.4 0-8 3.6-8 8 0 2.5 1.1 4.7 2.9 6.2l5.1 4.1 5.1-4.1C24.9 16.7 26 14.5 26 12c0-4.4-3.6-8-8-8z"
          fill="#f8edf4"
        />
        <path
          d="M12.2 19.6l5.8 9.9 5.8-9.9-1.6-1.3-4.2 3.4-4.2-3.4z"
          fill="url(#ribbonGradient)"
        />
        <path
          d="M18 9.8c-1.2-2.1-3.7-2.4-5.2-1.1-1.6 1.4-1.7 4-0.2 5.7l5.4 5.7 5.4-5.7c1.5-1.7 1.4-4.3-0.2-5.7-1.5-1.3-3.9-1-5.2 1.1z"
          fill="#9158c9"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "center",
  padding: "14px 24px",
  background: "rgba(247, 233, 222, 0.94)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(58,46,122,0.08)",
  zIndex: 10
};

const headerContent: CSSProperties = {
  width: "min(1100px, 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24
};

const leadingGroup: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16
};

const backButton: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "999px",
  border: "1px solid rgba(58,46,122,0.2)",
  background: "rgba(255,255,255,0.85)",
  fontSize: 18,
  lineHeight: 1,
  color: "var(--color-deep-lavender)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 160ms ease"
};

const brandLink: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  textDecoration: "none"
};

const logoWrapper: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: "14px",
  background: "linear-gradient(135deg, rgba(108,75,165,0.28), rgba(215,123,165,0.28))",
  display: "grid",
  placeItems: "center"
};

const brandName: CSSProperties = {
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 0.6,
  color: "var(--color-deep-lavender)",
  display: "block"
};

const brandTagline: CSSProperties = {
  display: "block",
  fontSize: 12,
  letterSpacing: 0.4,
  color: "var(--color-sunset-orange)",
  marginTop: 2
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 18
};

const navLink: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--color-deep-lavender)",
  textDecoration: "none"
};

const actionsGroup: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12
};

export default GlobalHeader;
