/**
 * Every connector tool, collected from the `ai-tools.ts` file beside each feature
 * (docs/AI-WORKFORCE.md §7.3). registry.test.ts fails when an `ai-tools.ts` file is
 * missing here, so a feature's tools cannot be forgotten. New tools start ungranted:
 * the Owner grants each one per AI employee in Settings → AI Employees.
 */
import * as birMail from "@/lib/bir-mail/ai-tools";
import * as calendar from "@/lib/calendar/ai-tools";
import * as clients from "@/lib/clients/ai-tools";
import * as collections from "@/lib/collections/ai-tools";
import * as documents from "@/lib/documents/ai-tools";
import * as filings from "@/lib/filings/ai-tools";
import * as ledger from "@/lib/ledger/ai-tools";
import * as onboarding from "@/lib/onboarding/ai-tools";
import * as paymentProof from "@/lib/payment-proof/ai-tools";
import * as registration from "@/lib/registration/ai-tools";
import * as mcp from "./ai-tools";
import type { AiTool } from "./tool";

const isTool = (v: unknown): v is AiTool => typeof v === "object" && v !== null && "name" in v && "run" in v && "input" in v;

export const TOOLS: AiTool[] = [mcp, clients, filings, ledger, documents, onboarding, collections, birMail, registration, calendar, paymentProof].flatMap((m) => Object.values(m).filter(isTool));

export const toolByName = (name: string) => TOOLS.find((t) => t.name === name);
