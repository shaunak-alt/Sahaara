import type { PropsWithChildren } from "react";

export function SoftCard({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        background: "var(--color-off-white)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-lg)",
        boxShadow: "var(--shadow-soft)"
      }}
    >
      {children}
    </div>
  );
}
