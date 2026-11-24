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
- Review page: returns waiting for a reviewer or the Owner's final approval
- Documents: mobile-first client portal (camera or file upload, cutoff countdown, document status, returned documents with replies, return approvals); staff upload, accept, post or return documents; filed return and proof of payment on each filing; every view logged
- Monthly cycle: each active client's month is opened nightly; document request on the 1st and a reminder the day before the cutoff (email through Resend, and the portal); missed cutoffs recorded and shown on the Dashboard; "nothing to submit" from the portal; closing a month (nightly two months on, or by staff after the cutoff) carries unposted documents to the next month of the same taxable year as late-recorded; prior-year documents go to an exceptions queue for the Reviewer or Owner
- Owner dashboard and Scores page: late returns split into client- and staff-caused, clients in the red (compliance score), receivables overdue, OCR correction rate, and each staff member's clients, load and work waiting; client compliance scores (green / yellow / red) and staff KPIs with a 12-month trend
- OCR (Gemini) reads each uploaded document; review queue with the image beside the figures, low-confidence fields highlighted, checks (TIN, VAT 12%, totals, duplicates, dates); approval logs every correction
- Branches (Iloilo now): clients and staff belong to a branch; staff are listed by branch when assigning a client
- Acting approver: a Reviewer named by the Owner gives the final approval within a peso limit (fully paid returns only, never their own work), with a daily digest to the Owner
- Bookkeeping (Phase 1B, slice 1): books per bookkeeping client from a chart-of-accounts template (sole proprietorship, partnership, stock corporation, OPC, non-stock) mapped to FS and BIR income tax lines; opening balances workbook with AR/AP detail; manual journal entries, reversals and the trial balance; balanced, unchangeable posted entries enforced by the database
- Bookkeeping slice 2: approved documents become suggested entries booked to an account title (client history → supplier preset in the parties directory → default); cash or charge read by OCR; receivables and payables by customer and supplier with aging; 2307s and the monthly AR/AP update workbook settle them
- Bookkeeping slice 3: General Journal, General Ledger, Cash Receipts, Cash Disbursements, Sales and Purchase books printed on ruled journal-pad pages (loose-leaf, page numbers through the taxable year) and as Excel

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
