# Setup

How to connect TalloCPA OS to Supabase, Google sign-in and Vercel. Done once by the Owner (or whoever runs the infrastructure).

## 1. Supabase project

> **Done (2026-11-23):** project **TalloCPA OS** (`fjimfmvfmwqmuekzocsw`, Singapore) is created, all migrations in `supabase/migrations/` are applied and `supabase/seed.sql` is loaded. Steps 1–3 below are for rebuilding it. New migrations are applied in order as they are merged.

1. Create a project at supabase.com, **region: Southeast Asia (Singapore)** (spec §3.14).
2. Apply the database: install the Supabase CLI, then from this repo:
   ```bash
   supabase link --project-ref <project-ref>
   supabase db push
   ```
3. Load the starting data (brand, deadline rules, 2027 holidays):
   ```bash
   psql "<connection string from Project Settings → Database>" -f supabase/seed.sql
   ```
4. Copy `.env.example` to `.env.local` and fill in the project URL and the **publishable** key (Project Settings → API Keys).

## 2. Sign-in settings (Authentication → Sign In / Providers)

- **Turn off "Allow new users to sign up".** Only people the Owner invites can sign in. Anyone else who tries — by email or Google — gets no account.
- **Email:** keep enabled. **The standard Magic Link email works as is** — its link returns to `/auth/callback` and signs the person in (open it in the same browser that asked for it).
- **Sending email to clients and staff needs custom SMTP.** Supabase's built-in sender only delivers to members of the Supabase organization and a few messages an hour, and it does not let you edit the email templates. Set up **Resend** (Project Settings → Authentication → SMTP Settings) with a verified `tallocpa.com` domain; after that, the templates become editable.
- **Optional, after SMTP:** edit the **Magic Link** template so the email also carries a 6-digit code (useful when someone opens the email on their phone but signs in on a computer):
  ```html
  <h2>Sign in to Tallo CPA</h2>
  <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Sign in</a></p>
  <p>Or type this code: <strong>{{ .Token }}</strong></p>
  <p>The link and code expire in one hour. If you did not ask to sign in, ignore this email.</p>
  ```
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
- `RESEND_API_KEY` and `EMAIL_FROM` (optional) — send the monthly document request (the 1st) and reminder (day before the cutoff) by email through Resend. `EMAIL_FROM` must be on a domain verified in Resend, e.g. `Tallo CPA <documents@tallocpa.com>`. Without them the request shows in the client portal only.

## 6. Vercel

1. Import the GitHub repository into Vercel.
2. Set the same environment variables as `.env.local` for Production and Preview.
3. Add the domain `app.tallocpa.com`.

## 7. Remove the test data (before go-live)

Five test clients named **"TEST – …"** (TINs starting with 900) and their filings were added on 2026-11-23 to try the app. Delete them in the Supabase SQL Editor before real use; their obligations, filings and team assignments are deleted with them:

```sql
delete from public.clients where name like 'TEST – %';
```
