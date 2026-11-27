import { describe, expect, it } from "vitest";
import { accessNote, canAct, canApprove, isContactAccess } from "./access";
import { contactDetailsSchema, contactLinkSchema, clientUserSchema, newContactSchema } from "@/lib/people/schema";

describe("contact access levels", () => {
  it("full acts and approves; uploader only acts; viewer does neither", () => {
    expect([canAct("full"), canApprove("full")]).toEqual([true, true]);
    expect([canAct("uploader"), canApprove("uploader")]).toEqual([true, false]);
    expect([canAct("viewer"), canApprove("viewer")]).toEqual([false, false]);
    expect([canAct(null), canApprove(undefined)]).toEqual([false, false]);
  });

  it("explains what the contact cannot do", () => {
    expect(accessNote("viewer", "act")).toMatch(/view only/);
    expect(accessNote("uploader", "approve")).toMatch(/full-access contacts/);
  });

  it("recognises only the three levels", () => {
    expect(["full", "uploader", "viewer", "admin", "", null].map(isContactAccess)).toEqual([true, true, true, false, false, false]);
  });
});

describe("contact forms", () => {
  it("defaults to full access when the form leaves it out", () => {
    expect(clientUserSchema.parse({ full_name: "Maria Santos", email: "MARIA@Example.com " })).toMatchObject({ email: "maria@example.com", access: "full" });
    expect(contactLinkSchema.parse({ client_id: "6f1c1d9e-0d8a-4c47-9a53-3a3f8f6d2b11", access: "" }).access).toBe("full");
  });

  it("rejects an unknown level and a missing business", () => {
    expect(clientUserSchema.safeParse({ full_name: "Maria Santos", email: "m@example.com", access: "owner" }).success).toBe(false);
    expect(newContactSchema.safeParse({ full_name: "Maria Santos", email: "m@example.com", access: "viewer" }).success).toBe(false);
  });

  it("keeps a mobile number tidy and refuses one that is not a number", () => {
    expect(contactDetailsSchema.parse({ full_name: "Maria Santos", mobile: "  0917  123 4567 " }).mobile).toBe("0917 123 4567");
    expect(contactDetailsSchema.parse({ full_name: "Maria Santos", mobile: "+63 (917) 123-4567" }).mobile).toBe("+63 (917) 123-4567");
    expect(contactDetailsSchema.parse({ full_name: "Maria Santos", mobile: "" }).mobile).toBeUndefined();
    expect(contactDetailsSchema.safeParse({ full_name: "Maria Santos", mobile: "call me" }).success).toBe(false);
    expect(contactDetailsSchema.safeParse({ full_name: "Maria Santos", mobile: "123" }).success).toBe(false);
  });
});
