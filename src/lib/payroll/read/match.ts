/**
 * Matching a name on the client's payroll to the client's employee list. Clients
 * write names their own way ("DELA CRUZ, JUAN S.", "Juan Dela Cruz", "Juan
 * Delacruz", a typo), so names are compared word by word in any order, accents
 * and initials aside, with a little room for misspelling. Only an Employee No.,
 * a TIN or an exact name counts as a match; a close name is pre-picked but flagged
 * for staff to check, and an unclear one is left for staff to pick.
 */
import type { Employee } from "../types";

export type MatchStatus = "number" | "tin" | "exact" | "close" | "ambiguous" | "none";

export interface EmployeeMatch {
  employeeId: string | null;
  status: MatchStatus;
  /** Likely employees, best first (up to three), for the pick list. */
  candidates: { id: string; score: number }[];
}

/** Lowercase words without accents or punctuation; "ñ" → "n". */
export function nameWords(s: string): string[] {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

const SUFFIXES = new Set(["jr", "sr", "ii", "iii", "iv", "v"]);

/** Edit distance counting a swap of two neighbouring letters as one edit ("Curz" for "Cruz"). */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** 1 for the same text, falling with each letter wrong. */
export function similarity(a: string, b: string): number {
  if (!a && !b) return 1;
  return 1 - editDistance(a, b) / Math.max(a.length, b.length);
}

/**
 * How well a written name fits an employee (0–1): each word of the employee's
 * surname and the first word of the first name must be found among the written
 * words (exactly, or nearly when misspelt); a second first name ("Maria Clara")
 * and the middle name may be written in full, as an initial, or left out. Written words that are none of the employee's cost a little. Compound
 * surnames run together ("Delacruz") are compared as one word.
 */
export function nameScore(written: string, e: Pick<Employee, "lastName" | "firstName" | "middleName">): number {
  const w = nameWords(written).filter((x) => !SUFFIXES.has(x));
  if (w.length === 0) return 0;
  const last = nameWords(e.lastName);
  const [first, ...moreFirst] = nameWords(e.firstName).filter((x) => !SUFFIXES.has(x));
  const optional = [...moreFirst, ...nameWords(e.middleName ?? "")];
  const required = last.length + (first ? 1 : 0);

  /** Scores one reading of the employee's name (the surname as separate words, or run together). */
  const tryWith = (lastWords: string[]) => {
    const used = new Set<number>();
    const take = (word: string, allowInitial: boolean): number => {
      let best = 0;
      let at = -1;
      w.forEach((x, i) => {
        if (used.has(i)) return;
        const s = x === word ? 1 : allowInitial && x.length === 1 && word.startsWith(x) ? 1 : x.length > 1 ? similarity(x, word) : 0;
        if (s > best) [best, at] = [s, i];
      });
      if (at < 0 || best < 0.75) return 0;
      used.add(at);
      return best;
    };
    // A surname run together stands for all of its words.
    const weight = last.length / lastWords.length;
    let total = lastWords.reduce((s, word) => s + take(word, false) * weight, 0);
    if (first) total += take(first, false);
    for (const m of optional) take(m, true);
    const extra = w.length - used.size;
    return Math.max(0, total / required - extra * 0.1);
  };
  const apart = tryWith(last);
  return last.length > 1 ? Math.max(apart, tryWith([last.join("")])) : apart;
}

const digits = (s: string | null | undefined) => (s ?? "").replace(/\D/g, "");
const keyNo = (s: string | null | undefined) => (s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

/** At or above this the written name is an exact match (every word right, nothing extra). */
const EXACT = 1;
/** At or above this a name is offered as the likely employee (to confirm). */
const CLOSE = 0.8;

/** The employee a row of the client's payroll is for. */
export function matchEmployee(row: { name: string; employeeNo?: string | null; tin?: string | null }, employees: Employee[]): EmployeeMatch {
  const no = keyNo(row.employeeNo);
  if (no) {
    const hit = employees.find((e) => e.employeeNo && keyNo(e.employeeNo) === no);
    if (hit) return { employeeId: hit.id, status: "number", candidates: [{ id: hit.id, score: 1 }] };
  }
  const tin = digits(row.tin).slice(0, 9);
  if (tin.length === 9) {
    const hit = employees.find((e) => e.tin && digits(e.tin).slice(0, 9) === tin);
    if (hit) return { employeeId: hit.id, status: "tin", candidates: [{ id: hit.id, score: 1 }] };
  }
  const scored = employees
    .map((e) => ({ id: e.id, score: Math.round(nameScore(row.name, e) * 1000) / 1000, active: e.active }))
    .filter((s) => s.score >= 0.5)
    .sort((a, b) => b.score - a.score || Number(b.active) - Number(a.active));
  const candidates = scored.slice(0, 3).map(({ id, score }) => ({ id, score }));
  const [top, next] = scored;
  if (!top || top.score < CLOSE) return { employeeId: null, status: "none", candidates };
  if (next && top.score - next.score < 0.05) return { employeeId: null, status: "ambiguous", candidates };
  return { employeeId: top.id, status: top.score >= EXACT ? "exact" : "close", candidates };
}
