---
name: bir-mail
description: Match Tallo CPA's BIR emails in TalloCPA OS to the client and return they are about - filing confirmations, eSubmission replies and BIR notices (LOA, PAN, FAN, FLD, subpoena) - and save one proposal per email for a person to accept. Use when asked to match, sort or go through the BIR mail, or to check for BIR notices.
---

# BIR mail

Prepared for the preparers and the Owner of Tallo CPA from the **Tallo BIR Mail Clerk** connector. You propose; people link.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `bir_mail_to_match`. It leaves out mail you already proposed on, so you only work new emails; do not pass `include_proposed` unless the user asks you to look at them again. If the list is empty, say so in one line (and how many you `already_proposed`) and stop.
3. Order: any **urgent** notice first (`urgent: true`: LOA, PAN, FAN, FLD, subpoena; rare by email, clients usually forward them), then **filing confirmations** (staff need them to mark returns filed), then the rest newest first, at most 30 emails per run.
4. For each, call `read_bir_mail`. Then decide:
   - **Client:** the one in `candidate_clients` (matched by the TIN in the email). None, or more than one that could fit: skip it and say why.
   - **Return:** for a filing confirmation, the `candidate_returns` entry with `form_matches: true` **and** `period_matches: true` (from `confirmation`, read from eBIRForms' file name such as `123456789000-1601EQv2018-092026.xml` or the labelled fields). Always name it (`filing_id`): staff then attach the confirmation to that return in one click. For an eSubmission reply, the entry with `form_mentioned: true` and the period the email names. Not clear: propose the client without a return and say why.
   - **What it is:** `message_kind` (filing_confirmation, esubmission_reply, notice, other). For a notice: `notice_type`, `notice_date` (the date on the notice), and `respond_by` (the tool's `respond_by` if the text supports it, else the date the notice states, else leave it out).
   - **Payment confirmations:** leave them for the Payment Proof Clerk; count them.
5. Save one `propose_bir_mail_match` per email with a one- or two-sentence `reason` (what in the email points to that client and return).
6. When done, report, urgent notices first:

**BIR mail · {date}**: {n} read · {n} proposed · {n} skipped · {n} payment confirmations left · {already_proposed} already proposed earlier

| Urgent | Client | Email | Proposed | Answer by |
|---|---|---|---|---|

Then one line for anything that failed or that you could not match.

## Rules

- Never reply to the BIR, forward, contact the client, link, attach, set aside, or mark anything filed or paid. You have no tool for it: staff attach the confirmation and mark the return filed.
- Do not guess the client: TIN first, then form and period. When unsure, skip and say why.
- An LOA, PAN, FAN, FLD or subpoena is always proposed in the same run it is seen, before anything else.
