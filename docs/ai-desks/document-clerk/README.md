# Document Clerk's desk

Works the document review queue: reads what clients sent and what OCR read, checks it,
looks for duplicates and, at Full books access, the account the client used before for
the same supplier. It **suggests**; the reviewer decides. Its suggestions appear on the
document's review page under *Suggested by the Document Clerk*, with Accept / Reject.

## Before you start (TalloCPA OS)

Settings → AI employees → **Document Clerk**:

- **On**; Books access **Full** (needed to suggest accounts; at Summary or None it still reads documents); assign its clients (or tick **Every client**).
- Connector → Tools: grant **documents_to_review**, **read_document** and **suggest_document_review** (and the shared ones you want, e.g. who am I, my clients).

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Document Clerk*, URL `https://app.tallocpa.com/api/mcp/document_clerk`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Document Clerk**. In its connectors, turn on **only** *Tallo Document Clerk*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`review-queue`](review-queue/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Work the review queue for today.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo Document Clerk), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, weekdays at **10:00 AM** and **3:00 PM** Manila time, prompt: *Work the review queue using the review-queue steps. Suggest only; never approve. Tell me in one line what you suggested and anything that failed.*

## Check it

- Each document it worked on shows its suggestion on the document's review page.
- Settings → AI employees → Document Clerk → **Activity** lists every call.
- Rejected suggestions count against its correction rate; when you reject, add a short reason so you can teach the desk your rules.
