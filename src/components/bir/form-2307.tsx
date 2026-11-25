/**
 * BIR Form 2307 (Certificate of Creditable Tax Withheld at Source, January 2018 ENCS),
 * printable replica in the style of form-2316.tsx. A server component: it only lays out
 * a `Form2307Data` (src/lib/books/form-2307.ts `forms2307`), which holds every figure.
 * Several in a row print one per page (A4 portrait).
 */
import Image from "next/image";
import type { Form2307Data, Line2307, Party2307 } from "@/lib/books/form-2307";
import { formatAmount } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import { cx } from "@/utils/cx";
import s from "./form-2307.module.css";

/** Part III prints at least this many rows of income payments, and of business-tax payments. */
const EWT_ROWS = 10;
const BUSINESS_ROWS = 5;

const amount = (c: Centavos | null | undefined) => (c ? formatAmount(c) : "");

/** TIN as 3-3-3-5 cells with grey separators. `digits` is 14 digits or "". */
function TinCells({ digits }: { digits: string }) {
  const d = digits.padEnd(14, " ").slice(0, 14);
  const groups = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9, 14)];
  return (
    <span className={s.tinWrap}>
      {groups.map((g, gi) => (
        <span key={gi} className={s.tinWrap}>
          {g.split("").map((ch, i) => <span key={i} className={s.tinCell}>{ch.trim() || " "}</span>)}
          {gi < groups.length - 1 && <span className={cx(s.tinCell, s.tinDash)} />}
        </span>
      ))}
    </span>
  );
}

/** A date as eight boxed digits, MM DD YYYY. */
function DateCells({ iso }: { iso: string }) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const v = (m ? `${m[2]}${m[3]}${m[1]}` : "").padEnd(8, " ");
  return <span className={s.boxwrap}>{v.split("").map((ch, i) => <span key={i} className={s.boxcell}>{ch.trim() || " "}</span>)}</span>;
}

function PartyFields({ no, party, nameLabel, foreignAddress }: { no: [string, string, string, string]; party: Party2307; nameLabel: string; foreignAddress?: { no: string; value: string | null } }) {
  return (
    <>
      <div className={s.tinRow}><span><strong>{no[0]}</strong> Taxpayer Identification Number (TIN)</span><TinCells digits={party.tin} /></div>
      <div className={s.single}>
        <div><strong>{no[1]}</strong> {nameLabel} <span className={s.italic}>(Last Name, First Name, Middle Name for Individual OR Registered Name for Non-Individual)</span></div>
        <div className={s.val}>{party.name || " "}</div>
      </div>
      <div className={s.row2}>
        <div className={s.fieldbox}><div><strong>{no[2]}</strong> Registered Address</div><div className={s.val}>{party.address ?? ""}</div></div>
        <div className={cx(s.fieldbox, s.narrow)}><div><strong>{no[3]}</strong> ZIP Code</div><div className={cx(s.val, s.center)}>{party.zipCode ?? ""}</div></div>
      </div>
      {foreignAddress && (
        <div className={s.single}><div><strong>{foreignAddress.no}</strong> Foreign Address, <span className={s.italic}>if applicable</span></div><div className={s.val}>{foreignAddress.value ?? ""}</div></div>
      )}
    </>
  );
}

function AmountRow({ line }: { line: Line2307 | null }) {
  return (
    <tr>
      <td className={s.nature}>{line?.nature ?? " "}</td>
      <td className={s.atc}>{line?.atc ?? ""}</td>
      <td className={s.num}>{amount(line?.months[0])}</td>
      <td className={s.num}>{amount(line?.months[1])}</td>
      <td className={s.num}>{amount(line?.months[2])}</td>
      <td className={s.num}>{line ? formatAmount(line.total) : ""}</td>
      <td className={s.num}>{line ? formatAmount(line.withheld) : ""}</td>
    </tr>
  );
}

function TotalRow({ totals, show }: { totals: Form2307Data["totals"]; show: boolean }) {
  return (
    <tr className={s.totalRow}>
      <td>Total</td>
      <td />
      <td className={s.num}>{show ? formatAmount(totals.months[0]) : ""}</td>
      <td className={s.num}>{show ? formatAmount(totals.months[1]) : ""}</td>
      <td className={s.num}>{show ? formatAmount(totals.months[2]) : ""}</td>
      <td className={s.num}>{show ? formatAmount(totals.total) : ""}</td>
      <td className={s.num}>{show ? formatAmount(totals.withheld) : ""}</td>
    </tr>
  );
}

/** Rows padded with empty ones to at least `min`. */
const padded = (lines: Line2307[], min: number): (Line2307 | null)[] => [...lines, ...Array<null>(Math.max(0, min - lines.length)).fill(null)];

function Accreditation() {
  return (
    <div className={s.accred}>
      <div className={s.accredField}><span>Tax Agent Accreditation No./<br />Attorney&rsquo;s Roll No. <span className={s.italic}>(if applicable)</span></span><span className={s.accredBox} /></div>
      <div className={s.accredField}><span>Date of Issue<br /><span className={s.italic}>(MM/DD/YYYY)</span></span><DateCells iso="" /></div>
      <div className={s.accredField}><span>Date of Expiry<br /><span className={s.italic}>(MM/DD/YYYY)</span></span><DateCells iso="" /></div>
    </div>
  );
}

export function Form2307({ data }: { data: Form2307Data }) {
  const d = data;
  const rep = d.signatory.name ? d.signatory.name.toUpperCase() : null;
  const businessTotals = { months: [0, 0, 0] as [number, number, number], total: 0, withheld: 0 };
  return (
    <div className={s.page}>
      <div className={s.topstrip}>
        <div className={s.biruse}><span className={s.gray}>For BIR<br />Use Only</span><span>BCS/<br />Item:</span></div>
        <div className={s.gov}>
          <Image src="/bir/bir-logo.png" alt="BIR" width={40} height={35} unoptimized />
          <div className={s.govLines}>Republic of the Philippines<br />Department of Finance<br />Bureau of Internal Revenue</div>
        </div>
      </div>
      <div className={s.outer}>
        <div className={s.headband}>
          <div className={s.formno}>
            <div className={s.formnoLbl}>BIR Form No.</div>
            <div className={s.formnoBig}>2307</div>
            <div className={s.formnoRev}>January 2018 (ENCS)</div>
          </div>
          <div className={s.title}>
            <div className={s.titleT}>Certificate of Creditable Tax<br />Withheld at Source</div>
          </div>
          <div className={s.barcode}>
            <div className={s.barcodeCode}>2307 01/18ENCS</div>
          </div>
        </div>
        <div className={s.fillnote}>Fill in all applicable spaces. Mark all appropriate boxes with an &ldquo;X&rdquo;.</div>

        <div className={s.periodRow}>
          <span><strong>1</strong> For the Period</span>
          <span>From</span><DateCells iso={d.periodFrom} /><span className={s.italic}>(MM/DD/YYYY)</span>
          <span>To</span><DateCells iso={d.periodTo} /><span className={s.italic}>(MM/DD/YYYY)</span>
        </div>

        <div className={s.part}>
          <div className={s.parttitle}>Part I &ndash; Payee Information</div>
          <PartyFields no={["2", "3", "4", "4A"]} party={d.payee} nameLabel={"Payee’s Name"} foreignAddress={{ no: "5", value: d.payee.foreignAddress }} />
        </div>

        <div className={s.part}>
          <div className={s.parttitle}>Part II &ndash; Payor Information</div>
          <PartyFields no={["6", "7", "8", "8A"]} party={d.payor} nameLabel={"Payor’s Name"} />
        </div>

        <div className={s.parttitle}>Part III &ndash; Details of Monthly Income Payments and Taxes Withheld</div>
        <table className={s.table}>
          <colgroup>
            <col className={s.colNature} />
            <col className={s.colAtc} />
            <col /><col /><col /><col /><col />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan={2}>Income Payments Subject to Expanded Withholding Tax</th>
              <th rowSpan={2}>ATC</th>
              <th colSpan={4}>AMOUNT OF INCOME PAYMENTS</th>
              <th rowSpan={2}>Tax Withheld for the Quarter</th>
            </tr>
            <tr>
              <th>1st Month of the Quarter</th>
              <th>2nd Month of the Quarter</th>
              <th>3rd Month of the Quarter</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {padded(d.lines, EWT_ROWS).map((l, i) => <AmountRow key={l?.atc ?? `e${i}`} line={l} />)}
            <TotalRow totals={d.totals} show />
            <tr className={s.sectionRow}><td colSpan={7}>Money Payments Subject to Withholding of Business Tax (Government &amp; Private)</td></tr>
            {padded(d.businessTax, BUSINESS_ROWS).map((l, i) => <AmountRow key={l?.atc ?? `b${i}`} line={l} />)}
            <TotalRow totals={businessTotals} show={d.businessTax.length > 0} />
          </tbody>
        </table>

        <div className={s.declaration}>
          We declare under the penalties of perjury that this certificate has been made in good faith, verified by us, and to the best of our knowledge and belief, is true and correct, pursuant to the provisions of the National Internal Revenue Code, as amended, and the regulations issued under authority thereof. Further, we give our consent to the processing of our information as contemplated under the *Data Privacy Act of 2012 (R.A. No. 10173) for legitimate and lawful purposes.
        </div>

        <div className={s.sig}>
          <div className={s.line}>{rep}{rep && d.signatory.title ? <span className={s.lineTitle}>, {d.signatory.title}</span> : null}</div>
          <div className={s.cap}>Signature over Printed Name of Payor/Payor&rsquo;s Authorized Representative/Tax Agent<br />(Indicate Title/Designation and TIN)</div>
        </div>
        <Accreditation />
        <div className={s.conforme}>CONFORME:</div>
        <div className={s.sig}>
          <div className={s.line}>{" "}</div>
          <div className={s.cap}>Signature over Printed Name of Payee/Payee&rsquo;s Authorized Representative/Tax Agent<br />(Indicate Title/Designation and TIN)</div>
        </div>
        <Accreditation />
        <div className={s.note}>*NOTE: The BIR Data Privacy is in the BIR website (www.bir.gov.ph)</div>
      </div>
    </div>
  );
}

/** Several certificates, one per printed page. */
export function Form2307Set({ forms }: { forms: Form2307Data[] }) {
  return <>{forms.map((f) => <Form2307 key={f.key} data={f} />)}</>;
}

/**
 * The printable sheet around one or more 2307s: scrolls sideways on narrow screens; in
 * print, only the certificates show, one per A4 page (the app's navigation is
 * print:hidden in the layouts).
 */
export function Form2307Sheet({ forms }: { forms: Form2307Data[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 print:m-0 print:overflow-visible print:p-0">
      <Form2307Set forms={forms} />
    </div>
  );
}
