import { describe, expect, it } from "vitest";
import { splitPersonName } from "./names";

describe("splitPersonName", () => {
  it("reads Last, First Middle", () => {
    expect(splitPersonName("DELA CRUZ, JUAN SANTOS")).toEqual({ last: "DELA CRUZ", first: "JUAN", middle: "SANTOS" });
    expect(splitPersonName("Reyes, Maria Cristina Lopez")).toEqual({ last: "Reyes", first: "Maria Cristina", middle: "Lopez" });
    expect(splitPersonName("Garcia, Jose Jr.")).toEqual({ last: "Garcia", first: "Jose Jr.", middle: null });
  });

  it("reads First Middle Last, keeping surname particles together", () => {
    expect(splitPersonName("Juan S. Dela Cruz")).toEqual({ last: "Dela Cruz", first: "Juan", middle: "S." });
    expect(splitPersonName("MARIA CRISTINA REYES DE LOS SANTOS")).toEqual({ last: "DE LOS SANTOS", first: "MARIA CRISTINA", middle: "REYES" });
    expect(splitPersonName("Pedro Penduko")).toEqual({ last: "Penduko", first: "Pedro", middle: null });
  });

  it("drops the proprietor mark and keeps a suffix with the first name", () => {
    expect(splitPersonName("Juan Dela Cruz Jr. - Prop.")).toEqual({ last: "Dela Cruz", first: "Juan Jr.", middle: null });
    expect(splitPersonName("ANA B. LIM (Owner)")).toEqual({ last: "LIM", first: "ANA", middle: "B." });
  });

  it("does not split a business name or a single word", () => {
    expect(splitPersonName("JDC Hardware")).toBeNull();
    expect(splitPersonName("Acme Services Inc.")).toBeNull();
    expect(splitPersonName("Madonna")).toBeNull();
    expect(splitPersonName("")).toBeNull();
  });
});
