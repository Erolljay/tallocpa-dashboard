# Decisions Log

Decisions from the design interview (2026-11-23) that the specification rests on. **Owner's answer wins** where it differs from the recommendation. July 2026 planning artifacts are superseded where they conflict.

| # | Topic | Decision |
|---|---|---|
| Q1 | Core job | BIR compliance engine + staff work management; the client-facing core is **document intake with OCR** |
| Q2 | Users | Owner, staff **and clients** (client portal in v1) |
| Q3 | Systems | The OS **replaces Moxie and Manager.io**; **n8n** added as the automation layer |
| Q4 | Receivership & liquidation | ~~Later, after tax compliance and bookkeeping~~ **Superseded by Q66:** handled on another platform, not in the OS |
| Q5 | Build approach | Custom build (Next.js + Supabase + Vercel) |
| Q6 | Deadline tracking | Settled by Q3: deadlines live in the OS, generated from rules, not Moxie recurring tasks |
| Q7 | Phasing | Moxie not used at all; the OS will cover website → lead → CRM → proposal → engagement, but **tax compliance + bookkeeping + firm processes first**, with room for BPO, FS Audit, AUP, AI & Business Automation, Systems Implementation, Receivership & Liquidation |
| Q8 | OCR document types v1 | Sales/ORs, purchase receipts, **BIR 2307 issued and received**, COR |
| Q9 | OCR engine | **Gemini** (handwritten invoices); every extraction goes through staff review |
| Q10 | Intake channel | **Portal upload only** for now |
| Q11 | n8n role | Plumbing only; business rules stay in the app |
| Q12 | n8n hosting | Self-hosted on a VPS |
| Q13 | Data / privacy | Supabase Singapore; Data Privacy Act basics from day one |
| Q14 | Seed data | ~~Import clients, obligations, fee schedule from Moxie~~ **Changed 23 Nov 2026:** no Moxie import; clients are entered from their COR (spec §8) |
| Q15 | OCR testing | Swappable OCR; test on ~50 real receipts to choose model and thresholds |
| Q16 | Tech stack | Next.js/Vercel, Supabase, Tailwind + shadcn/ui, Supabase Queues, n8n, Resend, HTML→PDF, Vitest/Playwright/Sentry |
| Q17 | Phase 1 scope | Minimal engagement record; full lead → proposal pipeline in Phase 2; service lines in the data model now |
| Q18 | Bookkeeping | Double-entry per client; BIR loose-leaf books; no client CAS registration in v1 |
| Q19 | Chart of accounts | Standard templates by client type, customizable |
| Q20 | Deadline rules | Editable data table with effective dates and holiday roll-forward |
| Q21 | Roles & sign-off | Owner / Reviewer / Staff / Client User; logged sign-off chain. **Added by Owner:** payment check — tax dues and retainer must be paid (recon to the firm's bank) before approval |
| Q22 | Monthly cycle | Standard pipeline per client. **Added by Owner:** client submission deadline; unapproved items stay pending and roll to the next cycle within the same year |
| Q23 | Who pays BIR | Both modes per client: firm-remits and client-pays-direct |
| Q24 | Bank matching | **Owner matches deposits manually** against the firm's bank accounts; no statement import |
| Q25 | Strictness | Owner is the only user of the check; **may approve without payment** — the unpaid amount becomes a client receivable |
| Q26 | Client tax money | Liability "Client funds held for tax remittance"; separate bank account recommended |
| Q27 | Firm billing in Phase 1 | **SOA only**; BIR invoices stay manual |
| Q28 | Client cutoff | 5th of the following month, configurable; late uploads go to the next cycle |
| Q29 | Carry-forward | Purchases, 2307s **and sales** carry forward within the same taxable year; **nothing crosses into the next year** (exceptions queue) |
| Q30 | Period lock | Filed periods are locked; changes only through Owner-approved amendment |
| Q31 | Collections screen | Owner-only; partials stay open; overpayments become client credit |
| Q32 | Approved but unpaid | Firm-remits → "Advances to clients – taxes"; client-pays-direct → "BIR payment pending"; aging shown |
| Q33 | Moxie migration | ~~One-time import;~~ no import (see Q14); Moxie read-only for one cycle, then cancelled |
| Q34 | Go-live | Taxable year 2027; compliance + portal in January, bookkeeping a few weeks later posting back to 1 Jan; opening TB as of 31 Dec 2026 |
| Q35 | Client portal | Upload, document status, filing calendar, SOA — **plus returns and reports**; no chat |
| Q36 | Owner dashboard | Deadlines, overdue, missed cutoffs, review queue, receivables, exceptions, OCR correction rate — **plus clients per staff (capacity), clients not following the system, late filings, per-staff KPIs** |
| Q37 | Time tracking | **None** — fixed retainers |
| Q38 | Notifications | Email + in-app; Viber/SMS later via n8n |
| Q39 | Capacity | Weighted by fee bands. Owner asked for help building the fee bands and a review of the current calculator |
| Q40 | Staff KPIs | On-time rate, kickback rate, cutoff-to-filed days, documents processed, load |
| Q41 | Client compliance score | Green/yellow/red; client-caused vs staff-caused lateness |
| Q42 | Client reports | Released only after Owner approval |
| Q43 | Phase 2 website & leads | Website → lead → auto-quote → e-signed engagement → automatic setup |
| Q44 | Branding & legal name | Brand **Tallo CPA**; legal name **EJ Tallo Cloud Accounting and Auditing Services**; use the Tallo CPA brand design system + UI UX Pro Max; consider Hallmark at production |
| Q45 | Backups & retention | Supabase backups + PITR, nightly backup to Google Drive, keep ≥10 years |
| Q46 | Running cost | ~₱7–8k / month accepted |
| Q47 | Build process | In this repo, small PRs reviewed by the Owner, deployed to the firm's accounts; tests for all tax and ledger logic |
| Q48 | Single price list | Yes — **Owner sets final prices**; the aim is lower prices because automation removes the firm's workload and the target is a nationwide market |
| Q49 | Volume pricing | Volume band + bookkeeping priced by volume; OS flags clients above their band |
| Q50 | Annual package | Shown on every quote as part of the first-year total |
| Q51 | Load points | Monthly retainer ÷ ₱1,000 |
| Q52 | Existing clients | Keep fees until renewal; gap report |
| Q53 | Firm tax status | **Non-VAT**; staff cost still open |
| Q54 | Pricing model | Low entry, fair scaling, late-submission surcharge |
| Q55 | VAT threshold | Tax-on-fee is a setting; warn at ₱2.5M year-to-date |
| Q56 | Nationwide | Remote onboarding, online payment channels, LGU services only where served. **The nationwide rollout will be a separate brand, not in the Owner's name — later** |
| Q57 | Client approval | Client approves the computed return in the portal before Owner approval |
| Q58 | Owner away | Acting approver with limits; cannot override the payment check; daily digest |
| Q59 | Logo | Redraw the T-grid mark as SVG for approval if originals are not available |
| Q60 | Multi-brand | Brand and legal entity are settings in the database; only Tallo CPA configured now |
| Q61 | Users & businesses | A business can have several client users; one person can be linked to several businesses. **Staff can upload and run OCR for their assigned clients.** (Owner, during Phase 1A build) |
| Q62 | Billing runs | Clients are billed on **their own billing days, usually the 10th and the 20th, or once a month**. The 10th carries withholding returns (1601-C, 0619-E), SSS / PhilHealth / Pag-IBIG contributions and the month's retainer; the 20th carries VAT. A run bills only what is ready (returns once reviewed) and is automated by the nightly job. (Owner, during Phase 1A build) **Superseded by docs/REWORK.md 16c: the Owner runs billing from Ready to bill.** |
| Q63 | Payments received | Mostly fund transfer and checks, seldom cash; **cash is deposited to the bank by staff**. Each payment records its method (and who deposited cash). (Owner, during Phase 1A build) |
| Q64 | Pay now on the SOA | The SOA shows the firm's payment channels; the client chooses a bank or e-wallet and sees its **QR code, account name and account number**. (Owner, during Phase 1A build) |
| Q65 | Logo files | Owner supplied the mark and horizontal lockup (JPEG); the mark is redrawn as SVG from them, rectangle by rectangle, for the app and favicon. (Owner, during Phase 1A build) |
| Q66 | Service lines in the OS | **Final list: Tax Compliance, Bookkeeping, Business Registration, BIR LOA Services.** FS Audit, Agreed-Upon Procedures, Receivership & Liquidation and the other services (Business Processing, Systems Implementation, AI & Business Automation) stay on another platform. Order: 1B Bookkeeping → 1C Business Registration → Phase 2 Growth → Phase 3 Money → Phase 4 BIR LOA Services (last). Supersedes Q4 and the service-line part of Q7. (Owner, 24 Nov 2026) |
| Q67 | LOA risk analytics | Part of Phase 4, once there is enough ledger data. Ratios per client compared with industry benchmarks to keep clients away from an LOA: e.g. income tax at least about **2% of gross sales**, **gross profit rate** within the industry's range. Benchmarks are Owner-edited data by industry, not code. (Owner, 24 Nov 2026) |
| Q68 | Branches | The firm is in **Iloilo** now and will open branches later. Branches are in the data model now: every client and staff member (except the Owner) belongs to one, so the Owner sees staff and reviewers per branch when adding clients. Access stays by assignment. Acting approver built with Q58 at the same time: Reviewers only, one at a time, no approval of the stand-in's own prepared returns. (Owner, 24 Nov 2026) |
| Q69 | Which returns lock the books | Withholding (0619-E, 1601-C, 1601-EQ), business tax (2550Q, 2551Q) and income tax returns (1701Q, 1702Q, annual ITRs) lock their months once filed. Information returns (1604-C, 1604-E, Inventory List) do not. (Owner, 24 Nov 2026) |
| Q70 | Owner's own amendment | When the Owner asks for an amendment, the months reopen at once, with no second approval step. (Owner, 24 Nov 2026) |
| Q71 | Acting approver and amendments | Only the Owner approves amendments; the acting approver does not. (Owner, 24 Nov 2026) |
| Q72 | Late documents in a locked month | A document dated in a locked month is booked on the first open month of the same taxable year, with its own date in the memo, rather than waiting for an amendment. (Owner, 24 Nov 2026) |
| Q73 | Amended returns | An amended return is a new return of the same form and period, labelled "<period> Amended" (e.g. 1601-C 2026-10 Amended; "Amended 2" for a second one), and goes through the whole sign-off chain; the filed original stays on record. (Owner, 24 Nov 2026) |
| Q74 | Cash flow statement | Built by the indirect method from the ledger; every account carries a cash-flow classification (cash, operating, investing, financing, non-cash), editable per account. (Owner, 24 Nov 2026) |
| Q75 | AI employees | The firm will have AI employees, each with a job, a department and a human supervisor; they prepare work and people sign off. Design in [`AI-WORKFORCE.md`](AI-WORKFORCE.md). (Owner, 27 Nov 2026) |
| Q76 | AI model for in-app employees | AI employees that run inside the app (and call a paid API) use **Qwen**; AI employees with a desk in the Owner's Claude Cowork use the Owner's Claude plan. (Owner, 27 Nov 2026) |
| Q77 | TalloCPA OS MCP server | The app gets an MCP server so AI employees reach it with their own credentials; new features add their own AI tools. (Owner, 27 Nov 2026) |
| Q78 | Marketing & Growth | AI employees for marketing, social media and SEO join the workforce as their own department. (Owner, 27 Nov 2026) |
| Q79 | FS Preparer | An AI employee prepares financial statements in the firm's design with the firm's full notes; amounts, totals and note numbering come from the books, so the FS cannot carry those errors. Its desk is in the Owner's Cowork. (Owner, 27 Nov 2026) |
