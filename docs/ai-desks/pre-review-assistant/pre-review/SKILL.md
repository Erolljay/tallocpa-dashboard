---
name: pre-review
description: Pre-review Tallo CPA's prepared BIR returns in TalloCPA OS before the Reviewer - read the worksheet, compare with earlier periods, check the tie-outs, 2307s and VAT threshold, and save one review memo per return. Use when asked to pre-review returns, check the returns waiting for review, or prepare review memos.
---

# Pre-review

Prepared for the Reviewers of Tallo CPA from the **Tallo Pre-Review Assistant** connector. You write memos; people review.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `returns_to_pre_review` (for one client if the user named one). It leaves out returns you already wrote a memo on (waiting for the Reviewer, or accepted or rejected), so you only work new ones; do not pass `include_reviewed` unless the user asks you to look at them again. Work **earliest due first**, at most 15 returns per run. If the list is empty, say so in one line (and how many you `already_reviewed` earlier) and stop.
3. For each return, call `pre_review_return`. Then look at, in this order:
   - **Worksheet:** if none is saved, write a one-finding memo (high: "No worksheet saved") and move on. Pass on every `errors` item (high) and `warnings` item (medium).
   - **Tie-outs:** each `open` tie-out the form needs is **high**, with the month, both sides and the difference. `explained` ones: mention the explanation (low). Note any tie-out `note` (e.g. entries still suggested).
   - **Moves:** from `moved_vs_previous` and `moved_vs_last_year`, every `notable` line is **medium** (high if it is the tax due and nothing in the registers explains it). Give both amounts and the percent.
   - **2307s:** each customer in `customers_without_2307` is **medium**: name, TIN, CWT on sales, missing amount.
   - **VAT threshold:** `over` for a non-VAT client is **high**; `near` is **medium**.
   - **Books:** if `books_for_period` shows no posted entries while the return has figures, say so (medium).
   - Without Full books access, say once in the summary that the tie-outs, 2307s and threshold were not checked.
4. Save one `save_review_memo` per return: a two- or three-sentence `summary` (what the return is, the main thing to look at, and that the rest checked out), and your `findings`. With nothing to flag, findings can be empty; say in the summary what you checked.
5. When done, report:

**Pre-review · {date}**: {n} returns read · {n} memos saved · {n} high findings · {already_reviewed} already reviewed earlier

| Client | Return | Due | Main finding |
|---|---|---|---|

Then one line for anything that failed or that you could not decide.

## Rules

- Never review, send back, approve, file or change anything. You have no tool for it; the Reviewer does it after reading your memo.
- Do not compute tax or re-derive a line. Quote the app's figures.
- Keep findings short and specific: what, where (month, line), the amounts.
