/**
 * A plain text PDF (A4, Helvetica), for a payment confirmation email that came without a
 * PDF of its own (UnionBank's bills payment email is HTML only). Written by hand to keep
 * the app free of a PDF dependency: lines starting with "# " are headings in bold, long
 * lines wrap, pages break as needed. Characters outside Latin-1 are replaced ("₱" → "PHP").
 */

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 50;
const SIZE = 10;
const LEADING = 14;
const WRAP = 92;
const PER_PAGE = Math.floor((PAGE_H - 2 * MARGIN) / LEADING);

/** Text safe for a PDF string in WinAnsi (Latin-1), with ( ) \ escaped. */
export function pdfText(s: string): string {
  return s
    .replace(/₱/g, "PHP ")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x20-\x7e\xa0-\xff]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/** Wraps a line at word boundaries to at most `width` characters. */
export function wrap(line: string, width = WRAP): string[] {
  if (line.length <= width) return [line];
  const out: string[] = [];
  let rest = line;
  while (rest.length > width) {
    let cut = rest.lastIndexOf(" ", width);
    if (cut <= 0) cut = width;
    out.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(cut).trimStart();
  }
  if (rest) out.push(rest);
  return out;
}

/** A PDF of these lines. Returns the file's bytes. */
export function textPdf(lines: string[], title = "Proof of payment"): Buffer {
  const rows = lines.flatMap((l) => {
    const heading = l.startsWith("# ");
    return wrap(heading ? l.slice(2) : l).map((t) => ({ t, heading }));
  });
  const pages: (typeof rows)[] = [];
  for (let i = 0; i < Math.max(rows.length, 1); i += PER_PAGE) pages.push(rows.slice(i, i + PER_PAGE));

  // Objects: 1 catalog, 2 pages, 3 regular font, 4 bold font, 5 info, then a page and its content per page.
  const objects: string[] = [];
  const pageIds = pages.map((_, i) => 6 + i * 2);
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  objects[5] = `<< /Title (${pdfText(title)}) /Producer (TalloCPA OS) >>`;
  pages.forEach((page, i) => {
    const ops = page
      .map((r, j) => {
        const y = PAGE_H - MARGIN - SIZE - j * LEADING;
        return `BT /${r.heading ? "F2" : "F1"} ${r.heading ? SIZE + 2 : SIZE} Tf ${MARGIN} ${y} Td (${pdfText(r.t)}) Tj ET`;
      })
      .join("\n");
    const content = `${ops}\nBT /F1 8 Tf ${MARGIN} ${MARGIN - 20} Td (${pdfText(`Page ${i + 1} of ${pages.length}`)}) Tj ET`;
    objects[pageIds[i]] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pageIds[i] + 1} 0 R >>`;
    objects[pageIds[i] + 1] = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`;
  });

  let out = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
  const offsets: number[] = [];
  for (let n = 1; n < objects.length; n++) {
    offsets[n] = Buffer.byteLength(out, "latin1");
    out += `${n} 0 obj\n${objects[n]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(out, "latin1");
  out += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let n = 1; n < objects.length; n++) out += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, "latin1");
}
