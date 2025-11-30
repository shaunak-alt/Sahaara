"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, MapPin, Phone, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useTranslations } from "../i18n/useTranslations";

export type SOSModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SOSModal({ open, onClose }: SOSModalProps) {
  const t = useTranslations();
  const LOCATION_PLACEHOLDER = "[Location Link]";

  const resolveLocationLink = (): Promise<string | null> => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          resolve(mapsUrl);
        },
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const handleEmergencyCall = () => {
    if (typeof window === "undefined") return;
    window.location.href = "tel:112";
    onClose();
  };

  const handleWhatsAppShare = async () => {
    if (typeof window === "undefined") return;

    const template = t("home.sos.whatsappTemplate");
    const fallback = t("home.sos.locationUnavailable");
    let locationLink: string | null = null;

    try {
      locationLink = await resolveLocationLink();
    } catch {
      locationLink = null;
    }

    const finalMessage = template.includes(LOCATION_PLACEHOLDER)
      ? template.replace(LOCATION_PLACEHOLDER, locationLink ?? fallback)
      : template;

    const encoded = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener");
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={overlayStyle}
          role="dialog"
          aria-modal="true"
          aria-label={t("home.sos.title")}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            style={modalStyle}
          >
            <header style={headerStyle}>
              <div style={headerTitleStyle}>
                <AlertTriangle aria-hidden="true" size={24} color="#d14b69" />
                <h2 style={{ margin: 0 }}>{t("home.sos.title")}</h2>
              </div>
              <button type="button" aria-label={t("home.sos.close")}
                onClick={onClose}
                style={closeButtonStyle}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </header>
            <div style={bodyStyle}>
              <p style={primaryTextStyle}>{t("home.sos.warning")}</p>
              <p style={noticeTextStyle}>
                <strong>{t("home.sos.noticeLabel")}</strong> {t("home.sos.noticeBody")}
              </p>
              <div style={actionsListStyle}>
                <button type="button" onClick={handleEmergencyCall} style={primaryButtonStyle}>
                  <Phone aria-hidden="true" size={20} />
                  <span>{t("home.sos.callCta")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void handleWhatsAppShare();
                  }}
                  style={whatsAppButtonStyle}
                >
                  <MapPin aria-hidden="true" size={20} />
                  <span>{t("home.sos.whatsAppCta")}</span>
                </button>
                <button type="button" onClick={onClose} style={secondaryButtonStyle}>
                  {t("home.sos.cancel")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(28, 21, 33, 0.78)",
  backdropFilter: "blur(6px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 60
};

const modalStyle: CSSProperties = {
  width: "min(460px, 100%)",
  background: "white",
  borderRadius: 24,
  boxShadow: "0 40px 70px rgba(33, 20, 54, 0.25)",
  borderTop: "4px solid #d14b69",
  display: "grid"
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "24px 28px 16px 28px",
  gap: 16
};

const headerTitleStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#d14b69"
};

const closeButtonStyle: CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--color-warm-grey)",
  cursor: "pointer",
  padding: 4,
  borderRadius: 12
};

const bodyStyle: CSSProperties = {
  padding: "0 28px 28px 28px",
  display: "grid",
  gap: 16
};

const primaryTextStyle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  color: "var(--color-charcoal)",
  lineHeight: 1.6
};

const noticeTextStyle: CSSProperties = {
  margin: 0,
  padding: 16,
  borderRadius: 16,
  background: "rgba(241, 229, 249, 0.7)",
  borderLeft: "4px solid rgba(81, 53, 106, 0.35)",
  color: "var(--color-warm-grey)",
  fontSize: 14
};

const actionsListStyle: CSSProperties = {
  display: "grid",
  gap: 12
};

const primaryButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "14px 18px",
  borderRadius: 18,
  border: "none",
  background: "#d14b69",
  color: "white",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(209, 75, 105, 0.35)"
};

const whatsAppButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "14px 18px",
  borderRadius: 18,
  border: "none",
  background: "#25D366",
  color: "white",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 18px 34px rgba(37, 211, 102, 0.28)"
};

const secondaryButtonStyle: CSSProperties = {
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  background: "rgba(108, 142, 164, 0.16)",
  color: "var(--color-soft-blue)",
  fontWeight: 600,
  cursor: "pointer"
};
