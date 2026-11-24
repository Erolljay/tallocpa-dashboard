/**
 * BIR Form 2316 (Certificate of Compensation Payment / Tax Withheld, September
 * 2021 ENCS), printable replica. Ported from taxify.ph reports/2316-report.js
 * (`render2316Cert`) and its `.f2316-*` styles. A server component: it only lays
 * out a `Form2316Data` (src/lib/payroll/certificate.ts `form2316`), which holds
 * every figure. Several in a row print one per page (A4 portrait).
 */
import Image from "next/image";
import type { Form2316Data, Form2316Line, Form2316Party } from "@/lib/payroll/certificate";
import { formatAmount } from "@/lib/returns/money";
import s from "./form-2316.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const amount = (c: number | null | undefined) => (c == null ? "" : formatAmount(c));

/** TIN as 3-3-3-5 cells with grey separators. `digits` is 14 digits or "". */
function TinCells({ digits }: { digits: string }) {
  const d = digits.padEnd(14, " ").slice(0, 14);
  const groups = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9, 14)];
  return (
    <span className={s.tinWrap}>
      {groups.map((g, gi) => (
        <span key={gi} className={s.tinWrap}>
          {g.split("").map((ch, i) => <span key={i} className={s.tinCell}>{ch.trim() || "\u00a0"}</span>)}
          {gi < groups.length - 1 && <span className={cx(s.tinCell, s.tinDash)} />}
        </span>
      ))}
    </span>
  );
}

/** A row of boxed characters (year, period). */
function BoxCells({ value, count }: { value: string; count: number }) {
  const v = value.padEnd(count, " ").slice(0, count);
  return <span className={s.boxwrap}>{v.split("").map((ch, i) => <span key={i} className={s.boxcell}>{ch.trim() || "\u00a0"}</span>)}</span>;
}

/** A comb field with tick marks between characters (date of birth, contact number). */
function TickCells({ value, count }: { value: string; count: number }) {
  const v = value.replace(/\D/g, "").padEnd(count, " ").slice(0, count);
  return <div className={s.ticks}>{v.split("").map((ch, i) => <span key={i} className={s.tick}>{ch.trim() || "\u00a0"}</span>)}</div>;
}

const mmddyyyy = (iso: string | null) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? "");
  return m ? `${m[2]}${m[3]}${m[1]}` : "";
};

function Item({ line }: { line: Form2316Line }) {
  if (line.heading) {
    return (
      <div className={cx(s.itemRow, s.itemHeading)}>
        <div className={s.itemLbl}><strong>{line.no}</strong> {line.label}</div>
      </div>
    );
  }
  const sub = /^\d+[AB]$/.test(line.no) && (line.no.startsWith("44") || line.no.startsWith("51"));
  return (
    <div className={cx(s.itemRow, line.total && s.itemTotal)}>
      <div className={cx(s.itemLbl, sub && s.itemSub)}>
        <strong>{line.no}</strong> {sub ? <span className={s.specify}>{line.label || "\u00a0"}</span> : line.label}
      </div>
      <div className={s.itemAmt}>{sub && !line.label && !line.amount ? "" : amount(line.amount)}</div>
    </div>
  );
}

function PartyFields({ no, party }: { no: [string, string, string, string]; party: Form2316Party | null }) {
  return (
    <>
      <div className={s.tinRow}><span><strong>{no[0]}</strong> TIN</span><TinCells digits={party?.tin ?? ""} /></div>
      <div className={s.single}><div><strong>{no[1]}</strong> Employer&rsquo;s Name</div><div className={s.val}>{party?.name ?? ""}</div></div>
      <div className={s.row2}>
        <div className={s.fieldbox}><div><strong>{no[2]}</strong> Registered Address</div><div className={s.val}>{party?.address ?? ""}</div></div>
        <div className={cx(s.fieldbox, s.narrow)}><div><strong>{no[3]}</strong> ZIP Code</div><div className={cx(s.val, s.center)}>{party?.zipCode ?? ""}</div></div>
      </div>
    </>
  );
}

function DateBoxes() {
  return <span className={s.datewrap}>{Array.from({ length: 8 }, (_, i) => <span key={i} className={s.datebox} />)}</span>;
}

function Signatory({ no, name, title }: { no: string; name: string | null; title?: string | null }) {
  return (
    <div className={s.line}>
      <strong>{no}</strong>
      <span className={s.lineVal}>{name}{name && title ? <span className={s.lineTitle}>, {title}</span> : null}</span>
    </div>
  );
}

export function Form2316({ data }: { data: Form2316Data }) {
  const d = data;
  const rep = d.signatory.name ? d.signatory.name.toUpperCase() : null;
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
            <div className={s.formnoBig}>2316</div>
            <div className={s.formnoRev}>September 2021 (ENCS)</div>
          </div>
          <div className={s.title}>
            <div className={s.titleT}>Certificate of Compensation<br />Payment/Tax Withheld</div>
            <div className={s.titleSub}>For Compensation Payment With or Without Tax Withheld</div>
          </div>
          <div className={s.barcode}>
            <Image src="/bir/bir-barcode-2316.png" alt="" width={186} height={46} unoptimized />
            <div className={s.barcodeCode}>2316 9/21ENCS</div>
          </div>
        </div>
        <div className={s.fillnote}>Fill in all applicable spaces. Mark all appropriate boxes with an &ldquo;X&rdquo;.</div>

        <div className={s.yp}>
          <div className={s.ypA}><span><strong>1</strong> For the Year<br /><span className={s.italic}>(YYYY)</span></span><BoxCells value={String(d.year)} count={4} /></div>
          <div className={s.ypB}>
            <span><strong>2</strong> For the Period</span>
            <span>From <span className={s.italic}>(MM/DD)</span></span><BoxCells value={d.periodFrom} count={4} />
            <span>To <span className={s.italic}>(MM/DD)</span></span><BoxCells value={d.periodTo} count={4} />
          </div>
        </div>

        <div className={s.main}>
          <div className={cx(s.col, s.colLeft)}>
            <div className={s.parttitle}>Part I - Employee Information</div>
            <div className={s.tinRow}><span><strong>3</strong> TIN</span><TinCells digits={d.employee.tin} /></div>
            <div className={s.row2}>
              <div className={s.fieldbox}><div><strong>4</strong> Employee&rsquo;s Name <span className={s.italic}>(Last Name, First Name, Middle Name)</span></div><div className={s.val}>{d.employee.name}</div></div>
              <div className={cx(s.fieldbox, s.narrow)}><div><strong>5</strong> RDO Code</div><div className={cx(s.val, s.center)}>{d.employee.rdoCode ?? ""}</div></div>
            </div>
            <div className={s.row2}>
              <div className={s.fieldbox}><div><strong>6</strong> Registered Address</div><div className={s.val}>{d.employee.address ?? ""}</div></div>
              <div className={cx(s.fieldbox, s.narrow)}><div><strong>6A</strong> ZIP Code</div><div className={cx(s.val, s.center)}>{d.employee.zipCode ?? ""}</div></div>
            </div>
            <div className={s.row2}>
              <div className={s.fieldbox}><div><strong>6B</strong> Local Home Address</div><div className={s.val}>{"\u00a0"}</div></div>
              <div className={cx(s.fieldbox, s.narrow)}><div><strong>6C</strong> ZIP Code</div><div className={cx(s.val, s.center)}>{"\u00a0"}</div></div>
            </div>
            <div className={s.single}><div><strong>6D</strong> Foreign Address</div><div className={s.val}>{d.employee.foreignAddress ?? ""}</div></div>
            <div className={s.row2}>
              <div className={cx(s.fieldbox, s.dob)}><div><strong>7</strong> Date of Birth <span className={s.italic}>(MM/DD/YYYY)</span></div><TickCells value={mmddyyyy(d.employee.birthDate)} count={8} /></div>
              <div className={s.fieldbox}><div><strong>8</strong> Contact Number</div><TickCells value={d.employee.contactNumber ?? ""} count={11} /></div>
            </div>
            <div className={s.inlineRow}><div style={{ flex: 1 }}><strong>9</strong> Statutory Minimum Wage rate per day</div><div className={s.amtbox}>{amount(d.mwe.dailyRate)}</div></div>
            <div className={s.inlineRow}><div style={{ flex: 1 }}><strong>10</strong> Statutory Minimum Wage rate per month</div><div className={s.amtbox}>{amount(d.mwe.monthlyRate)}</div></div>
            <div className={s.mwe}>
              <span><strong>11</strong></span>
              <span className={s.checkbox}>{d.mwe.isMwe ? "X" : ""}</span>
              <span style={{ flex: 1 }}>Minimum Wage Earner (MWE) whose compensation is exempt from withholding tax and not subject to income tax</span>
            </div>

            <div className={s.parttitle}>Part II - Employer Information <span className={s.italic}>(Present)</span></div>
            <PartyFields no={["12", "13", "14", "14A"]} party={d.employer} />
            <div className={cx(s.inlineRow, s.employerType)}>
              <span><strong>15</strong> Type of Employer</span>
              <span className={s.check}><span className={cx(s.checkbox, s.checkboxSm)}>{d.employer.type === "main" ? "X" : ""}</span> Main Employer</span>
              <span className={s.check}><span className={cx(s.checkbox, s.checkboxSm)}>{d.employer.type === "secondary" ? "X" : ""}</span> Secondary Employer</span>
            </div>

            <div className={s.parttitle}>Part III - Employer Information <span className={s.italic}>(Previous)</span></div>
            <PartyFields no={["16", "17", "18", "18A"]} party={d.previous} />

            <div className={s.parttitle}>Part IV-A - Summary</div>
            {d.summary.map((l) => <Item key={l.no} line={l} />)}
          </div>

          <div className={s.col}>
            <div className={s.parttitle}>Part IV-B Details of Compensation Income &amp; Tax Withheld from Present Employer</div>
            <div className={s.cathdr}><div className={s.cathdrLbl}>A. NON-TAXABLE/EXEMPT COMPENSATION INCOME</div><div className={s.cathdrAmt}>Amount</div></div>
            {d.nonTaxable.map((l) => <Item key={l.no} line={l} />)}
            <div className={s.subhdr}>B. TAXABLE COMPENSATION INCOME REGULAR</div>
            {d.taxableRegular.map((l) => <Item key={l.no} line={l} />)}
            <div className={s.subhdr}>SUPPLEMENTARY</div>
            {d.taxableSupplementary.map((l) => <Item key={l.no} line={l} />)}
          </div>
        </div>

        <div className={s.declaration}>
          I/We declare, under the penalties of perjury that this certificate has been made in good faith, verified by me/us, and to the best of my/our knowledge and belief, is true and correct, pursuant to the provisions of the National Internal Revenue Code, as amended, and the regulations issued under authority thereof. Further, I/we give my/our consent to the processing of my/our information as contemplated under the *Data Privacy Act of 2012 (R.A. No. 10173) for legitimate and lawful purposes.
        </div>

        <div className={s.sigrow}>
          <div className={s.sigblock}>
            <Signatory no="53" name={rep} title={d.signatory.title} />
            <div className={s.cap}>Present Employer/Authorized Agent Signature over Printed Name</div>
          </div>
          <div className={s.datesigned}><span>Date Signed</span><DateBoxes /></div>
        </div>
        <div className={s.conforme}>CONFORME:</div>
        <div className={s.sigrow}>
          <div className={s.sigblock}>
            <Signatory no="54" name={d.employeeName} />
            <div className={s.cap}>Employee Signature over Printed Name</div>
          </div>
          <div className={s.datesigned}><span>Date Signed</span><DateBoxes /></div>
        </div>
        <div className={s.ctcrow}>
          <div className={s.ctcfield}><span className={s.ctcLbl}>CTC/Valid ID No.<br />of Employee</span><span className={s.ctcBox} /></div>
          <div className={s.ctcfield}><span className={s.ctcLbl}>Place of<br />Issue</span><span className={s.ctcBox} /></div>
          <div className={s.ctcDate}>
            <div className={s.ctcDateRow}><span>Date Issued</span><DateBoxes /></div>
            <div className={s.ctcDateRow}><span>Amount paid, if CTC</span><span className={s.ctcAmt} /></div>
          </div>
        </div>

        <div className={s.subTitle}>To be accomplished under substituted filing</div>
        <div className={s.subCols}>
          <div className={s.subCol}>
            <div className={s.subText}>I declare, under the penalties of perjury that the information herein stated are reported under BIR Form No. 1604-C which has been filed with the Bureau of Internal Revenue.</div>
            <div className={s.subLine55}><Signatory no="55" name={d.substitutedFiling ? rep : null} title={d.substitutedFiling ? d.signatory.title : null} /></div>
            <div className={s.cap}>Present Employer/Authorized Agent Signature over Printed Name<br />(Head of Accounting/Human Resource or Authorized Representative)</div>
          </div>
          <div className={s.subCol}>
            <div className={s.subText}>I declare, under the penalties of perjury that I am qualified under substituted filing of Income Tax Return (BIR Form No. 1700), since I received purely compensation income from only one employer in the Philippines for the calendar year; that taxes have been correctly withheld by my employer (tax due equals tax withheld); that the BIR Form No. 1604-C filed by my employer to the BIR shall constitute as my income tax return; and that BIR Form No. 2316 shall serve the same purpose as if BIR Form No. 1700 has been filed pursuant to the provisions of Revenue Regulations (RR) No. 3-2002, as amended.</div>
            <div className={s.subLine56}><Signatory no="56" name={d.substitutedFiling ? d.employeeName : null} /></div>
            <div className={s.cap}>Employee Signature over Printed Name</div>
          </div>
        </div>
        <div className={s.note}>*NOTE: The BIR Data Privacy is in the BIR website (www.bir.gov.ph)</div>
      </div>
    </div>
  );
}

/** Several certificates, one per printed page. */
export function Form2316Set({ forms }: { forms: Form2316Data[] }) {
  return <>{forms.map((f) => <Form2316 key={f.employeeId} data={f} />)}</>;
}
