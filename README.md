# Sahaara

Sahaara is a trauma-informed companion for survivors who need discreet emotional support, legal clarity, and a safe place to store evidence. The project lives in a PNPM monorepo with a Next.js web client (`apps/web`), a NestJS API (`apps/api`), and shared packages for copy, utilities, and UI tokens.

## ✨ Highlights

- **Supportive chat** that auto-redacts personal details, supports Hindi/Marathi/English, and can hand off to the legal helper when it hears legal keywords.
- **Quick exit workflow** that wipes session storage, rewrites browser history, and redirects to a safe site with one click or a double-tap of Escape.
- **Encrypted evidence locker** built on PBKDF2 + AES-GCM so notes/files stay on-device unless the survivor exports them.
- **Legal helper** powered by retrieval-augmented content with deterministic fallbacks and a “not legal advice” banner.

## 🧱 Project Structure

```
apps/
  web/    # Next.js App Router frontend
  api/    # NestJS REST API
packages/
  config/ # Legal copy + tokens
  ui/     # Shared UI primitives
  utils/  # Sanitizers, alias generator
```

## 🚀 Getting Started

```powershell
pnpm install
pnpm dev:api   # http://localhost:4000
pnpm dev:web   # http://localhost:3000
```

Copy `.env.example` to `.env` (or `.env.local`) and fill values such as `NEXT_PUBLIC_API_BASE_URL`, `GROQ_API_KEY`, and `GOOGLE_API_KEY`.

## 🧰 Useful Scripts

- `pnpm dev:web` – run the Next.js dev server
- `pnpm dev:api` – run the NestJS API in watch mode
- `pnpm build` – build all workspaces
- `pnpm lint` – lint via the shared ESLint config

## 🔒 Safety Guardrails

- Quick Exit button + keyboard shortcut present globally
- Evidence locker encrypts with AES-GCM using PBKDF2-derived keys
- Legal helper keeps responses deterministic when AI is unavailable and always adds disclaimers
- Chat transcripts store locally with sensitive details redacted before hitting the API

## 🧭 Key Files

- `apps/web/components/support/ChatPreview.tsx` – chat experience
- `apps/web/components/locker/EvidenceLocker.tsx` – encrypted locker UI
- `apps/web/lib/safety/useQuickExit.ts` – panic-flow orchestration
- `apps/web/lib/legal-rag.ts` – retrieval + fallback logic for legal helper
- `apps/api/src/chat/chat.service.ts` – AI orchestration and translation

## 🤝 Contributing

1. Fork the repo and branch off `main`.
2. Run `pnpm lint` and (when added) tests before committing.
3. Submit a pull request with context and manual-verification notes.
