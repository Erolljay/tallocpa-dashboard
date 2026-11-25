import { fiveSteps, isNil } from "@/lib/filings/board";
import type { FilingStatus } from "@/lib/filings/sign-off";
import { cx } from "@/utils/cx";

/**
 * The five sign-off steps (Prepared → Reviewed → Client approved → Owner approved →
 * Filed & paid) as a segmented bar, with the next step named under it. A nil
 * return's client approval shows as not needed.
 */
export function StepProgress({ status, taxDue }: { status: FilingStatus; taxDue: number | null }) {
  const steps = fiveSteps(status, taxDue);
  const done = steps.filter((s) => s.state === "done" || s.state === "skipped").length;
  const current = steps.find((s) => s.state === "current");
  const summary = steps.map((s) => `${s.label}: ${s.state === "done" ? "done" : s.state === "skipped" ? "not needed" : s.state === "current" ? "next" : "to do"}`).join(", ");
  return (
    <div className="flex min-w-32 flex-col gap-1">
      <ol className="flex gap-0.5" aria-label={summary}>
        {steps.map((s) => (
          <li
            key={s.label}
            title={`${s.label}${s.state === "skipped" ? " (not needed: nil return)" : ""}`}
            className={cx(
              "h-1.5 flex-1 rounded-full",
              s.state === "done" && "bg-accent-600",
              s.state === "skipped" && "border border-dashed border-accent-600",
              s.state === "current" && "bg-accent-200",
              s.state === "todo" && "bg-background-tertiary-default",
            )}
          />
        ))}
      </ol>
      <p className="text-caption-1-regular text-text-tertiary">
        {done}/5{current ? ` · ${current.label} next` : " · done"}
        {isNil(taxDue) && done < 5 ? " · nil" : ""}
      </p>
    </div>
  );
}
