import { Badge } from "@/components/ui";

export interface ActivityRow {
  id: number;
  ai_user_id: string;
  tool: string;
  outcome: "ok" | "refused" | "error";
  created_at: string;
  clients: { name: string } | null;
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });
const outcome = { ok: { tone: "done", word: "Done" }, refused: { tone: "waiting", word: "Refused" }, error: { tone: "blocked", word: "Error" } } as const;

/** Tool calls, newest first. Written by the server when an AI employee uses a tool (step 2). */
export function ActivityList({ rows, nameOf }: { rows: ActivityRow[]; nameOf?: Map<string, string> }) {
  if (rows.length === 0) {
    return <p className="text-body-regular text-text-secondary">Nothing yet. Every tool an AI employee uses will be listed here, with the client and the time.</p>;
  }
  return (
    <ul className="flex flex-col divide-y divide-separator-border">
      {rows.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
          <p className="min-w-0 text-body-regular text-text-primary">
            {nameOf && <span className="text-body-medium">{nameOf.get(a.ai_user_id) ?? "AI employee"} · </span>}
            <code dir="ltr" className="font-mono text-caption-1-regular">{a.tool}</code>
            {a.clients && <span className="text-text-secondary"> · {a.clients.name}</span>}
          </p>
          <span className="flex items-center gap-2 text-caption-1-regular text-text-tertiary">
            <span className="tabular-nums">{when.format(new Date(a.created_at))}</span>
            <Badge tone={outcome[a.outcome].tone}>{outcome[a.outcome].word}</Badge>
          </span>
        </li>
      ))}
    </ul>
  );
}
