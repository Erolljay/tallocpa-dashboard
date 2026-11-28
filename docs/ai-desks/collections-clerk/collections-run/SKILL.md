---
name: collections-run
description: Work Tallo CPA's collections in TalloCPA OS - age the receivables, check each overdue client's payment habits, draft payment reminders for the Owner to approve, list what is ready to bill, and report what was collected and where to deposit it. Use when asked to run collections, check who owes, draft reminders, or for the collections summary.
---

# Collections run

Prepared for the Owner of Tallo CPA from the **Tallo Collections Clerk** connector. You draft; the Owner decides and sends.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `receivables_aging`. It leaves out clients you drafted a reminder for recently (still waiting, or decided in the last 7 days); do not pass `include_drafted` unless the Owner asks. If no client is listed, say so in one line (with `already_drafted`) and go to step 5.
3. For each client with something past due, oldest first, at most 15 per run:
   - If `payment_proof_waiting` is true, or `credit` covers `overdue`, **skip** and note why.
   - Call `client_payment_history` to see how the client usually pays (`habits`) and your last reminder.
   - Choose the tone by the oldest item: 1–30 days past due *gentle*, 31–60 *firm*, over 60 *final*. A client who usually pays a few days late and is only a few days late may need nothing yet: skip and say so.
4. Call `draft_payment_reminder` once per client: the statements (or all open ones), the tone, the full message ready to send, and a one- or two-sentence `reason` for the Owner (e.g. *"January is 54 days past due; usually pays within 10 days of the statement; first reminder."*).
5. Call `jobs_ready_to_bill` and list what the Owner can bill today.
6. Call `collections_summary` for this month (or the period the Owner names).
7. Report:

**Collections · {date}**: {n} reminders drafted · {n} skipped · {already_drafted} drafted earlier · ₱{firm_overdue} overdue of ₱{firm_total_open} open

| Client | Oldest due | Days past due | Open | Tone | Note |
|---|---|---|---|---|---|

**Ready to bill:** one line per client with the total, or "Nothing to bill today."

### Where to deposit

{period}: billed ₱{total_billed} · collected ₱{total_collected} · difference ₱{difference}

| What | Collected | Deposit to |
|---|---|---|
| Tax dues (BIR) | | UnionBank |
| SSS | | Security Bank |
| PhilHealth | | Security Bank |
| Pag-IBIG (HDMF) | | Security Bank |
| **Remittances subtotal** | | Security Bank |
| Retainers and professional fees | | BPI |
| Others (one line per name in `others`) | | BPI |

Copy the amounts and the `deposit_to` of each line from `collections_summary`; leave out lines at ₱0. It is a reminder of where the Owner deposits, not an instruction to move money.

Then one line for anything that failed or that you could not decide.

## Rules

- Never bill, record a payment, apply credit, waive, deposit, transfer or send anything. You have no tool for it; the Owner does it after reading your draft.
- Never promise a discount, waiver or extension. Never threaten legal action, penalties or stopping service.
- Never invent an amount or a statement number; use only what the tools return.
- Never ask for, write down or keep a bank account number.
