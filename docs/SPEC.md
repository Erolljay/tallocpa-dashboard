# TalloCPA OS — Product Specification

| | |
|---|---|
| **Status** | Draft for Owner sign-off |
| **Version** | 0.1 (2026-11-23) |
| **Owner** | Lead Practitioner, Tallo CPA |
| **Firm** | EJ Tallo Cloud Accounting and Auditing Services (brand: **Tallo CPA**), non-VAT |
| **Source** | Decisions Q1–Q61 from the design interview — see [`DECISIONS.md`](./DECISIONS.md) |

> **Rule of this document:** nothing here is built until the Owner signs off. Each section points to the decisions (Qn) it rests on, so a change in one decision shows what else must move.

---

## 1. Purpose

TalloCPA OS is the firm's own operating system. It **replaces Moxie (CRM, projects, billing) and Manager.io (client books)** with one system that:

1. Never misses a BIR deadline, with rules you can edit and an audit trail for every return (Q1, Q6, Q20).
2. Lets clients send their documents themselves, read by OCR, so the firm can price low and scale (Q1, Q8, Q54).
3. Keeps each client's books as true double-entry and computes returns from them, so the books and the returns can't disagree (Q18, Q22).
4. Gives the Owner control over approvals, money and staff capacity (Q21, Q25, Q36, Q39–Q41).
5. Is built from day one to add more service lines and a second brand (Q17, Q60).

### 1.1 Who uses it (Q2, Q21)

| Role | Who | Can do |
|---|---|---|
| **Owner** | Lead Practitioner | Everything. Gives the final approval on every return. Only role on the Collections screen. Can override the payment check. |
| **Acting Approver** | Named by the Owner while away | Approves returns under a peso limit set by the Owner. **Cannot** override the payment check. Every action goes into a daily digest to the Owner (Q58). |
| **Reviewer** | Senior staff | Reviews and kicks back staff work. |
| **Staff** | Preparers | Works only on assigned clients: reviews OCR, posts entries, prepares returns. |
| **Client User** | Client's owner, bookkeeper, etc. **Several users per business, and one person can be linked to several businesses** (business switcher in the portal) | Portal only, for the businesses they are linked to: upload documents, approve returns, view filings, reports and SOA. |

Access is enforced in the database with Postgres row-level security (RLS), not only in the screens (Q13).

### 1.2 Out of scope for Phase 1

- Website, lead capture, proposals, e-sign (Phase 2, Q17, Q43)
- Full billing, issuing BIR invoices, automatic bank matching (Phase 3; BIR invoices stay manual, Q27)
- Time tracking: **not planned at all**, the firm charges fixed retainers (Q37)
- Audit, AUP, Business Processing, Systems Implementation, AI & Business Automation, Receivership & Liquidation (later; the data model allows them, Q4, Q17)
- Viber, SMS, Messenger channels (later, through n8n, Q10, Q38)
- Registering clients' books as a computerized accounting system (CAS) with BIR (Q18)
- The nationwide brand (later, Q56, Q60)

---

## 2. Phasing (Q7, Q17, Q34)

| Phase | Scope | Target |
|---|---|---|
| **1A — Compliance core** | Brand/entity settings, clients & engagements, filing obligations, deadline engine, client portal + OCR intake + review queue, sign-off chain, Collections & SOA, owner dashboard & scores | **Live for the January 2027 cycle** (December 2026 returns stay in the current tools) |
| **1B — Bookkeeping** | Per-client ledger, chart-of-accounts templates, posting from reviewed documents, BIR loose-leaf books, returns computed from the ledger, period lock, client reports | A few weeks after 1A; **posts back to 1 January 2027** from opening trial balances as of 31 December 2026 |
| **2 — Growth** | Public website (tallocpa.com) → lead → auto-quote from COR + fee schedule → proposal → e-signed engagement → client set up automatically | After Phase 1 runs one clean cycle |
| **3 — Money** | Full billing, retainers, collections, reference-based automatic payment matching | After Phase 2 |
| **Later** | Other service lines, Receivership & Liquidation module, nationwide brand, Viber/SMS | — |

**Cutover rule (Q7, Q33):** clients are entered in the OS from their COR (there is no Moxie import, §8); Moxie stays read-only for reference until the OS completes one full monthly cycle, then it is cancelled. Manager.io stays for 2026 books and is retired after the 2026 annual filings.

---

## 3. Modules (Phase 1)

### 3.1 Brands & firm settings (Q44, Q55, Q60)

- A **brand** holds: display name, legal name, logo files, color tokens, BIR registration (TIN, RDO, COR), **tax-on-fee setting** (non-VAT 3% percentage tax ↔ 12% VAT), bank and e-wallet accounts for payments, fee schedule, portal domain, email sender.
- Only **Tallo CPA** is configured now. Every client belongs to one brand.
- **Gross receipts watch (Q55):** the OS sums the brand's own year-to-date collections and warns the Owner at **₱2.5M**, before the ₱3M VAT registration threshold. Switching the setting to VAT updates SOAs and quotes; existing prices are not changed by themselves.

### 3.2 Clients & engagements (Q3, Q17, Q33)

- **Client:** taxpayer type (individual / OPC / partnership / corporation / non-stock), TIN, RDO, registered address, COR data (from the COR reader), filing channel (eFPS group or eBIRForms), fiscal year end, book type (manual / loose-leaf), payment mode (firm-remits or client-pays-direct, Q23), assigned Staff and Reviewer, submission cutoff day (default 5th, Q28).
- **Engagement:** client, brand, **service line**, services subscribed (from the fee schedule), monthly retainer, start date, status. Phase 1 is a minimal record; the full proposal → engagement flow comes in Phase 2.
- **Service lines** (configured, Phase 1 uses the first two): Tax Compliance, Bookkeeping, Business Processing, FS Audit, Agreed-Upon Procedures, AI & Business Automation, Systems Implementation, Receivership & Liquidation.
- **Contacts / client users:** several per client, each with a portal login.

### 3.3 Filing obligations & deadline engine (Q6, Q20)

- **Obligation:** client × form (e.g. 2550Q) × start date × end date. Created from the COR's registered tax types and the engagement.
- **Deadline rules are data, not code:** form, frequency, due-day formula, filing channel (eFPS group / eBIRForms), effective-from / effective-to dates, source issuance (RR/RMC number). The Owner edits rules in Settings; a BIR change means adding a row with a new effective date.
- **Withholding returns follow the calendar year** (0619-E, 1601-C, 1601-EQ, 1604-C, 1604-E), even for a fiscal-year client; income tax and business tax returns follow the client's taxable year. A rule's `calendar_year` flag records this.
- **Due dates that fall on a weekend or holiday move to the next working day.** The holiday calendar is a table, kept up to date from Malacañang proclamations and BIR advisories; one-off work suspensions can be added as entries.
- A nightly job **generates filing instances** (client × form × period × due date) 120 days ahead, and keeps the past 60 days so overdue filings stay visible.
- **Starting forms** (seed data, **every date must be checked against current BIR issuances before go-live** — see §9):

| Form | Frequency | Starting rule (verify) |
|---|---|---|
| 0619-E | Monthly (first two months of the quarter) | 10th of the following month |
| 1601-C | Monthly | 10th of the following month (all clients, eFPS included: the firm follows the manual deadline, not the eFPS group dates) |
| 1601-EQ + QAP | Quarterly | Last day of the month after the quarter |
| 2550Q + SLSP | Quarterly | 25th day after the quarter ends |
| 2551Q | Quarterly | 25th day after the quarter ends |
| 1701Q | Quarterly (Q1–Q3) | 15 May, 15 Aug, 15 Nov |
| 1702Q | Quarterly (Q1–Q3) | 60 days after the quarter ends |
| 1701 / 1701A / 1702-RT | Annual | 15 April (calendar year); 15th day of the 4th month (fiscal) |
| 1604-C | Annual | 31 January |
| 1604-E | Annual | 1 March |
| SAWT | With the related return | Same as the return |
| Inventory List | Annual | 30 January (verify) |
| GIS (SEC) | Annual | Within 30 days of the annual meeting |
| AFS (SEC) | Annual | Per SEC filing schedule (by SEC registration number) |

### 3.4 Client portal (Q2, Q8, Q10, Q28, Q35, Q42, Q57)

Mobile first, with the Tallo CPA brand. Screens:

1. **Upload:** phone camera or file. A countdown to this month's cutoff. Each upload is tagged to a period automatically (§4.2).
2. **Documents:** status of each document — Received → Under review → Posted, or **Returned** with a reason ("blurry, retake"). Replies happen only on returned documents; there is no chat (Q35).
3. **Approvals:** computed returns waiting for the client's **one-click approval** (Q57). Shows tax due and the payment instructions.
4. **Filings:** upcoming and filed returns; download the filed return and proof of payment.
5. **Reports:** monthly summary, quarterly and annual statements — **shown only after the Owner releases them** (Q42).
6. **Statement of Account:** what is due (retainer + tax dues), payment reference, the brand's bank / InstaPay / PESONet / GCash / Maya details, payment history (Q27, Q56).

Intake channel in v1: **portal upload only** (Q10). **Staff can also upload documents and run OCR on behalf of the clients assigned to them** (e.g. documents handed over in person or sent by email); these go through the same review queue and are marked as staff-uploaded.

### 3.5 OCR intake & review queue (Q8, Q9, Q15)

- **Document types in v1:** sales invoices / official receipts, purchase and expense receipts, **BIR 2307 issued and received**, BIR COR (Form 2303) for onboarding. Bank statements and payroll records come later.
- **Engine:** Google **Gemini** (paid tier only — the free tier may use data for training), high media resolution for handwritten documents. The OCR step is a swappable component (`ocr-provider` interface).
- **Extracted fields:** document type, date, number, supplier/customer name, TIN, address, VATable / exempt / zero-rated amounts, VAT, total, ATC and withholding amount (2307), with a **confidence score per field**.
- **Before go-live:** test Gemini 3.5 Flash vs 3.1 Pro on about 50 real client receipts, choose the default and the confidence thresholds (Q15).
- **Review queue:** image beside the extracted fields; low-confidence fields are highlighted; staff Approve / Edit / Return to client. **No document affects a return until a staff member approves it.**
- **Checks:** TIN format, VAT = 12% of the VATable amount within rounding, duplicate (same supplier TIN + document number), date inside an open period.
- Every staff correction is logged; this produces the **OCR correction rate** on the dashboard (Q36).

### 3.6 Bookkeeping (Phase 1B; Q18, Q19, Q29, Q30, Q34)

- **One double-entry ledger per client.** The database refuses any journal entry whose debits ≠ credits. Amounts are fixed-precision decimals; no floating point.
- **Chart-of-accounts templates** by client type: Individual – service, Individual – trading, Corporation / OPC, Non-stock / school. Can be changed per client.
- Approved documents become **suggested entries** (account picked from supplier history + template); staff confirm or change them.
- **Books produced:** General Journal, General Ledger, Cash Receipts Book, Cash Disbursements Book, Sales Journal, Purchase Journal — as **loose-leaf printouts**, and as printouts manual-book clients copy into their bound books.
- **Opening balances:** trial balance as of 31 December 2026 per client, imported from Manager.io / Excel.
- **Period lock (Q30):** when a period's return is Filed, that period is locked. Changes only through a logged **Amendment** that the Owner approves and that reopens the period.

### 3.7 Tax computation & returns (Q22)

- Return figures are **computed from the ledger** (Phase 1B) or, until then, from approved documents. Nothing is retyped by hand.
- The OS produces a **return worksheet** (figures by line of the BIR form) and the attachments (SAWT, QAP, SLSP data files). Filing itself stays in eFPS / eBIRForms and is done by staff; the OS records the filing reference and the proof.
- **Built:** a Worksheet page on each filing for 0619-E, 1601-EQ (+ QAP), 2551Q, 2550Q (+ SLS/SLP), 1701Q, 1702Q (+ SAWT), 1601-C and 1604-C (+ alphalist Schedules 1 and 2). Rules, ATC table, effective-dated rates and DAT layouts are ported from the Owner's taxify extension (QAP and alphalist DAT match taxify byte for byte). Figures come from approved documents (status Posted with approved fields, counted in the document's own month) and from figures staff type in; worksheets are staff working papers (clients do not see them) and lock once the return is filed. Not yet: 1701/1702-RT annual, 1604-E, 2307 printing, and itemized deductions from a ledger (Phase 1B).

### 3.7a Payroll (1601-C, 1604-C, alphalist)

- Per client: **payslip items** (earning / deduction / employer contribution), each mapped to a BIR category (taxify's list; "none" for loans and cash advances), and an **employee list** with every alphalist field. Employees are added one by one or in bulk from an Excel template.
- Each month's payroll is encoded in a **downloaded Excel register** (one column per payslip item, prefilled with the employees) and uploaded with a checked preview. Staff uploads are saved directly; **client uploads from the portal** wait for the assigned staff to post or return them.
- From it: 1601-C (with the December / separation annualization), 1604-C, the alphalist DAT and CSV, and a 2316 worksheet per employee. A month locks once its 1601-C is filed.

### 3.7b Parties directory

- One firm-wide directory of customers and suppliers by **TIN + branch code**: registered name (or last / first / middle for individuals), address, ZIP, VAT status. Filled automatically when a document with a TIN is approved; verified entries (Owner or reviewer) are never overwritten by OCR.
- OCR review offers "Use directory details" and warns when the scanned name differs. Worksheets and their attachments use the directory's registered name, address and branch code.

### 3.8 Sign-off chain (Q21, Q25, Q32, Q57, Q58)

Every return goes through these states, with name and time stamped at each step:

```
Prepared (Staff)
  → Reviewed (Reviewer)                     — can kick back to Prepared
  → Client Approved (Client User, portal)   — can query back to Reviewed
  → Owner Approved (Owner / Acting Approver) — payment check shown here
  → Filed (filing reference + filed return uploaded)
  → Paid (payment confirmation)
  → Proof Uploaded → sent to client
```

**Payment check at Owner approval (Q25, Q31):**

- The approval screen shows **Paid / Partially paid / Unpaid** for (a) the tax due on this return and (b) the client's retainer balance.
- The **Owner may approve even if it is unpaid.** The unpaid amount becomes a receivable:
  - Client who lets the firm remit (firm-remits): the firm pays BIR from its own funds and records **"Advances to clients – taxes"** (Q32).
  - Client who pays BIR directly (client-pays-direct): the dues stay as **"BIR payment pending (client)"** with reminders (Q32).
- The Acting Approver **cannot** approve an unpaid return (Q58).

### 3.9 Collections & Statement of Account (Q24–Q27, Q31, Q32)

- **SOA per billing run (Q62):** each client has billing days (default the 10th and 20th; once a month for some). A run issues a statement with whatever is ready and not billed yet: the month's retainer (on the month's first statement), tax due on returns the firm remits once reviewed (withholding on the 10th, VAT on the 20th), SSS / PhilHealth / Pag-IBIG contributions and other charges — plus carried balance − credits. Nothing new means no statement. The nightly job runs each day's billing; the Owner can run it by hand. Unique **payment reference** per SOA (e.g. `TC-0042-2026-11-10`).
- **Pay now (Q64):** the SOA lists the firm's bank and e-wallet accounts; the client picks one and sees its QR code, account name and number. Tax money goes to the client-tax-funds account when there is one.
- **Collections screen (Owner only):** every open due by client. The Owner records a deposit (date, method — fund transfer, check, e-wallet, or cash deposited by staff (Q63) — bank, amount, reference) and ticks which dues it covers. Partial payments leave the rest open; overpayments become a **client credit** applied on the next SOA.
- **The firm's own books (Q26):** client deposits for taxes are recorded as a liability, **"Client funds held for tax remittance"**, separate from retainer revenue. A separate bank account for client tax money is recommended.
- **Receivables aging** 30/60/90+ days on the dashboard and the SOA.
- The firm's BIR invoices are still issued **manually** from the registered booklet; the OS only records the invoice number against the payment (Q27).

### 3.10 Monthly cycle & cutoff (Q22, Q28, Q29)

Per client per month:

1. Day 1 — automatic document request (email + portal).
2. Reminders on the 1st and 4th; cutoff on the **5th** (per client, can be changed).
3. Client uploads → OCR → staff review → posting → computation → return → sign-off chain → filing → proof to client.

**Cutoff and carry-forward rules:**

| Situation | Result |
|---|---|
| Uploaded on or before cutoff | Goes into the current cycle |
| Uploaded after cutoff | Goes into the **next** cycle, tagged "late-submitted" (counts against the client's compliance score) |
| Still not approved when the period closes | Stays in the pending bucket and goes into the next cycle |
| Any type (sales, purchases, 2307) late but **same taxable year** | Carried forward to the next open period, flagged "late-recorded" (Q29 as amended by the Owner: sales may also carry forward) |
| Any type from a **prior taxable year** | **Never carried forward.** Goes to the **prior-year exceptions queue** for the Reviewer/Owner to decide (amend, or treat as non-deductible) |

### 3.11 Dashboards & scores (Q36, Q39–Q41, Q51)

**Owner dashboard:**

- Deadlines in the next 14 days by status; overdue returns
- Clients who missed the cutoff
- Review queue size and age, by staff member
- Receivables aging (advances to clients, unpaid retainers)
- Exceptions queue (prior-year items, amendments)
- OCR correction rate by client and document type
- **Clients and load per staff member** against capacity
- Clients not following the system (red compliance score)
- Late filings, split into **client-caused** and **staff-caused**

**Staff capacity (Q39, Q51):** load points = **monthly retainer ÷ ₱1,000**. Capacity target per staff member = (all-in monthly staff cost × 3) ÷ ₱1,000 points (the "rule of thirds"; the staff cost figure is still needed — §9).

**Staff KPIs, monthly with a 12-month trend (Q40):** on-time filing rate, review kickback rate, average days from cutoff to filed, documents processed and OCR corrections made, weighted load.

**Client compliance score, green / yellow / red (Q41):** on-time submission, document quality (% returned), payment timeliness, client-caused late filings. Red clients are flagged for a talk, repricing or offboarding.

### 3.12 Fee schedule & pricing (Q39, Q48–Q52, Q54)

- **One fee schedule per brand** in the database. Quotes, proposals, SOAs and the Phase 2 website calculator all read from it (Q48).
- **Model: low entry, fair scaling (Q54).** Entry prices stay low; volume, annual work and complexity are charged as add-ons; a **late-submission surcharge** applies when documents come after cutoff.
- The OS counts each client's real monthly documents and **flags clients whose volume is above their priced band** (Q49).
- Every quote shows **monthly retainer + estimated annual package = first-year total** (Q50).
- **Existing clients keep their fees until their annual renewal**; the OS shows a **current fee vs computed fee** gap report (Q52).
- Quotes state the tax on the fee (currently non-VAT, 3% percentage tax) and that **clients may withhold EWT on the fee** (Q53).
- **The prices themselves are the Owner's decision and are not final.** A draft band structure for discussion is in Appendix A.
- **Built (Settings → Fee schedule):** versioned schedules with an effective date; the Owner enters prices on a draft and activates it once every band is priced (activating retires the previous one). A quote preview gives monthly retainer + annual package + one-time = first-year total, with the tax-on-fee and EWT notes. A gap report estimates each current client's schedule fee against their retainer (a floor: headcount, withholding kind and bookkeeping load are not recorded yet) and flags document volume above the included band. Audit, AUP, systems implementation, AI & automation and BIR audit support are price-on-request (component K). Not yet: saved quotes/proposals (Phase 2) and putting the late-submission surcharge on statements.

### 3.13 Notifications & automation (Q11, Q12, Q38)

- **Email** (Resend) + **in-app** notifications in v1.
- **n8n** (self-hosted) handles plumbing only: reminder emails, the nightly Google Drive backup, future Viber/SMS. **Tax rules, deadlines and accounting logic stay in the app**, where they are version-controlled and tested.

### 3.14 Privacy, security, retention (Q13, Q45)

- All data (database + files) in **Supabase, Singapore region**.
- Data Privacy Act basics: consent at client signup, a log of who viewed which document, staff see only assigned clients (RLS), client users see only their own client.
- **Backups:** Supabase daily backups with point-in-time recovery, plus a nightly n8n export of the database and documents to the firm's Google Drive.
- **Retention:** nothing is deleted automatically; keep at least **10 years** (above the 5-year BIR requirement under the EOPT Act).

---

## 4. Key workflows

### 4.1 Onboarding a client (Phase 1)

1. Owner/Staff creates the client and uploads the COR → COR reader fills in tax types, RDO, registration date.
2. Engagement is created (service line, services, retainer) → obligations are created from the COR + services.
3. Payment mode, assigned staff, cutoff day, chart-of-accounts template are set.
4. Portal invitation is emailed to client users → consent screen → first login.
5. (1B) Opening trial balance is imported.

### 4.2 Assigning an uploaded document to a period

- Period = the month of the **document date**, if that period is still open and the upload is before its cutoff.
- Otherwise → the next open period in the **same taxable year**, flagged late.
- Document dated in a prior taxable year → exceptions queue.

### 4.3 Amendment

Reviewer or Owner opens an amendment on a filed period, with a reason → Owner approves → period reopens → changes → the return goes back through the sign-off chain as "Amended" → the period locks again.

---

## 5. Data model (first draft)

Main tables (Postgres, all with RLS; all amounts `numeric(18,2)`; all tables have `created_at`, `created_by`, `updated_at`):

| Area | Tables |
|---|---|
| Brand & firm | `brands`, `brand_bank_accounts`, `fee_schedules`, `fee_items`, `holidays`, `deadline_rules` |
| People | `users` (Supabase Auth), `staff_profiles`, `client_users`, `role_grants`, `acting_approver_delegations` |
| Clients | `clients`, `client_contacts`, `client_registrations` (COR data), `engagements`, `engagement_services`, `service_lines`, `staff_assignments` |
| Compliance | `obligations`, `filing_instances` (client × form × period × due date), `filing_events` (each sign-off step), `exceptions` |
| Intake | `documents` (file in Storage + status + period), `extractions` (fields + confidence, model, version), `extraction_corrections`, `document_returns` (reason, client reply) |
| Ledger (1B) | `coa_templates`, `accounts`, `periods` (open / locked), `journal_entries`, `journal_lines` (check: debits = credits per entry), `amendments` |
| Money | `statements` (SOA), `statement_lines`, `deposits`, `deposit_allocations`, `client_credits`, `receivables` (advances / pending BIR) |
| Audit & privacy | `audit_log` (who did what), `access_log` (who viewed which document), `consents` |
| Metrics | Views for staff KPIs, client scores, load and capacity |

---

## 6. Technology (Q5, Q12, Q16)

| Layer | Choice |
|---|---|
| App, portal, later website | **Next.js (App Router, TypeScript)** on **Vercel**, one codebase |
| Database, auth, files | **Supabase** (Postgres, Auth, Storage, RLS, Queues, scheduled jobs, Edge Functions), Singapore region |
| UI | Tailwind CSS + shadcn/ui, styled with the **Tallo CPA brand design system**; design guidance from the **UI UX Pro Max** skill; **Hallmark** to be considered at production |
| OCR | Google Gemini API (paid tier), behind an `ocr-provider` interface |
| Background work | Supabase Queues + scheduled jobs + Edge Functions (OCR pipeline, nightly deadline generation) |
| Automation | **n8n self-hosted** with Docker on a Singapore VPS — Docker Compose file and setup guide go in this repo |
| Email | Resend |
| PDFs | HTML → PDF (books, SOAs, reports, worksheets) |
| Quality | Vitest (unit tests — **every tax rule and ledger calculation**), Playwright (end-to-end), Sentry (errors) |
| Hosting | `app.tallocpa.com` |

**Estimated running cost (Q46):** about US$80–130 / month (~₱7,000–8,000): Supabase Pro ~$25, Vercel Pro ~$20, VPS ~$6, Resend free to $20, Gemini ~$30–60.

**How it is built (Q47):** in this repository, in small pull requests the Owner reviews, deployed to the firm's own Vercel and Supabase accounts.

---

## 7. Design (Q44, brand system)

The **Tallo CPA brand design system** (built from tallocpa.com and the logo files) is the source of truth:

- **Colors:** actions navy `#0f1742` (hover `#0a0f32`); links `#2563eb`; page background `#f8fafc`; cards `#ffffff` with 1px `#e5e5e5` border. Brand inks (`#041a63`, `#0053fb`, `#1195f7`, `#8fc6ff`) are for the logo, charts and print only. Dark theme allowed in the app.
- **Status colors:** Done (Posted, Filed, Paid) = success; Waiting (Needs review, Flagged) = warning; Blocked (Returned, Overdue, Unpaid) = danger; In progress (Awaiting sign-off) = tint; Neutral (Uploaded, Due) = muted.
- **Type:** Montserrat 600/700 for headings; system sans for UI, body and tables. One page title per screen.
- **Numbers:** peso amounts right-aligned, tabular digits, ₱ sign, negatives in parentheses.
- **Icons:** Lucide outline. **Radius:** cards 16px, controls 8px.
- **Voice:** tagline "Clear Numbers. Clean Compliance."; "we / you"; no emoji; never promise a tax outcome.
- **Logo:** only JPEGs on white exist today → the T-grid mark is to be **redrawn as SVG** (light, dark, transparent) for Owner approval (Q59).
- The goal is a site that **does not look AI-generated**: real content, the firm's own photography where possible, no stock gradients.

---

## 8. Moving off Moxie (Q14, Q33)

- **No import (Owner, 23 Nov 2026).** The Moxie import was dropped. Each client is added in the OS from their COR (New client), which works out the obligations from the registered tax types; engagements, retainers and team are entered on the client page.
- **Archive, do not import:** clients, projects, time entries and history stay in Moxie, read-only, and are kept as a downloadable export when Moxie is cancelled.
- **Check while entering clients:** about 20 enabled Moxie tasks were stuck in FAILED with 2025 run dates, so compare each client's obligations in the OS against their COR rather than against Moxie.

---

## 9. Open items

| # | Item | Owner | Needed for |
|---|---|---|---|
| O1 | ~~All-in monthly cost per staff member~~ **Closed:** ₱20,000 → capacity target 60 load points (₱60,000 of retainers) per staff member | Owner | Break-even check on entry prices; capacity target (§3.11) |
| O2 | Final prices for each fee band (Appendix A is a draft) | Owner | Fee schedule, quotes, website calculator |
| O3 | Check every deadline rule in §3.3 against current BIR issuances (EOPT Act RRs, eFPS group dates) and the 2027 holiday proclamation | Staff, Owner review | Deadline engine go-live |
| O4 | Gemini test on ~50 real receipts (Flash vs Pro), confidence thresholds | Build | OCR go-live |
| O5 | Original logo vector files, or approval of the SVG redraw | Owner | Portal and website |
| O6 | Opening trial balances as of 31 Dec 2026 for each bookkeeping client | Staff | Phase 1B |
| O7 | Board of Accountancy firm-name rules before choosing the nationwide brand; whether it needs a registered partnership or corporation | Owner | Nationwide brand (later) |
| O8 | Separate bank account for client tax funds | Owner | Collections (§3.9) |
| O9 | VPS provider account for n8n; Google Workspace account for backups; Resend domain verification for tallocpa.com | Owner | Infrastructure |
| O10 | Which firm bank accounts / e-wallets appear on the SOA | Owner | SOA |
| O11 | Add `RESEND_API_KEY` and `EMAIL_FROM` (e.g. `Tallo CPA <documents@tallocpa.com>`, on the domain verified in O9) to the Vercel project's Production and Preview environment variables, redeploy, then send one test document request | Owner | Emailed monthly document requests and cutoff reminders (§3.10); until then they show in the portal only |
| O12 | ~~Confirm the client compliance score thresholds~~ **Closed 23 Nov 2026:** Owner approved as drafted (in `src/lib/scores/compliance.ts`: documents by the cutoff ≥ 90% green / ≥ 70% yellow; returned documents ≤ 5% / ≤ 15%; paid on time ≥ 90% / ≥ 70%; client-caused late returns 0 / 1; over the last 6 months, worst part wins) | Owner | Compliance score (§3.11) |
| O13 | Brand details for Settings → Brand: TIN and branch code, RDO, COR, addresses, contact details, CPA / PRC-BOA / BIR tax agent / PTR / DTI numbers and validity, signatory name and title, Service Invoice method and series | Owner | Statements, quotes, engagement letters |
| O14 | ~~Whether fee advances count toward the gross receipts watch~~ **Closed 23 Nov 2026:** no. Only collected retainer and other fees applied to a charge count; unapplied advances and client tax money are excluded (as built) | Owner | Gross receipts watch (§3.1) |
| O15 | Confirm the tax treatments chosen when building the worksheets: separation pay always exempt; December annualization (over-withholding as a negative adjustment); 13th-month ceiling applied cumulatively; percentage tax rate by document month vs income-tax rates at year end; sales with only a total treated as VAT-inclusive; 8% option and ₱250,000 reduction; MCIT start year default; branch code 0000 for head office (0001 when unknown) | Owner | Worksheets (§3.7), payroll (§3.7a) |
| O16 | Check form item numbers written from the BIR forms rather than ported from taxify: 2551Q items 13–24, 1604-C Part I items 4–7 and Part II; and whether the alphalist DAT needs D2 records for Schedule 2 | Owner / Staff | 2551Q, 1604-C, alphalist |
| O17 | 2307s the client issued: OCR reads the "party" as the payor (the client), so reviewers must enter the payee's name and TIN until the OCR prompt is adjusted | Build | 0619-E, 1601-EQ, QAP |

---

## Appendix A — Draft fee bands (for discussion, not final)

Based on the Moxie fee schedule and the website calculator, with the review findings. The Owner intends **lower** prices for a nationwide market (Q54); these numbers are a starting structure to adjust, not a decision.

| Component | Band | Draft monthly fee |
|---|---|---|
| A. Base (income tax returns, 2551Q if non-VAT, portal) | Individual / Corp-OPC-Partnership / Non-stock | ₱1,000 – 1,500 / ₱2,000 – 2,500 / ₱2,000 – 2,500 |
| B. VAT (2550Q + SLSP) | Individual / Non-individual | ₱1,000 – 1,500 / ₱2,000 – 2,500 |
| C. Expanded withholding (0619-E, 1601-EQ, QAP, 2307s) | Rental only / TAMP or regular | ₱500 – 1,000 / ₱1,000 – 2,000 |
| D. Payroll 1601-C | 1–9 / 10–29 / 30–49 / 50+ employees | ₱500 / ₱1,000 / ₱2,000 / ₱3,000 + per employee above 50 |
| E. SSS, PhilHealth, Pag-IBIG | Same bands as D | ₱500 / ₱1,000 / ₱2,000 / ₱3,000 |
| F. Document volume | ≤50 / 51–150 / 151–300 / 301+ per month | Included / + / + / Custom |
| G. Bookkeeping | Light / Standard / Heavy | By volume; × for inventory, manufacturing, construction; + per branch |
| H. Annual package | 1604-C, 1604-E, SAWT, Inventory List, AFS + ITR | Current Moxie prices, shown as a first-year total |
| I. One-time | Backlog month / ORUS / Business permit (where served) / SEC | ~1× monthly retainer / ₱1,500 / ₱3,500 / ₱1,500 |
| J. Late-submission surcharge | Documents after cutoff | e.g. ₱500 per month |

**Review findings on the current website calculator** (kept for the pricing decision):

1. The calculator is lower than the internal Moxie schedule (1601-EQ, payroll, contributions) — two price lists that disagree.
2. Transaction volume, the main cost driver, is not priced.
3. Bookkeeping is in the title but not in the price.
4. The 1601-C bands stop at "10+".
5. Annual work is not shown, so first-year bills surprise clients.
6. Backlog catch-up, branches, complexity and BIR audit support are missing.
7. Tax on the fee and EWT are not stated.
8. Leads are sent through `mailto:`, so some are lost.
