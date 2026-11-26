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
5. Covers exactly four service lines — Tax Compliance, Bookkeeping, Business Registration and BIR LOA Services — and is built to take a second brand (Q17, Q60, Q66).

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
- BIR LOA Services with LOA risk analytics (Phase 4), see §2
- **Not in the OS at all (Q66):** FS Audit, Agreed-Upon Procedures, Receivership & Liquidation, Business Processing, Systems Implementation, AI & Business Automation. These run on another platform.
- Viber, SMS, Messenger channels (later, through n8n, Q10, Q38)
- Registering clients' books as a computerized accounting system (CAS) with BIR (Q18)
- The nationwide brand (later, Q56, Q60)

---

## 2. Phasing (Q7, Q17, Q34)

| Phase | Scope | Target |
|---|---|---|
| **1A — Compliance core** | Brand/entity settings, clients & engagements, filing obligations, deadline engine, client portal + OCR intake + review queue, sign-off chain, Collections & SOA, owner dashboard & scores | **Live for the January 2027 cycle** (December 2026 returns stay in the current tools) |
| **1B — Bookkeeping** | Per-client ledger, chart-of-accounts templates, posting from reviewed documents, BIR loose-leaf books, returns computed from the ledger, period lock, client reports | A few weeks after 1A; **posts back to 1 January 2027** from opening trial balances as of 31 December 2026 |
| **1C — Business Registration** | New-business registration as a service: DTI / SEC, barangay and mayor's permit (where served), BIR registration (ORUS, COR / Form 2303, books, invoices), SSS / PhilHealth / Pag-IBIG employer registration; checklist and status per step; the finished COR feeds client onboarding (§4.1) | Right after 1B (Q66) |
| **2 — Growth** | Public website (tallocpa.com) → lead → auto-quote from COR + fee schedule → proposal → e-signed engagement → client set up automatically | After Phase 1 runs one clean cycle. **Funnel built and open** (built 25 Nov 2026; the database shows it switched on as of 26 Nov 2026): /start → Leads → proposal link → online acceptance → client in Onboarding. Not built yet: emailing the proposal link, and reading a COR uploaded on the form |
| **3 — Money** | Full billing, retainers, collections, reference-based automatic payment matching | After Phase 2 |
| **4 — BIR LOA Services & LOA risk analytics** | (a) Support when a client receives a BIR Letter of Authority: LOA and notices received, BIR deadlines on each notice (e.g. document submission, PAN / FAN replies), documents requested and submitted, assessments and how they were settled. (b) **LOA risk analytics** (§3.15): ratios from each client's ledger and returns compared against benchmarks by industry, to flag clients likely to draw an LOA before BIR does | Last, after Phase 3 (Q66). Analytics need at least one full year of ledger data per client |
| **Later** | Nationwide brand, Viber/SMS. **No other service lines** are planned (Q66) | — |

**Cutover rule (Q7, Q33):** clients are entered in the OS from their COR (there is no Moxie import, §8); Moxie stays read-only for reference until the OS completes one full monthly cycle, then it is cancelled. Manager.io stays for 2026 books and is retired after the 2026 annual filings.

---

## 3. Modules (Phase 1)

### 3.1 Brands & firm settings (Q44, Q55, Q60)

- A **brand** holds: display name, legal name, logo files, color tokens, BIR registration (TIN, RDO, COR), **tax-on-fee setting** (non-VAT 3% percentage tax ↔ 12% VAT), bank and e-wallet accounts for payments, fee schedule, portal domain, email sender.
- Only **Tallo CPA** is configured now. Every client belongs to one brand.
- **Branches (Q68):** each brand has branches; **Iloilo** is the only one now. Every client and every staff member except the Owner belongs to one branch. When the Owner assigns a client, staff are listed by branch with the client's branch first. Access still follows assignments, not branches. Settings → Branches adds, renames and closes branches; a closed branch keeps its history.
- **Gross receipts watch (Q55):** the OS sums the brand's own year-to-date collections and warns the Owner at **₱2.5M**, before the ₱3M VAT registration threshold. Switching the setting to VAT updates SOAs and quotes; existing prices are not changed by themselves.

### 3.2 Clients & engagements (Q3, Q17, Q33)

- **Client:** taxpayer type (individual / OPC / partnership / corporation / non-stock), TIN, RDO, registered address, COR data (from the COR reader), filing channel (eFPS group or eBIRForms), fiscal year end, book type (manual / loose-leaf), payment mode (firm-remits or client-pays-direct, Q23), assigned Staff and Reviewer, submission cutoff day (default 5th, Q28).
- **Engagement:** client, brand, **service line**, services subscribed (from the fee schedule), monthly retainer, start date, status. Phase 1 is a minimal record; the full proposal → engagement flow comes in Phase 2.
- **Service lines** (final list, Q66): Tax Compliance, Bookkeeping, Business Registration, BIR LOA Services. Phase 1 uses the first two. Audit, AUP, Receivership & Liquidation and the firm's other services are handled on another platform, not in the OS.
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
- **AR / AP:** charge invoices open receivables and payables by customer / supplier. Collections and payments come from a **monthly AR/AP update workbook** the client downloads at month end, fills in and uploads (staff post or return it); they post to the Cash Receipts and Cash Disbursements Books. The AR and AP control accounts always equal the open items.
- **Account title on each document:** prefilled from the client's history with that supplier, then the supplier's firm-wide preset in the parties directory (e.g. Starbucks → Representation), then the document type's default; staff can change it.
- **Built (slice 1):** client books set up from five chart-of-accounts templates (single proprietorship, partnership, stock corporation, OPC, non-stock), each account mapped to its FS line and, for income and expenses, its BIR income tax line; chart editing; opening balances workbook (trial balance + open receivables and payables, which must tie to AR and AP); manual journal entries and reversals; trial balance by month. The database refuses unbalanced entries and changes to posted ones. 
- **Built (slice 2):** approving a bookkeeping client's sales invoice, purchase receipt or 2307 makes a suggested entry (VAT split for VAT-registered clients; cash or charge from the invoice, read by OCR); the account title is chosen on the review screen, prefilled from the client's history with the party, then the party's preset in the parties directory, then the document type's default. Staff confirm suggestions on the Books page; charge invoices open receivables and payables, 2307s settle the party's oldest, and the monthly AR/AP update workbook (staff upload for now) posts collections and payments against named invoices. Aging and an AR/AP-to-ledger tie-out on the Books page. A document's figures cannot change once its entry is posted. 
- **Built (slice 3):** the six books printed on ruled pages laid out like the firm's columnar journal pads (numbered lines down both edges, red column rules, blue line rules, money in pesos and centavos): General Journal, General Ledger (running balances, account titles repeated on continuation pages), and the columnar Cash Receipts, Cash Disbursements, Sales and Purchase books (main columns plus Sundry, totals carried forward page to page). Portrait 8.5 × 13 in, landscape for the cash books; page numbers continue from the start of the taxable year; the loose-leaf permit / registration reference prints on each page (manual-book clients get the same pages to copy). Each book also downloads as Excel.
- **Built (slice 4):** period lock and amendments. A month of the books locks once a return covering it that is computed from the books is Filed, Paid or Proof uploaded: 0619-E, 1601-C, 1601-EQ, 2550Q, 2551Q, 1701Q, 1702Q and the annual income tax returns (information returns such as 1604-C, 1604-E and the Inventory List do not lock). The database refuses posting, confirming suggestions, AR/AP updates and reversals dated in a locked month, and replacing the opening balances once the first month is locked; an entry of a locked month can still be reversed in an open month. A document dated in a locked month (handed in late) is suggested on the first day of the next open month of the same taxable year, with its own date in the memo (§4.2). **Amendment:** the Owner or the client's reviewer asks to reopen a filed return's months with a reason → the Owner approves or rejects with a reason (the Owner's own request reopens at once; the acting approver does not approve amendments) → corrections are posted → the Owner or the reviewer locks the months again, noting what changed. Every step is logged. The Books page shows each month as Open, Locked (with the returns filed) or Reopened; the Owner's dashboard lists amendments waiting for approval. The amended return then goes through the sign-off chain as a new filing (slice 7, §4.3). (Q69–Q72)
- **Built (slice 5):** quarterly income tax from the ledger. For a client whose books started on or before the first day of the taxable year, the 1701Q and 1702Q worksheets take sales (net of returns and discounts), cost of sales, other taxable income and the itemized deductions from the posted entries of the quarter and of the earlier quarters, grouped by each account's BIR line; staff no longer type cost of sales or other income. Income subject to final tax, exempt income, non-deductible expenses and the provision for income tax are left out (and noted). An income or expense account without a BIR line blocks the worksheet until it is mapped; suggested entries not yet posted are flagged. Creditable tax withheld still comes from the 2307s (the SAWT needs each payor). Clients without books, or whose books started mid-year, stay on documents. Annual 1701 / 1702-RT: slice 7.
- **Built (slice 6):** financial statements from the ledger, by each account's FS line, in the order of the firm's FS working papers: Statement of Financial Position (as of the period end), Statement of Comprehensive Income (the month or quarter beside the year to date, or the year), Statement of Changes in Equity (year to date) and Notes (the accounts behind each FS line that has a note, numbered in the order the lines appear). Monthly, quarterly and annual reports follow the client's taxable year. The books are not closed at year end yet, so the year's income shows as "Net income for the year to date" and earlier years' unclosed income on its own equity line. Staff view and print them under Books → Financial statements, with warnings when assets differ from liabilities and equity, when an account's FS line is unknown, or when suggested entries are not posted. **The Owner releases a report to the client** (Q42): it is stored exactly as released, so later postings do not change it; releasing again replaces it, and the Owner can withdraw it. Clients see released reports in a **Reports** tab in the portal (it appears once a report is released). 
- **Built (slice 7):** **year-end closing**: the closing entry on the last day of the taxable year brings income and expenses to nil against retained earnings / fund balance, the owner's capital (with the drawings) or the partners' capital by the shares given; refused before the year ends or with suggested entries pending; reversing it allows closing again. The trial balance and statements read a range before its own closing entries, so the year's statements and returns still show the year's income and the next year opens with it in equity; the period lock does not stop closing. **Annual 1702-RT and 1701 / 1701A worksheets** from the books (or documents), with OSD or itemized and NOLCO, regular rate vs MCIT and the prior years' excess MCIT, 8% or graduated with compensation income; the first three quarters' payments carry in from the last quarterly worksheet; schedules of itemized deductions by BIR line, the reconciliation of net income per books with taxable income, and the balance sheet. Lines are labelled, not numbered: check item numbers against the current forms; no annual SAWT DAT yet. **Statement of cash flows** (indirect method, Q74), each account carrying a cash-flow class set on the chart of accounts (or worked out from its FS line), reconciled to the change in cash. **Annual reports show the prior year** beside the current one when the books hold it. **Amended returns** (§4.3, Q73).
- **Requests & tickets (built, first version):** firm requests to clients and client tickets, each a thread of messages with optional files (photos, PDF, Excel, Word; private "requests" storage). Staff send a request from the Requests page or from a registration step; clients see them in the portal under **Requests** (with a count of what waits on them), reply with files, and open their own tickets. A request on a registration step puts the step on "Waiting on client"; the client's reply puts it back to "In progress". Still to come: the monthly AR/AP update and bank statements as standing requests (this changes Q35, no chat).
- **Owners, tasks and remittances (26 Nov 2026):** each request and ticket has a staff member who answers for it and a priority (low, normal, high): a request belongs to whoever sent it, a client's ticket to the client's preparer (else anyone on the client, else the Owner); staff on the client hand it to someone else who works on the client, who is notified, and the client's replies notify only that person. **Tasks** are the firm's own to-dos, which the app does not work out by itself: anyone on staff creates one (optionally for a client and a month, or from a ticket with "Make a task"), assigns it to someone who works on the client, with a due date and priority; the assignee, whoever created it and the Owner change, finish, cancel or reopen it; clients never see tasks. **SSS, PhilHealth and Pag-IBIG remittances** run like a return: a client's employer numbers (with the first month with employees) create one remittance per agency and month, three months back to the current month (nightly, or "Create this month's"); SSS and Pag-IBIG loan payments are added by hand. Deadlines: SSS and SSS loans the last day of the following month; PhilHealth the 15th (PEN ending 0–4) or the 20th (5–9) of the following month; Pag-IBIG by the first letter of the employer's registered name (A–D the 14th, E–L the 19th, M–Q the 24th, R–Z the last day); moved to the next working day; staff may change one (agency advisories) — **to verify against the agencies' current circulars**. Staff prepare (EE, ER and EC shares, headcount, PRN, with the contribution report attached; amounts start from the month's payroll), the Owner approves (for firm-remits clients the total goes on the next statement as a contribution item, using an unbilled item entered by hand for the same agency and month instead of adding a second), and the remittance is recorded paid with the proof of payment (the Owner for firm-remits clients, which marks the statement item remitted; staff on the client when the client pays the agency). A month with no employees is marked Not required with the reason. The client sees the PRN and amount once approved and every file once remitted (portal → Returns → SSS, PhilHealth and Pag-IBIG).
- **Remittances from the payroll; tasks as jobs (26 Nov 2026, later the same day):** SSS, PhilHealth and Pag-IBIG (and SSS and Pag-IBIG loans) come from the posted payroll, for clients the Owner switches on ("We handle this client's SSS, PhilHealth and Pag-IBIG"): posting or reversing a payroll run brings the month's remittances in line (EE, ER and EC per employee — EC is now its own payroll item, credited to SSS Payable). Staff do not type amounts: they copy the app's employee list into the agency's site, attach the PRN generated there and mark it prepared; a prepared remittance whose payroll changes goes back for a new PRN. The remittances sit beside the month's 1601-C (on its page and on Deadlines). When a client that pays the agency itself has paid, the payment posts in its cash disbursements book (Dr the payable, Cr Cash), as a return's tax due does at Filed & paid. **Tasks** run Client → Preparer → Reviewer → Done (the client's part is a request in the portal; their reply hands the task back), may name a job from the active fee schedule with its price, and when done the job waits in Ready to bill for the Owner's billing run (reopening takes an unbilled job off). Registration steps show as tasks (the client's in the portal), and a completed case is billed as one job from the fee schedule (plus the employer registrations); with no price in the schedule, the Owner gets a task to price and bill it.

### 3.7 Tax computation & returns (Q22)

- Return figures are **computed from the ledger** (Phase 1B) or, until then, from approved documents. Nothing is retyped by hand.
- The OS produces a **return worksheet** (figures by line of the BIR form) and the attachments (SAWT, QAP, SLSP data files). Filing itself stays in eFPS / eBIRForms and is done by staff; the OS records the filing reference and the proof.
- **Built:** a Worksheet page on each filing for 0619-E, 1601-EQ (+ QAP), 2551Q, 2550Q (+ SLS/SLP), 1701Q, 1702Q (+ SAWT), 1601-C and 1604-C (+ alphalist Schedules 1 and 2). Rules, ATC table, effective-dated rates and DAT layouts are ported from the Owner's taxify extension (QAP and alphalist DAT match taxify byte for byte). Figures come from approved documents (status Posted with approved fields, counted in the document's own month) and from figures staff type in; worksheets are staff working papers (clients do not see them) and lock once the return is filed. For bookkeeping clients, 1701Q and 1702Q take income and itemized deductions from the ledger (§3.6 slice 5). Since built: annual 1701 / 1702-RT (§3.6 slice 7), 1604-E from the year's QAP (REWORK.md Phase 5) and printable 2307s (Books → Reports → 2307). Not yet: the SAWT DAT file for annual returns (the annual worksheets show the SAWT as a schedule only).
- **Built (rework phase 3a, REWORK.md decisions 10–12):** for a client with Books, worksheets read the Sales and Purchase Invoices by tax code (books_return_sources), only once every month of the period (the year to date for 1701Q/1702Q) is locked; until then the worksheet says which months are open and cannot be saved. 2550Q: SLS from the VAT codes on sales lines (an SC/PWD discount comes off exempt sales first), SLP by column from the Input VAT codes, Schedule 3 from WV010/WV020, Item 38 from the previous 2550Q's excess input VAT (across years). 0619-E: the month's EWT from withholding codes on Purchase Invoices, with the month's QAP. 1601-EQ: the quarter's QAP, less the 0619-E of months 1 and 2 once filed and paid. 1601-C: the month's payslips as a supporting schedule (CSV; not sent to the BIR). 1701Q/1702Q/2551Q: the client's income tax method (OSD, itemized, or 8% for individuals; set on the client page); SAWT from CWT codes on Sales Invoices; ND lines added back, NR and NVP deductible; NVS feeds the 2551Q. A CWT without its 2307 stays claimed and is marked followed up on the Sales Invoice. Months before the books start, and clients without Books, still read approved documents.

### 3.7a Payroll (1601-C, 1604-C, alphalist)

- Per client: **payslip items** (earning / deduction / employer contribution), each mapped to a BIR category (taxify's list; "none" for loans and cash advances), and an **employee list** with every alphalist field. Employees are added one by one or in bulk from an Excel template.
- Each month's payroll is encoded in a **downloaded Excel register** (one column per payslip item, prefilled with the employees) and uploaded with a checked preview. Staff uploads are saved directly; **client uploads from the portal** wait for the assigned staff to post or return them.
- From it: 1601-C (with the December / separation annualization), 1604-C, the alphalist DAT and CSV, and **BIR Form 2316** in the official September 2021 layout (one employee or print all; previous employer in Part III; per-client signatory). Clients can print their employees' 2316s in the portal once staff release the year. A month locks once its 1601-C is filed.

### 3.7b Parties directory

- One firm-wide directory of customers and suppliers by **TIN + branch code**: registered name (or last / first / middle for individuals), address, ZIP, VAT status. Filled automatically when a document with a TIN is approved; verified entries (Owner or reviewer) are never overwritten by OCR.
- It is a helper, not a menu item: **when OCR reads a document**, a TIN on file fills in the registered name, address and branch code automatically. If OCR read a clearly different name, nothing is replaced (the TIN may be misread) and the reviewer sees a warning with "Use directory details". Worksheets and their attachments use the directory's details. The list is reached from each client's page and from document review, for corrections and verifying.

### 3.7c Business Registration (Phase 1C; Q66)

- **A registration case** for a business that does not exist yet. The Owner opens it with the proposed name, kind of business, city or municipality, branch, target date and preparer; this adds the business as a client (Onboarding, no TIN) with a Business Registration engagement.
- **Checklist of agency steps**, worked out from the kind of business and saved with the case: DTI business name (sole proprietor) or SEC name reservation and registration (partnership, corporation, OPC, non-stock); barangay clearance and mayor's permit at City Hall (marked not needed when the client handles them); BIR registration through ORUS (Form 1901 or 1903), COR (Form 2303), books, Authority to Print and invoices, eBIRForms / eFPS enrollment, COR and "Ask for invoice" notice displayed; SSS, PhilHealth (PHIC) and Pag-IBIG (HDMF) employer registration when the business will have employees.
- **Each step:** status (not started, in progress, waiting on client, waiting on agency, done, not needed), the reference number on its certificate or permit, the date done, the government fee paid and notes. The COR step needs the TIN.
- **Routing slip:** the case page reads like a routing slip — each office is a station with the date the file was received and released and the days it was held there; the current station is highlighted with the days it has sat there and how long in its current status (over 7 days amber, over 14 red). The Registrations list puts the longest-held files first.
- **Finishing:** when the COR is issued the Owner enters it on the client (Edit: TIN, RDO, tax types, effective date), which starts the filing obligations (§4.1). The Owner then completes the case once every step is done or not needed and the client's TIN matches the COR; the client becomes active and the engagement ends. The Owner can cancel an open case with a reason.
- **Annual renewal** (existing client, for a year): barangay clearance, Fire Safety Inspection Certificate (BFP), sanitary permit and mayor's permit (by 20 January in most LGUs), the SEC General Information Sheet or — for sole proprietors, every 5 years from registration — the DTI business name renewal, the books for the new year, and the renewed permit displayed. No BIR annual registration fee since 2024 (RA 11976). The Owner opens one from the client's page, or **opens the year's renewals for every active client at once** (the firm is taken to handle the permits; staff mark what the client does as not needed). One renewal per client and year; completing it only closes the case.
- **Closing the business** (existing client, with the day it stopped operating): barangay certificate of closure and business retirement at City Hall, BIR Form 1905 with the final returns, unused invoices and books surrendered, BIR verification and tax clearance, registration cancelled, then DTI cancellation or SEC dissolution, and the SSS, PhilHealth and Pag-IBIG employer numbers. Completing it ends the client's filing obligations on the closing date, removes unstarted filings for later periods, ends its engagements and makes the client inactive.
- **BIR update (Form 1905)** (existing client, with the date of the change): the Owner ticks what changes — address in the same city, transfer to another city / RDO, tax types (e.g. VAT registration), business or trade name, line of business — and the steps follow: DTI amendment or SEC amended articles, barangay clearance for a new address, mayor's permit amended (or a new permit in the new city and retirement in the old), Form 1905, transfer of records to the new RDO, updated COR, new ATP and invoices (old ones surrendered), books, updated COR displayed, and the SSS / PhilHealth / Pag-IBIG employer records for a new name or address. When tax types change, the case cannot be completed until the new tax setup is entered on the client (Edit, with the date of the change), which starts and ends the filing obligations.
- **New branch** (existing client; several can be open at once): DTI business name scope (sole proprietors), barangay clearance and mayor's permit for the branch, BIR registration with the branch's RDO (branch code), branch COR, books, ATP and invoices, COR displayed.
- **Portal view:** clients see a **Registration** tab (shown once they have a case) with each case as a routing slip in their words — where the file is now and the days there, each office's received and released dates, the reference number once done, and "We need: …" for anything we asked on that step, linking to the request. Open cases and those closed in the last 90 days are shown.
- **Documents from the client:** on any unfinished step staff can "Ask the client for documents"; the request goes to the portal's Requests (§3.6) and the step waits on the client until they reply.
- **Not yet:** proof files on each step (government receipts, certificates) and SEC amendments other than name and principal office.

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

**Acting approver (Q58), built:** the Owner names one active **Reviewer** at a time in Settings → Acting approver, for whole Manila days, with a limit on the tax due per return and a reason, and can end it early. While named, the Reviewer sees every client-approved return on the Review page and gives the final approval only if the tax due is within the limit, the return is **fully paid** (payment check), and they **did not prepare it**; everything else waits for the Owner. The step is recorded as "as acting approver" with the appointment and limit. The Owner gets a **daily email digest** (nightly job, for the day before) and sees a notice on the Dashboard; Settings → Acting approver lists the last 30 days of such approvals.

### 3.9 Collections & Statement of Account (Q24–Q27, Q31, Q32)

- **SOA per billing run (Q62):** each client has billing days (default the 10th and 20th; once a month for some). A run issues a statement with whatever is ready and not billed yet: the month's retainer (on the month's first statement), tax due on returns the firm remits once reviewed (withholding on the 10th, VAT on the 20th), SSS / PhilHealth / Pag-IBIG contributions and other charges — plus carried balance − credits. Nothing new means no statement. The nightly job runs each day's billing; the Owner can run it by hand. Unique **payment reference** per SOA (e.g. `TC-0042-2026-11-10`). **Superseded by docs/REWORK.md 16c:** the Owner runs billing from Ready to bill; nothing is billed automatically.
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
- ~~Every quote shows **monthly retainer + estimated annual package = first-year total** (Q50).~~ **Replaced by the Owner's decision of 26 Nov 2026:** the quote is **monthly only** — the itemised monthly retainer, the tax on the fee and the EWT note — with **backlog catch-up as a separate one-time line** below the monthly total (months behind × catch-up factor × monthly retainer; the factor is a schedule setting, 0.5 = half). Above the schedule's **monthly cap** (₱6,000 in the Owner's 2027 draft) the quote shows **no price**: the business is quoted on request in the proposal, the components that apply are still listed, and the lead is created as usual. There is **no annual package and no first-year total**. The quote lists what is **"Not included in this quote"**: annual jobs, ad hoc jobs and the audit, priced in the proposal.
- **Bookkeeping and document volume are one component (26 Nov 2026):** "Bookkeeping, by documents a month" (≤50 / 51–150 / 151–300 / 301+ on request; band edges in `src/lib/fees/template.ts`), a flat add-on for inventory, manufacturing or construction (once, even if several apply) and a charge per branch. **Every client is charged by the documents they send a month**, with or without the bookkeeping service line: each document is recorded for the SLSP, the 2307s and the returns either way, so tax-compliance-only clients take the same band. There is no bookkeeping on/off on the quote.
- **Proposals (26 Nov 2026)** are built from the quote. The Owner (or the lead's reviewer) ticks the **annual jobs** (ITR with AFS preparation, 1604-C, 1604-E, SAWT, inventory list) and **ad hoc jobs** (ORUS and registration updates, business permit renewal, SEC filings, closure, new business registration, SSS / PhilHealth / Pag-IBIG registration, amended returns, BIR audit / LOA support, AUP, CAS …) that apply. Prices come from the active schedule and can be overridden with a required note. The proposal shows **separate sections — monthly retainer, catch-up (one time), annual jobs (with the month billed), ad hoc jobs (billed when done)** — and **no grand total**. Above the cap the Owner enters the agreed monthly retainer. The jobs and prices are part of the content the client accepts (its SHA-256 is the e-signature's fingerprint).
- **Audit (separate engagement, 26 Nov 2026):** the audit of financial statements is priced by taxpayer type and annual gross sales (an amount exactly on a band edge takes the lower band; over ₱100M on request). The Owner enters the client's annual gross sales once in the proposal form and the band's price is used (override with a note). The audit is **quoted and contracted separately by the firm (brands.legal_name, e.g. EJ Tallo Cloud Accounting and Auditing Services) under its own engagement letter**: it has its own section on the proposal, for information, and is **left out of the accepted-content hash**. A warning (not a block) shows when the audit is chosen for a client whose books we keep (we do not audit statements we prepared).
- **Existing clients keep their fees until their annual renewal**; the OS shows a **current fee vs computed fee** gap report (Q52).
- Quotes state the tax on the fee (currently non-VAT, 3% percentage tax) and that **clients may withhold EWT on the fee** (Q53).
- **The prices themselves are the Owner's decision and are not final.** A draft band structure for discussion is in Appendix A.
- **Built (Settings → Fee schedule):** versioned schedules with an effective date; the editor has sections **Monthly**, **Annual jobs**, **Ad hoc jobs** and **Audit (separate engagement)**, plus settings (monthly cap, catch-up factor, minimum retainer, late surcharge). The Owner activates a draft once every monthly item is priced (annual and ad hoc prices are optional; they fill in the proposal). A quote preview gives the monthly retainer, catch-up and the not-included list. A gap report compares each current client's monthly fee with the schedule (a floor: headcount, withholding kind, branches and complexity are not recorded yet) and flags volume above the first bookkeeping band. Schedules made before 26 Nov 2026 stay readable; quotes from them are flagged outdated and not sent, and "Start new version" moves them to the new structure. Not yet: putting the late-submission surcharge on statements (the active 2027 schedule has no surcharge amount set).

### 3.13 Notifications & automation (Q11, Q12, Q38)

- **Email** (Resend) + **in-app** notifications in v1.
- **n8n** (self-hosted) handles plumbing only: reminder emails, the nightly Google Drive backup, future Viber/SMS. **Tax rules, deadlines and accounting logic stay in the app**, where they are version-controlled and tested.

### 3.14 Privacy, security, retention (Q13, Q45)

- All data (database + files) in **Supabase, Singapore region**.
- Data Privacy Act basics: consent at client signup, a log of who viewed which document, staff see only assigned clients (RLS), client users see only their own client.
- **Backups:** Supabase daily backups with point-in-time recovery, plus a nightly n8n export of the database and documents to the firm's Google Drive.
- **Retention:** nothing is deleted automatically; keep at least **10 years** (above the 5-year BIR requirement under the EOPT Act).

---

### 3.15 LOA risk analytics (Phase 4; Q67)

Goal: show which clients look like LOA targets to BIR, early enough to fix the cause, and help keep each client's figures in a defensible range.

- **Ratios per client and period**, computed from the ledger (Phase 1B) and the filed returns, never retyped:
  - **Effective income tax rate:** income tax due ÷ gross sales or receipts (e.g. the Owner's working floor of about **2%**).
  - **Gross profit rate (GPR):** gross profit ÷ net sales, compared with the client's industry.
  - Others to confirm with the Owner: expense-to-sales ratios (e.g. purchases, rent, salaries), VAT payable ÷ VATable sales, input VAT ÷ output VAT, year-on-year swings in sales or tax, repeated losses or zero-tax returns, and gaps between returns (e.g. sales on 2550Q vs the income tax return, salaries on 1601-C vs the ledger).
- **Benchmarks are data, not code**, like the deadline rules: industry (by PSIC code or the COR line of business) × ratio × floor / range × effective dates × source (BIR issuance, industry study, or the Owner's own rule). The Owner edits them in Settings. **The benchmark figures are the Owner's decision**; the OS ships with none filled in, so no one mistakes a placeholder for a BIR rule.
- **Firm-wide data:** once enough clients are on the ledger, the OS also shows each industry's actual median and range across the firm's own clients (anonymised), as a cross-check for the Owner's benchmarks.
- **Output:** an LOA risk score per client (green / yellow / red, like the compliance score), the ratios that caused it, and the trend; a firm-wide list of red clients on the Owner dashboard; a warning on the return worksheet **before** a return goes out with a ratio below its benchmark, so staff and the Reviewer see it at sign-off.
- The score is a working tool for the firm. It is not shown to clients unless the Owner releases a report to them.

## 4. Key workflows

### 4.1 Onboarding a client (Phase 1)

1. Owner/Staff creates the client and uploads the COR → COR reader fills in tax types, RDO, registration date.
2. Engagement is created (service line, services, retainer) → obligations are created from the COR + services.
3. Payment mode, assigned staff, cutoff day, chart-of-accounts template are set.
4. Portal invitation is emailed to client users → consent screen → first login.
5. (1B) Opening trial balance is imported.

The client's **Onboarding** tab tracks these steps as a checklist. Most items follow the data. Staff tick the rest: BIR eFiling access, returns already filed this year, and the kickoff meeting. The tab also holds the proposal and the signed contract (engagement letter, with its signing date).

### 4.2 Assigning an uploaded document to a period

- Period = the month of the **document date**, if that period is still open and the upload is before its cutoff.
- Otherwise → the next open period in the **same taxable year**, flagged late.
- Document dated in a prior taxable year → exceptions queue.

### 4.3 Amendment

Reviewer or Owner opens an amendment on a filed period, with a reason → Owner approves → period reopens → changes → the return goes back through the sign-off chain as "Amended" → the period locks again.

**Built:** the books amendment (§3.6 slice 4) reopens the months. On the filed return's page the Owner or the client's reviewer starts the **amended return** with a reason: a new return of the same form and period labelled "<period> Amended" ("Amended 2" for a second), at Not started, through the whole sign-off chain (Q73). The filed original stays on record and the period's returns link to each other. Filing the amended return locks the reopened months again by itself. An amended return's due date is the day it was started, and it is not scored as a late filing.

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

Last checked against the code and the live database: 26 Nov 2026.

| # | Item | Owner | Needed for |
|---|---|---|---|
| O1 | ~~All-in monthly cost per staff member~~ **Closed:** ₱20,000 → capacity target 60 load points (₱60,000 of retainers) per staff member | Owner | Break-even check on entry prices; capacity target (§3.11) |
| O2 | ~~Final prices for each fee band (Appendix A is a draft)~~ **Closed 26 Nov 2026:** the "2027 schedule (Owner's prices, 26 Nov 2026)" is active, effective 26 Nov 2026, monthly cap ₱6,000. Appendix A is kept as the original draft | Owner | Fee schedule, quotes, website calculator |
| O3 | Check every deadline rule in §3.3 against current BIR issuances (EOPT Act RRs, eFPS group dates) and the 2027 holiday proclamation | Staff, Owner review | Deadline engine go-live. **Open:** none of the 14 deadline rules is marked verified, and the 18 holidays loaded for 2027 are all marked UNVERIFIED |
| O4 | Gemini test on ~50 real receipts (Flash vs Pro), confidence thresholds | Build | OCR go-live. **Open:** the code has a default model (Flash, with `GEMINI_MODEL` to compare Pro) and flags fields below 0.8 confidence (`src/lib/ocr/fields.ts`); the 50-receipt test and the final threshold are not recorded |
| O5 | Original logo vector files, or approval of the SVG redraw | Owner | Portal and website. **Open:** a logo is uploaded on the brand in Settings; the Owner's approval of the SVG mark is not recorded |
| O6 | Opening trial balances as of 31 Dec 2026 for each bookkeeping client | Staff | Phase 1B. **Open, due after 31 Dec 2026:** the 2 clients with Books now are test clients (books starting 1 Jan and 1 Oct 2026) |
| O7 | Board of Accountancy firm-name rules before choosing the nationwide brand; whether it needs a registered partnership or corporation | Owner | Nationwide brand (later) |
| O8 | ~~Separate bank account for client tax funds~~ **Closed:** Unionbank and BPI accounts are set up for client tax funds in Settings → Payment channels | Owner | Collections (§3.9) |
| O9 | VPS provider account for n8n; Google Workspace account for backups; Resend domain verification for tallocpa.com | Owner | Infrastructure. **Partly done:** the Google Cloud project, Gmail and Calendar APIs are set up (REWORK.md, 26 Nov 2026) and 2 calendars are linked. Not verifiable from here: the n8n VPS, the backup account and the Resend domain |
| O10 | ~~Which firm bank accounts / e-wallets appear on the SOA~~ **Closed:** five channels with QR codes: Unionbank and BPI (client tax funds), GCash, GoTyme and Maya (fees) | Owner | SOA |
| O11 | Add `RESEND_API_KEY` and `EMAIL_FROM` (e.g. `Tallo CPA <documents@tallocpa.com>`, on the domain verified in O9) to the Vercel project's Production and Preview environment variables, redeploy, then send one test document request | Owner | Emailed monthly document requests and cutoff reminders (§3.10); until then they show in the portal only. **Open:** the brand's sender address (Settings) is still empty; the Vercel variables could not be checked from here |
| O12 | ~~Confirm the client compliance score thresholds~~ **Closed 23 Nov 2026:** Owner approved as drafted (in `src/lib/scores/compliance.ts`: documents by the cutoff ≥ 90% green / ≥ 70% yellow; returned documents ≤ 5% / ≤ 15%; paid on time ≥ 90% / ≥ 70%; client-caused late returns 0 / 1; over the last 6 months, worst part wins) | Owner | Compliance score (§3.11) |
| O13 | Brand details for Settings → Brand: TIN and branch code, RDO, COR, addresses, contact details, CPA / PRC-BOA / BIR tax agent / PTR / DTI numbers and validity, signatory name and title, Service Invoice method and series | Owner | Statements, quotes, engagement letters |
| O14 | ~~Whether fee advances count toward the gross receipts watch~~ **Closed 23 Nov 2026:** no. Only collected retainer and other fees applied to a charge count; unapplied advances and client tax money are excluded (as built) | Owner | Gross receipts watch (§3.1) |
| O15 | Confirm the tax treatments chosen when building the worksheets: separation pay always exempt; December annualization (over-withholding as a negative adjustment); 13th-month ceiling applied cumulatively; percentage tax rate by document month vs income-tax rates at year end; sales with only a total treated as VAT-inclusive; 8% option and ₱250,000 reduction; MCIT start year default; branch code 0000 for head office (0001 when unknown) | Owner | Worksheets (§3.7), payroll (§3.7a) |
| O16 | Check form item numbers written from the BIR forms rather than ported from taxify: 2551Q items 13–24, 1604-C Part I items 4–7 and Part II; whether the alphalist DAT needs D2 records for Schedule 2; and the field order of the previous-employer fields in the alphalist DAT (assumed the same as the present employer's; validate in the BIR Alphalist module with a real case) | Owner / Staff | 2551Q, 1604-C, alphalist |
| O17 | 2307s the client issued: OCR reads the "party" as the payor (the client), so reviewers must enter the payee's name and TIN until the OCR prompt is adjusted | Build | 0619-E, 1601-EQ, QAP |

---

## Appendix A — Fee schedule structure and the Owner's prices (26 Nov 2026)

**Owner's decision, 26 Nov 2026.** The market for bookkeeping plus tax compliance is ₱2,000–6,000 a month. These prices are seeded as the **draft** "2027 schedule (Owner's prices, 26 Nov 2026)" (migration `20261214000002_fee_quote_monthly.sql`); the Owner reviews and activates it in Settings → Fee schedule. Monthly cap ₱6,000; catch-up factor 0.5.

**Monthly (on the quote)**

| Component | Band | Monthly (₱) |
|---|---|---|
| A. Base | Individual / Corporation, OPC, partnership / Non-stock | 1,000 / 1,500 / 1,500 |
| B. VAT (2550Q + SLSP) | Individual / Non-individual | 500 / 1,000 |
| C. Expanded withholding | Rent or contractors / Top withholding agent (TAMP) | 300 / 500 |
| D. Payroll 1601-C | 1–9 / 10–29 / 30–49 / 50+ employees | 300 / 600 / 1,000 / on request |
| E. SSS, PhilHealth, Pag-IBIG (when we remit) | same bands | 300 / 600 / 1,000 / on request |
| F. Bookkeeping, by documents a month | ≤50 / 51–150 / 151–300 / 301+ | 1,000 / 1,500 / 2,500 / on request |
| F. Inventory, manufacturing or construction | flat add-on, once even if several apply | 500 |
| F. Branch | per branch | 500 |
| Catch-up (one time) | per month behind | 0.5 × monthly retainer |
| J. Late-submission surcharge | documents after cutoff | schedule setting |

Confirmed by the Owner on 26 Nov 2026: the 3% percentage tax is included in the prices; annual jobs are billed with the ITR with AFS and the SAWT in April, the 1604-C and the inventory list in January, and the 1604-E in February; every client pays the bookkeeping-by-documents line. The website quote form asks "Do you withhold tax on payments to others?" (No / Yes, on rent or contractors / Yes, we are a Top Withholding Agent (TAMP)), so the instant quote prices expanded withholding (C).

Worked examples: non-VAT sole proprietor, ≤50 documents: ₱2,000. VAT corporation, 5 employees, rent withholding, contributions remitted, ~120 documents: ₱4,900, plus catch-up for 2 months ₱4,900. VAT online seller (individual), inventory, ~200 documents: ₱4,500. VAT corporation, 25 employees, regular withholding, inventory, contributions, ~250 documents: ₱7,200 — over the cap, so quoted on request.

**Annual jobs (in the proposal, billed once a year)**: ITR with AFS (preparation) individual ₱5,000 / partnership ₱7,500 / corporation, OPC or non-stock ₱10,000; 1604-C ₱1,500; 1604-E ₱1,500; SAWT ₱500; inventory list ₱1,000.

**Ad hoc jobs (in the proposal, billed when done)**: ORUS and BIR registration updates ₱1,500; business permit renewal (Iloilo City only for now) ₱3,500; SEC filings (GIS, AFS submission) ₱2,000; closure of business ₱20,000; new business registration (BIR and SEC only; LGU permit and others separate) individual ₱8,000, corporation, OPC, partnership or non-stock ₱12,500; SSS, PhilHealth, Pag-IBIG registration ₱1,500 each. Quoted per request: amended returns, BIR certificates and clearances, BIR audit / LOA support, agreed-upon procedures, CAS implementation, systems implementation, AI and automation.

**Audit of financial statements (separate engagement, quoted and contracted by the firm under its own engagement letter)**, by annual gross sales (an amount exactly on an edge takes the lower band):

| Annual gross sales | Single proprietor | Partnership | Corporation, OPC, non-stock |
|---|---|---|---|
| Up to ₱3M | 8,000 | 12,000 | 16,000 |
| Over ₱3M to ₱10M | 12,000 | 16,000 | 24,000 |
| Over ₱10M to ₱20M | 16,000 | 24,000 | 32,000 |
| Over ₱20M to ₱50M | 24,000 | 32,000 | 48,000 |
| Over ₱50M to ₱100M | 28,000 | 40,000 | 56,000 |
| Over ₱100M | on request | on request | on request |

### Earlier draft bands (superseded 26 Nov 2026, kept for the record)

Based on the Moxie fee schedule and the website calculator, with the review findings. The Owner intends **lower** prices for a nationwide market (Q54); these numbers were a starting structure to adjust, not a decision.

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
