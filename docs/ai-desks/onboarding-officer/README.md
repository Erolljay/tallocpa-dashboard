# Onboarding Officer's desk

Works each new client's onboarding checklist and prepares what staff need to finish it:
the engagement, the team, the chart of accounts and books start, opening balances, a
kickoff brief and requests to the client. Everything it prepares is a **draft** that staff
accept or reject on the client's **Onboarding** tab; it changes nothing in TalloCPA OS.

## Before you start (TalloCPA OS)

Settings → AI employees → **Onboarding Officer**:

- **On**; Books access **Full** (it drafts opening balances).
- **Clients:** assign the clients being onboarded (remove them once they are active).
- Connector → Tools: **Grant all** (who am I, my clients, a client, upcoming returns, trial balance, clients being onboarded, onboarding checklist, staff and their load, draft an onboarding item).

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Onboarding Officer*, URL `https://app.tallocpa.com/api/mcp/onboarding_officer`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Onboarding Officer**. In its connectors, turn on **only** *Tallo Onboarding Officer*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`onboard-client`](onboard-client/SKILL.md) skill (Customize → Skills), or paste its steps at the end of the instructions.
5. **Try it.** In the project: *Onboard Jaro Trading.* Attach the client's COR, last year's AFS and ITR to the conversation when you have them.
6. **Tool permissions.** Set the read tools to **Always allow**; leave **Draft an onboarding item** on approval at first if you want to see each draft before it is saved.

## Check it

- The client's **Onboarding** tab shows *Suggested by the Onboarding Officer* with each draft: **Accept** records your decision (then make the change in the app as usual), **Reject** discards it.
- Settings → AI employees → Onboarding Officer → **Activity** lists every call.
