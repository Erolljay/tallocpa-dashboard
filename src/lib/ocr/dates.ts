/**
 * Dates as printed on Philippine invoices and receipts → "YYYY-MM-DD".
 *
 * OCR copies the date exactly as printed; this decides what it means, so the order
 * and the century are never left to the model. Philippine invoices print dates
 * month first (MM/DD/YYYY, the Owner's note of 27 November 2026), so:
 *   11/27/2026, 11-27-2026, 11.27.26, 11/27/26  → 2026-11-27 (two-digit years are 20xx)
 *   27/11/2026                                 → 2026-11-27 (the first number cannot be a month)
 *   Nov 27, 2026 · 27 Nov 2026 · 27-Nov-26     → 2026-11-27
 *   2026-11-27, 2026/11/27                     → as is
 * Anything else, or a date that does not exist (02/30/2026), gives null.
 */
const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};

const iso = (y: number, m: number, d: number): string | null => {
  if (y < 1900 || y > 2199 || m < 1 || m > 12 || d < 1) return null;
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  if (d > last) return null;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};
const year = (s: string) => (s.length === 2 ? 2000 + Number(s) : s.length === 4 ? Number(s) : NaN);
const month = (s: string) => MONTHS[s.toLowerCase().replace(/\.$/, "").slice(0, s.toLowerCase().startsWith("sept") ? 4 : 3)];

export function parsePrintedDate(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const s = String(raw).trim().replace(/\s+/g, " ").replace(/^(date|dated)\s*[:.]?\s*/i, "");
  if (!s) return null;

  // Year first: 2026-11-27, 2026/11/27 (also what older readings stored).
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (m) return iso(Number(m[1]), Number(m[2]), Number(m[3]));

  // Numbers: month first unless the first number cannot be a month.
  m = s.match(/^(\d{1,2})\s*[-/.]\s*(\d{1,2})\s*[-/.]\s*(\d{2}|\d{4})$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    const y = year(m[3]);
    return a > 12 && b <= 12 ? iso(y, b, a) : iso(y, a, b);
  }

  // Month name first: Nov 27, 2026 · November 27 2026 · Nov. 27, '26
  m = s.match(/^([A-Za-z]{3,9})\.?\s*(\d{1,2})(?:st|nd|rd|th)?,?\s*'?(\d{2}|\d{4})$/);
  if (m && month(m[1])) return iso(year(m[3]), month(m[1]), Number(m[2]));

  // Day first with a month name: 27 Nov 2026 · 27-Nov-26 · 27th of November, 2026
  m = s.match(/^(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s+)?[-/ ]?\s*([A-Za-z]{3,9})\.?\s*[-/,]?\s*'?(\d{2}|\d{4})$/);
  if (m && month(m[2])) return iso(year(m[3]), month(m[2]), Number(m[1]));

  return null;
}

/**
 * Whether a document dated `date` looks out of place for the month it was sent for
 * (documents.document_month, "YYYY-MM-01"): more than three months before it, or after
 * the following month. Usually a misread year. Returns the message, or null.
 */
export function dateFarFromMonth(date: string, documentMonth: string): string | null {
  const [dy, dm] = date.split("-").map(Number);
  const [my, mm] = documentMonth.split("-").map(Number);
  const diff = (dy - my) * 12 + (dm - mm);
  if (diff >= -3 && diff <= 1) return null;
  const fmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
  const long = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `The date (${long.format(new Date(`${date}T00:00:00Z`))}) is far from the month this was sent for (${fmt.format(new Date(`${documentMonth.slice(0, 7)}-01T00:00:00Z`))}). Check the year and the month.`;
}
