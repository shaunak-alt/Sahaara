"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import { sanitizeMessage } from "../../lib/safety/sanitizer";
import type { SupportedLanguage } from "../../lib/i18n/translations";
import { useLanguage } from "../i18n/LanguageProvider";
import { useTranslations } from "../i18n/useTranslations";
import SupportTips from "./SupportTips";
import "../../styles/chat.css";

const CHAT_STORAGE_KEY = "sahaara_support_chat_history";
const CHAT_REDACTIONS_KEY = "sahaara_support_chat_redactions";
const MAX_STORED_MESSAGES = 150;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g;
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

type ChatMessage = {
  id: string;
  role: "user" | "guide";
  text: string;
  handoff?: "legal";
  originLocale: SupportedLanguage;
  translations: Partial<Record<SupportedLanguage, string>>;
};

type StoredChatMessage = {
  id: string;
  role: "user" | "guide";
  text: string;
  handoff?: "legal";
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

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "hi", "mr"];

const isSupportedLocale = (value: unknown): value is SupportedLanguage =>
  typeof value === "string" && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

const isStoredChatMessage = (entry: unknown): entry is StoredChatMessage => {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as Partial<StoredChatMessage>;
  return (
    typeof candidate.id === "string" &&
    (candidate.role === "guide" || candidate.role === "user") &&
    typeof candidate.text === "string"
  );
};

const normalizeMessage = (entry: StoredChatMessage, fallbackLocale: SupportedLanguage): ChatMessage => {
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

const getLocalizedText = (message: ChatMessage, targetLocale: SupportedLanguage): string => {
  if (message.handoff === "legal") {
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

type ChatResponse = {
  response: string;
  redactions?: string[];
  sanitized?: string;
  handoff?: "legal";
};

const resolveSpeechLocale = (locale: string): string => {
  if (locale === "hi") return "hi-IN";
  if (locale === "mr") return "mr-IN";
  return "en-IN";
};

const renderTextWithLinks = (text: string): ReactNode => {
  if (!text) {
    return text;
  }

  const pattern = new RegExp(LINK_PATTERN.source, "g");
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [fullMatch, label, url] = match;
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const isExternal = url.startsWith("http");

    parts.push(
      isExternal ? (
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: LINK_COLOR, textDecoration: "underline" }}
        >
          {label}
        </a>
      ) : (
        <Link
          key={`link-${match.index}`}
          href={url as Route}
          style={{ color: LINK_COLOR, textDecoration: "underline" }}
        >
          {label}
        </Link>
      )
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (parts.length === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const stripMarkdownLinks = (text: string): string => {
  if (!text) {
    return text;
  }
  const pattern = new RegExp(LINK_PATTERN.source, "g");
  return text.replace(pattern, "$1");
};

type SpeechAvailability = {
  recognition: boolean;
  synthesis: boolean;
};

export default function SupportChat() {
  const t = useTranslations();
  const { locale } = useLanguage();
  const speechLocale = useMemo(() => resolveSpeechLocale(locale), [locale]);

  const introMessage = useMemo<ChatMessage>(
    () => ({
      id: "guide-0",
      role: "guide",
      text: t("chat.intro"),
      originLocale: locale,
      translations: { [locale]: t("chat.intro") }
    }),
    [t, locale]
  );

  const handoffCopy = useMemo(
    () => ({
      prefix: t("supportChat.handoff.legal.prefix"),
      link: t("supportChat.handoff.legal.link"),
      suffix: t("supportChat.handoff.legal.suffix"),
      linkKeyword: t("supportChat.handoff.legal.linkKeyword")
    }),
    [t]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([introMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [redactionNotes, setRedactionNotes] = useState<string[]>([]);
  const [speechAvailability, setSpeechAvailability] = useState<SpeechAvailability>({ recognition: false, synthesis: false });
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const logRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setMessages(prev => {
      if (!prev.length) {
        return [introMessage];
      }
      const [first, ...rest] = prev;
      if (first.id === "guide-0" && first.role === "guide") {
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
      const storedMessages = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages) as unknown;
        if (Array.isArray(parsed)) {
          const validMessages = parsed
            .filter(isStoredChatMessage)
            .map(entry => normalizeMessage(entry, "en"))
            .slice(-MAX_STORED_MESSAGES);
          if (validMessages.length > 0) {
            setMessages(validMessages);
          }
        }
      }

      const storedRedactions = window.localStorage.getItem(CHAT_REDACTIONS_KEY);
      if (storedRedactions) {
        const parsedNotes = JSON.parse(storedRedactions) as unknown;
        if (Array.isArray(parsedNotes)) {
          const validNotes = parsedNotes.filter(note => typeof note === "string");
          setRedactionNotes(validNotes);
        }
      }
    } catch (loadError) {
      console.error("Failed to restore chat history", loadError);
    }
  }, []);

  useEffect(() => {
    if (!logRef.current) return;
    logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const shouldClear = messages.length === 1 && messages[0]?.id === introMessage.id;
      if (shouldClear) {
        window.localStorage.removeItem(CHAT_STORAGE_KEY);
        return;
      }

      const trimmed = messages.slice(-MAX_STORED_MESSAGES);
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (persistError) {
      console.error("Failed to persist chat history", persistError);
    }
  }, [messages, introMessage]);

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
          role: message.role
        };
      })
      .filter((entry): entry is TranslationEntry => Boolean(entry));

    if (entries.length === 0) {
      return;
    }

    const controller = new AbortController();

    const runTranslation = async () => {
      try {
        const response = await fetch(`${API_BASE}/chat/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLocale: locale, entries }),
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to translate messages: ${response.status}`);
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
      } catch (translationError) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Failed to translate chat history", translationError);
      }
    };

    void runTranslation();

    return () => {
      controller.abort();
    };
  }, [locale, messages]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      if (redactionNotes.length === 0) {
        window.localStorage.removeItem(CHAT_REDACTIONS_KEY);
        return;
      }
      window.localStorage.setItem(CHAT_REDACTIONS_KEY, JSON.stringify(redactionNotes.slice(-MAX_STORED_MESSAGES)));
    } catch (persistError) {
      console.error("Failed to persist redaction notes", persistError);
    }
  }, [redactionNotes]);

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

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

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
    return () => {
      if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStartListening = () => {
    setError(null);
    if (!speechAvailability.recognition) {
      setError(t("supportChat.voice.unsupported"));
      return;
    }
    const recognition = recognitionRef.current;
    if (!recognition) {
      setError(t("supportChat.voice.unsupported"));
      return;
    }
    try {
      recognition.lang = speechLocale;
      recognition.start();
      setIsListening(true);
    } catch (listenError) {
      console.error("Speech recognition failed to start", listenError);
      setIsListening(false);
      setError(t("supportChat.voice.unsupported"));
    }
  };

  const handleStopListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      return;
    }
    try {
      recognition.stop();
    } catch (stopError) {
      console.error("Speech recognition stop error", stopError);
    } finally {
      setIsListening(false);
    }
  };

  const getSpeechText = (message: ChatMessage): string => {
    if (message.handoff === "legal") {
      return `${handoffCopy.prefix} ${handoffCopy.link} ${handoffCopy.suffix}`;
    }
    return stripMarkdownLinks(getLocalizedText(message, locale));
  };

  const toggleSpeaking = (message: ChatMessage) => {
    if (typeof window === "undefined" || !speechAvailability.synthesis) {
      setError(t("supportChat.voice.unsupported"));
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

  const handleSend = async () => {
    setError(null);
    if (!input.trim() || hidden) return;

    const { clean, redactions } = sanitizeMessage(input);
    const safeUserMessage = clean || t("supportChat.softPlaceholder");

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: safeUserMessage,
        originLocale: locale,
        translations: { [locale]: safeUserMessage }
      }
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/chat/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, redactions, locale })
      });

      if (!response.ok) {
        throw new Error(t("supportChat.errorUnavailable"));
      }

      const data: ChatResponse = await response.json();
      setRedactionNotes(data.redactions ?? redactions ?? []);

      if (data.handoff === "legal") {
        setMessages(prev => [
          ...prev,
          {
            id: `guide-${Date.now()}`,
            role: "guide",
            text: "",
            handoff: "legal",
            originLocale: locale,
            translations: { [locale]: "" }
          }
        ]);
        return;
      }

      const serverReply = data.response?.trim() || t("chat.intro");
      const needsDisclaimer = clean ? /legal advice|diagnos|risk/i.test(clean) : false;
      const disclaimer = needsDisclaimer ? ` ${t("supportChat.noLegalAdvice")}` : "";
      const followUp = t("supportChat.followUp");
      const composed = `${serverReply}${disclaimer}`.trim();
      const finalText = [composed, followUp].filter(Boolean).join(" ");

      setMessages(prev => [
        ...prev,
        {
          id: `guide-${Date.now()}`,
          role: "guide",
          text: finalText,
          originLocale: locale,
          translations: { [locale]: finalText }
        }
      ]);
    } catch (issue) {
      const fallback = t("supportChat.errorGeneric");
      setError(issue instanceof Error ? issue.message || fallback : fallback);
    } finally {
      setIsTyping(false);
    }
  };

  const renderGuideMessage = (message: ChatMessage) => {
    if (message.handoff === "legal") {
      const { prefix, link, suffix, linkKeyword } = handoffCopy;
      const keyword = linkKeyword?.trim() || link;
      const keywordIndex = link.indexOf(keyword);
      const before = keywordIndex > -1 ? link.slice(0, keywordIndex) : "";
      const after = keywordIndex > -1 ? link.slice(keywordIndex + keyword.length) : "";
      const anchorText = keywordIndex > -1 ? keyword : link;

      return (
        <span>
          {prefix}{" "}
          {before}
          <Link href="/learn/legal-support" style={{ color: LINK_COLOR, textDecoration: "underline" }}>
            {anchorText}
          </Link>
          {after}
          {" "}
          {suffix}
        </span>
      );
    }
    return renderTextWithLinks(getLocalizedText(message, locale));
  };

  const redactionSummaryLabel = redactionNotes.length
    ? t("supportChat.redactionsCount").replace("{count}", String(redactionNotes.length))
    : t("supportChat.redactionsSummary");

  return (
    <div className="support-chat-shell">
      <section className="support-layout">
        <section className="support-chat-card" aria-label={t("supportChat.aria.chatCard")}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <p style={{ margin: 0, color: "var(--color-warm-grey)", fontSize: 14 }}>{t("supportChat.eyebrow")}</p>
              <h2 style={{ margin: 0 }}>{t("supportChat.title")}</h2>
            </div>
            <button
              type="button"
              onClick={() => setHidden(value => !value)}
              style={{
                background: "rgba(108, 142, 164, 0.15)",
                color: "var(--color-soft-blue)",
                border: "1px solid rgba(108, 142, 164, 0.35)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontWeight: 600
              }}
            >
              {hidden ? t("supportChat.showTranscript") : t("supportChat.hideTranscript")}
            </button>
          </header>

          {!hidden && (
            <div
              ref={logRef}
              className="chat-log"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              style={{ maxHeight: 360, overflowY: "auto", paddingRight: 8 }}
            >
              {messages.map(message => (
                <article key={message.id} className={`chat-message ${message.role}`} style={{ display: "grid", gap: 8 }}>
                  <span className="sr-only">
                    {message.role === "guide"
                      ? t("supportChat.aria.guideSays")
                      : t("supportChat.aria.userSays")}:
                  </span>
                  <div>{renderGuideMessage(message)}</div>
                  {message.role === "guide" && speechAvailability.synthesis ? (
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
                      {speakingId === message.id ? t("supportChat.voice.stopPlay") : t("supportChat.voice.play")}
                    </button>
                  ) : null}
                </article>
              ))}
              {isTyping && (
                <div className="typing-indicator" aria-label={t("supportChat.sendPending") } role="status">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          )}

          {redactionNotes.length > 0 && !hidden && (
            <details className="redaction-pill">
              <summary>{redactionSummaryLabel}</summary>
              <ul>
                {redactionNotes.map(entry => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </details>
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
              void handleSend();
            }}
            style={{ display: "grid", gap: 12 }}
            aria-label={t("supportChat.aria.composer")}
          >
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 600 }}>{t("supportChat.composerLabel")}</span>
              <textarea
                rows={4}
                value={input}
                onChange={event => setInput(event.target.value)}
                aria-label={t("supportChat.aria.textarea")}
                className="composer-textarea"
                maxLength={600}
                placeholder={t("supportChat.composerPlaceholder")}
              />
            </label>
            <div className="composer-actions">
              <button
                type="button"
                onClick={isListening ? handleStopListening : handleStartListening}
                aria-pressed={isListening}
                disabled={!speechAvailability.recognition && !isListening}
                title={!speechAvailability.recognition ? t("supportChat.voice.unsupported") : undefined}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(108, 142, 164, 0.3)",
                  background: isListening ? "rgba(108, 142, 164, 0.18)" : "rgba(108, 142, 164, 0.08)",
                  color: "var(--color-soft-blue)",
                  fontWeight: 600
                }}
              >
                {isListening ? t("supportChat.voice.stop") : t("supportChat.voice.start")}
              </button>

              <button
                type="submit"
                disabled={isTyping}
                style={{
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "none",
                  background: "var(--color-soft-blue)",
                  color: "white",
                  fontWeight: 600,
                  opacity: isTyping ? 0.7 : 1,
                  cursor: isTyping ? "wait" : "pointer"
                }}
              >
                {isTyping ? t("supportChat.sendPending") : t("supportChat.send")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMessages([introMessage]);
                  setError(null);
                  setRedactionNotes([]);
                  if (typeof window !== "undefined") {
                    window.localStorage.removeItem(CHAT_STORAGE_KEY);
                    window.localStorage.removeItem(CHAT_REDACTIONS_KEY);
                  }
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-warm-grey)",
                  textDecoration: "underline"
                }}
              >
                {t("supportChat.clear")}
              </button>
            </div>
          </form>

          {error && (
            <div
              role="alert"
              style={{
                background: "var(--color-earth-beige)",
                color: "var(--color-charcoal)",
                borderRadius: "var(--radius-base)",
                padding: 16,
                border: "1px solid rgba(163, 124, 103, 0.35)"
              }}
            >
              {error}
            </div>
          )}

          <footer style={{ display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-warm-grey)" }}>
              {t("supportChat.footerLegalPrefix")} {" "}
              <Link href="/learn/legal-support">{t("supportChat.footerLegalLink")}</Link> {" "}
              {t("supportChat.footerLegalSuffix")}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-warm-grey)" }}>
              {t("supportChat.footerQuickExit")}
            </p>
          </footer>
        </section>
        <SupportTips />
      </section>
    </div>
  );
}
