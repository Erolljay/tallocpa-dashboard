import { describe, expect, it } from "vitest";
import { isPriority, sortTasks, taskDue } from "./labels";

describe("taskDue", () => {
  it("compares an open task's due date with today", () => {
    expect(taskDue("open", "2026-11-25", "2026-11-26")).toEqual({ label: "Overdue", tone: "blocked" });
    expect(taskDue("open", "2026-11-26", "2026-11-26")).toEqual({ label: "Due today", tone: "waiting" });
    expect(taskDue("open", "2026-12-01", "2026-11-26")).toEqual({ label: "Open", tone: "progress" });
    expect(taskDue("open", null, "2026-11-26").label).toBe("No due date");
    expect(taskDue("done", "2026-11-01", "2026-11-26").label).toBe("Done");
    expect(taskDue("cancelled", "2026-11-01", "2026-11-26").label).toBe("Cancelled");
  });
});

describe("sortTasks", () => {
  it("puts open tasks first, soonest due, then priority", () => {
    const t = (id: string, status: "open" | "done", due_date: string | null, priority: "high" | "normal" | "low") => ({ id, status, due_date, priority, created_at: "2026-11-01" });
    const sorted = sortTasks([t("a", "done", "2026-11-01", "high"), t("b", "open", null, "high"), t("c", "open", "2026-12-01", "low"), t("d", "open", "2026-12-01", "high"), t("e", "open", "2026-11-20", "low")]);
    expect(sorted.map((x) => x.id)).toEqual(["e", "d", "c", "b", "a"]);
  });
  it("knows the priorities", () => {
    expect(isPriority("high")).toBe(true);
    expect(isPriority("urgent")).toBe(false);
  });
});
