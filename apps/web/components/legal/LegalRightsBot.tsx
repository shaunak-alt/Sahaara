"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { useTranslations } from "../i18n/useTranslations";
import type { SupportedLanguage } from "../../lib/i18n/translations";

const LEGAL_CHAT_STORAGE_KEY = "sahaara_legal_chat_history";
const MAX_STORED_MESSAGES = 150;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const LINK_COLOR = "var(--color-deep-lavender)";

type SpeechRecognitionAlternativeLike = {
  transcript?: string;
};

type SpeechRecognitionResultLike = {
  length: number;
  isFinal?: boolean;
  [index: number]: SpeechRecognitionAlternativeLike | undefined;
};

type SpeechRecognitionEventShape = {
  results?: {
    length: number;
    [index: number]: SpeechRecognitionResultLike | undefined;
  };
};

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult?: (event: SpeechRecognitionEventShape) => void;
  onend?: () => void;
  onerror?: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type WindowWithSpeech = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type LegalChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  handoff?: "emotional";
  originLocale: SupportedLanguage;
  translations: Partial<Record<SupportedLanguage, string>>;
};

type StoredLegalChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  handoff?: "emotional";
  originLocale?: SupportedLanguage;
  translations?: Partial<Record<SupportedLanguage, string>>;
};

type TranslationEntry = {
  id: string;
  text: string;
  from?: SupportedLanguage;
  role?: "user" | "guide";
};

type TranslationResponse = {
  translations: Array<{ id: string; text: string }>;
};

type SpeechAvailability = {
  recognition: boolean;
  synthesis: boolean;
};

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "hi", "mr"];

const resolveSpeechLocale = (locale: string): string => {
  if (locale === "hi") return "hi-IN";
  if (locale === "mr") return "mr-IN";
  return "en-IN";
};

const isSupportedLocale = (value: unknown): value is SupportedLanguage =>
  typeof value === "string" && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

const isStoredLegalChatMessage = (entry: unknown): entry is StoredLegalChatMessage => {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as Partial<StoredLegalChatMessage>;
  return (
    typeof candidate.id === "string" &&
    (candidate.role === "bot" || candidate.role === "user") &&
    typeof candidate.text === "string"
  );
};

const normalizeMessage = (entry: StoredLegalChatMessage, fallbackLocale: SupportedLanguage): LegalChatMessage => {
  const origin = isSupportedLocale(entry.originLocale) ? entry.originLocale : fallbackLocale;
  const baseTranslations = entry.translations && typeof entry.translations === "object" ? entry.translations : undefined;

  return {
    id: entry.id,
    role: entry.role,
    text: entry.text,
    handoff: entry.handoff,
    originLocale: origin,
    translations: {
      ...(baseTranslations ?? {}),
      [origin]: (baseTranslations && baseTranslations[origin]) || entry.text
    }
  };
};

const getLocalizedText = (message: LegalChatMessage, targetLocale: SupportedLanguage): string => {
  if (message.handoff === "emotional") {
    return "";
  }

  const localized = message.translations?.[targetLocale];
  if (localized && localized.trim()) {
    return localized;
  }

  const originText = message.translations?.[message.originLocale];
  if (originText && originText.trim()) {
    return originText;
  }

  return message.text;
};

export default function LegalRightsBot() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const speechLocale = useMemo(() => resolveSpeechLocale(locale), [locale]);

  const introText = useMemo(() => t("legalBot.intro"), [t]);
  const introMessage = useMemo<LegalChatMessage>(
    () => ({
      id: "bot-0",
      role: "bot",
      text: introText,
      originLocale: locale,
      translations: { [locale]: introText }
    }),
    [introText, locale]
  );
  const disclaimer = useMemo(() => t("legalBot.disclaimer"), [t]);
  const fallbackResponse = useMemo(() => t("legalBot.fallback"), [t]);
  const handoffCopy = useMemo(
    () => ({
      prefix: t("legalBot.handoff.emotional.prefix"),
      link: t("legalBot.handoff.emotional.link"),
      suffix: t("legalBot.handoff.emotional.suffix")
    }),
    [t]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<LegalChatMessage[]>([introMessage]);
  const [speechAvailability, setSpeechAvailability] = useState<SpeechAvailability>({ recognition: false, synthesis: false });
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setMessages(prev => {
      if (!prev.length) {
        return [introMessage];
      }
      const [first, ...rest] = prev;
      if (first.role === "bot" && first.id === "bot-0") {
        return [introMessage, ...rest];
      }
      return prev;
    });
  }, [introMessage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(LEGAL_CHAT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          const valid = parsed
            .filter(isStoredLegalChatMessage)
            .map(entry => normalizeMessage(entry, "en"))
            .slice(-MAX_STORED_MESSAGES);
          if (valid.length > 0) {
            setMessages(valid);
          }
        }
      }
    } catch (restoreError) {
      console.error("Failed to restore legal chat history", restoreError);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as WindowWithSpeech;

    const RecognitionCtor = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    setSpeechAvailability({
      recognition: Boolean(RecognitionCtor),
      synthesis: typeof window.speechSynthesis !== "undefined"
    });

    if (!RecognitionCtor) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new RecognitionCtor();
    recognition.lang = speechLocale;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEventShape) => {
      const lastResult = event.results?.[event.results.length - 1];
      const transcript = lastResult?.[0]?.transcript?.trim();
      if (transcript) {
        setInput(prev => {
          const combined = `${prev} ${transcript}`.trim();
          return combined;
        });
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        /* noop */
      }
      recognitionRef.current = null;
    };
  }, [speechLocale]);

  useEffect(() => {
    if (!isSupportedLocale(locale)) {
      return;
    }

    const entries = messages
      .filter(message => !message.handoff && !message.translations?.[locale])
      .map<TranslationEntry | null>(message => {
        const baseText = message.translations?.[message.originLocale] ?? message.text;
        if (!baseText?.trim()) {
          return null;
        }

        return {
          id: message.id,
          text: baseText,
          from: message.originLocale,
          role: message.role === "user" ? "user" : "guide"
        };
      })
      .filter((entry): entry is TranslationEntry => Boolean(entry));

    if (entries.length === 0) {
      return;
    }

    const controller = new AbortController();

    const translateHistory = async () => {
      try {
        const response = await fetch(`${API_BASE}/chat/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLocale: locale, entries }),
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to translate legal chat: ${response.status}`);
        }

        const payload: TranslationResponse = await response.json();
        const map = new Map(payload.translations.map(item => [item.id, item.text ?? ""]));

        if (map.size === 0) {
          return;
        }

        setMessages(prev =>
          prev.map(message => {
            if (!map.has(message.id)) {
              return message;
            }

            const translatedText = map.get(message.id) ?? "";
            const baseText = message.translations?.[message.originLocale] ?? message.text;
            const sanitized = translatedText.trim() ? translatedText : baseText;

            return {
              ...message,
              translations: {
                ...message.translations,
                [locale]: sanitized
              }
            };
          })
        );
      } catch (translateError) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Failed to translate legal chat history", translateError);
      }
    };

    void translateHistory();

    return () => {
      controller.abort();
    };
  }, [locale, messages]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const shouldClear = messages.length === 1 && messages[0]?.id === introMessage.id;
      if (shouldClear) {
        window.localStorage.removeItem(LEGAL_CHAT_STORAGE_KEY);
        return;
      }

      const trimmed = messages.slice(-MAX_STORED_MESSAGES);
      window.localStorage.setItem(LEGAL_CHAT_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (persistError) {
      console.error("Failed to persist legal chat history", persistError);
    }
  }, [messages, introMessage]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStartListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      return;
    }
    try {
      recognition.lang = speechLocale;
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error("Legal bot speech recognition error", error);
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      recognition.stop();
    } catch (error) {
      console.error("Legal bot recognition stop error", error);
    } finally {
      setIsListening(false);
    }
  };

  const getSpeechText = (message: LegalChatMessage): string => {
    if (message.handoff === "emotional") {
      return `${handoffCopy.prefix} ${handoffCopy.link} ${handoffCopy.suffix}`;
    }
    return getLocalizedText(message, locale);
  };

  const toggleSpeaking = (message: LegalChatMessage) => {
    if (typeof window === "undefined" || !speechAvailability.synthesis) {
      return;
    }

    if (speakingId === message.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      utteranceRef.current = null;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(getSpeechText(message));
    utterance.lang = speechLocale;
    utterance.rate = locale === "hi" || locale === "mr" ? 0.95 : 1;
    utterance.onend = () => {
      setSpeakingId(null);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setSpeakingId(null);
      utteranceRef.current = null;
    };

    window.speechSynthesis.cancel();
    utteranceRef.current = utterance;
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const renderMessageBody = (message: LegalChatMessage) => {
    if (message.handoff === "emotional") {
      return (
        <span>
          {handoffCopy.prefix} {" "}
          <Link href="/support/chat" style={{ color: LINK_COLOR, textDecoration: "underline" }}>
            {handoffCopy.link}
          </Link>{" "}
          {handoffCopy.suffix}
        </span>
      );
    }

    const localized = getLocalizedText(message, locale);
    if (!localized) {
      return null;
    }

    const segments = localized.split("\n");
    return segments.map((segment, index) => (
      <span key={`${message.id}-segment-${index}`}>
        {segment}
        {index < segments.length - 1 ? <br /> : null}
      </span>
    ));
  };

  const handleAsk = async () => {
    if (!input.trim() || isLoading) {
      return;
    }

    const question = input.trim();
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: question,
        originLocale: locale,
        translations: { [locale]: question }
      }
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/legal-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, locale })
      });

      const data = (await response.json()) as { answer?: string; handoff?: "emotional" };

      if (data.handoff === "emotional") {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: "",
            handoff: "emotional",
            originLocale: locale,
            translations: { [locale]: "" }
          }
        ]);
        return;
      }

      const rawAnswer = data?.answer?.trim();
      const safeAnswer = rawAnswer && rawAnswer.length > 0 ? rawAnswer : fallbackResponse;
      const finalAnswer = safeAnswer.includes(disclaimer)
        ? safeAnswer
        : `${safeAnswer}\n\n${disclaimer}`;

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: finalAnswer,
          originLocale: locale,
          translations: { [locale]: finalAnswer }
        }
      ]);
    } catch (error) {
      console.error("Legal bot fetch failed", error);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: fallbackResponse,
          originLocale: locale,
          translations: { [locale]: fallbackResponse }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`legal-bot ${isOpen ? "open" : "closed"}`}>
      {isOpen ? (
        <section className="legal-bot-card" aria-label={t("legalBot.headerTitle")}>
          <header className="legal-bot-header">
            <div>
              <strong>{t("legalBot.headerTitle")}</strong>
              <p>{t("legalBot.headerSubtitle")}</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={t("legalBot.ariaClose")}>
              ×
            </button>
          </header>

          <div className="legal-bot-log" role="log" aria-live="polite">
            {messages.map(message => (
              <div key={message.id} className={`legal-bot-message ${message.role}`} style={{ display: "grid", gap: 8 }}>
                <div>{renderMessageBody(message)}</div>
                {message.role === "bot" && speechAvailability.synthesis ? (
                  <button
                    type="button"
                    onClick={() => toggleSpeaking(message)}
                    aria-pressed={speakingId === message.id}
                    style={{
                      justifySelf: "flex-start",
                      background: "transparent",
                      border: "none",
                      color: "var(--color-soft-blue)",
                      fontSize: 13,
                      textDecoration: "underline"
                    }}
                  >
                    {speakingId === message.id ? t("legalBot.voice.stopPlay") : t("legalBot.voice.play")}
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <form
            aria-label={t("legalBot.trigger")}
            onSubmit={event => {
              event.preventDefault();
              handleAsk();
            }}
            className="legal-bot-form"
          >
            <label className="sr-only" htmlFor="legal-bot-input">
              {t("legalBot.trigger")}
            </label>
            <textarea
              id="legal-bot-input"
              rows={2}
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder={t("legalBot.placeholder")}
              disabled={isLoading}
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                onClick={isListening ? handleStopListening : handleStartListening}
                aria-pressed={isListening}
                disabled={!speechAvailability.recognition && !isListening}
                title={!speechAvailability.recognition ? t("legalBot.voice.unsupported") : undefined}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(108, 142, 164, 0.3)",
                  background: isListening ? "rgba(108, 142, 164, 0.18)" : "rgba(108, 142, 164, 0.08)",
                  color: "var(--color-soft-blue)",
                  fontWeight: 600
                }}
              >
                {isListening ? t("legalBot.voice.stop") : t("legalBot.voice.start")}
              </button>
              <button type="submit" disabled={isLoading}>
                {isLoading ? t("legalBot.waiting") : t("legalBot.ask")}
              </button>
            </div>
          </form>

          <footer className="legal-bot-footer">
            <Link href="/learn/legal-support">{t("legalBot.footerLink")}</Link>
          </footer>
        </section>
      ) : (
        <button
          type="button"
          className="legal-bot-trigger"
          onClick={() => setIsOpen(true)}
          aria-label={t("legalBot.ariaOpen")}
        >
          {t("legalBot.trigger")}
        </button>
      )}
    </div>
  );
}
