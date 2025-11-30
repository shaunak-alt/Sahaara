"use client";

import { useEffect, useLayoutEffect } from "react";
import { QUICK_EXIT_SAFE_URL } from "../../lib/safety/quickExitConfig";

const LOCK_KEY = "sahaara_quick_exit_lock";
const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function QuickExitGuard() {
  useClientLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const enforceLock = () => {
      try {
        const locked = window.sessionStorage.getItem(LOCK_KEY) === "true";
        if (!locked) {
          return;
        }
        try {
          window.history.replaceState(null, "", "/quick-exit");
        } catch {
          /* noop */
        }
        window.location.replace(QUICK_EXIT_SAFE_URL);
      } catch (error) {
        console.error("Quick exit lock enforcement failed", error);
      }
    };

    enforceLock();
    window.addEventListener("pageshow", enforceLock);
    window.addEventListener("popstate", enforceLock);
    document.addEventListener("visibilitychange", enforceLock);

    return () => {
      window.removeEventListener("pageshow", enforceLock);
      window.removeEventListener("popstate", enforceLock);
      document.removeEventListener("visibilitychange", enforceLock);
    };
  }, []);

  return null;
}
