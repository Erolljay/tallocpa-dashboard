import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { authEmailTemplates } from "./auth-templates";

const dir = path.resolve(import.meta.dirname, "..", "..", "..", "supabase", "templates");

describe("Supabase sign-in email templates", () => {
  const templates = authEmailTemplates();

  it("are up to date in supabase/templates (run pnpm email:auth-templates)", () => {
    for (const t of templates) expect(readFileSync(path.join(dir, t.file), "utf8")).toBe(t.html);
  });

  it("carry the brand and Supabase's variables, not the placeholders", () => {
    const magic = templates.find((t) => t.file === "magic_link.html")!.html;
    expect(magic).toContain("Tallo CPA");
    expect(magic).toContain('href="{{ .ConfirmationURL }}"');
    expect(magic).toContain("{{ .Token }}");
    for (const t of templates) {
      expect(t.html).not.toContain("placeholder.invalid");
      expect(t.html).not.toContain("__SIGN_IN_CODE__");
      expect(t.html).not.toContain("Settings → Notifications");
    }
    expect(templates.find((t) => t.file === "reauthentication.html")!.html).not.toContain("{{ .ConfirmationURL }}");
  });
});
