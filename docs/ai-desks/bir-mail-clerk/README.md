# BIR Mail Clerk's desk

Works the BIR emails in the firm's eSubmission mailbox that are not linked to a client
yet: eFPS and eBIRForms filing confirmations, eSubmission replies that came outside their
thread, and BIR notices and letters (Letter of Authority, PAN, FAN, FLD, subpoena, notice
of informal conference). For each it finds the client by the TIN in the email and the
return it is about, and **proposes the match**; for a notice it names the notice, its
date and the deadline to answer. An **LOA, PAN, FAN, FLD or subpoena** reaches the Owner at
once (bell, email, and a red notice on Home). A person accepts, which links the email to
the client and the return. It never replies to the BIR, never marks anything filed and
never contacts the client.

Payment confirmations from banks and payment channels are the Payment Proof Clerk's; a
payment confirmation from a BIR address shows here but the Clerk leaves it.

## Before you start (TalloCPA OS)

- The **eSubmission mailbox** must be set up (docs/SETUP.md). The nightly eSubmission job now also stores every email from a bir.gov.ph address received in the last 14 days. Filings → **BIR mail** → *Check the mailbox now* fetches newer ones at any time (Owner).
- Settings → AI employees → **BIR Mail Clerk**: **On**; Books access **None** (it needs none); tick **Every client** (a BIR email can be about any client), or assign its clients.
- Connector → Tools: grant **bir_mail_to_match**, **read_bir_mail** and **propose_bir_mail_match** (and the shared ones you want, e.g. who am I, my clients, a client).
- Daily limit: each run uses about 2 calls, plus 2 per email. For six runs a day and about 15 emails, **60** is enough.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo BIR Mail Clerk*, URL `https://app.tallocpa.com/api/mcp/bir_mail_clerk`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **BIR Mail Clerk**. In its connectors, turn on **only** *Tallo BIR Mail Clerk*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`bir-mail`](bir-mail/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Match the BIR mail waiting.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo BIR Mail Clerk), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, weekdays every 2 hours from **8:00 AM** to **6:00 PM** Manila time, prompt: *Match the BIR mail waiting using the bir-mail steps. Propose only; never reply, link or file. Tell me in one line what you proposed, and name any LOA, PAN, FAN, FLD or subpoena first.*

## Check it

- Filings → **BIR mail** lists what is waiting, with *Match proposed* on the ones it worked; each email's page shows its proposal with **Accept and link** / **Reject**.
- A linked email shows on its return's page under *BIR mail*.
- An urgent notice shows in red on Home and in the bell (Settings → Notifications: *The BIR Mail Clerk found an urgent BIR notice*).
- Settings → AI employees → BIR Mail Clerk → **Activity** lists every call.
