# Registration Runner's desk

Watches the firm's open registration cases (new business, renewals, BIR updates, branches,
SEC filings, certificates, employer registration, closures): where each file is, how many
days it has sat at that office, and what is still missing. It **drafts** the BIR
registration form (1901, 1903 or 1905) and the **authority document** the firm needs to
act for the client (a **Secretary's Certificate** for a corporation, one person
corporation or non-stock; a **Partners' Certificate** for a partnership; a **Special
Power of Attorney** for an individual) from what the app holds, and words the **requests
to the client** for what is missing. Its drafts appear on the registration case page under
*Suggested by the Registration Runner*.

It never submits anything to the BIR, the LGU, SEC or DTI, never marks a step done and
never sends a request: a staff member clicks **Send to the client** (the requests go out
as that staff member) or **Reject**; the preparer checks and files the form.

## Before you start (TalloCPA OS)

Settings → AI employees → **Registration Runner**:

- **On**; Books access stays **None** (it reads cases, not books); assign its clients (or tick **Every client**). Only the Registration Runner can read registration cases through the connector.
- Connector → Tools: grant **registration_cases**, **registration_case**, **draft_bir_registration_form**, **draft_authority_document** and **draft_client_requests** (and the shared ones you want, e.g. who am I, my clients).
- Run the `migrate` workflow once after this feature is merged (migrations `20270110000002` and `20270111000003`).

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Registration Runner*, URL `https://app.tallocpa.com/api/mcp/registration_runner`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Registration Runner**. In its connectors, turn on **only** *Tallo Registration Runner*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`registration-run`](registration-run/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Run the registration check for today.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo Registration Runner), or the run waits for a click.
7. **Schedule.** A scheduled task, weekdays at **8:30 AM** Manila time, prompt: *Run the registration check using the registration-run steps. Draft only; never submit or send. Tell me in a few lines which files are late and what you drafted.*

## Check it

- Each case it worked on shows its drafts on the case page (Registrations → the case).
- **Send to the client** creates the requests as you and puts each step on *Waiting on client*; a step finished meanwhile, or a request already open, is skipped.
- Settings → AI employees → Registration Runner → **Activity** lists every call.
- Fields marked *Missing* on a form draft are ones the app does not hold (e.g. the owner's birth date, line of business): get them from the client; the Runner never guesses them.
- **Authority documents.** The draft shows the full text with its blanks highlighted: what the app does not hold (e.g. the owner's full name and civil status, the board meeting date, the SEC number before the SEC step is done) and the **firm's representative** (name, position, ID), which is always left for you to fill for each client. **Print / download** opens it on A4: type the blanks there (nothing is saved) or leave them to write by hand, print or save as PDF, and have the client sign it before a notary. The Corporate Secretary is taken from the client's contacts whose position says *Secretary*; the partners from contacts whose position says *Partner*.
- **Your own templates.** The wording lives in `src/lib/registration/authority-templates.ts` (`SECRETARY_CERTIFICATE`, `PARTNERS_CERTIFICATE`, `SPECIAL_POWER_OF_ATTORNEY`). Replace the text with the firm's own, keeping the `{{placeholders}}` listed in `PLACEHOLDERS`.
