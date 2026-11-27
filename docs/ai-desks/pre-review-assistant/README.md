# Pre-Review Assistant's desk

Looks at each return marked **prepared** before the Reviewer does: reads the worksheet and
the app's warnings, compares it with the same form's earlier periods, runs the app's
tie-outs (sales vs the books, CWT vs the 2307s received, VAT, EWT), lists customers whose
CWT has no 2307 yet, and checks the ₱3,000,000 VAT threshold. It writes a **review memo**;
the Reviewer decides. The memo appears on the return's page under *Suggested by the
Pre-Review Assistant*, with Accept / Reject. It never marks a return reviewed, sends it
back, approves or files it.

## Before you start (TalloCPA OS)

Settings → AI employees → **Pre-Review Assistant**:

- **On**; Books access **Full** (needed for the tie-outs, the 2307 check, the VAT threshold and the books; at Summary it still reads the return and its earlier periods); assign its clients (or tick **Every client**).
- Connector → Tools: grant **returns_to_pre_review**, **pre_review_return** and **save_review_memo** (and the shared ones you want, e.g. who am I, my clients).
- Daily limit: each run uses about 2 calls, plus 2 per return. For two runs a day and about 20 returns, **60** is enough.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Pre-Review Assistant*, URL `https://app.tallocpa.com/api/mcp/pre_review_assistant`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Pre-Review Assistant**. In its connectors, turn on **only** *Tallo Pre-Review Assistant*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`pre-review`](pre-review/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Pre-review the returns waiting for the Reviewer.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo Pre-Review Assistant), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, weekdays at **9:00 AM** and **2:00 PM** Manila time, prompt: *Pre-review the prepared returns using the pre-review steps. Write memos only; never review or approve. Tell me in one line what you wrote and anything that failed.*

## Check it

- Each return it worked on shows its memo on the return's page, above the sign-off.
- Settings → AI employees → Pre-Review Assistant → **Activity** lists every call.
- Rejected memos count against its correction rate; when you reject, add a short reason so you can teach the desk your rules.
