# Setup

How to connect TalloCPA OS to Supabase, Google sign-in and Vercel. Done once by the Owner (or whoever runs the infrastructure).

## 1. Supabase project

> **Done (2026-11-23):** project **TalloCPA OS** (`fjimfmvfmwqmuekzocsw`, Singapore) is created, all migrations in `supabase/migrations/` are applied and `supabase/seed.sql` is loaded. Steps 1–3 below are for rebuilding it. New migrations are applied automatically when they reach `main` (see **Automatic migrations** below).

1. Create a project at supabase.com, **region: Southeast Asia (Singapore)** (spec §3.14).
2. Apply the database from this repo (needs `psql`; the connection string is under **Connect → Session pooler**):
   ```bash
   SUPABASE_DB_URL="<session pooler connection string>" scripts/apply-migrations.sh
   ```
   (`supabase db push` does not work here: two migration files share the version `20261123000010`.)
3. Load the starting data (brand, deadline rules, 2027 holidays):
   ```bash
   psql "<connection string from Project Settings → Database>" -f supabase/seed.sql
   ```
4. Copy `.env.example` to `.env.local` and fill in the project URL and the **publishable** key (Project Settings → API Keys).

### Automatic migrations

The **Apply database migrations** workflow (`.github/workflows/migrate.yml`) runs `scripts/apply-migrations.sh` whenever a change under `supabase/migrations/` is merged to `main`, so the live database never falls behind the deployed code. It applies only the files the database has not run (matched by name in `supabase_migrations.schema_migrations`), each in its own transaction, and stops at the first error.

One-time setup: in Supabase, open **Connect → Session pooler** and copy the URI (port 5432, IPv4; the direct connection is IPv6-only and GitHub runners cannot reach it). Put the database password in it, then add it on GitHub under **Settings → Secrets and variables → Actions → New repository secret** as `SUPABASE_DB_URL`.

To check or catch up by hand: **Actions → Apply database migrations → Run workflow** (tick *dry run* to only list what is pending). If a run fails, the failed migration was rolled back; fix the file in a new pull request and the next merge applies it.

## 2. Sign-in settings (Authentication → Sign In / Providers)

- **Turn off "Allow new users to sign up".** Only people the Owner invites can sign in. Anyone else who tries — by email or Google — gets no account.
- **Email:** keep enabled. **The standard Magic Link email works as is** — its link returns to `/auth/callback` and signs the person in (open it in the same browser that asked for it).
- **Sending email to clients and staff needs custom SMTP.** Supabase's built-in sender only delivers to members of the Supabase organization and a few messages an hour, and it does not let you edit the email templates. Set up **Resend** (Project Settings → Authentication → SMTP Settings) with a verified `tallocpa.com` domain; after that, the templates become editable.
- **Branded sign-in emails, after SMTP:** Supabase sends the sign-in link, invitation and other account emails itself, from its own templates, so they do not get the app's branded layout on their own. Paste the firm's versions in: open each file in `supabase/templates/` (raw view on GitHub), copy all of it, and paste it into the matching template under **Authentication → Emails → Templates** (Magic Link, Invite user, Confirm signup, Change Email Address, Reset Password, Reauthentication), with the subject listed in `supabase/templates/README.md`. The Magic Link email carries the link and a 6-digit code (for signing in on another device). After changing the layout, run `pnpm email:auth-templates` and paste them again.
- **URL Configuration:** Site URL `https://app.tallocpa.com`; add `http://localhost:3000/**` to Redirect URLs for development.

## 3. Google sign-in

1. In Google Cloud Console → APIs & Services → Credentials, create an **OAuth client ID** (type: Web application).
   - Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
2. OAuth consent screen: app name **Tallo CPA**, support email, logo; publish it (External) so clients with personal Gmail accounts can use it.
3. In Supabase → Authentication → Providers → **Google**: enable it and paste the client ID and secret.

A Google account signs in to the same person as the email invite when the email addresses match. Someone whose Google email was never invited cannot get in.

## 4. First Owner

1. Supabase → Authentication → Users → **Invite user** with the Owner's email.
2. In the SQL editor, link that user as Owner:
   ```sql
   insert into public.staff_profiles (user_id, brand_id, full_name, role)
   select u.id, b.id, '<full name>', 'owner'
   from auth.users u, public.brands b
   where u.email = '<owner email>' and b.code = 'TC';
   ```
3. Sign in at `/login`. After that, add staff on the **Staff** page and client portal users on each client's page — no SQL needed.

## 5. Server-only keys

Set these in Vercel (Settings → Environment Variables, Production) — never in the browser or in chat:

- `SUPABASE_SECRET_KEY` — Supabase → Project Settings → API Keys → **Secret key**. Used to create logins when the Owner adds staff or client users, and by the nightly filing job.
- `GEMINI_API_KEY` — Gemini API key for OCR, from aistudio.google.com on a Google Cloud project **with billing on** (paid tier: the free tier may use data for training). Without it, uploads still work and staff type the figures themselves.
- `GEMINI_MODEL` (optional) — the Gemini model OCR uses; default `gemini-3.8-flash`. Change it to compare models on real receipts (open item O4).
- `GEMINI_FALLBACK_MODEL` (optional) — second model OCR tries when the main one is busy; default `gemini-2.5-flash`. OCR retries busy errors (503/429) twice per model before falling back.
- `CRON_SECRET` — any long random string. Vercel sends it to `/api/cron/generate-filings` (scheduled in `vercel.json` at 02:00 Manila time) so nobody else can trigger the job.
- `RESEND_API_KEY` and `EMAIL_FROM` — every email the app sends goes through Resend in the branded layout: the monthly document request and reminder, the 7:00 am deadline emails, and the notification emails (below). `EMAIL_FROM` must be on a domain verified in Resend, e.g. `Tallo CPA <notifications@tallocpa.com>`. Replies go to the **Reply-to email** in Settings → Brand. Without these, nothing is emailed; the bell and the portal still show everything.

### Notifications

Returns, payments, requests, leads and bookings each notify the people who act next: the bell in the sidebar (staff) or header (clients), and an email unless the person turned that kind off on their **Notifications** settings page. The full list of events and who receives each is at the top of `supabase/migrations/20261213000001_notifications.sql`.

Emails leave right after the action that caused them (the app sends them once the page has answered). As a safety net, also send any that are waiting once a minute: in Supabase → **Integrations → Cron**, add a job every minute (`* * * * *`) of type **HTTP request**: `GET https://app.tallocpa.com/api/cron/notifications` with the header `Authorization: Bearer <CRON_SECRET>`. Without it, a waiting email goes out with the next action anyone takes in the app, or with the 7:00 am job at the latest. An email not sent within 3 days is dropped (the bell has shown it).

### Sign-out after no activity

Staff are signed out after **30 minutes** without activity and clients after **15 minutes**, with a one-minute warning and a **Stay signed in** button. Activity in any tab counts for all tabs; a browser left closed past the limit is signed out on its next visit. The limits are in `src/lib/session/idle.ts`.

### eSubmission mailbox (optional, docs/REWORK.md decision 15)

After the Owner approves a return with DAT attachments (SLS, SLP, SAWT, QAP, alphalist), the app emails the DAT files from **attachments@tallocpa.com** to **esubmission@bir.gov.ph** through the Gmail API and attaches the BIR's validation report from the reply in that mailbox. Until these are set, the return page says the mailbox is not set up: staff send the DAT files by hand, press **Mark sent**, and upload the validation report (or record the errors) themselves.

1. In Google Cloud under the tallocpa.com organization: a project with an **Internal** OAuth consent screen and the **Gmail API** turned on. Create an **OAuth client ID** (Web application) with the redirect URI `https://developers.google.com/oauthplayground`.
2. Get the mailbox's refresh token once: open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground), tick *Use your own OAuth credentials* (gear icon) and paste the client ID and secret, authorize the scope `https://www.googleapis.com/auth/gmail.modify` **signed in as attachments@tallocpa.com**, then exchange the code and copy the refresh token.
3. Set in Vercel (server only):
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — the OAuth client.
   - `ESUBMISSION_GMAIL_REFRESH_TOKEN` — the refresh token from step 2.
   - `ESUBMISSION_MAILBOX` (optional) — default `attachments@tallocpa.com`.
   - `ESUBMISSION_TO` (optional) — default `esubmission@bir.gov.ph`; point it at an internal address to try the flow first.
4. The reply check runs once a day (`/api/cron/esubmission` in `vercel.json`, 11:40 Manila, with `CRON_SECRET`); staff can also press **Check the mailbox for the reply** on the return. It reads the thread of each send still waiting: the BIR's attachment (or its message, as a text file) becomes the validation report, and the send is marked **Validated** or **Errors**. A reply the app cannot read is marked Errors with a note; staff open it and correct the result.

### Google Calendar (optional, docs/REWORK.md decisions 18, 20 and 22)

The team calendar (Home → Team calendar), the lead's booking page (`/book/…`, link on the lead) and the portal's **Book a meeting** read each staff member's own Google Calendar and create events with a Meet link. Each staff member connects their own calendar once from Home → Team calendar. Until this is set, those pages say Google Calendar is not set up and the booking pages ask the person to email instead.

1. In the same Google Cloud project as eSubmission (Internal consent screen), turn on the **Google Calendar API** and add these scopes to the consent screen: `calendar.events`, `calendar.calendarlist.readonly`, `calendar.freebusy`, `openid`, `email`.
2. On the same OAuth client, add the redirect URI `https://app.tallocpa.com/app/calendar/callback` (and the preview address if you try it there).
3. Set in Vercel (server only):
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — the same OAuth client as eSubmission.
   - `GOOGLE_TOKEN_KEY` — 32 random bytes, base64 (`openssl rand -base64 32`). Encrypts the staff refresh tokens kept in the database. Changing it disconnects everyone: each person connects again.
   - `APP_URL` (optional) — e.g. `https://app.tallocpa.com`, so the OAuth redirect always uses that address.
   - `GOOGLE_WORKSPACE_DOMAIN` (optional) — default `tallocpa.com`. Only accounts of this domain can connect, and each person only the account they sign in with.
4. What shows: on the team calendar, events on each person's tallocpa.com calendar in full; their private events and personal calendars as **Busy** only. Bookings offer 9:00–17:00 Manila on working days (holidays from the deadline calendar skipped), from 24 hours ahead: 45-minute discovery calls over 14 days, 30-minute client meetings over 21 days.

### Telegram uploads (optional)

Telegram is one more way documents come in, next to the portal, staff uploads, email and batch. It is **off for every client** until staff switch it on for that client (client page → *Telegram uploads* → *Turn on Telegram*). A client without it never sees Telegram in the portal.

Telegram bot chats are encrypted between the phone and Telegram, but they are **not end-to-end encrypted** (only Telegram's Secret Chats are, and bots cannot use them). Turn it on only for clients who ask for it.

1. In Telegram, open **@BotFather**, send `/newbot`, and choose a name (e.g. *Tallo CPA Documents*) and a username ending in `bot`. Copy the token.
2. In Vercel → Settings → Environment Variables, add `TELEGRAM_BOT_TOKEN` (the token), `TELEGRAM_BOT_USERNAME` (the username, without @) and `TELEGRAM_WEBHOOK_SECRET` (any long random string, e.g. `openssl rand -hex 32`). Redeploy.
3. Point the bot at the app (once, with the same token and secret):

   ```bash
   curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -d "url=https://app.tallocpa.com/api/telegram/webhook" -d "secret_token=$TELEGRAM_WEBHOOK_SECRET" -d 'allowed_updates=["message","callback_query"]'
   ```

How it works:

- **Clients:** on Upload, *Link Telegram* opens the bot with a one-time code (15 minutes). From then on that chat sends for that client, as that portal user. They send photos or PDFs (albums of up to 10 too), tap what they are, and each file becomes its own document in that client's Inbox, in the month open for documents, marked *Telegram*. Their notifications are also sent to the chat.
- **Staff (the Owner included):** Settings → Notifications → *Link Telegram*. In the bot, `/client molo` lists matching clients assigned to you (the Owner: all clients); tap one. Send the files, tap what they are, then the month. They go to that client's Inbox under your name. The bot remembers the client until you choose another.
- **Type first (`/send`):** to send many files of one kind, send `/send` and tap the kind (staff: then the month, this month or the three before it; staff choose the client with `/client` first). The bot confirms, e.g. *Sending as Purchase / expense (for Molo Bakeshop, November 2026)*, and from then on every file is filed straight away as that kind, with no buttons. A single file or an album gets one reply, updated as its files are filed, naming any that could not be sent. Excel or CSV is taken only as Payroll; under any other kind the bot says so and does not file it. `/done` ends it; so do choosing another client and 30 minutes without a file (the next file then gets the usual buttons, with a note that the choice expired). Without `/send`, files get buttons as above.
- A chat that is not linked cannot send anything. `/unlink` in the bot, or *Unlink* in the app, stops a chat.

### AI employees' connector (docs/AI-WORKFORCE.md)

The TalloCPA OS connector (MCP server) lets AI employees work in the app with their own keys. Each AI employee has its own address, `https://app.tallocpa.com/api/mcp/<key>` (e.g. `/api/mcp/document_clerk`), shown on its page under **Settings → AI Employees**. Its tools run as that AI employee under the database's own rules, so it reads only what the Owner granted and can sign nothing.

1. **Connection string.** In Vercel → Settings → Environment Variables, add `SUPABASE_DB_URL`: the same **session pooler** URI as the migrations workflow's GitHub secret (Supabase → **Connect → Session pooler**, port 5432, with the database password). Without it, the connector answers 503 and nothing else changes.
2. **Certificate (recommended).** In Supabase → **Database settings → SSL configuration**, download the certificate and add its whole text as `SUPABASE_DB_CA`. With it the connection is encrypted *and* the database server is verified; without it the connection is encrypted only, and the app logs a warning.
3. Redeploy.
4. In **Settings → AI Employees**, open an AI employee: switch it on, assign clients, choose its books access, **grant its tools** (Connector → Tools), and create a key.
5. **Claude Code** (or any MCP client that sends a header):

   ```bash
   claude mcp add --transport http document-clerk https://app.tallocpa.com/api/mcp/document_clerk --header "Authorization: Bearer <key>"
   ```

   **Claude Cowork** signs in to custom connectors with OAuth; that comes in build step 2b. (Plain keys there are a beta that only some organizations have.)

Each tool call counts against the AI employee's calls per day and appears under **Activity** on its page.

## 6. Vercel

1. Import the GitHub repository into Vercel.
2. Set the same environment variables as `.env.local` for Production and Preview.
3. Add the domain `app.tallocpa.com`.

## 7. Remove the test data (before go-live)

Five test clients named **"TEST – …"** (TINs starting with 900) and their filings were added on 2026-11-23 to try the app. Delete them in the Supabase SQL Editor before real use; their obligations, filings and team assignments are deleted with them:

```sql
delete from public.clients where name like 'TEST – %';
```
