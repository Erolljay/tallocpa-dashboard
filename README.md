# TalloCPA OS

The operating system of **Tallo CPA** (EJ Tallo Cloud Accounting and Auditing Services): BIR compliance, client document intake with OCR, bookkeeping, approvals and collections in one place.

*Clear Numbers. Clean Compliance.*

- [`docs/SPEC.md`](docs/SPEC.md) — product specification
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — the decisions (Q1–Q61) behind it

## Status

Phase 1A in progress. Built so far:

- Next.js app with the Tallo CPA brand tokens
- Database schema for brands, staff, clients, engagements, deadline rules, holidays, obligations and filing instances, with row-level security and an audit log
- BIR deadline engine (`src/lib/deadlines`) with tests
- Sign-in with Google or an emailed link/code; staff area and a client portal placeholder
- Clients: list, new client from the COR (obligations worked out from the tax types), client page with engagements, team and portal users
- Staff page: add staff and reviewers, capacity and load (retainers ÷ ₱1,000)
- Nightly job creates dated BIR filings 120 days ahead; Dashboard shows overdue and next 14 days
- Sign-off chain on every filing: Prepared → Reviewed → Client approved (portal) → Owner approved (payment check) → Filed → Paid → Proof sent, with history
- Settings: Owner edits BIR deadline rules and non-working days

Connecting Supabase, Google sign-in and Vercel: [`docs/SETUP.md`](docs/SETUP.md).

## Develop

Needs Node 22 and pnpm. Database tests also need PostgreSQL 15+ server binaries installed locally.

```bash
pnpm install
pnpm dev               # app on http://localhost:3000
pnpm test              # unit tests
pnpm test:db           # schema + access-rule tests on a throwaway Postgres
pnpm db:seed:generate  # rebuild supabase/seed.sql after editing src/lib/deadlines/seed.ts
```

Database changes go in `supabase/migrations/` as new files; never edit a migration that has been applied.

## Stack

Next.js on Vercel · Supabase (Singapore) · Gemini OCR · self-hosted n8n · Resend
