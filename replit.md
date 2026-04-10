# AyurvedicZen Workspace

## Overview

Full-stack Ayurvedic Diagnostic System — pnpm workspace monorepo using TypeScript.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/ayurvediczen)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Application — AyurvedicZen

An Ayurvedic Diagnostic System that guides users through a 12-question questionnaire and classifies their dominant dosha (Vata, Pitta, or Kapha).

### Pages
- `/` — Home page with AyurvedicZen branding and CTA
- `/questionnaire` — 12-question Ayurvedic diagnostic test with progress bar
- `/result` — Predicted dosha, scores, description, and personalized recommendations
- `/dashboard` — Past responses table + diagnosis statistics

### API Endpoints
- `POST /api/submit-answers` — Submit questionnaire answers, returns diagnosis
- `GET /api/responses` — List all stored responses
- `GET /api/responses/:id` — Get a specific response
- `GET /api/stats` — Aggregated dosha counts

### Database
- Table: `users_responses` (id, answers JSONB, result, vata_score, pitta_score, kapha_score, created_at)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/ayurvediczen run dev` — run frontend locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
