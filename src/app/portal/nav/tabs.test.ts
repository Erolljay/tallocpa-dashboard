import { describe, expect, it } from "vitest";
import { activeTab, mainTabs } from "./tabs";

describe("portal tabs", () => {
  it("are in the order Home · Upload · Billing · Returns · Reports", () => {
    expect(mainTabs.map((t) => t.label)).toEqual(["Home", "Upload", "Billing", "Returns", "Reports"]);
  });

  it("marks Home only on /portal, and Upload for documents too", () => {
    expect(activeTab("/portal")).toBe("/portal");
    expect(activeTab("/portal/upload")).toBe("/portal/upload");
    expect(activeTab("/portal/documents")).toBe("/portal/upload");
    expect(activeTab("/portal/reports/2316/x/2026")).toBe("/portal/reports");
    expect(activeTab("/portal/billing/abc")).toBe("/portal/billing");
    expect(activeTab("/portal/reports/1")).toBe("/portal/reports");
    expect(activeTab("/portal/requests/9")).toBe("/portal/requests");
    expect(activeTab("/portal/uploads")).toBeNull();
  });
});
