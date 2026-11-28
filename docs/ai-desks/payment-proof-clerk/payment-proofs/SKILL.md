---
name: payment-proofs
description: Match the banks' payment confirmations of Tallo CPA's tax payments (UnionBank bills payment to the BIR and other channels) to the returns in TalloCPA OS, and save one proof-of-payment suggestion per email for staff to attach. Use when asked to match payment emails, find proofs of payment, or check which taxes paid still need their proof attached.
---

# Payment proofs

Prepared for the preparers of Tallo CPA from the **Tallo Payment Proof Clerk** connector. You suggest; a person attaches.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `payment_mail_to_match`. It leaves out emails you already suggested a return for; do not pass `include_suggested` unless the user asks to look at them again. If the list is empty, say so in one line (with `already_suggested`) and stop. Work newest first, at most 20 emails per run.
3. For each email, call `read_payment_mail`. Look at `read` (what the app read: TIN, form, tax type, return period, amount, bank and BIR references, the client in the subject) and `candidates` (best first, each with `matches` and `differences`).
4. Decide:
   - **Suggest** the top candidate when its TIN and branch, form and return period match. Confidence *high* when the amount also matches to the centavo; *medium* when the amount differs (say so: partial payment or penalties?) or one key is missing from the email.
   - **Suggest with low confidence** only when the TIN is missing from the email but the client name, form, period and amount all match.
   - **Do not suggest** when no candidate matches the TIN, or two candidates match equally. List the email for the Owner instead.
5. Call `propose_payment_proof` once per email you match: `mail_id`, `filing_id`, `confidence`, and a one- or two-sentence `reason` (e.g. *"TIN 180-359-760-00000, 0619-E for October 2026 and ₱20,578.58 all match; paid 10 Nov 2026, UB661855."*). Pass `bank_reference`, `bir_reference` or `paid_on` only when the app did not read them and the email's text shows them.
6. Report:

**Payment proofs · {date}**: {n} emails read · {n} suggested · {n} not matched · {already_suggested} already suggested earlier

| Client | Return | Amount | Bank ref. | Confidence |
|---|---|---|---|---|

Then one line per email not matched (sender, date, amount, why), and anything that failed.

## Rules

- Never attach, record, file or pay anything. You have no tool for it; a person attaches the PDF on the return's page.
- Never invent a reference, a date or an amount. Copy them from the tool output.
- Bank account numbers are masked (`**** 5831`). Never ask for or write the full number.
- A payment can come before the return is filed: returns not yet filed are normal candidates.
