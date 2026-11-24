import { describe, expect, it } from "vitest";
import { clientUserSchema, inviteStaffSchema, loadPoints, updateStaffSchema } from "./schema";

describe("people forms", () => {
  it("normalises the email and refuses the owner role on invite", () => {
    expect(inviteStaffSchema.parse({ full_name: "Ana Cruz", email: " Ana@Example.COM ", role: "staff", branch_id: "00000000-0000-4000-8000-0000000000b1" }).email).toBe("ana@example.com");
    expect(inviteStaffSchema.safeParse({ full_name: "Ana Cruz", email: "ana@example.com", role: "owner" }).success).toBe(false);
  });
  it("reads the active checkbox", () => {
    expect(updateStaffSchema.parse({ role: "staff", capacity_points: "60", branch_id: "00000000-0000-4000-8000-0000000000b1", active: "on" }).active).toBe(true);
    expect(updateStaffSchema.parse({ role: "staff", capacity_points: "60", branch_id: "00000000-0000-4000-8000-0000000000b1" }).active).toBe(false);
  });
  it("makes position optional for client users", () => {
    expect(clientUserSchema.parse({ full_name: "Juan Dela Cruz", email: "juan@example.com", position: "" }).position).toBeUndefined();
  });
});

describe("loadPoints", () => {
  it("is the monthly retainer total divided by ₱1,000", () => {
    expect(loadPoints([2500, 6500, 1000])).toBe(10);
    expect(loadPoints([])).toBe(0);
    expect(loadPoints([1234.5])).toBe(1.23);
  });
});
