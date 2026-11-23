import "server-only";

/**
 * Sends one email through Resend (spec §3.13). Needs RESEND_API_KEY and EMAIL_FROM;
 * without them nothing is sent and the caller is told so.
 */
export async function sendEmail(to: string[], subject: string, text: string): Promise<"sent" | "not_configured"> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || to.length === 0) return "not_configured";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) throw new Error(`Email not sent (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return "sent";
}
