# Staff and Owner UX review (Phase 1)

| | |
|---|---|
| **Status** | For Owner review. Nothing here is built. |
| **Date** | 2026-11-24, against `main` at 2f2a2ec |
| **Mock** | [`mockups/tallocpa-ux-review.html`](./mockups/tallocpa-ux-review.html): journeys, findings and a clickable Workpapers mock (sample data) |

Screens were read from the source. This review has not yet been tested with staff on real client data.

## Findings

| # | Impact | Finding |
|---|---|---|
| F1 | High | No place to work the data between Documents and Returns. Analysis (summaries, splits, disallowances, reasonableness checks) happens in Excel, so it can't be reviewed and isn't kept with the return. |
| F2 | High | Two sources for the same figure, never compared. For bookkeeping clients, 1701Q/1702Q read the ledger (§3.6 slice 5), while 2550Q, SAWT and QAP read approved documents (§3.7). |
| F3 | High | Worksheet "figures typed in" store a number with no reason, support or reviewer acknowledgement. |
| F4 | Medium | Work is organised by feature, not by client × period. One client's quarter means visiting six screens. |
| F5 | Medium | Review feedback is one kick-back note per filing, with no open or cleared state per point. |
| F6 | Medium | Staff home is the Owner dashboard filtered to them, not a list of next actions. |
| F7 | Medium | The Owner's final approval shows tax due and the payment check only: no variance, tie-out or review-note context. |
| F8 | Low | The worksheet is reached through a small link on the filing page only. |
| F9 | Low | The client page has no "this period" status. |
| F10 | Low | Deadlines, Monthly cycle, Documents and Review overlap in the sidebar. |
| F11 | High | Nothing warns anyone before a filing is late. No staff member is named on a filing, there is no internal target ahead of the BIR date, and the nightly job reminds clients only. |
| F12 | Medium | Documents don't carry the firm's worksheet columns: no SC/PWD discount, no CWT per invoice, no EWT per supplier, so no net receipt or net paid. |
| F13 | High | Cash is posted at the invoice total, not the net receipt. `book_document` debits Cash on hand for the total of a cash sale; the CWT leaves cash only when the 2307 is approved (Dr CWT / Cr Cash). Purchases credit Cash at the gross; EWT payable appears only when a 2307 is issued. The SC/PWD discount is never recorded, cash sales never go to a bank account, and payroll posts nothing to the books. |

## Recommendations

1. **Workpapers**: one file per client × period, with schedules A Lead, B Sales & output VAT, C Purchases & input VAT, D Creditable withholding received, E Withholding on payments, F Compensation, G Income tax, T Tie-outs, N Review notes. Computed from approved documents and the ledger. Each schedule shows the return lines it feeds and has preparer and reviewer sign-off.
2. **Adjustments replace typed-in figures**: kind, amount, reason and support document, ticked by the reviewer. A new adjustment clears the schedule's reviewer sign-off.
3. **Tie-outs block "Mark prepared"**: sales on 2550Q vs the books, output and input VAT vs the ledger, 2307s vs SAWT, QAP vs expense × rate. A difference needs a written explanation.
4. **Review notes** anchored to a schedule or row, open or cleared. A schedule can't be reviewer-signed with open notes.
5. **My work** home for staff and reviewers: one next action per client × period.
6. **Approval memo** at Owner approval: tax due vs prior period, rate on sales, adjustments, tie-outs, notes raised and cleared, preparer and reviewer, then the existing payment check.
7. **Period strip** on the client page linking Documents, Books, Workpapers, Returns and Filed.
8. **Deadline safeguards** (see below).
9. **Registers in the firm's worksheet format**: B Sales (gross, SC/PWD discount, VATable, exempt, output VAT, invoice total, CWT, net receipt), C Purchases & expenses (gross, VATable, non-VAT, input VAT, EWT, net paid, account), F Payroll (from the existing register: basic, OT, de minimis, gross, contributions, taxable, tax withheld, net pay). Needs a new OCR field for the SC/PWD discount, each supplier's ATC in the parties directory for EWT, and CWT per invoice from the collection receipt or the customer's 2307. Each register downloads to Excel in the same layout.

10. **Post each register line as its entry, with the net receipt in cash.** The net receipt is what reaches the bank and is the basis of the cash debit in the trial balance.

    | Register | Debit | Credit |
    |---|---|---|
    | Sales | Cash in bank / on hand (net receipt); CWT – awaiting 2307 (CWT); Sales discount – SC/PWD (discount) | Sales – VATable; Sales – VAT-exempt (before discount); Output VAT |
    | Purchases | Expense or purchases; Input VAT | Cash in bank / on hand (net paid); EWT payable |
    | Payroll | Salaries and wages; de minimis benefits | Cash in bank (net pay); Withholding tax on compensation payable; SSS, PhilHealth, Pag-IBIG payable |

    A 2307 received later moves the amount from "CWT – awaiting 2307" to "CWT – supported" with no cash entry; only supported CWT is claimed on the income tax return, and what is unsupported at year end goes to the Owner. EWT payable is booked at payment, so it ties to the 0619-E and 1601-EQ. Each line names its cash account (client default, changeable per line) so cash in bank reconciles to the bank statement. Charge sales keep Dr AR at the invoice total; the collection line of the AR/AP update then gets a CWT column (Dr Cash net, Dr CWT – awaiting 2307, Cr AR).

11. **One register: bookkeeping and tax compliance as one.** See below.
12. **Capital expenditure to a fixed asset register (H) with straight-line depreciation.** See below.

## Data flow: one register

Every intake channel ends in one review queue and becomes a **register line**. Each line has three parts, and the books, workpapers and returns are all generated from it, so they cannot disagree.

| Stage | What |
|---|---|
| Intake | Portal upload (built) · staff upload (built) · email to invoices@tallocpa.com (new) · batch upload in the register layout at onboarding (later) |
| Review | One queue. OCR reads images; staff check the figures, account title and cash account. Batch rows skip OCR but get the same checks (TIN, VAT at 12%, duplicates, open period, known account). |
| Register line | **Sales part:** gross, SC/PWD discount, VATable, exempt, zero-rated, VAT, total, terms, CWT, net receipt, cash account. **Bookkeeping part:** account title, book, the entry, AR/AP. **Tax part:** 2550Q/2551Q lines, SLSP/QAP/SAWT rows, ATC, 1701Q/1702Q BIR line. |
| Generated | Books (entries, six books, TB, FS) · workpapers (registers B–F, tie-outs, lead) · returns and attachments · client portal |

What changes in the app:
- An approved document becomes a register line; the journal entry and the tax lines are both derived from it. Today the worksheets read the approved fields and `book_document` writes an entry, for bookkeeping clients only.
- 2550Q and 1701Q both read the register, which removes F2 by construction. T-1 stays as a safety check.
- Every client's lines get an account title (the 1701Q/1702Q needs them anyway). The engagement decides what is delivered and billed: books and FS, or returns only.
- `documents.source` gains `email` and `batch` (today `portal` or `staff`). This changes Q10 (portal-only intake in v1).

**Email intake (invoices@tallocpa.com).** The sender is matched to a client (a client user's email, or a sender the client adds); someone linked to several businesses adds the client code (invoices+CODE@tallocpa.com). Each attachment becomes a document with source Email, under the same period and cutoff rules as the portal. The sender gets a receipt with the file count and a portal link. Unknown senders and mail failing SPF/DKIM go to an Unmatched list. n8n watches the mailbox and passes attachments to the app (Q11: plumbing only).

**Batch upload (later, at onboarding).** Excel template in the register layout. Every row is checked before posting, like the payroll register preview. Rows post as lines marked "Batch · no image"; images can be attached later.

## Capital expenditure and depreciation

The account title on a purchases register line routes it:

| Account title on the line | Books | VAT | Income tax |
|---|---|---|---|
| Expense or purchases (e.g. Purchases, Rent, Office Supplies) | Operating expenses / cost of sales | Input VAT on the 2550Q | Deduction by its BIR line |
| Asset (Furniture and Fixtures, Office / IT / Transportation Equipment, Building) | Property and equipment; also creates an asset in register **H** | Input VAT on the 2550Q **in full** in the quarter of purchase; SLP lists it as capital goods | Only through depreciation (BIR line "Depreciation") |

Register H holds, per asset: number, date acquired, description, class, source line (supplier and invoice), cost (VAT-exclusive), input VAT claimed, residual value, useful life in months, start month, monthly depreciation, accumulated depreciation and net book value. The straight-line schedule — (cost − residual value) ÷ useful life in months, the last month taking the rounding — generates the monthly entry (Dr Depreciation Expense / Cr Accumulated Depreciation by class), posted with the month. Opening assets come in with the opening balances. Tie-outs: T-9 additions per register vs property and equipment accounts; T-10 depreciation per schedule vs Depreciation Expense.

The chart of accounts already has the asset and accumulated depreciation pairs, and Depreciation Expense is mapped to the BIR "Depreciation" line; what is missing is the register, the schedule and the generated entry (today a manual journal entry).

Notes: since 2022 (TRAIN law, RR 13-2018) input VAT on capital goods is claimed in full, not spread over 60 months; check the RR 12-2012 limits on vehicle depreciation for income tax.

## Deadline safeguards

1. **Coverage.** A nightly check confirms that every COR tax type has an obligation, a client with payroll has a 1601-C obligation, a client with expanded withholding in the books has 0619-E and 1601-EQ, and every filing has a preparer and a reviewer. Gaps go to the Owner's dashboard.
2. **Milestones.** Each form has steps back-scheduled from the due date in working days, set in Settings. The last internal target is one working day before the BIR date.
3. **Risk status.** Each filing is On track, At risk (one step late), Critical (two steps late, or one working day left and not filed), Overdue or Filed.
4. **Escalation.** At risk goes to the preparer and reviewer (My work, email); Critical adds the Owner (dashboard banner, morning email); Overdue stays at the top of every list.
5. **Close-out.** A filing is done only with its filing reference and proof. A zero 1601-C is still filed and recorded. A late filing is tagged client-caused or staff-caused from the first step that slipped (feeds Q40 and Q41).

Example, 1601-C March 2027, due Mon Apr 12 (Apr 10 is a Saturday): register in Apr 5 (client) → prepared Apr 6 → reviewed Apr 7 → client approved Apr 8 → Owner approved, funds in Apr 9 → filed and paid Apr 9 (internal target) → proof recorded Apr 12.

## Build order

| Slice | Scope | When |
|---|---|---|
| R1 | One register: approved documents become register lines; books and worksheets read the register. W1 builds on it. | Before go-live if the January cycle allows; otherwise W1's tie-outs cover the gap |
| D1 | Deadline safeguards: coverage check, milestones, risk status, tracker, staff reminders, Owner alerts | Before the January 2027 go-live |
| W1 | Period file, registers B–F in the worksheet format (adds SC/PWD discount OCR field, supplier ATC), T tie-outs | Before the January 2027 go-live |
| A1 | Fixed asset register (H), straight-line depreciation schedule and monthly entry, from purchases lines with asset account titles; opening assets from the opening balances | Before the first 1701Q (May 2027) |
| E1 | Email intake at invoices@tallocpa.com | During the first live cycle |
| W2 | Adjustments, per-schedule sign-off, gated "Mark prepared" | During the first live cycle |
| W3 | Review notes, My work | After cycle 1 |
| B1 | Batch upload in the register layout, at onboarding | Later, with onboarding |
| W4 | Approval memo, PDF binder, LOA ratios feed (Phase 4) | After cycle 1 |

New tables: `workpaper_files`, `workpaper_schedules`, `workpaper_adjustments`, `workpaper_ticks`, `review_notes`. Schedules stay computed. Only sign-offs, ticks, adjustments and notes are stored. The file locks with the period's last return, the same way worksheets lock today.

## Open decisions for the Owner

- W/P reference letters: A–T as drafted, or match the firm's audit working-paper index?
- Tie-out tolerance before "Mark prepared" is blocked (₱1 rounding? ₱100?)
- Must every schedule be reviewer-signed, or only B, C and T?
- The account and BIR line for the SC/PWD discount, and what happens to CWT still without a 2307 at year end.
- Should every client get account titles on every line (proposed), with the engagement deciding only which outputs are delivered?
- Fixed assets: the capitalization threshold (the mock uses ₱10,000), default useful life per class, residual value, and whether depreciation starts in the month of purchase or the month after.
- Step targets per form (the 1601-C example uses one working day between steps), and the hour of the morning email.
