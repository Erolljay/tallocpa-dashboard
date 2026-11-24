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
| D1 | Deadline safeguards: coverage check, milestones, risk status, tracker, staff reminders, Owner alerts | Before the January 2027 go-live |
| W1 | Period file, registers B–F in the worksheet format (adds SC/PWD discount OCR field, supplier ATC), T tie-outs | Before the January 2027 go-live |
| W2 | Adjustments, per-schedule sign-off, gated "Mark prepared" | During the first live cycle |
| W3 | Review notes, My work | After cycle 1 |
| W4 | Approval memo, PDF binder, LOA ratios feed (Phase 4) | After cycle 1 |

New tables: `workpaper_files`, `workpaper_schedules`, `workpaper_adjustments`, `workpaper_ticks`, `review_notes`. Schedules stay computed. Only sign-offs, ticks, adjustments and notes are stored. The file locks with the period's last return, the same way worksheets lock today.

## Open decisions for the Owner

- W/P reference letters: A–T as drafted, or match the firm's audit working-paper index?
- Tie-out tolerance before "Mark prepared" is blocked (₱1 rounding? ₱100?)
- Must every schedule be reviewer-signed, or only B, C and T?
- Step targets per form (the 1601-C example uses one working day between steps), and the hour of the morning email.
