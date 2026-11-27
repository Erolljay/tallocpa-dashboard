---
name: morning-brief
description: Prepare the Owner's morning brief on BIR returns from TalloCPA OS (overdue, due soon, waiting for the Owner's approval). Use when asked for the morning brief, today's brief, or what is due.
---

# Morning brief

Prepared for the Owner of Tallo CPA from the **Tallo Chief of Staff** connector. Read-only.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. Call `upcoming_filings` with `days: 14`. This returns every return not yet filed that is **overdue or due within 14 days**, with `client`, `client_code`, `form`, `period_label`, `due_date`, `status` and `overdue`, and `today`.
3. Sort the returns into these groups (a return goes in the first group that fits):
   - **Overdue**: `overdue` is true. Days late = `today` minus `due_date`.
   - **Waiting for your approval**: status `client_approved`.
   - **Due in the next 3 days**: due today to `today` + 3.
   - **Due in 4–14 days**.
4. **Clients to watch**: clients with 2 or more returns overdue, or any return due within 3 days that is still *Not started*.
5. Write the brief in the format below. Use only the data from step 2. Do not call `trial_balance` for the daily brief.

## Format

**Morning brief · {weekday day month}** (as of {today}, Philippine time)

**At a glance:** {n} overdue · {n} waiting for your approval · {n} due in 3 days · {n} due in 4–14 days · {n} clients involved

**1. Overdue: act today**

| Client | Return | Period | Due | Days late | Status |
|---|---|---|---|---|---|

**2. Waiting for your approval**

| Client | Return | Period | Due |
|---|---|---|---|

**3. Due in the next 3 days**

| Client | Return | Period | Due | Status |
|---|---|---|---|---|

**4. Due in 4–14 days** (one line per client: *Client: form period (due), form period (due)*)

**5. Clients to watch** (one line each, with the reason)

**Not in this brief yet:** approvals waiting outside the next 14 days, staff workload, receivables and documents waiting. See the TalloCPA OS Dashboard.

## Rules

- Leave out an empty section and write *None* only under **Overdue** when nothing is overdue.
- Status words: Not started, Prepared, Reviewed, Client approved, Approved.
- Never add a return, client or date the tool did not return. If `upcoming_filings` fails, say *The returns list could not be read this morning* and stop.
- Keep it to one screen when possible: if a group has more than 15 rows, show the 15 earliest due and say how many more.
