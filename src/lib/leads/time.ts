/** The current Manila time as a datetime-local value (YYYY-MM-DDTHH:MM). Manila has no daylight saving. */
export function manilaNowLocal(now: Date = new Date()): string {
  return new Date(now.getTime() + 8 * 3600_000).toISOString().slice(0, 16);
}
