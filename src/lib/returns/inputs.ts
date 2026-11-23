/**
 * Reading the figures staff type into a worksheet (ManualInput). Shared by all
 * form modules: amounts are parsed to centavos; a bad or missing required
 * figure becomes a blocking error on the worksheet.
 */
import { toCentavos } from "./money";
import type { Centavos, ManualInput, WorksheetContext, WorksheetLine } from "./types";

export function readAmount(inputs: Record<string, string>, def: ManualInput, errors: string[]): Centavos | null {
  const raw = (inputs[def.key] ?? "").trim();
  if (raw === "") {
    if (def.required) errors.push(`Enter ${def.label.toLowerCase()}.`);
    return null;
  }
  const c = toCentavos(raw);
  if (c == null) {
    errors.push(`${def.label}: enter an amount like 1,234.56.`);
    return null;
  }
  return c;
}

/** Same, for figures that cannot be negative. */
export function readNonNegative(inputs: Record<string, string>, def: ManualInput, errors: string[]): Centavos | null {
  const c = readAmount(inputs, def, errors);
  if (c != null && c < 0) {
    errors.push(`${def.label}: enter zero or more.`);
    return null;
  }
  return c;
}

/** Surcharge, interest and compromise (late filing or amended returns), typed in by staff. */
export const PENALTY_INPUTS: ManualInput[] = [
  { key: "surcharge", label: "Surcharge", kind: "amount", required: false, help: "Only for a late or amended return." },
  { key: "interest", label: "Interest", kind: "amount", required: false, help: "Only for a late or amended return." },
  { key: "compromise", label: "Compromise", kind: "amount", required: false, help: "Only for a late or amended return." },
];

/** Penalty lines (e.g. 17A–17D on 0619-E) and their total. */
export function penaltyLines(
  ctx: Pick<WorksheetContext, "inputs">,
  errors: string[],
  lineNos: [string, string, string, string],
  labelSuffix: string,
): { lines: WorksheetLine[]; total: Centavos } {
  const [s, i, c] = PENALTY_INPUTS.map((d) => readNonNegative(ctx.inputs, d, errors) ?? 0);
  const total = s + i + c;
  return {
    total,
    lines: [
      { key: "surcharge", line: lineNos[0], label: "Add: Surcharge", amount: s },
      { key: "interest", line: lineNos[1], label: "Add: Interest", amount: i },
      { key: "compromise", line: lineNos[2], label: "Add: Compromise", amount: c },
      { key: "total_penalties", line: lineNos[3], label: `Total Penalties ${labelSuffix}`, amount: total, emphasis: "subtotal" },
    ],
  };
}

/** Text lines of Part I (background information): amount null, the value in `basis`. */
export function backgroundLines(rows: [line: string, key: string, label: string, value: string | null][]): WorksheetLine[] {
  return rows.map(([line, key, label, value]) => ({ key, line, label, amount: null, basis: value ?? "—" }));
}
