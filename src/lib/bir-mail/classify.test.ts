import { describe, expect, it } from "vitest";
import { classifyBirMail, findTins, isBirSender, respondBy } from "./classify";

describe("BIR mail", () => {
  it("knows the BIR's senders", () => {
    expect(isBirSender("eFPS <efps@bir.gov.ph>")).toBe(true);
    expect(isBirSender("esubmission@mail.bir.gov.ph")).toBe(true);
    expect(isBirSender("BIR Notices <noreply@bir-gov.ph.example.com>")).toBe(false);
    expect(isBirSender("someone@gmail.com")).toBe(false);
  });

  it("tells notices apart, the stronger one first", () => {
    expect(classifyBirMail("Letter of Authority No. eLA201900012345", "")).toEqual({ kind: "notice", noticeType: "loa" });
    expect(classifyBirMail("Assessment", "This Preliminary Assessment Notice (PAN) informs you…")).toEqual({ kind: "notice", noticeType: "pan" });
    expect(classifyBirMail("FAN and FLD", "Formal Letter of Demand and Final Assessment Notice")).toEqual({ kind: "notice", noticeType: "fld" });
    expect(classifyBirMail("Subpoena Duces Tecum", "")).toEqual({ kind: "notice", noticeType: "subpoena" });
    expect(classifyBirMail("Notice of Informal Conference", "")).toEqual({ kind: "notice", noticeType: "informal_conference" });
    expect(classifyBirMail("Notice to comply", "Please submit")).toEqual({ kind: "notice", noticeType: "other_notice" });
  });

  it("reads confirmations and replies", () => {
    expect(classifyBirMail("Tax Return Receipt Confirmation", "Filing Reference No. 123")).toEqual({ kind: "filing_confirmation", noticeType: null });
    expect(classifyBirMail("eBIRForms submission", "Your return has been successfully filed")).toEqual({ kind: "filing_confirmation", noticeType: null });
    expect(classifyBirMail("Re: 1601EQ Q1 2027 - Jaro", "eSubmission validation report attached")).toEqual({ kind: "esubmission_reply", noticeType: null });
    expect(classifyBirMail("Payment Confirmation", "Paid through LinkBiz")).toEqual({ kind: "payment_confirmation", noticeType: null });
    expect(classifyBirMail("BIR advisory", "Tax tips for the season")).toEqual({ kind: "other", noticeType: null });
  });

  it("finds TINs in the usual forms, once each", () => {
    expect(findTins("TIN: 123-456-789-000 and 123456789 and 987 654 321 00000; not 000-000-000")).toEqual(["123-456-789", "987-654-321"]);
    expect(findTins("Reference 1234567890123456")).toEqual([]);
  });

  it("works out the deadline to answer", () => {
    expect(respondBy("Please reply on or before March 30, 2027.", "2027-03-01")).toBe("2027-03-30");
    expect(respondBy("submit your reply within fifteen (15) days from receipt hereof", "2027-03-01")).toBe("2027-03-16");
    expect(respondBy("within 30 days from receipt", "2027-01-31")).toBe("2027-03-02");
    expect(respondBy("within ten days", "2027-03-01")).toBe("2027-03-11");
    expect(respondBy("Please present your books of accounts.", "2027-03-01")).toBeNull();
  });
});
