/**
 * Supabase's own sign-in emails (Authentication → Emails → Templates) in the same
 * branded layout as the app's emails. Supabase fills in its Go template variables
 * ({{ .ConfirmationURL }}, {{ .Token }}, …) when it sends; the layout itself only
 * accepts real links, so a placeholder link is rendered and swapped afterwards.
 *
 * `pnpm email:auth-templates` writes them to supabase/templates/; the Owner pastes
 * each file into its template in the Supabase dashboard (docs/SETUP.md §2).
 */
import { renderEmail, type EmailBrand } from "./layout";

const LINK = "https://link.placeholder.invalid/";
const CODE = "__SIGN_IN_CODE__";
const FONT = "'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

export interface AuthTemplate {
  /** File name in supabase/templates/ and the dashboard template it replaces. */
  file: string;
  dashboardName: string;
  subject: string;
  html: string;
}

interface Spec {
  file: string;
  dashboardName: string;
  subject: string;
  heading: string;
  paragraphs: string[];
  /** Supabase variable for the button link; none for code-only emails. */
  link?: string;
  label?: string;
  /** Paragraphs under the button (CODE becomes the 6-digit code, {{ .Token }}). */
  after?: string[];
  because: string;
}

const SPECS: Spec[] = [
  {
    file: "magic_link.html",
    dashboardName: "Magic Link",
    subject: "Your Tallo CPA sign-in link",
    heading: "Sign in to Tallo CPA",
    paragraphs: ["Press the button to sign in. Open it in the same browser where you asked for the link."],
    after: [
      "On another device? Type this code on the sign-in page instead:",
      CODE,
      "The link and the code work once and expire in one hour. If you did not ask to sign in, you can ignore this email.",
    ],
    link: "{{ .ConfirmationURL }}",
    label: "Sign in",
    because: "someone asked to sign in to Tallo CPA with this email address",
  },
  {
    file: "invite.html",
    dashboardName: "Invite user",
    subject: "You're invited to Tallo CPA",
    heading: "You're invited to Tallo CPA",
    paragraphs: [
      "Tallo CPA has set up your account. Press the button to accept and sign in.",
      "After this, sign in at any time with your Google account or a link sent to this email address.",
    ],
    link: "{{ .ConfirmationURL }}",
    label: "Accept and sign in",
    because: "Tallo CPA invited this email address",
  },
  {
    file: "confirmation.html",
    dashboardName: "Confirm signup",
    subject: "Confirm your email for Tallo CPA",
    heading: "Confirm your email",
    paragraphs: ["Press the button to confirm this email address for your Tallo CPA account."],
    link: "{{ .ConfirmationURL }}",
    label: "Confirm email",
    because: "this email address was used for a Tallo CPA account",
  },
  {
    file: "email_change.html",
    dashboardName: "Change Email Address",
    subject: "Confirm your new email for Tallo CPA",
    heading: "Confirm your new email",
    paragraphs: ["Press the button to use {{ .NewEmail }} for your Tallo CPA account from now on.", "If you did not ask for this, ignore this email and tell us."],
    link: "{{ .ConfirmationURL }}",
    label: "Confirm new email",
    because: "a change of email was asked for on your Tallo CPA account",
  },
  {
    file: "recovery.html",
    dashboardName: "Reset Password",
    subject: "Sign in to Tallo CPA",
    heading: "Sign in to Tallo CPA",
    paragraphs: ["Press the button to sign in. If you did not ask for this, you can ignore this email."],
    link: "{{ .ConfirmationURL }}",
    label: "Sign in",
    because: "someone asked for a sign-in link for this email address",
  },
  {
    file: "reauthentication.html",
    dashboardName: "Reauthentication",
    subject: "Your Tallo CPA confirmation code",
    heading: "Confirm it's you",
    paragraphs: ["Type this code in Tallo CPA to continue:", CODE, "If you did not ask for this, you can ignore this email."],
    because: "a confirmation code was asked for on your Tallo CPA account",
  },
];

const P = "margin:16px 0 0 0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:15px;line-height:24px;color:#1b2333;";
const escape = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Paragraphs placed under the button, where the layout has no slot of its own. */
const afterButton = (lines: string[]) => lines.map((l) => (l === CODE ? `<p style="margin:12px 0 0 0;">${codeBlock}</p>` : `<p style="${P}">${escape(l)}</p>`)).join("\n");

const codeBlock = `<span style="display:inline-block;padding:10px 16px;border-radius:10px;background-color:#f3f5fa;font-family:${FONT};font-size:28px;line-height:34px;font-weight:700;letter-spacing:6px;color:#1b2333;">{{ .Token }}</span>`;

/** The sign-in email templates for Supabase, in the firm's layout. */
export function authEmailTemplates(brand?: Partial<EmailBrand>): AuthTemplate[] {
  return SPECS.map((s) => {
    const { html } = renderEmail({
      brand,
      heading: s.heading,
      preheader: s.paragraphs[0],
      paragraphs: s.paragraphs,
      action: s.link ? { label: s.label ?? "Open", url: LINK } : null,
      footerNote: s.because,
      hideSettings: true,
    });
    // The button ends with its "Button not working?" line; the extra paragraphs follow it.
    const marker = html.indexOf("Button not working?");
    const cut = marker === -1 ? -1 : html.indexOf("</p>", marker) + "</p>".length;
    const withAfter = s.after && cut > 0 ? html.slice(0, cut) + "\n" + afterButton(s.after) + html.slice(cut) : html;
    const filled = withAfter
      .split(LINK)
      .join(s.link ?? "")
      .split(CODE)
      .join(codeBlock);
    return { file: s.file, dashboardName: s.dashboardName, subject: s.subject, html: filled };
  });
}
