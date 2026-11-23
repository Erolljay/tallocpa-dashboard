/**
 * Client compliance score, green / yellow / red (spec §3.11, Q41), from the
 * monthly figures the database sums up (public.client_scorecard).
 *
 * Four parts, each rated on its own; the client's score is the worst part that
 * has data. Red clients are flagged for a talk, repricing or offboarding.
 * The thresholds were approved by the Owner on 23 Nov 2026 (spec §9, O12).
 */

export type Tone = "green" | "yellow" | "red";

/** One client-month from public.client_scorecard. */
export interface ClientMonth {
  cycles_due: number;
  cycles_missed: number;
  documents: number;
  documents_returned: number;
  documents_late: number;
  dues_due: number;
  dues_late: number;
  filings_due: number;
  filings_late: number;
  late_client: number;
}

export const SCORE_RULES = {
  /** How many months back the score looks. */
  months: 6,
  /** Share of months the client sent documents (or said "nothing to submit") by the cutoff. */
  submission: { green: 0.9, yellow: 0.7 },
  /** Share of documents returned as unreadable or wrong: lower is better. */
  returned: { green: 0.05, yellow: 0.15 },
  /** Share of amounts due that were paid in full by their due date. */
  payment: { green: 0.9, yellow: 0.7 },
  /** Late returns the client caused: 0 green, 1 yellow, 2 or more red. */
  clientLate: { green: 0, yellow: 1 },
} as const;

export interface Part {
  tone: Tone | null;
  /** The share (0–1) or count the tone is based on; null when there is nothing to rate. */
  value: number | null;
  /** Plain words, e.g. "5 of 6 months" or "no documents yet". */
  detail: string;
}

export interface Score {
  overall: Tone | null;
  submission: Part;
  quality: Part;
  payment: Part;
  lateFilings: Part;
}

const rank: Record<Tone, number> = { green: 0, yellow: 1, red: 2 };

/** At least `green` → green, at least `yellow` → yellow, else red. */
function higherIsBetter(v: number, t: { green: number; yellow: number }): Tone {
  return v >= t.green ? "green" : v >= t.yellow ? "yellow" : "red";
}

/** At most `green` → green, at most `yellow` → yellow, else red. */
function lowerIsBetter(v: number, t: { green: number; yellow: number }): Tone {
  return v <= t.green ? "green" : v <= t.yellow ? "yellow" : "red";
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function complianceScore(months: readonly ClientMonth[]): Score {
  const sum = (k: keyof ClientMonth) => months.reduce((s, m) => s + Number(m[k] ?? 0), 0);

  const cycles = sum("cycles_due");
  const onTime = cycles - sum("cycles_missed");
  const lateDocs = sum("documents_late");
  const submission: Part =
    cycles === 0
      ? { tone: null, value: null, detail: "no cutoff yet" }
      : {
          tone: higherIsBetter(onTime / cycles, SCORE_RULES.submission),
          value: onTime / cycles,
          detail: `${onTime} of ${plural(cycles, "month")} on time${lateDocs > 0 ? ` · ${plural(lateDocs, "document")} after the cutoff` : ""}`,
        };

  const docs = sum("documents");
  const returned = sum("documents_returned");
  const quality: Part =
    docs === 0
      ? { tone: null, value: null, detail: "no documents yet" }
      : { tone: lowerIsBetter(returned / docs, SCORE_RULES.returned), value: returned / docs, detail: `${returned} of ${plural(docs, "document")} returned` };

  const dues = sum("dues_due");
  const paidOnTime = dues - sum("dues_late");
  const payment: Part =
    dues === 0
      ? { tone: null, value: null, detail: "nothing billed yet" }
      : { tone: higherIsBetter(paidOnTime / dues, SCORE_RULES.payment), value: paidOnTime / dues, detail: `${paidOnTime} of ${dues} paid on time` };

  const filings = sum("filings_due");
  const byClient = sum("late_client");
  const lateFilings: Part =
    filings === 0
      ? { tone: null, value: null, detail: "no returns due yet" }
      : { tone: lowerIsBetter(byClient, SCORE_RULES.clientLate), value: byClient, detail: byClient === 0 ? "none" : `${plural(byClient, "late return")} caused by the client` };

  const tones = [submission, quality, payment, lateFilings].map((p) => p.tone).filter((t): t is Tone => t !== null);
  const overall = tones.length === 0 ? null : tones.reduce((w, t) => (rank[t] > rank[w] ? t : w));
  return { overall, submission, quality, payment, lateFilings };
}

export const toneLabel: Record<Tone, string> = { green: "Green", yellow: "Yellow", red: "Red" };
/** Badge tones for the score colours. */
export const toneBadge = { green: "done", yellow: "waiting", red: "blocked" } as const;
