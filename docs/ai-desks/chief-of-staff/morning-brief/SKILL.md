---
name: morning-brief
description: Prepare the Owner's morning brief from TalloCPA OS and Google Calendar (today's schedule, overdue returns, returns due soon, returns waiting for the Owner's approval). Use when asked for the morning brief, today's brief, today's schedule, or what is due.
---

# Morning brief

Prepared for the Owner of Tallo CPA from the **Tallo Chief of Staff** connector (schedule from TalloCPA OS, returns) and the **Google Calendar** connector (the Owner's own calendar). Read-only.

> **Schedule sources.** `my_schedule` gives what TalloCPA OS knows: client meetings and discovery calls booked with the Owner, returns due, the Owner's tasks and requests due, and registration target dates. It does not include Google Calendar events (the app keeps no copy of them), so add those from the Google Calendar connector and list each meeting once.

## Steps

1. Call `whoami`. If it fails or you are switched off, say so in one line and stop.
2. **Schedule.**
   - Call `my_schedule` with `from` = today and `to` = tomorrow. Keep today's items, and tomorrow's timed items before 12:00. Each item has `date`, `time` (Manila, empty for an all-day item), `title`, `client`, `place` (meeting link) and `source`.
   - Then, if a Google Calendar connector is available, list the Owner's events from **today 00:00 to tomorrow 12:00, Asia/Manila**, from every calendar it can read. Keep start and end time, title, location or meeting link. Skip declined events.
   - **List each meeting once.** A client meeting or discovery call booked in TalloCPA OS is also on Google Calendar (same start time, same Meet link): keep the `my_schedule` line (it names the client) and drop the calendar copy.
   - If `my_schedule` is not granted or fails, use Google Calendar alone; if neither is available, note *Calendar not connected* under **Not in this brief yet** and continue. If only Google Calendar is missing, note *Google Calendar not connected* there.
3. Call `upcoming_filings` with `days: 14`. This returns every return not yet filed that is **overdue or due within 14 days**, with `client`, `client_code`, `form`, `period_label`, `due_date`, `status` and `overdue`, and `today`.
4. Sort the returns into these groups (a return goes in the first group that fits):
   - **Overdue**: `overdue` is true. Days late = `today` minus `due_date`.
   - **Waiting for your approval**: status `client_approved`.
   - **Due in the next 3 days**: due today to `today` + 3.
   - **Due in 4–14 days**.
5. **Clients to watch**: clients with 2 or more returns overdue, or any return due within 3 days that is still *Not started*.
6. **Meetings with clients to raise:** for each meeting with a `client` from `my_schedule`, and each calendar event whose title, description or attendees name a client from step 3 (match the client's name or code), note what is overdue or waiting for that client, e.g. *ABC Trading, 9:00 AM: 1601-C October overdue 3 days.*
7. Write the brief in the format below. Use only the data from steps 2 and 3. Do not call `trial_balance` for the daily brief.

## Format

**Morning brief · {weekday day month}** (as of {today}, Philippine time)

**At a glance:** {n} meetings today · {n} overdue · {n} waiting for your approval · {n} due in 3 days · {n} due in 4–14 days · {n} clients involved

**Today's schedule** (then **Tomorrow morning**)

| Time | What | Where / link |
|---|---|---|

All-day items from `my_schedule` (returns due, tasks, requests, registration target dates) go first with *All day* as the time; meetings follow by start time.

**To raise in today's meetings** (only if step 6 found any; one line each)

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

- Leave out an empty section and write *None* only under **Overdue** when nothing is overdue, and *No meetings* under **Today's schedule** when the calendar is empty.
- The schedule is read-only: never create, change, accept or decline an event, a meeting, a task or a request.
- Status words: Not started, Prepared, Reviewed, Client approved, Approved.
- Never add a return, client or date the tool did not return. If `upcoming_filings` fails, say *The returns list could not be read this morning* and stop.
- Keep it to one screen when possible: if a group has more than 15 rows, show the 15 earliest due and say how many more.
