import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ supabaseAdmin: () => { throw new Error("no secret key in tests"); } }));

const { dispatchNotificationEmails } = await import("./dispatch");

const row = (id: number, over: Record<string, unknown> = {}) => ({
  id,
  user_id: `u${id}`,
  email: `person${id}@example.com`,
  kind: "return_ready_for_review",
  title: `1601-C for <Molo & Sons> is ready`,
  body: "Prepared by Rhea.",
  href: `/app/filings/f${id}`,
  client_id: "c1",
  brand_id: null,
  is_staff: true,
  created_at: "2026-12-01T00:00:00Z",
  ...over,
});

function fakeAdmin(rows: ReturnType<typeof row>[]) {
  const finished: { p_id: number; p_status: string; p_error: string | null }[] = [];
  const rpc = vi.fn(async (fn: string, args: Record<string, unknown>) => {
    if (fn === "claim_notification_emails") return { data: rows, error: null };
    if (fn === "finish_notification_email") {
      finished.push(args as (typeof finished)[number]);
      return { data: null, error: null };
    }
    throw new Error(`unexpected rpc ${fn}`);
  });
  const from = () => ({
    select: () => ({
      order: () => ({ limit: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
      eq: () => ({ limit: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
    }),
  });
  return { admin: { rpc, from } as unknown as SupabaseClient, rpc, finished };
}

describe("dispatchNotificationEmails", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("EMAIL_FROM", "Tallo CPA <hello@tallocpa.example>");
    fetchMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends each claimed email in the branded layout and records it sent", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const { admin, rpc, finished } = fakeAdmin([row(1)]);
    const r = await dispatchNotificationEmails(admin, "https://os.example/", 10);
    expect(r).toEqual({ claimed: 1, sent: 1, failed: 0, skipped: 0 });
    expect(rpc).toHaveBeenCalledWith("claim_notification_emails", { p_limit: 10 });
    expect(finished).toEqual([{ p_id: 1, p_status: "sent", p_error: null }]);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.to).toEqual(["person1@example.com"]);
    expect(body.subject).toBe("1601-C for <Molo & Sons> is ready");
    expect(body.html).toContain("1601-C for &lt;Molo &amp; Sons&gt; is ready");
    expect(body.html).toContain('href="https://os.example/app/filings/f1"');
    expect(body.html).toContain(">Review the return</a>");
    expect(body.html).toContain("https://os.example/app/settings/notifications");
    expect(body.text).toContain("Review the return: https://os.example/app/filings/f1");
  });

  it("records a failure without stopping the others", async () => {
    fetchMock.mockResolvedValueOnce(new Response("bad address", { status: 422 })).mockResolvedValueOnce(new Response("{}", { status: 200 }));
    const { admin, finished } = fakeAdmin([row(1), row(2, { is_staff: false, kind: "payment_verified", href: "/portal/billing" })]);
    const r = await dispatchNotificationEmails(admin, "https://os.example");
    expect(r).toEqual({ claimed: 2, sent: 1, failed: 1, skipped: 0 });
    expect(finished[0]).toMatchObject({ p_id: 1, p_status: "failed" });
    expect(finished[0].p_error).toContain("422");
    expect(finished[1]).toEqual({ p_id: 2, p_status: "sent", p_error: null });
    const body = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(body.html).toContain("https://os.example/portal/settings/notifications");
    expect(body.html).toContain(">See billing</a>");
  });

  it("skips every email when Resend is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { admin, finished } = fakeAdmin([row(1), row(2)]);
    const r = await dispatchNotificationEmails(admin, "https://os.example");
    expect(r).toEqual({ claimed: 2, sent: 0, failed: 0, skipped: 2 });
    expect(finished).toEqual([
      { p_id: 1, p_status: "skipped", p_error: "email not configured" },
      { p_id: 2, p_status: "skipped", p_error: "email not configured" },
    ]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("skips a person without an email address and never throws on a claim error", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const { admin, finished } = fakeAdmin([row(1, { email: null })]);
    expect(await dispatchNotificationEmails(admin, "https://os.example")).toEqual({ claimed: 1, sent: 0, failed: 0, skipped: 1 });
    expect(finished[0]).toEqual({ p_id: 1, p_status: "skipped", p_error: "no email address" });

    const broken = { rpc: async () => ({ data: null, error: { message: "permission denied" } }) } as unknown as SupabaseClient;
    expect(await dispatchNotificationEmails(broken, "https://os.example")).toEqual({ claimed: 0, sent: 0, failed: 0, skipped: 0, error: "permission denied" });
  });
});
