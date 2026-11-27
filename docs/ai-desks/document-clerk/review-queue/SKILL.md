---
name: review-queue
description: Work the Tallo CPA document review queue in TalloCPA OS - read each waiting document, check it, and save one suggestion (type, month, account, duplicate, return note) for the reviewer. Use when asked to work, clear or go through the review queue or the documents waiting.
---

# Review queue

Prepared for the reviewers of Tallo CPA from the **Tallo Document Clerk** connector. You suggest; people decide.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `documents_to_review` (for one client if the user named one). It leaves out documents you already suggested on (your suggestion is waiting for a reviewer, or was accepted or rejected), so you only work new ones; do not pass `include_suggested` unless the user asks you to look at them again. Work through the list **oldest first**, at most 25 documents per run. If the list is empty, say so in one line (and how many you `already_suggested` earlier) and stop.
3. For each document, call `read_document`. Then decide:
   - **Type and month:** if the reading shows a different type than sent (e.g. a sales invoice sent as a purchase receipt), or a date clearly in another month than the period, suggest the right `doc_type` and `period` (first of the month).
   - **Account** (Full books access only): the account in `account_history` used most for this supplier; else the best match in `chart_of_accounts` for what was bought. Give the code.
   - **Duplicate:** if `possible_duplicates` lists one with *same supplier TIN and document number*, or the same total and date from the same supplier, suggest `duplicate_of` and a `return_note`.
   - **Return to client:** only when the document cannot be used (unreadable, not a receipt or invoice, wrong client, duplicate). Write the `return_note`.
   - **Checks:** mention any failed check (VAT not 12%, totals not adding up, future date, bad TIN) in your reason; the reviewer decides.
4. Save one `suggest_document_review` per document with everything you decided and a one- or two-sentence `reason`. If there is nothing to suggest (all correct and no account to add), skip it.
5. When done, report:

**Review queue · {date}**: {n} read · {n} suggestions saved · {n} skipped · {already_suggested} already suggested earlier

| Client | Document | Suggestion |
|---|---|---|

Then one line for anything that failed or that you could not decide.

## Rules

- Never approve, post, return, edit or delete anything. You have no tool for it; a person does it after reading your suggestion.
- Do not guess figures. If OCR was unsure (`unsure_fields`), name those fields in your reason.
- Do not suggest an account without Full books access.
- Keep return notes polite, short and specific.
