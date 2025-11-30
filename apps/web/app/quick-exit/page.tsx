"use client";

import { useEffect } from "react";
import { QUICK_EXIT_SAFE_URL } from "../../lib/safety/quickExitConfig";

const LOCK_KEY = "sahaara_quick_exit_lock";

export default function QuickExitPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(LOCK_KEY, "true");
    }
    const timer = window.setTimeout(() => {
      window.location.replace(QUICK_EXIT_SAFE_URL);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-xl)",
        background: "var(--color-soft-blue)",
        color: "white",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: 480, display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Redirecting you to a safe page…</h1>
        <p style={{ margin: 0 }}>
          If you are not automatically redirected, <a href={QUICK_EXIT_SAFE_URL} style={{ color: "white", textDecoration: "underline" }}>open the safe site</a> manually.
        </p>
      </div>
    </main>
  );
}
