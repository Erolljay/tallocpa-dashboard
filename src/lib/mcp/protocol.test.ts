import { describe, expect, it } from "vitest";
import { ERR, handleBody, handleMessage, LATEST_VERSION, negotiateVersion, toolError, toolResult, type McpServer } from "./protocol";

const server: McpServer = {
  info: { name: "tallocpa-os", title: "TalloCPA OS", version: "1.0.0" },
  instructions: "Read the house rules.",
  listTools: () => [{ name: "whoami", title: "Who am I", description: "x", inputSchema: { type: "object" }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } }],
  callTool: async (name) => (name === "whoami" ? toolResult({ name: "Document Clerk" }) : null),
  listResources: () => [{ uri: "tallocpa://ai/house-rules", name: "house-rules", title: "House rules", description: "x", mimeType: "text/markdown" }],
  readResource: async (uri) => (uri === "tallocpa://ai/house-rules" ? { uri, mimeType: "text/markdown", text: "Rules" } : null),
};
/** A request; id null makes it a notification (no id at all). */
const req = (method: string, params?: Record<string, unknown>, id: number | null = 1) => ({ jsonrpc: "2.0", ...(id === null ? {} : { id }), method, ...(params ? { params } : {}) });

describe("MCP protocol", () => {
  it("answers initialize with the client's version when supported, else the latest", async () => {
    const r = (await handleMessage(server, req("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "x", version: "1" } }))) as { result: Record<string, unknown> };
    expect(r.result.protocolVersion).toBe("2025-06-18");
    expect(r.result.serverInfo).toEqual(server.info);
    expect(r.result.capabilities).toMatchObject({ tools: {}, resources: {} });
    expect(negotiateVersion("1999-01-01")).toBe(LATEST_VERSION);
    expect(negotiateVersion(undefined)).toBe(LATEST_VERSION);
  });

  it("lists and calls tools; an unknown tool is an invalid-params error", async () => {
    expect(await handleMessage(server, req("tools/list"))).toMatchObject({ result: { tools: [{ name: "whoami" }] } });
    const call = (await handleMessage(server, req("tools/call", { name: "whoami", arguments: {} }))) as { result: { structuredContent: unknown; content: { text: string }[] } };
    expect(call.result.structuredContent).toEqual({ name: "Document Clerk" });
    expect(JSON.parse(call.result.content[0].text)).toEqual({ name: "Document Clerk" });
    expect(await handleMessage(server, req("tools/call", { name: "post_entry", arguments: {} }))).toMatchObject({ error: { code: ERR.invalidParams } });
    expect(await handleMessage(server, req("tools/call", { arguments: {} }))).toMatchObject({ error: { code: ERR.invalidParams } });
  });

  it("lists and reads resources", async () => {
    expect(await handleMessage(server, req("resources/list"))).toMatchObject({ result: { resources: [{ uri: "tallocpa://ai/house-rules" }] } });
    expect(await handleMessage(server, req("resources/read", { uri: "tallocpa://ai/house-rules" }))).toMatchObject({ result: { contents: [{ text: "Rules" }] } });
    expect(await handleMessage(server, req("resources/read", { uri: "tallocpa://nope" }))).toMatchObject({ error: { code: ERR.invalidParams } });
  });

  it("answers ping, refuses unknown methods and malformed messages, and ignores notifications", async () => {
    expect(await handleMessage(server, req("ping"))).toEqual({ jsonrpc: "2.0", id: 1, result: {} });
    expect(await handleMessage(server, req("sampling/createMessage"))).toMatchObject({ error: { code: ERR.methodNotFound } });
    expect(await handleMessage(server, { id: 3, method: "ping" })).toMatchObject({ id: 3, error: { code: ERR.invalidRequest } });
    expect(await handleMessage(server, req("notifications/initialized", undefined, null))).toBeNull();
  });

  it("answers a POST body: 202 for notifications, 200 with replies, batches in order", async () => {
    expect(await handleBody(server, req("notifications/initialized", undefined, null))).toEqual({ status: 202 });
    expect(await handleBody(server, req("ping"))).toEqual({ status: 200, json: { jsonrpc: "2.0", id: 1, result: {} } });
    const batch = await handleBody(server, [req("ping", undefined, 1), req("notifications/initialized", undefined, null), req("ping", undefined, 2)]);
    expect(batch).toEqual({ status: 200, json: [{ jsonrpc: "2.0", id: 1, result: {} }, { jsonrpc: "2.0", id: 2, result: {} }] });
    expect((await handleBody(server, [])).status).toBe(400);
  });

  it("puts tool errors in the result, not in a protocol error", () => {
    expect(toolError("No books access")).toEqual({ content: [{ type: "text", text: "No books access" }], isError: true });
    expect(toolResult([1, 2]).structuredContent).toBeUndefined();
  });
});
