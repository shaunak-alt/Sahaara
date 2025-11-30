import { NextResponse } from "next/server";
import {
  NO_SOURCE_BY_LOCALE,
  buildDeterministicAnswer,
  buildPrompt,
  retrieveLegalDocs,
  type SupportedLocale
} from "../../../lib/legal-rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMOTIONAL_HANDOFF_KEYWORDS: Record<SupportedLocale, string[]> = {
  en: ["talk", "feel", "anxious", "anxiety", "stress", "support", "therapist", "counsel", "chat", "listen"],
  hi: ["भावन", "महसूस", "बात", "सहारा", "तनाव", "घबर", "चैट", "सुन लो", "समर्थन"],
  mr: ["भावना", "म्हणजे", "बोल", "सहारा", "ताण", "चिंता", "चॅट", "ऐका", "समर्थन"]
};

function normalizeLocale(value: unknown): SupportedLocale {
  if (value === "hi" || value === "mr") {
    return value;
  }
  return "en";
}

function shouldRedirectToEmotional(question: string, locale: SupportedLocale): boolean {
  const normalized = (question ?? "").toLowerCase();
  if (!normalized.trim()) {
    return false;
  }

  const localeKeywords = EMOTIONAL_HANDOFF_KEYWORDS[locale] ?? EMOTIONAL_HANDOFF_KEYWORDS.en;
  if (localeKeywords.some(keyword => keyword && normalized.includes(keyword.toLowerCase()))) {
    return true;
  }

  if (locale !== "en") {
    return EMOTIONAL_HANDOFF_KEYWORDS.en.some(keyword => normalized.includes(keyword));
  }

  return false;
}

async function requestGroq(prompt: string): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not configured");
    return null;
  }

  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
  const baseUrl = (process.env.GROQ_API_BASE_URL ?? "https://api.groq.com/openai/v1").replace(/\/+$/, "");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages: [
        { role: "system", content: "You are a safety-first legal summarizer." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq legal RAG error", response.status, errorText);
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const answer = data.choices?.[0]?.message?.content?.trim();
  return answer ?? null;
}

export async function POST(request: Request) {
  let locale: SupportedLocale = "en";
  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    locale = normalizeLocale(body?.locale);
    const noSource = NO_SOURCE_BY_LOCALE[locale] ?? NO_SOURCE_BY_LOCALE.en;

    if (!question) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    if (shouldRedirectToEmotional(question, locale)) {
      return NextResponse.json({ handoff: "emotional" });
    }

    const docs = retrieveLegalDocs(question);

    if (!docs.length) {
      return NextResponse.json({ answer: noSource });
    }

    const prompt = buildPrompt(question, docs, locale);
    const answer = await requestGroq(prompt);

    if (answer) {
      return NextResponse.json({ answer });
    }

    const deterministic = buildDeterministicAnswer(question, docs, locale);
    if (deterministic) {
      return NextResponse.json({ answer: deterministic });
    }

    return NextResponse.json({ answer: noSource });
  } catch (error) {
    console.error("Legal bot API failure", error);
    const noSource = NO_SOURCE_BY_LOCALE[locale] ?? NO_SOURCE_BY_LOCALE.en;
    return NextResponse.json({ answer: noSource }, { status: 500 });
  }
}
