/**
 * The JSON schemas Gemini's replies are held to, built from the client's own
 * payslip items, and the checks the replies must pass before anything is saved.
 * Items go to Gemini under short keys (item_1, item_2, …) with their names and
 * kinds in the prompt; the keys are mapped back to item ids here.
 */
import { z } from "zod";
import { CATEGORIES, ITEM_KINDS, sortItems, type PayrollItem } from "../items";
import { FIELD_TARGETS, type ColumnTarget, type FieldTarget } from "./types";

/** The client's active items in register order, each with the key Gemini sees. */
export function itemKeys(items: PayrollItem[]): { key: string; item: PayrollItem }[] {
  return sortItems(items.filter((i) => i.active)).map((item, n) => ({ key: `item_${n + 1}`, item }));
}

/** The items as the prompt lists them: "item_1: Basic Pay (Earning; Basic salary)". */
export function describeItems(items: PayrollItem[]): string {
  return itemKeys(items)
    .map(({ key, item }) => `- ${key}: ${item.name} (${ITEM_KINDS[item.kind]}; ${CATEGORIES[item.category].label})`)
    .join("\n");
}

const FIELD_KEYS = Object.keys(FIELD_TARGETS) as FieldTarget[];

// ------------------------------------------------------------ Column mapping

/** Schema for mapping the client's column headings: the header row and each column's meaning. */
export function mappingSchema(items: PayrollItem[]) {
  return {
    type: "OBJECT",
    properties: {
      header_row: { type: "INTEGER", description: "1-based row number of the row with the column headings" },
      columns: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            column: { type: "INTEGER", description: "1-based column number" },
            header: { type: "STRING" },
            target: { type: "STRING", enum: [...FIELD_KEYS, ...itemKeys(items).map((k) => k.key)] },
            confidence: { type: "NUMBER" },
          },
          required: ["column", "target", "confidence"],
        },
      },
    },
    required: ["header_row", "columns"],
  };
}

const mappingReply = z.object({
  header_row: z.number().int().min(1),
  columns: z.array(z.object({ column: z.number().int().min(1), header: z.string().nullable().optional(), target: z.string(), confidence: z.number().min(0).max(1) })),
});

export interface MappingSuggestion {
  headerRow: number;
  columns: Map<number, { target: ColumnTarget; confidence: number }>;
}

/** Checks Gemini's mapping and turns item keys back into item ids; unknown targets are dropped. */
export function parseMappingReply(json: unknown, items: PayrollItem[]): MappingSuggestion {
  const r = mappingReply.safeParse(json);
  if (!r.success) throw new Error(`Gemini returned an unexpected shape: ${r.error.issues[0]?.message}`);
  const byKey = new Map(itemKeys(items).map((k) => [k.key, k.item.id]));
  const columns = new Map<number, { target: ColumnTarget; confidence: number }>();
  for (const c of r.data.columns) {
    const target: ColumnTarget | null = (FIELD_KEYS as string[]).includes(c.target) ? (c.target as FieldTarget) : byKey.has(c.target) ? `item:${byKey.get(c.target)}` : null;
    if (target) columns.set(c.column, { target, confidence: c.confidence });
  }
  return { headerRow: r.data.header_row, columns };
}

// ------------------------------------------------------ Reading a PDF or photo

const figure = { type: "OBJECT", properties: { value: { type: "STRING", nullable: true }, confidence: { type: "NUMBER" } }, required: ["value", "confidence"] };
const nullableFigure = { ...figure, nullable: true };

/** Schema for reading a payroll sheet from a PDF or photo: one entry per employee row, every figure with its confidence. */
export function imageSchema(items: PayrollItem[]) {
  const keys = itemKeys(items).map((k) => k.key);
  return {
    type: "OBJECT",
    properties: {
      employees: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            name_confidence: { type: "NUMBER" },
            employee_no: { type: "STRING", nullable: true },
            tin: { type: "STRING", nullable: true },
            days: { type: "STRING", nullable: true },
            hours: { type: "STRING", nullable: true },
            amounts: { type: "OBJECT", properties: Object.fromEntries(keys.map((k) => [k, nullableFigure])) },
            gross: nullableFigure,
            deductions: nullableFigure,
            net: nullableFigure,
          },
          required: ["name", "name_confidence", "amounts"],
        },
      },
      totals: {
        type: "OBJECT",
        nullable: true,
        properties: { gross: nullableFigure, deductions: nullableFigure, net: nullableFigure },
      },
      other_columns: { type: "ARRAY", items: { type: "STRING" } },
      pay_period: { type: "STRING", nullable: true },
    },
    required: ["employees", "other_columns"],
  };
}

const fig = z
  .object({ value: z.union([z.string(), z.number()]).nullable().optional(), confidence: z.number().min(0).max(1).optional() })
  .nullable()
  .optional();
const imageReply = z.object({
  employees: z.array(
    z.object({
      name: z.string(),
      name_confidence: z.number().min(0).max(1).optional(),
      employee_no: z.string().nullable().optional(),
      tin: z.string().nullable().optional(),
      days: z.union([z.string(), z.number()]).nullable().optional(),
      hours: z.union([z.string(), z.number()]).nullable().optional(),
      amounts: z.record(z.string(), fig).default({}),
      gross: fig,
      deductions: fig,
      net: fig,
    }),
  ),
  totals: z.object({ gross: fig, deductions: fig, net: fig }).nullable().optional(),
  other_columns: z.array(z.string()).default([]),
  pay_period: z.string().nullable().optional(),
});
export type ImageReply = z.infer<typeof imageReply>;

export function parseImageReply(json: unknown): ImageReply {
  const r = imageReply.safeParse(json);
  if (!r.success) throw new Error(`Gemini returned an unexpected shape: ${r.error.issues[0]?.message}`);
  return r.data;
}
