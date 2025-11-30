import type { Metadata } from "next";
import EvidenceLockerPageContent from "../../../components/locker/EvidenceLockerPageContent";

export const metadata: Metadata = {
  title: "Encrypted Evidence Locker — Sahaara",
  description:
    "Create and protect encrypted notes about incidents directly on your device. Only you control the password."
};

export default function EvidenceLockerPage() {
  return <EvidenceLockerPageContent />;
}
