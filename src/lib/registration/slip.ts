/** Today (or a moment) as YYYY-MM-DD in Philippine time. */
export const manilaDate = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });

/** How long a file has sat at one step: up to a week is normal, two weeks needs a follow-up, longer is late. */
export function daysTone(days: number) {
  if (days > 14) return { tone: "blocked", text: "text-text-error-primary" } as const;
  if (days > 7) return { tone: "waiting", text: "text-status-yellow-text" } as const;
  return { tone: "neutral", text: "text-text-primary" } as const;
}
