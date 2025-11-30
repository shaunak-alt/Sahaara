# Sahaara

Sahaara is a discreet, trauma-informed support platform for domestic-violence survivors. The monorepo uses PNPM workspaces with a Next.js frontend (`apps/web`), a NestJS backend (`apps/api`), and shared packages for UI, utilities, and safety policies.

## Getting Started

```bash
pnpm install
pnpm dev:web
pnpm dev:api
```

> ⚠️ Sensitive data must remain client-side. Do not connect storage services until local encryption is in place.

## Packages
- `@sahaara/ui` — shared design system components (muted palette, rounded corners).
- `@sahaara/utils` — sanitizers, encryption helpers, alias generator.
- `@sahaara/config` — design tokens, copy blocks, safety policies.

## Scripts
- `pnpm dev:web` — runs Next.js dev server.
- `pnpm dev:api` — starts NestJS in watch mode.
- `pnpm build` — builds all workspaces.

## Safety Guardrails
- Quick Exit visible on every page.
- AI chat limited to emotional support; no legal advice or risk predictions.
- Legal info is scripted content reviewed by admins.
- Evidence and trusted contacts stay encrypted on the client (IndexedDB + AES-GCM).
