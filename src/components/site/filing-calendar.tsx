import { BIR_FORMS, GROUPS, MONTHS, type FormGroup } from "@/lib/site/calendar";
import { cx } from "@/utils/cx";

/**
 * The BIR year as a matrix: one row per return, one column per month, the due day in
 * the month it falls. A real table (row and column headers), so a screen reader
 * reads "1601-C, February, 10". Built from src/lib/site/calendar.ts.
 */
export function FilingCalendar({ detailed = false, onNavy = false, className }: { detailed?: boolean; onNavy?: boolean; className?: string }) {
  const groups = Object.keys(GROUPS) as FormGroup[];
  const muted = onNavy ? "text-accent-200" : "text-text-secondary";
  const strong = onNavy ? "text-text-white" : "text-text-primary";
  const chip = onNavy ? "bg-accent-500 text-text-white" : "bg-button-ghost-background text-button-ghost-foreground";
  return (
    <div className={cx("min-w-0", className)}>
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">BIR filing deadlines by month for a calendar-year business: the day each return is due.</caption>
        <colgroup>
          <col className="w-[5.5rem] md:w-[8rem]" />
          {MONTHS.map((m) => (
            <col key={m} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={cx("pb-2 text-start text-caption-1-medium", muted)}>
              Return
            </th>
            {MONTHS.map((m) => (
              <th key={m} scope="col" className={cx("pb-2 text-center text-caption-1-medium", muted)}>
                <abbr title={m} className="no-underline">
                  <span className="sm:hidden">{m[0]}</span>
                  <span className="max-sm:hidden">{m.slice(0, 3)}</span>
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g} className={cx("border-t", onNavy ? "border-accent-800" : "border-separator-border")}>
            {detailed && (
              <tr>
                <th scope="colgroup" colSpan={13} className={cx("pt-4 pb-1 text-start text-body-2-semibold", strong)}>
                  {GROUPS[g].title}
                </th>
              </tr>
            )}
            {BIR_FORMS.filter((f) => f.group === g).map((f) => (
              <tr key={f.code}>
                <th scope="row" className="py-1.5 pe-2 text-start align-middle font-normal">
                  <span className={cx("figure block text-caption-1-semibold sm:text-body-2-semibold", strong)}>{f.code}</span>
                  {detailed && <span className="sr-only">{f.name}</span>}
                </th>
                {MONTHS.map((m, i) => {
                  const day = f.due[i + 1];
                  return (
                    <td key={m} className="px-px py-1.5 text-center align-middle">
                      {day ? (
                        <span className={cx("figure inline-flex h-7 w-full max-w-10 items-center justify-center rounded-md text-caption-1-semibold sm:h-8 sm:text-body-2-semibold", chip)}>
                          {day}
                        </span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
