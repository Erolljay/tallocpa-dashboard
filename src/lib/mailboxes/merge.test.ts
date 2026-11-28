import { describe, expect, it } from "vitest";
import { mergeMailboxes, messageIdKey } from "./merge";

describe("mergeMailboxes", () => {
  it("keeps each address once, connected mailboxes first", () => {
    const out = mergeMailboxes(
      [
        { email: "Owner@TalloCPA.com", connectedId: "a", data: 1 },
        { email: "support@tallocpa.com", connectedId: "b", data: 2 },
      ],
      [
        { email: "attachments@tallocpa.com", connectedId: null, data: 3 },
        { email: "owner@tallocpa.com", connectedId: null, data: 4 },
      ],
    );
    expect(out.map((m) => [m.email, m.connectedId, m.data])).toEqual([
      ["owner@tallocpa.com", "a", 1],
      ["support@tallocpa.com", "b", 2],
      ["attachments@tallocpa.com", null, 3],
    ]);
  });
});

describe("messageIdKey", () => {
  it("normalises the Message-ID header", () => {
    expect(messageIdKey(" <ABC.123@mail.bir.gov.ph> ")).toBe("abc.123@mail.bir.gov.ph");
    expect(messageIdKey("")).toBeNull();
    expect(messageIdKey(undefined)).toBeNull();
  });
});
