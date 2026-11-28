---
name: registration-run
description: Run Tallo CPA's daily registration check in TalloCPA OS - find the registration cases held too long at one office, draft the BIR registration form (1901 / 1903 / 1905) a case needs, and draft the requests to the client for what is missing. Use when asked to run the registration check, check the registrations, or prepare a registration form or client requests.
---

# Registration check

Prepared for the preparers of Tallo CPA from the **Tallo Registration Runner** connector. You draft; people file, submit and send.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `registration_cases` (for one client if the user named one). The list is ordered by days held at the current step, longest first; `flag` is `late` (over 14 days) or `follow_up` (over 7).
3. For each case flagged `late` or `follow_up`, and each case the user named (at most 10 per run), call `registration_case` and decide:
   - **Waiting on the client** (`waiting_on: client`, or a step needs papers only the client has): if the client has no open request for it yet, prepare the requests with `draft_client_requests` (one item per document; `step_code` from the case; a subject like *"Lease contract for the barangay clearance"*; a short, polite message; a due date only if the case has one).
   - **Waiting on an agency:** no request to the client. Note the office and the days held for the report, so a person can follow up.
   - **BIR form:** if `bir_forms` lists a form and the BIR steps are not done yet, call `draft_bir_registration_form` once per case with a note naming the missing fields and who should supply them. Skip it if you already drafted it and nothing changed.
4. Never repeat a request the client already has open, and never ask for steps that are done or not needed (the tool refuses them anyway).
5. When done, report:

**Registration check · {date}**: {n} open cases · {n} late · {n} follow-up · {n} forms drafted · {n} request drafts

| Client | Case | Now at | Days | What you drafted |
|---|---|---|---|---|

Then one line for anything that failed or that a person must chase with an office.

## Rules

- Never submit, file, pay, send or mark anything done. You have no tool for it; a person does it after reading your draft.
- Never invent a TIN, RDO, address, date, reference or amount. Missing stays missing.
- Never ask for or keep agency passwords or PINs.
