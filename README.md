# TalloCPA OS

The operating system of **Tallo CPA** (EJ Tallo Cloud Accounting and Auditing Services): BIR compliance, client document intake with OCR, bookkeeping, approvals and collections in one place.

*Clear Numbers. Clean Compliance.*

- [`docs/SPEC.md`](docs/SPEC.md) — product specification
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — the decisions (Q1–Q61) behind it
- [`docs/AI-WORKFORCE.md`](docs/AI-WORKFORCE.md) — AI employees and the TalloCPA OS MCP server (draft)

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
- Bookkeeping slice 4: period lock — a month locks once a return covering it is filed; late documents book to the next open month; amendments (reviewer asks, Owner approves) reopen and relock a filed return's months
- Bookkeeping slice 5: 1701Q and 1702Q computed from the ledger by BIR line (sales, cost of sales, other income, itemized deductions) for clients whose books cover the taxable year
- Bookkeeping slice 6: financial statements from the ledger (financial position, comprehensive income, changes in equity, notes) for a month, quarter or year; the Owner releases them to the client portal's Reports tab
- Bookkeeping slice 7: year-end closing entries; annual 1702-RT and 1701 / 1701A worksheets from the books; statement of cash flows with a cash-flow class per account; prior-year column on annual statements; amended returns as new filings of the same period through the sign-off chain
- Business Registration (Phase 1C, slice 1): registration cases for new businesses — DTI or SEC, barangay, City Hall, BIR (ORUS, COR, books, invoices, eFiling) and SSS / PhilHealth / Pag-IBIG steps, shown as a routing slip with days held at each office; the COR feeds client onboarding
- Business Registration slice 2: annual renewals (barangay, fire, sanitary and mayor's permits, SEC GIS or DTI renewal, books) — one client or every active client for the year — and closing a business (City Hall retirement, BIR 1905 and cancellation, DTI/SEC, employer numbers), which ends the client's obligations and makes it inactive
- Business Registration slice 3: BIR updates on Form 1905 (address, RDO transfer, tax types, name, line of business — steps follow the changes ticked; a tax type change needs the new tax setup on the client) and new branch registration (branch code, COR, books, invoices)
- Requests & tickets: staff ask clients for documents (from the Requests page or a registration step, which then waits on the client); clients reply with files and open their own tickets in the portal. Portal Registration tab shows each case as a routing slip with what we need from them Each request and ticket has a staff member who answers for it (a ticket goes to the client's preparer) and a priority; the inbox filters Mine, Waiting on us, Waiting on client, All open and Closed
- Tasks are jobs with a workflow, Client → Preparer → Reviewer → Done: "Ask the client first" sends the client a request (their task in the portal) and their answer hands it back; the preparer sends it for review; the reviewer approves or sends it back. A task can name its job from the active fee schedule, with the price; when done the job waits in Collections → Ready to bill. A client's ticket becomes a task with "Make a task". Registration steps show as tasks, and a completed registration case is billed as one job (plus SSS, PhilHealth and Pag-IBIG employer registrations). The portal Home lists the client's tasks: requests, registration steps, returns to approve, remittances to pay
- SSS, PhilHealth and Pag-IBIG remittances (Filings → SSS · PhilHealth · Pag-IBIG), for clients we handle them for (the Owner's switch on the client): each posted payroll run makes the month's remittances beside the 1601-C — contributions with EE, ER and EC, and SSS and Pag-IBIG loan payments — with the per-employee list (on screen and as Excel) to copy into the agency's site. Staff attach the PRN generated there and mark it prepared; the Owner approves (the total goes on the statement when we remit); it is recorded paid with the proof of payment. A client that pays the agency itself gets the payment in its cash disbursements book (Dr SSS / PhilHealth / Pag-IBIG Payable, Cr Cash). Payroll has an SSS EC item, and employees keep their SSS, PhilHealth and Pag-IBIG numbers
- Catch-up accounting: the Owner puts a client in catch-up through a month end, for past periods whose returns were already filed outside the app. Staff record each past return as filed (tax due, filing and payment dates and references; the filed copy is optional) and the client's reviewer or the Owner confirms it, with no client approval, payment check or billing, and it is never scored late. Documents dated in those months stay in their own month, never late or prior-year, with no surcharge. The returns lock their Books months only when the Owner ends catch-up, so the Books can be entered and corrected in any order

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
