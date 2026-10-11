# CarePaws — Staff Website (Next.js)

*"CarePaws: A Smart Veterinary Management System"* — capstone thesis project for **Pet Care Veterinary Clinic**.

This repo is the staff/doctor web frontend. Pet owners use the separate Android app; this site is staff-only.

## Stack

- Next.js 16 (App Router) + TypeScript + React — no Tailwind
- Design system: `src/app/globals.css` — brand `#F4741E`, slate `#1F2A37`, warm off-white `#FFF8F1`, with dark mode. **Do not introduce new palette colors without team sign-off.**
- Backend (separate): NestJS on Render · AI service: Python FastAPI on Render · DB: PostgreSQL via Supabase (Singapore)

## Run it

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
npm run build                # production build (must pass before PR)
```

Deploy target: Vercel.

## Project structure

```
src/
  app/
    layout.tsx      # root layout + metadata
    globals.css     # full design system (colors, dark mode, components)
    page.tsx        # prototype app shell (client component)
  types/index.ts    # domain types — mirrors the DB ERD, the contract with the backend
  lib/api.ts        # typed API client — every backend endpoint the UI needs, stubbed
```

### Current state of `page.tsx`

The working prototype UI (all screens + interactions) currently runs as the original
vanilla logic inside a `useEffect` (`// @ts-nocheck` at the top). This was a deliberate
mechanical port to keep behavior identical. Refactor into idiomatic React (state/hooks,
per-route components) progressively as each screen is wired to the real backend —
**do not** rewrite everything at once.

Suggested refactor order: login → dashboard → appointments → records → inventory →
triage → billing → notifications → staff → settings.

## Screens

Dashboard, Appointments, Patient Medical Records, Inventory Management, AI Triage &
Reports, Billing & Invoicing, Notifications, Staff Management (admin-only), Settings,
role-based login.

## API contract (for the backend developer)

Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:3001/api/v1`). All
endpoints are already declared with types in `src/lib/api.ts` — implement them in
NestJS to match these shapes (which mirror the 16-table ERD):

| Area | Endpoints |
| --- | --- |
| Auth | `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me` (JWT) |
| Users (admin) | `GET /users`, `POST /users`, `PATCH /users/:id`, `PATCH /users/:id/status` |
| Appointments | `GET /appointments`, `GET /appointments/:id`, `POST /appointments`, `PATCH /appointments/:id`, `PATCH /appointments/:id/status` |
| Pets & records | `GET /pets`, `POST /pets`, `PATCH /pets/:id`, `GET /pets/:id/medical-records` (+ POST), `GET /pets/:id/vaccinations` (+ POST), `GET /pets/:id/health-flags` |
| AI triage | `GET /triage-submissions`, `PATCH /triage-submissions/:id/review` (`vet_verdict`: agreed/adjusted/disagreed — feeds the thesis accuracy metric) |
| Inventory | `GET /inventory-items`, `POST /inventory-items`, `PATCH /inventory-items/:id`, `POST /inventory-items/:id/stock`, `GET /inventory-items/:id/transactions` |
| Billing | `GET /invoices`, `POST /invoices`, `PATCH /invoices/:id/status`, `POST /invoices/:id/payments` |
| Shop (mobile) | `GET /products`, `POST /orders`, `GET /orders/mine` |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all` |
| Clinic & reports | `GET/PATCH /clinic/profile`, `GET /reports/summary`, `GET /reports/triage-accuracy` |

Auth: JWT Bearer tokens. The frontend stores the access token in `sessionStorage`
(`carepaws_access_token`) and sends `Authorization: Bearer <token>`.

Delimitations (baked into the data model): AI output is **suggestion-only** (never a
diagnosis — the triage review flow requires a vet verdict); single-branch clinic
(no branch entity); no video consultation.

## Demo accounts (prototype login only)

| Role | Email | Password |
| --- | --- | --- |
| Administrator | admin@carepaws.demo | CarePawsAdmin! |
| Veterinarian | vet@carepaws.demo | CarePawsVet! |
| Receptionist | reception@carepaws.demo | CarePawsDesk! |

These are UI-level demo credentials. Real auth (hashed passwords, persistent
sessions, server-enforced roles) comes from the NestJS + JWT + Supabase backend.

## Backend integration checklist

- [ ] NestJS implements the endpoints above, returning the shapes in `src/types/index.ts`
- [ ] Replace mock data in `page.tsx` with `lib/api.ts` calls screen by screen
- [ ] Move access token to httpOnly cookie (or keep sessionStorage for the prototype phase)
- [ ] Remove `// @ts-nocheck` from `page.tsx` as components are refactored
- [ ] Supabase RLS policies for the 16 tables (see `carepaws-erd-draft.md`)
- [ ] Wire Resend (email) / Semaphore (SMS) for notification delivery

## Conventions

- Simplified Git Flow: `main`, `develop`, `feature/*`, `fix/*`, `hotfix/*`
- `npm run build` must pass before merging
- Keep the 3-color system; no palette drift

## Team

- Joanne Grace Z. Lauder — Frontend Developer
- Kimberly Jane M. Rolliog — Software Tester
- Lester Aaron A. Tomboc — Senior Programmer
- Krizza Nicole B. Yanzon — Junior Programmer
