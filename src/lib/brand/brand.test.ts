import { describe, expect, it } from "vitest";
import { expiryStatus, firmBlockLines, formatTin, parseSection, parseTin } from "./profile";
import { grossReceiptsWatch } from "./receipts";

describe("parseTin", () => {
  it("accepts 9 digits typed plain, dashed or spaced", () => {
    expect(parseTin("123456789")).toEqual({ tin: "123-456-789", branch: null });
    expect(parseTin(" 123-456-789 ")).toEqual({ tin: "123-456-789", branch: null });
    expect(parseTin("123 456 789")).toEqual({ tin: "123-456-789", branch: null });
  });
  it("splits off a branch code typed with the TIN", () => {
    expect(parseTin("123-456-789-00000")).toEqual({ tin: "123-456-789", branch: "00000" });
    expect(parseTin("123456789000")).toEqual({ tin: "123-456-789", branch: "000" });
  });
  it("rejects anything else", () => {
    for (const bad of ["12345678", "1234567890", "123-456-78a", "123-456-789-00", "123-456-789-000000", ""]) expect(parseTin(bad)).toBeNull();
  });
  it("formats with the branch for print", () => {
    expect(formatTin("123-456-789", "00000")).toBe("123-456-789-00000");
    expect(formatTin("123-456-789", null)).toBe("123-456-789");
    expect(formatTin(null, "000")).toBeNull();
  });
});

describe("parseSection", () => {
  it("normalises the BIR card and takes the branch from the TIN when left blank", () => {
    expect(parseSection("bir", { tin: "123456789 00000", tin_branch_code: "", rdo_code: "113a", registered_address: " Iloilo City " })).toEqual({
      data: { tin: "123-456-789", tin_branch_code: "00000", rdo_code: "113A", registered_address: "Iloilo City" },
    });
    expect(parseSection("bir", { tin: "", tin_branch_code: "", rdo_code: "", registered_address: "" })).toEqual({
      data: { tin: null, tin_branch_code: null, rdo_code: null, registered_address: null },
    });
  });
  it("explains a bad TIN, branch code or RDO", () => {
    expect(parseSection("bir", { tin: "12345" })).toEqual({ error: "Enter the TIN as 9 digits, e.g. 123-456-789." });
    expect(parseSection("bir", { tin_branch_code: "12" })).toMatchObject({ error: expect.stringMatching(/3 to 5 digits/) });
    expect(parseSection("bir", { rdo_code: "Iloilo" })).toMatchObject({ error: expect.stringMatching(/RDO/) });
  });
  it("checks contact emails and links, adding https:// when left out", () => {
    expect(parseSection("contact", { reply_to_email: "hello@tallocpa.com", website: "tallocpa.com", facebook_url: "facebook.com/tallocpa", phone: "0917 123 4567" })).toEqual({
      data: { business_address: null, phone: "0917 123 4567", reply_to_email: "hello@tallocpa.com", website: "https://tallocpa.com", facebook_url: "https://facebook.com/tallocpa" },
    });
    expect(parseSection("contact", { reply_to_email: "hello@" })).toEqual({ error: "Enter a valid email address." });
    expect(parseSection("contact", { website: "not a site" })).toMatchObject({ error: expect.stringMatching(/web address/) });
    expect(parseSection("contact", { facebook_url: "https://example.com/tallocpa" })).toMatchObject({ error: expect.stringMatching(/Facebook/) });
  });
  it("reads the warning amount with peso signs and commas", () => {
    expect(parseSection("tax", { tax_on_fee: "vat_12", gross_receipts_warning: "₱2,500,000.00" })).toEqual({ data: { tax_on_fee: "vat_12", gross_receipts_warning: 2_500_000 } });
    expect(parseSection("tax", { tax_on_fee: "vat_12", gross_receipts_warning: "0" })).toMatchObject({ error: expect.stringMatching(/above zero/) });
    expect(parseSection("tax", { tax_on_fee: "vat", gross_receipts_warning: "1" })).toMatchObject({ error: expect.stringMatching(/tax on our fee/) });
  });
  it("requires the names and accepts blank credentials", () => {
    expect(parseSection("identity", { display_name: "", legal_name: "X Y" })).toMatchObject({ error: expect.stringMatching(/name clients know/) });
    const r = parseSection("credentials", { ptr_date: "2026-01-05" });
    expect(r).toMatchObject({ data: { ptr_date: "2026-01-05", cpa_license_no: null } });
    expect(parseSection("credentials", { ptr_date: "05/01/2026" })).toMatchObject({ error: expect.stringMatching(/PTR date/) });
  });
});

describe("expiryStatus", () => {
  it("flags credentials within 60 days or past", () => {
    expect(expiryStatus(null, "2026-11-23")).toBeNull();
    expect(expiryStatus("2027-03-01", "2026-11-23")).toEqual({ tone: "ok", days: 98, label: null });
    expect(expiryStatus("2027-01-22", "2026-11-23")).toEqual({ tone: "soon", days: 60, label: "Expires in 60 days" });
    expect(expiryStatus("2026-11-24", "2026-11-23")).toEqual({ tone: "soon", days: 1, label: "Expires in 1 day" });
    expect(expiryStatus("2026-11-23", "2026-11-23")).toEqual({ tone: "soon", days: 0, label: "Expires today" });
    expect(expiryStatus("2026-11-22", "2026-11-23")).toEqual({ tone: "expired", days: -1, label: "Expired" });
  });
});

describe("firmBlockLines", () => {
  const base = {
    display_name: "Tallo CPA",
    legal_name: "EJ Tallo Cloud Accounting and Auditing Services",
    tin: "123-456-789",
    tin_branch_code: "00000",
    registered_address: "Jaro, Iloilo City",
    business_address: null,
    phone: "0917 123 4567",
    reply_to_email: "billing@tallocpa.com",
    tax_on_fee: "percentage_tax_3" as const,
  };
  it("prints what is filled in and leaves out blanks", () => {
    expect(firmBlockLines(base)).toEqual([
      "EJ Tallo Cloud Accounting and Auditing Services",
      "Non-VAT Reg. TIN 123-456-789-00000",
      "Jaro, Iloilo City",
      "0917 123 4567 · billing@tallocpa.com",
    ]);
    expect(firmBlockLines({ ...base, tin: null, registered_address: null, phone: null, reply_to_email: null })).toEqual(["EJ Tallo Cloud Accounting and Auditing Services"]);
  });
  it("shows the office address only when different, and VAT once registered", () => {
    expect(firmBlockLines({ ...base, business_address: "jaro, iloilo city " })).toHaveLength(4);
    const lines = firmBlockLines({ ...base, business_address: "Mandurriao, Iloilo City", tax_on_fee: "vat_12" });
    expect(lines).toContain("Mandurriao, Iloilo City");
    expect(lines).toContain("VAT Reg. TIN 123-456-789-00000");
  });
});

describe("grossReceiptsWatch", () => {
  const rows = [
    { month: "2026-01-01", kind: "retainer", amount: "100000.10" },
    { month: "2026-01-01", kind: "tax", amount: "50000" },
    { month: "2026-03-01", kind: "other", amount: "0.20" },
    { month: "2026-03-01", kind: "contribution", amount: 1200 },
    { month: "2026-03-01", kind: "unallocated", amount: "5000" },
    { month: "2025-12-01", kind: "retainer", amount: "999999" },
  ];

  it("counts only this year's fees, not client tax money or unmatched credit", () => {
    const w = grossReceiptsWatch(rows, { today: "2026-03-15", warning: 2_500_000 });
    expect(w.fees).toBe(100000.3);
    expect(w.clientMoney).toBe(51200);
    expect(w.unallocated).toBe(5000);
    expect(w.months).toEqual([
      { month: "2026-01-01", fees: 100000.1 },
      { month: "2026-02-01", fees: 0 },
      { month: "2026-03-01", fees: 0.2 },
    ]);
    expect(w.status).toBe("ok");
    expect(w.toWarning).toBe(2399999.7);
    expect(w.toThreshold).toBe(2899999.7);
  });

  it("warns at the warning amount and flags passing the VAT threshold", () => {
    expect(grossReceiptsWatch([{ month: "2026-10-01", kind: "retainer", amount: 2_500_000 }], { today: "2026-11-23", warning: 2_500_000 }).status).toBe("warning");
    const over = grossReceiptsWatch([{ month: "2026-10-01", kind: "retainer", amount: 3_000_000 }], { today: "2026-11-23", warning: 2_500_000 });
    expect(over.status).toBe("over");
    expect(over.share).toBe(1);
    expect(over.toThreshold).toBe(0);
  });

  it("projects the year-end at the pace so far, after the first month", () => {
    expect(grossReceiptsWatch([{ month: "2026-01-01", kind: "retainer", amount: 10_000 }], { today: "2026-01-20", warning: 2_500_000 }).projected).toBeNull();
    // 1 July is day 182 of 365.
    expect(grossReceiptsWatch([{ month: "2026-06-01", kind: "retainer", amount: 1_820_000 }], { today: "2026-07-01", warning: 2_500_000 }).projected).toBe(3_650_000);
  });
});
