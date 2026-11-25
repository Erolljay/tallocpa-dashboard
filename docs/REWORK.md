# Rework: one pipeline from lead to year-end

| | |
|---|---|
| **Status** | Agreed with the Owner on 25 November 2026. Week 1 built; weeks 2–5 to do. |
| **Map** | Workflow map (today vs reworked), shared as a claude.ai artifact |
| **Target** | Done before year-end (31 December 2026); the year-end page ready before the January deadlines (1604-C and 2316s by 31 January) |

## Why

The app was organised by feature, not by how the firm works: 14 sidebar items, four places to approve a document, nine workpaper schedules per filing, seven sign-off steps per return, and a client portal that opened on an upload page with no balances or dues. Payroll had no intake with the other documents.

## The pipeline

```
In (photo + OCR · Excel · email) → Inbox (Sales · Purchases & Expenses · Payroll · Other)
  → Registers (Sales · Purchases & Expenses · Payroll), a card per column total
  → Books (posted automatically) and Returns (drafted from register totals)
  → Client dashboard (Assets · Liabilities · Equity, dues cards)
```

A document has three states: **Sent → Approved (or Returned) → In register**. Everything after that works on the month's totals, not on each document.

## Decisions (Owner, 25 November 2026)

1. **Purchases and expenses are one stream and one register**, as on the SLP. The account title and SLP category tell them apart.
2. **Payroll is its own stream.** Clients send their payroll in their own format (Excel, PDF or a photo). Staff convert it to the Tallo standard payroll template (downloadable from the client's Payroll page), load it, then mark the document done. A payroll document is never read by OCR and never becomes a register line.
3. **The monthly cutoff and "I've sent everything" stay.**
4. **The whole lifecycle is in scope**: lead → proposal and signing → onboarding → monthly work → year-end.
5. **Client approval of returns stays.** Nil returns skip client approval but are still reviewed and approved by the Owner.
6. **Sign-off order: preparer → reviewer → client → Owner → filed and paid.** The Owner approves only after the client's cash for the dues is in. "Cash received" means a payment proof the Owner has verified (portal Pay Now → Verify).
7. **The nine workpaper schedules give way to one Check panel per client and month**: register totals vs return lines vs books, green or red, with a note where they differ.

## Navigation

| Sidebar | Holds |
|---|---|
| Home | Overview · My work |
| Clients | Clients · Customers & suppliers · Requests · Registrations |
| Inbox | Waiting for approval, by stream · Month status |
| Filings | Deadlines · To review |
| Firm (Owner) | Leads · Collections · Staff · Scores · Settings |

## Build plan

| Week | Dates | Scope | Status |
|---|---|---|---|
| 1 | 26 Nov – 3 Dec | Five-item sidebar with section tabs; Firm page; Inbox tabs by stream; payroll intake (own format) | **Built** |
| 2 | 4 – 10 Dec | Registers with column-total cards, edited in place; payroll register from the Tallo template; Books tab (TB, FS, Lock month); new client tabs | To do |
| 3 | 11 – 17 Dec | Check panel; five-step sign-off with the cash check and the nil-return skip; one Filings page; portal Home with balance and dues cards | To do |
| 4–5 | 18 – 31 Dec | Leads with the quote on the same page; signing creates the client, engagement and retainer; onboarding cut to six essentials; Year-end page | To do |
