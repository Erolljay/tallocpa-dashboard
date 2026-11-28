# BIR Mail Clerk's desk

Works the BIR emails the app collected from the firm's mailboxes (the Owner's inbox and
support@tallocpa.com, connected in Settings → Mailboxes, and the eSubmission mailbox) that
are not linked to a client yet. **Filing confirmations come first**: the eBIRForms *Tax
Return Receipt Confirmation* (and eFPS confirmations) that staff need to mark a return
filed. For each it finds the client by the TIN and the return by the form and period the
confirmation names, and **proposes the match**; staff then click **Attach confirmation**,
which files the confirmation's PDF on the return to print with the form. It also handles
eSubmission replies that came outside their thread and the occasional BIR notice (clients
usually receive LOAs, PANs and FANs and forward a copy; when one does arrive by email, an
**LOA, PAN, FAN, FLD or subpoena** still reaches the Owner at once). It never replies to the
BIR, never marks anything filed and never contacts the client.

Payment confirmations from banks and payment channels are the Payment Proof Clerk's; a
payment confirmation from a BIR address shows here but the Clerk leaves it.

## Before you start (TalloCPA OS)

- **Mailboxes:** Settings → **Mailboxes**: connect your own inbox and **support@tallocpa.com** (read only), with *BIR mail* ticked (docs/SETUP.md, *Connected mailboxes*). The app checks them **every two days** at 12:15 PM Manila; Filings → **BIR mail** → *Check the mailboxes now* fetches newer ones at any time (Owner).
- Settings → AI employees → **BIR Mail Clerk**: **On**; Books access **None** (it needs none); tick **Every client** (a BIR email can be about any client), or assign its clients.
- Connector → Tools: grant **bir_mail_to_match**, **read_bir_mail** and **propose_bir_mail_match** (and the shared ones you want, e.g. who am I, my clients, a client).
- Daily limit: each run uses about 2 calls, plus 2 per email. For three runs a week and about 30 emails a run, **70** is enough.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo BIR Mail Clerk*, URL `https://app.tallocpa.com/api/mcp/bir_mail_clerk`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **BIR Mail Clerk**. In its connectors, turn on **only** *Tallo BIR Mail Clerk*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`bir-mail`](bir-mail/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Match the BIR mail waiting.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo BIR Mail Clerk), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, **Monday, Wednesday and Friday at 1:00 PM** Manila time (after the mailbox check), prompt: *Match the BIR mail waiting using the bir-mail steps: filing confirmations first. Propose only; never reply, link, attach or file. Tell me in one line what you proposed, and name any LOA, PAN, FAN, FLD or subpoena first.*

## Check it

- Filings → **BIR mail** lists what is waiting, with *Match proposed* on the ones it worked. Each email's page shows its proposal and the PDF (*Open to print*).
- For a filing confirmation the proposal shows **Attach confirmation** (on the email's page and on the return's page under *BIR mail*): the Owner or staff keeping the client's books click it; the email is linked and its PDF is added to the return's files. Print it with the return form for the scanned copy, then mark the return filed at **Filed & paid** as usual. **Link only** links without attaching; **Reject** if the match is wrong.
- An urgent notice shows in red on Home and in the bell (Settings → Notifications: *The BIR Mail Clerk found an urgent BIR notice*).
- Settings → AI employees → BIR Mail Clerk → **Activity** lists every call.
