# Setup

How to connect TalloCPA OS to Supabase, Google sign-in and Vercel. Done once by the Owner (or whoever runs the infrastructure).

## 1. Supabase project

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
- **Email:** keep enabled. Edit the **Magic Link** email template so it carries both the link and the code:
  ```html
  <h2>Sign in to Tallo CPA</h2>
  <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Sign in</a></p>
  <p>Or type this code: <strong>{{ .Token }}</strong></p>
  <p>The link and code expire in one hour. If you did not ask to sign in, ignore this email.</p>
  ```
- **URL Configuration:** Site URL `https://app.tallocpa.com`; add `http://localhost:3000/**` to Redirect URLs for development.
- **Custom SMTP (recommended):** connect Resend with a verified `tallocpa.com` domain, so sign-in emails come from the firm and are not rate-limited.

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
3. Sign in at `/login`. Inviting staff and client users from inside the app comes in a later release; until then, repeat these steps with `role` `'staff'` or `'reviewer'`, or insert into `public.client_users` for client users.

## 5. Vercel

1. Import the GitHub repository into Vercel.
2. Set the same environment variables as `.env.local` for Production and Preview.
3. Add the domain `app.tallocpa.com`.
