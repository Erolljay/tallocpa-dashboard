# Collections Clerk's desk

Keeps collections moving: ages what clients owe on issued statements, summarizes each client's payment habits, lists what is ready to bill, reports what was collected and where each part is deposited, and drafts payment reminders. It **drafts**; the Owner decides and sends. Its reminders appear on **Collections** (and on the client's collections page) under *Suggested by the Collections Clerk*, with Accept / Reject. Only the Owner sees them: receivables are closed even to staff.

## Before you start (TalloCPA OS)

Settings → AI employees → **Collections Clerk**:

- **On**; Books access stays **None** (it reads the firm's receivables, not the client's books); assign its clients, or tick **Every client** so it covers the whole receivables list.
- Connector → Tools: grant **receivables_aging**, **client_payment_history**, **jobs_ready_to_bill**, **collections_summary** and **draft_payment_reminder** (and the shared ones you want, e.g. who am I, my clients).
- Daily limit: a run makes about 5 calls plus 2 per client reminded; **60** is plenty for twice a week.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Collections Clerk*, URL `https://app.tallocpa.com/api/mcp/collections_clerk`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Collections Clerk**. In its connectors, turn on **only** *Tallo Collections Clerk*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`collections-run`](collections-run/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Run collections for today.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo Collections Clerk), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, **Mondays and Thursdays at 9:30 AM** Manila time, prompt: *Run collections using the collections-run steps. Draft only; never send. Tell me in one line how many reminders you drafted and anything that failed.*

## What the report shows

- **Reminders drafted**, one per overdue client, with the tone (gentle, firm, final) set by how late the oldest item is. Clients with a payment proof waiting, or whose credit covers the balance, are skipped.
- **Ready to bill**: what a billing run would bill today. Only you run billing.
- **Where to deposit**: billed and collected for the month, and the money collected split by what it is for. The split follows the statement items each payment actually paid, as you applied it when verifying the payment (no pro rata):

  | What | Deposit to |
  |---|---|
  | Tax dues (BIR, firm-remits clients) | UnionBank |
  | SSS, PhilHealth and Pag-IBIG (HDMF) remittances (each, and a subtotal) | Security Bank |
  | Retainers and professional fees | BPI |
  | Others (each listed by name, including payments not yet applied to an item) | BPI |

  The bank names live in `src/lib/collections/summary.ts` (`DEPOSIT_TO`); change them there. No account numbers are kept anywhere.

## Check it

- Each reminder shows on **Collections** under *Suggested by the Collections Clerk*. Accepting records your decision; you still send the message yourself (e.g. with the statement's share link).
- Settings → AI employees → Collections Clerk → **Activity** lists every call.
- When you reject a reminder, add a short reason so you can teach the desk your style.
