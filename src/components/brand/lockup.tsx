import { Mark } from "./mark";

/** Header lockup (design system: SectionHeading): 40px mark, space-3, name in heading-md, tagline in eyebrow. */
export function Lockup() {
  return (
    <div className="flex items-center gap-3">
      <Mark className="size-10 shrink-0" />
      <div>
        <p className="font-display text-xl font-semibold leading-7 text-ink-heading">Tallo CPA</p>
        <p className="-mt-0.5 text-[10px] leading-[15px] uppercase tracking-[0.05em] text-ink-subtle">Clear Numbers. Clean Compliance.</p>
      </div>
    </div>
  );
}
