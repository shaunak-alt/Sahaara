"use client";

import { useCallback } from "react";

import {
  QUICK_EXIT_PRESERVED_DATABASES,
  QUICK_EXIT_SAFE_URL,
  QUICK_EXIT_STORAGE_KEYS
} from "./quickExitConfig";

const PRESERVED_DATABASES = new Set(QUICK_EXIT_PRESERVED_DATABASES);
const QUICK_EXIT_LOCK_KEY = "sahaara_quick_exit_lock";

export default function useQuickExit() {
  const clearClientData = useCallback(() => {
    try {
      QUICK_EXIT_STORAGE_KEYS.forEach(key => sessionStorage.removeItem(key));
      if (typeof indexedDB !== "undefined") {
        indexedDB.databases?.().then(dbs => {
          dbs?.forEach(db => {
            if (!db.name) {
              return;
            }
            if (PRESERVED_DATABASES.has(db.name)) {
              return;
            }
            if (db.name.startsWith("sahaara")) {
              indexedDB.deleteDatabase(db.name);
            }
          });
        });
      }
    } catch (error) {
      console.error("Quick exit cleanup failed", error);
    }
  }, []);

  const triggerQuickExit = useCallback(() => {
    clearClientData();
    try {
      window.sessionStorage.setItem(QUICK_EXIT_LOCK_KEY, "true");
    } catch (error) {
      console.error("Quick exit session lock failed", error);
    }
    try {
      window.history.replaceState({ quickExit: true }, "", "/quick-exit");
    } catch (error) {
      console.error("Quick exit history replacement failed", error);
    }
    try {
      // Drop an extra sentinel entry so back navigation lands on the guard before any prior pages.
      window.history.pushState({ quickExit: true }, "", "/quick-exit");
    } catch (error) {
      console.error("Quick exit backstop insertion failed", error);
    }
    window.location.replace(QUICK_EXIT_SAFE_URL);
    // Some browsers ignore replace when called during unload; issue a follow-up assign.
    window.setTimeout(() => {
      try {
        window.location.assign(QUICK_EXIT_SAFE_URL);
      } catch {
        /* noop */
      }
    }, 50);
  }, [clearClientData]);

  const registerShortcut = useCallback(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && event.detail === 0) {
        // double-tap escape detection using timestamp diff
        const now = Date.now();
        const last = Number(sessionStorage.getItem("sahaara_escape_ts"));
        sessionStorage.setItem("sahaara_escape_ts", String(now));
        if (now - last < 500) {
          triggerQuickExit();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [triggerQuickExit]);

  return { triggerQuickExit, registerShortcut };
}
