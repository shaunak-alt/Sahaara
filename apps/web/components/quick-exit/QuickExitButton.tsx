"use client";

import { useEffect } from "react";
import useQuickExit from "../../lib/safety/useQuickExit";
import { useTranslations } from "../i18n/useTranslations";

export default function QuickExitButton() {
  const { triggerQuickExit, registerShortcut } = useQuickExit();
  const t = useTranslations();

  useEffect(() => {
    return registerShortcut();
  }, [registerShortcut]);

  return (
    <button
      type="button"
      className="button"
      style={{
        background: "var(--color-muted-red)",
        color: "white",
        boxShadow: "0 12px 30px rgba(229, 139, 139, 0.3)"
      }}
      aria-label={t("global.quickExit.ariaLabel")}
      onClick={triggerQuickExit}
    >
      {t("global.quickExit.buttonLabel")}
    </button>
  );
}
