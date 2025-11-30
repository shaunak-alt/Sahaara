import type { Metadata } from "next";
import "../styles/globals.css";
import GlobalHeader from "../components/navigation/GlobalHeader";
import { LanguageProvider } from "../components/i18n/LanguageProvider";
import QuickExitGuard from "../components/safety/QuickExitGuard";

export const metadata: Metadata = {
  title: "Sahaara",
  description: "Discreet, trauma-informed support for survivors"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <QuickExitGuard />
          <a className="sr-only" href="#main">Skip to content</a>
          <GlobalHeader />
          <main id="main" style={mainStyle}>
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 70px)",
  padding: "48px 24px 72px"
};
