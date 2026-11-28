# Payment Proof Clerk's desk

Finds the proof of payment of the taxes the firm paid. The app reads the banks' payment confirmations from the payment mailbox (UnionBank Business Banking's *Successful Bills Payment (CLIENT)* email to the BIR biller, and other listed channels), keeps each one with a PDF, and the Clerk matches each email to the return it pays for. It **suggests**; a person attaches. Its suggestions appear on the return's page under *Suggested by the Payment Proof Clerk*, with **Open the payment PDF**, **Attach proof** (references and date prefilled) and **Not this return**.

Attaching keeps the PDF on the return (staff only; the scanned copy stays the one file the client sees), records the bank reference, the BIR reference and the date paid, and the return's **Filed & paid** step then offers them. Filing the return stays your step.

## Before you start

### 1. The payment mailbox (once; docs/SETUP.md → *Payment confirmations mailbox*)

The app needs read-only access to the Gmail mailbox where the banks' confirmations arrive (for UnionBank Business Banking: the email of the user who creates the payments, or a forwarding rule to a firm mailbox).

- Easiest: forward the banks' confirmations to the eSubmission mailbox (attachments@tallocpa.com). The app reads it already; nothing more to set.
- Or give the app its own read-only token for another mailbox: set `PAYMENT_MAIL_GMAIL_REFRESH_TOKEN` (scope `gmail.readonly`) and `PAYMENT_MAILBOX` in Vercel.

The app checks the mailbox at **9:30 AM** and **3:30 PM** Manila time (`/api/cron/payment-mail`), looking back 14 days (`PAYMENT_MAIL_DAYS`).

**Which emails:** the senders and subjects in `src/lib/payment-proof/parse.ts` (`PAYMENT_SENDERS`): UnionBank (*Successful Bills Payment*), LANDBANK Link.BizPortal, DBP PayTax, GCash, Maya. Add a channel there. Mail from the BIR itself goes to the BIR Mail Clerk.

**The PDF:** the email's own PDF attachment when it has one. UnionBank's email has none, so the app writes a simple one-page PDF from the email: the client, biller, amount, bank reference, BIR reference number, TIN, form, tax type, return period and date paid, then the email's text. Bank account numbers are masked to the last 4 digits everywhere (stored text, the PDF the app writes, what the Clerk reads).

### 2. TalloCPA OS: Settings → AI employees → **Payment Proof Clerk**

- **On**; Books access stays **None**; tick **Every client** (a payment can be for any client).
- Connector → Tools: grant **payment_mail_to_match**, **read_payment_mail** and **propose_payment_proof** (and the shared ones you want, e.g. who am I, my clients).
- Daily limit: a run makes about 2 calls plus 2 per email; **60** is plenty.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Payment Proof Clerk*, URL `https://app.tallocpa.com/api/mcp/payment_proof_clerk`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Payment Proof Clerk**. In its connectors, turn on **only** *Tallo Payment Proof Clerk*.
3. **Instructions.** Paste all of [`project-instructions.md`](project-instructions.md) into the project's instructions.
4. **Skill.** Add the [`payment-proofs`](payment-proofs/SKILL.md) skill (Customize → Skills; after an update here, replace the old version).
5. **Try it.** In the project: *Match today's payment emails.*
6. **Permissions.** If you schedule it, set its tools to **Always allow** (Customize → Connectors → Tallo Payment Proof Clerk), or the run waits for a click.
7. **Schedule (optional).** A scheduled task, **weekdays at 10:00 AM and 4:00 PM** Manila time (after the mailbox checks), prompt: *Match the payment emails using the payment-proofs steps. Suggest only; never attach. Tell me in one line how many you matched and anything that failed.*

## How it matches

Strongest first: the **TIN and branch** in the email → the client; **form and return period** → the return; the **amount** to the centavo confirms. A different amount is shown to you, not refused (a partial payment, or one with penalties). The client's name in the subject (*Successful Bills Payment (CHARLIE SINDOL)*) is a further check. The bank pays before the return is filed (*Please do not forget to file the corresponding tax return*), so returns not yet filed are candidates.

## Check it

- Each suggestion shows on the return's page. **Open the payment PDF**, then **Attach proof**, or **Not this return**.
- The attached PDF is under *Proof of payment* on the return; **Filed & paid** offers its reference and date.
- Settings → AI employees → Payment Proof Clerk → **Activity** lists every call.
