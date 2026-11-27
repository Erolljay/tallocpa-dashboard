/**
 * The connector's reference library (docs/AI-WORKFORCE.md §7.1, part 5): read-only
 * texts every AI employee can open. More come with later steps (SOPs, the fee
 * schedule, the FS notes library).
 */
import { BOOKS_LEVELS, DEPARTMENTS, RUNS_ON, STANDARD_WORKFORCE } from "@/lib/ai/workforce";
import type { ResourceInfo } from "./protocol";
import type { AiCaller } from "./types";

export const HOUSE_RULES = `# House rules for every Tallo CPA AI employee

1. You prepare; people decide. You never review, approve, sign, post, lock, release, file, pay or remit anything. The system refuses you if you try.
2. Figures come from the books and the tested engine. Never type, estimate or round a tax due, deadline, balance, total or FS note number yourself.
3. Use only the clients assigned to you. If a client is not in your list, say so; do not guess.
4. When information is missing, ask: list the question for your supervisor or the client instead of assuming.
5. Write plainly. Clients read English, Hiligaynon or Taglish; keep to the firm's tone: clear, polite, never pushy.
6. Client data stays inside the firm. Never put a client's name, TIN or figures in anything public, and never ask for or keep BIR, eFPS or agency passwords.
7. Marketing follows the Code of Ethics for Professional Accountants: no exaggerated claims, no comparison with other firms, no client names without written consent.
8. Everything you do is logged under your name.`;

const URIS = {
  rules: "tallocpa://ai/house-rules",
  job: "tallocpa://ai/my-job",
  workforce: "tallocpa://ai/workforce",
} as const;

export function listResources(): ResourceInfo[] {
  return [
    { uri: URIS.rules, name: "house-rules", title: "House rules", description: "What every AI employee may and may not do.", mimeType: "text/markdown" },
    { uri: URIS.job, name: "my-job", title: "My job", description: "Your job description, department, supervisor rules and books access.", mimeType: "text/markdown" },
    { uri: URIS.workforce, name: "workforce", title: "The AI workforce", description: "Every AI employee and what each one does, for hand-offs.", mimeType: "text/markdown" },
  ];
}

export function readResource(caller: AiCaller, uri: string): { uri: string; mimeType: string; text: string } | null {
  if (uri === URIS.rules) return { uri, mimeType: "text/markdown", text: HOUSE_RULES };
  if (uri === URIS.job) {
    const books = caller.clientData ? `${BOOKS_LEVELS[caller.booksLevel].label}: ${BOOKS_LEVELS[caller.booksLevel].detail}` : "None: you never see client records or books.";
    return {
      uri,
      mimeType: "text/markdown",
      text: `# ${caller.name}\n\n**Department:** ${DEPARTMENTS[caller.department]}\n\n${caller.job}\n\n**Books access:** ${books}\n\n**Calls per day:** up to ${caller.dailyLimit}.\n\nYour work is checked by your supervisor; the Owner has the final say.`,
    };
  }
  if (uri === URIS.workforce) {
    const lines = STANDARD_WORKFORCE.map((e) => `- **${e.name}** (${DEPARTMENTS[e.department]}, ${RUNS_ON[e.runsOn]}): ${e.job}`);
    return { uri, mimeType: "text/markdown", text: `# The Tallo CPA AI workforce\n\n${lines.join("\n")}` };
  }
  return null;
}
