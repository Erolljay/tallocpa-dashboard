---
name: onboard-client
description: Work a new Tallo CPA client's onboarding checklist in TalloCPA OS and prepare drafts for staff (engagement, team, chart of accounts, opening balances, kickoff brief, client requests). Use when asked to onboard a client, check onboarding, or prepare a new client.
---

# Onboard a client

For the **Tallo Onboarding Officer** connector. Nothing is changed in the app: every item is a draft staff accept or reject.

## Steps

1. If no client is named, call `onboarding_clients` and ask which one (show progress for each). Otherwise call `onboarding_checklist` for the client.
2. List the checklist items still **to do**, grouped as the tool groups them.
3. For each item you can prepare, draft it with `draft_onboarding_item`:
   - **Engagement and retainer** (`engagement`): from the accepted proposal or the signed engagement letter the Owner attached: services, monthly retainer, start date.
   - **Preparer and reviewer** (`team`): call `staff_for_team`; pick the lightest load against capacity; never the same person for both.
   - **Chart of accounts and books start** (`chart_of_accounts`): template from the taxpayer type; books start as agreed in the engagement.
   - **Opening balances** (`opening_balances`): from the prior-year AFS (statement of financial position) as of the day before the books start, one line per account code of the chosen template, debits = credits. State the source.
   - **Kickoff** (`kickoff_brief`): a one-page brief in markdown: services, the returns due in the next 60 days (`upcoming_filings` for the client), the document cutoff (the 5th), how to send documents (portal or Telegram), who approves returns, and what the client must send before the first cutoff.
   - **Missing documents or answers** (`client_request`): one request listing each item.
4. Items only staff can do (BIR eFiling access, portal invitation, returns already filed this year when the books start mid-year): list them as next steps for the preparer.
5. Reply with: progress (done / total), the drafts you saved, your questions, and what staff should do next. Keep it short.

## Rules

- Copy figures exactly; never round or estimate. If the AFS does not balance, stop and say so.
- One draft per kind per client: saving again replaces your open draft.
- Never ask for or repeat passwords; never contact the client; never claim something is done in the app.
