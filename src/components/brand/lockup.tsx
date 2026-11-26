import { cx } from "@/utils/cx";
import { Mark } from "./mark";

/**
 * Header lockup: 32px mark beside the wordmark (Montserrat) and the tagline (Caption 2).
 * It can shrink (min-w-0, tagline truncates) so a narrow row such as the staff
 * sidebar header keeps room for its buttons instead of pushing them out.
 */
export function Lockup({ wordmarkClassName, taglineClassName }: { wordmarkClassName?: string; taglineClassName?: string } = {}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Mark className="size-8 shrink-0 rounded-lg" />
      <div className={cx("min-w-0", wordmarkClassName)}>
        <p className="font-display text-title-3-semibold text-text-primary">Tallo CPA</p>
        <p className={cx("truncate text-caption-2-regular text-text-tertiary", taglineClassName)}>Clear Numbers. Clean Compliance.</p>
      </div>
    </div>
  );
}
