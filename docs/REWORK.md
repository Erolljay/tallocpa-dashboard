# Rework: one flow from lead to year-end

| | |
|---|---|
| **Status** | Every area approved by the Owner, 25 November 2026. Week 1 (PR #51) and Phases 1–2 (PR #53) merged. Phase 3 built (PR #54), with Portal Billing (Phase 4) and the Leads pipeline (Phase 5) built alongside it; eSubmission waits on the Google setup. |
| **Screens** | Clickable mockup per user (Owner, Reviewer, Preparer, Client), shared as a claude.ai artifact |
| **Target** | Monthly work and the client portal live before 31 December 2026; year-end and the annual returns ready before their January deadlines |

## The flow

```
Lead → Prospect → Won → Onboarding → Client
                                       │
  Client sends (photo + OCR · Excel · email)
        → Inbox: Sales · Purchases & Expenses · Payroll · Other
        → approved into the Books (Manager.io style)
              Sales Invoice (+ Receipt if cash) · Purchase Invoice (+ Payment if cash) · Payslips
        → the reviewer locks the month
        → its returns appear, built from the tax codes on the invoices
        → Prepared → Reviewed → Client approved → Owner approved (payment verified) → Filed & paid
        → eSubmission of the DAT attachments; the BIR's validation report is attached
        → the client sees it all in the portal
```

## Decisions (Owner, 25 November 2026)

### Intake and Inbox
1. Four streams: **Sales, Purchases & Expenses** (one stream, as on the SLP), **Payroll**, **Other**.
2. Payroll comes in the client's own format (Excel, PDF or a photo). Staff copy it into the Tallo template and load it.
3. The monthly cutoff and "I've sent everything" stay.
4. Approving a document posts it to the Books as the entry chosen on the row: a cash sale is a Sales Invoice **and** its Receipt; a sale on account is a Sales Invoice only, and its balance waits under the Customer; purchases the same with Purchase Invoices and Payments; a customer's 2307 is the CWT line of its Receipt.

### Books (Manager.io style, staff only)
5. **No registers.** Modules: Summary, Bank and Cash Accounts, Receipts, Payments, Customers, Sales Invoices, Suppliers, Purchase Invoices, Employees, Payslips, Journal Entries, Reports, Settings. Lists with Edit / View, a totals row, and status (Paid in full, Overdue, Due in).
6. **Tax codes go only on Sales Invoices and Purchase Invoices.** Receipts and Payments only move cash (Dr Cash, Cr AR; Dr AP, Cr Cash). View shows the Manager-style Transaction Journal.
7. Tax codes: Output VAT 12%, VAT Exempt Sales, Zero-Rated Sales, Input VAT 12% (Capital Goods / Other Goods / Services), VAT Exempt Purchases, Zero-Rated Purchases, **NVS – Non-VAT Sales** and **NVP – Non-VAT Purchases** for non-VAT clients (percentage tax or 8%; every line is coded), **ND – Non-deductible expense** (penalties, surcharges, fines, unsupported expenses: in the books, added back for income tax, on no VAT return or list), **NR – No invoice, not reported (deductible)** for purchases and expenses with no invoice (fish, produce, small sellers: in the income statement and deducted for income tax, on no BIR list or return, supported by the photo or voucher), WC/WI withholding codes, WV010/WV020. A withholding code on a Purchase Invoice is EWT (0619-E, 1601-EQ, QAP, 2307 issued); on a Sales Invoice it is CWT (SAWT, 2307 received).
8. Reports: Balance Sheet, Profit and Loss, Trial Balance, General Ledger, **SLS per customer, SLP per supplier** (Excel and DAT), and the **loose-leaf books** (Sales, Purchase, Cash Receipts, Cash Disbursements and General Journals, General Ledger) in BIR format, monthly and bound for the year.
9. **The reviewer locks a month.** The preparer asks once the month's Inbox is clear. To unlock, the reviewer asks with a reason and the **Owner or the acting approver** unlocks; the Owner and the acting approver in office can also unlock directly, with a reason. Unlocking a month whose return was filed flags it for an **amended return**.

### Returns
10. **A return appears only when the Books for its whole period are locked** (all three months for a quarterly return). Filings lists "Books still open" with the nearest BIR date, so no deadline is lost.
11. Worksheets:
    - **2550Q:** SLS, SLP, SAWT – VAT (WV010/WV020), carry-over from the previous return.
    - **0619-E:** the month's QAP.
    - **1601-EQ:** the quarter's QAP, less months 1 and 2 taken from the 0619-E returns once filed and paid.
    - **1601-C:** the month's list of employees (from the payslips) as the worksheet's supporting schedule; no attachment goes to the BIR. The annual **alphalist DAT** (Schedules 1 and 2, ported from taxify) goes with the **1604-C** in Phase 5.
    - **1702Q:** income statement year to date, the client's income tax method (**OSD, itemized, or 8% for individuals on the 1701Q**, set per client), SAWT, prior payments and carry-over. RCIT vs MCIT.
12. Missing 2307: the CWT is **claimed and followed up**; whether to keep claiming at year end is **the client's decision**, asked on the portal.
13. Sign-off: **Prepared → Reviewed → Client approved → Owner approved → Filed & paid.** Nil returns skip client approval. The Owner approves once the client's payment **for that return's own item** is verified.
14. **Filed & paid:** staff attach **one scanned copy** (return, proof of payment, attachments) on the return; it shows in the client's portal.
15. **eSubmission:** after the Owner's approval, **the app sends** the DAT attachments (SLS, SLP, SAWT, QAP, alphalists) from **attachments@tallocpa.com** to esubmission@bir.gov.ph and attaches the BIR's **validation report** from the reply in that mailbox. Errors: fix and resend. A return with attachments is complete only with its validation report. tallocpa.com is on Google Workspace, so one internal Google app covers Gmail and Calendar with no Google review.
15a. **Tax codes per uploaded document:** OCR suggests the tax code(s) from the VAT figures and the withholding code from the ATC; the Inbox row shows them beside the account title; what staff confirm becomes that customer's or supplier's default for the client. A document with VATable and exempt amounts becomes two lines.
15b. **Paying the client's dues (client's books):** when the Owner verifies the client's payment, the app records a Payment in the cash disbursements journal, dated the day the client paid: Dr EWT payable / Withholding tax – compensation payable / SSS, PhilHealth, Pag-IBIG payable / VAT payable, Cr Cash. **No clearing account.** VAT is first closed when the 2550Q is filed: Dr Output VAT, Cr Input VAT, Cr Creditable VAT withheld (WV), Cr VAT payable; an excess stays as Input VAT carried over.

### Collections and the portal
16. The statement carries the retainer and each return and contribution as its own item. The **Owner ticks which items a verified payment pays**; the rest stay open and the client can keep paying until settled. Verified tax and contribution money is **cash for remittance** until remitted.
17. Portal Billing: the client **chooses a bank or e-wallet and sees only its QR**, uploads the proof; each payment shows **Pending verification → Verified** (with the items it paid) or **Rejected** (with the reason). Previous statements are listed.
18. Portal Home: progress of the month, to-do, financial position and a 6-month chart, dues, the client's team with Book a meeting.
19. Portal Reports: financial statements; **filed returns per year per tax type, one link to the scanned copy**; **2307 per supplier, per transaction, month or quarter**; **2316 per employee per year**; the loose-leaf books. No payroll or BIR-list sections.

### Firm, leads, calendar, year-end
20. Leads pipeline: **Lead → Prospect → Won → Onboarding | Lost** (with a reason). **The Owner assigns a reviewer**, who holds the **discovery call** and writes its notes; quote and proposal follow. When won, the client's preparer and reviewer are picked separately at onboarding.
21. **Onboarding keeps the full checklist** (14 items in 6 groups: engagement, registration, client access, books, payroll, kickoff). The **website inquiry answers** become the lead's notes, and with the discovery-call notes and **every onboarding answer and note** they land in the client's **Notes** on the Overview.
22. **Team calendar** for all staff from each person's **Google Calendar** (personal events as Busy, Tallo events in full) and a public **booking page** that offers the assigned reviewer's free times and books the call with a Meet link.
23. Year-end: close the books (December locked, adjustments, bank reconciliation, trial balance, **closing entry by the Owner**), annual payroll (13th month, annualization, 2316), annual returns (1604-C and 1604-E with eSubmission, inventory list, loose-leaf binding, AFS, 1702-RT), and the client's decisions.
24. The sidebar collapses to icons.

## Navigation

| Sidebar | Holds |
|---|---|
| Home | Overview · My work · Team calendar |
| Clients | Clients · Customers & suppliers · Requests · Registrations; each client: Overview · Inbox · Books · Returns · Year-end |
| Inbox | Waiting for approval, by stream · Month status |
| Filings | By due date: overdue, this week, later; books still open |
| Firm (Owner; reviewers see their leads) | Leads · Collections · Staff · Scores · Settings |

## What changes underneath

| Area | Today | Rework |
|---|---|---|
| Approved documents | `register_lines`, then a suggested journal entry | Books transactions: `sales_invoices`, `receipts`, `purchase_invoices`, `payments` (with lines and tax codes), posting to the existing `journal_entries` / `journal_lines`; AR/AP from the existing `open_items` by party |
| Tax codes | Implied by document fields (VAT status, SLP category, ATC) | A `tax_codes` table with rate and the form lines each feeds; one code per invoice line |
| Month lock | Automatic when a return covering the month is filed | Locked by the reviewer; unlock request and Owner/acting-approver unlock; amended-return flag |
| Returns | Worksheets read the register and documents | Worksheets read the invoices by tax code, for locked periods only |
| Sign-off | 7 steps | 5 steps; nil skips client approval; payment check per item; filed copy; eSubmission step |
| Payroll | Payroll entries per run | Payslips per employee per pay period in the Books, from the Tallo template |
| Collections | Payment applied oldest item first | Owner ticks the items; cash for remittance; channel QR; payment statuses |
| Google | — | Calendar (free/busy, events with Meet) per staff member; Gmail of the firm's mailbox for eSubmission |

Existing data moves across in a migration: every approved document and register line becomes its invoice (and receipt or payment), keeping its account title and figures; filed months stay locked. Reports run old and new side by side until they agree to the centavo.

## Build plan

| Phase | Dates | Scope |
|---|---|---|
| 0 · Week 1 | Merged Nov 25 | Five-place sidebar, Inbox by stream, payroll intake (PR #51). |
| 1 · Books | Nov 26 – Dec 6 · database built Nov 25 | Tax codes; Sales Invoices, Receipts, Purchase Invoices, Payments with AR/AP per party; Inbox approval posts to the Books; Manager-style modules, lists, Transaction Journal view, Summary; migration from the register; collapsible sidebar |
| 2 · Lock and payroll | Dec 7 – Dec 13 | Payslips in the Books; reviewer lock, unlock requests, amended-return flag; returns appear only for locked periods; Filings by due date with books still open |
| 3 · Returns | Dec 14 – Dec 20 | Worksheets (2550Q, 0619-E, 1601-EQ, 1601-C, 1702Q) from tax codes; SLS/SLP/SAWT/QAP DAT; income tax method per client; 5-step sign-off with per-item payment check; filed copy; eSubmission through the firm's Gmail with the validation report |
| 4 · Collections and portal | Dec 21 – Dec 31 | Items ticked on verification, cash for remittance, payment statuses; portal Home, Upload, Reports (filed returns, 2307 and 2316 generators, loose-leaf books), Billing (channel QR, previous statements) |
| 5 · Year-end, leads, calendar | Jan 2 – Jan 15 | Year-end page and closing entry, 1604-C/1604-E with eSubmission, 2316 final; Leads pipeline with discovery calls; inquiry, discovery-call and onboarding answers into client Notes; Google Calendar team calendar and booking page |

### What depends on Phase 3

| Part | Needs Phase 3 | Why |
|---|---|---|
| Collections: items ticked on verification, cash for remittance | Yes | Each return is its own statement item, with the tax due from its worksheet; the Owner's approval is step 4 of the sign-off |
| Portal: filed returns | Yes | The link opens the filed copy attached in Phase 3 |
| Portal Billing: channel QR, proof upload, payment statuses, previous statements | No | Billing only; built alongside Phase 3 |
| Portal: 2307, 2316, loose-leaf books | No | From the Books (Phase 1) and payroll |
| 1604-C / 1604-E | Yes | Reuse the Phase 3 eSubmission; the 1604-E is built from the year's QAP |
| Year-end close, annual income tax | Yes | Need the income tax method per client |
| Leads pipeline, discovery calls, client Notes | No | Built alongside Phase 3 |
| Team calendar, booking page | No | Needs only the Google setup, the same one as eSubmission |

Each phase ships as its own pull request, with database tests for every new rule (posting, lock, tax-code totals, sign-off, payment allocation) and a check against the old figures before the old screens are retired.

## Needed from the Owner

1. **Google (before Phase 3):** in Google Cloud under tallocpa.com, a project with an Internal consent screen, the Calendar and Gmail APIs on, and an OAuth client whose ID and secret go into Vercel. Set up the attachments@tallocpa.com mailbox.
2. **Payment channels:** each bank or e-wallet you accept, with its QR image, account name and number (Settings).
3. **Tax codes:** the full list from your Manager.io (the screenshot started at "Input VAT 12% (Capital Goods)"), so the codes and their form lines match yours.
4. **Loose-leaf details per client:** permit number and registered address, if not already on the COR.
