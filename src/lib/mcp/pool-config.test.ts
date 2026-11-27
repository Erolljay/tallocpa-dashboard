import { describe, expect, it } from "vitest";
import { poolConfig } from "./pool-config";

const URL_ = "postgresql://postgres.abc:pw@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require";

describe("connector pool settings", () => {
  it("verifies the server against Supabase's certificate when it is given", () => {
    const c = poolConfig(URL_, "-----BEGIN CERTIFICATE-----\nx\n-----END CERTIFICATE-----");
    expect(c.ssl).toEqual({ ca: "-----BEGIN CERTIFICATE-----\nx\n-----END CERTIFICATE-----", rejectUnauthorized: true });
  });

  it("still encrypts without the certificate", () => {
    expect(poolConfig(URL_, undefined).ssl).toEqual({ rejectUnauthorized: false });
  });

  it("drops sslmode from the URL so it cannot override the TLS settings, and keeps the rest", () => {
    const u = new URL(poolConfig(URL_, undefined).connectionString!);
    expect(u.searchParams.has("sslmode")).toBe(false);
    expect([u.hostname, u.port, u.username, u.pathname]).toEqual(["aws-0-ap-southeast-1.pooler.supabase.com", "5432", "postgres.abc", "/postgres"]);
  });
});
