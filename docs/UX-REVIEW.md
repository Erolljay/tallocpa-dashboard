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

## Recommendations

1. **Workpapers**: one file per client × period, with schedules A Lead, B Sales & output VAT, C Purchases & input VAT, D Creditable withholding received, E Withholding on payments, F Compensation, G Income tax, T Tie-outs, N Review notes. Computed from approved documents and the ledger. Each schedule shows the return lines it feeds and has preparer and reviewer sign-off.
2. **Adjustments replace typed-in figures**: kind, amount, reason and support document, ticked by the reviewer. A new adjustment clears the schedule's reviewer sign-off.
3. **Tie-outs block "Mark prepared"**: sales on 2550Q vs the books, output and input VAT vs the ledger, 2307s vs SAWT, QAP vs expense × rate. A difference needs a written explanation.
4. **Review notes** anchored to a schedule or row, open or cleared. A schedule can't be reviewer-signed with open notes.
5. **My work** home for staff and reviewers: one next action per client × period.
6. **Approval memo** at Owner approval: tax due vs prior period, rate on sales, adjustments, tie-outs, notes raised and cleared, preparer and reviewer, then the existing payment check.
7. **Period strip** on the client page linking Documents, Books, Workpapers, Returns and Filed.

## Build order

| Slice | Scope | When |
|---|---|---|
| W1 | Period file, schedules B–E read-only, T tie-outs | Before the January 2027 go-live |
| W2 | Adjustments, per-schedule sign-off, gated "Mark prepared" | During the first live cycle |
| W3 | Review notes, My work | After cycle 1 |
| W4 | Approval memo, PDF binder, LOA ratios feed (Phase 4) | After cycle 1 |

New tables: `workpaper_files`, `workpaper_schedules`, `workpaper_adjustments`, `workpaper_ticks`, `review_notes`. Schedules stay computed. Only sign-offs, ticks, adjustments and notes are stored. The file locks with the period's last return, the same way worksheets lock today.

## Open decisions for the Owner

- W/P reference letters: A–T as drafted, or match the firm's audit working-paper index?
- Tie-out tolerance before "Mark prepared" is blocked (₱1 rounding? ₱100?)
- Must every schedule be reviewer-signed, or only B, C and T?
