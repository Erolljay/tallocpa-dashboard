"use client";

import { useActionState } from "react";
import { Button, Field, Notice, Select } from "@/components/ui";
import { allowAction, denyAction, type ConsentState } from "./actions";

export interface ConsentRequest {
  clientId: string;
  redirectUri: string;
  state: string | null;
  codeChallenge: string;
}

function Hidden({ req }: { req: ConsentRequest }) {
  return (
    <>
      <input type="hidden" name="client_id" value={req.clientId} />
      <input type="hidden" name="redirect_uri" value={req.redirectUri} />
      {req.state !== null && <input type="hidden" name="state" value={req.state} />}
      <input type="hidden" name="code_challenge" value={req.codeChallenge} />
    </>
  );
}

/**
 * Allow or Deny. With `aiKey` the connector address already named the AI employee;
 * without it (an app that did not send one) the Owner chooses.
 */
export function ConsentForm({ req, aiKey, choices }: { req: ConsentRequest; aiKey: string | null; choices: { key: string; name: string }[] }) {
  const [allowState, allow, allowing] = useActionState(allowAction, {} as ConsentState);
  const [denyState, deny, denying] = useActionState(denyAction, {} as ConsentState);
  const error = allowState.error ?? denyState.error;
  return (
    <div className="flex flex-col gap-4">
      <form action={allow} className="flex flex-col gap-4">
        <Hidden req={req} />
        {aiKey ? (
          <input type="hidden" name="ai_key" value={aiKey} />
        ) : (
          <Field label="Connect as" htmlFor="ai_key" hint="The app works as this AI employee, with its tools and clients.">
            <Select id="ai_key" name="ai_key" defaultValue="" required>
              <option value="" disabled>Choose an AI employee…</option>
              {choices.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
            </Select>
          </Field>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={allowing || denying}>{allowing ? "Allowing…" : "Allow"}</Button>
          <Button type="submit" variant="secondary" formAction={deny} formNoValidate disabled={allowing || denying}>{denying ? "Refusing…" : "Deny"}</Button>
        </div>
      </form>
      {error && <Notice tone="blocked">{error}</Notice>}
    </div>
  );
}
