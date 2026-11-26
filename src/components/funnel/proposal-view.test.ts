import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { OWNER_PRICES, OWNER_SETTINGS } from "@/lib/fees/owner-prices.fixture";
import { buildProposalQuote, jobField, jobOptions, readJobs } from "@/lib/fees/proposal";
import { buildQuote } from "@/lib/fees/quote";
import { FEE_TEMPLATE } from "@/lib/fees/template";
import type { ClientProfile, FeeItem } from "@/lib/fees/types";
import { ProposalView, type ProposalData } from "./proposal-view";

const items: FeeItem[] = FEE_TEMPLATE.map((t) => ({ ...t, price: t.isCustomQuote ? null : (OWNER_PRICES[t.code] ?? null) }));
const corp: ClientProfile = {
  taxpayerType: "corporation", vatRegistered: true, ewt: "rental", employees: 5, remitsContributions: true, documentsPerMonth: 120, complexity: [], branches: 0, monthsBehind: 2,
};

function proposal(ticks: string[], sales: number | null) {
  const quote = buildQuote({ profile: corp, items, settings: OWNER_SETTINGS, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });
  const values = Object.fromEntries(ticks.map((c) => [jobField.ticked(c), "1"]));
  const jobs = readJobs(jobOptions(items, corp), (f) => values[f] ?? null, sales);
  if ("error" in jobs) throw new Error(jobs.error);
  const built = buildProposalQuote(quote, jobs.jobs, { monthly: null, catchUpFactor: 0.5, annualSales: sales });
  if ("error" in built) throw new Error(built.error);
  const data: ProposalData = {
    status: "sent", quote: built.quote, terms: "Terms of engagement text.", valid_until: "2026-12-26", created_at: "2026-11-26T09:00:00+08:00",
    accepted_at: null, accepted_name: null, accepted_position: null,
    lead: { business_name: "Client A Corp.", contact_name: "Ana", email: "ana@example.com", services: ["tax_compliance"], taxpayer_type: "corporation" },
    brand: { display_name: "Tallo CPA", legal_name: "EJ Tallo Cloud Accounting and Auditing Services", tin: null },
  };
  return renderToStaticMarkup(createElement(ProposalView, { p: data }));
}

const order = (html: string, ...texts: string[]) => texts.map((t) => html.indexOf(t));

describe("ProposalView", () => {
  it("monthly + catch-up + 2 annual + 1 ad hoc job, each in its own section, no grand total", () => {
    const html = proposal(["H.itr_afs_corporation", "H.1604c", "I.orus"], null);
    const at = order(html, "Monthly retainer", "Catch-up (one time)", "Annual jobs", "Ad hoc jobs", "Terms of engagement");
    expect(at.every((n) => n >= 0)).toBe(true);
    expect([...at].sort((a, b) => a - b)).toEqual(at);
    for (const t of ["₱4,900.00", "2 months behind × ₱2,450.00", "Annual ITR with AFS (preparation)", "₱10,000.00", "Billed in April", "Annual information return 1604-C", "₱1,500.00", "Billed in January", "ORUS and BIR registration updates", "Billed when done", "EWT"]) {
      expect(html).toContain(t);
    }
    expect(html).not.toMatch(/first.year|grand total|all in/i);
    expect(html).not.toContain("Audit (separate engagement)");
  });

  it("shows the audit in its own section below ad hoc jobs, for information, under the firm's name", () => {
    const html = proposal(["I.orus", "H.audit_corporation_0-3m"], 12_000_000);
    const [adHoc, audit, terms] = order(html, "Ad hoc jobs", "Audit (separate engagement)", "Terms of engagement");
    expect(adHoc).toBeGreaterThan(0);
    expect(audit).toBeGreaterThan(adHoc);
    expect(terms).toBeGreaterThan(audit);
    expect(html).toContain("Quoted and contracted separately by EJ Tallo Cloud Accounting and Auditing Services under its own engagement letter. Not part of the Tallo CPA retainer or this proposal&#x27;s acceptance.");
    expect(html).toContain("Corporation, OPC or non-stock · sales over ₱10M to ₱20M");
    expect(html).toContain("₱32,000.00");
    expect(html).toContain("For information");
  });

  it("still shows a proposal made before 26 Nov 2026 as it was accepted", () => {
    const old: ProposalData = {
      status: "accepted", terms: "Old terms.", valid_until: "2026-12-01", created_at: "2026-11-20T09:00:00+08:00", accepted_at: "2026-11-21T09:00:00+08:00", accepted_name: "Ana", accepted_position: null,
      lead: { business_name: "Old Co.", contact_name: "Ana", email: "a@example.com", services: [], taxpayer_type: "corporation" },
      brand: { display_name: "Tallo CPA", legal_name: "EJ Tallo", tin: null },
      quote: {
        monthly: [{ code: "A.corporate", component: "A", label: "Base", band: null, billing: "monthly", unitPrice: 2000, quantity: 1, amount: 2000 }],
        monthlyRetainer: 2000, minimumTopUp: 0, ewtNote: "EWT note.",
        tax: { kind: "percentage_tax_3", rate: 0.03, inclusive: true, monthly: 60, oneTime: 0, monthlyWithTax: 2000, oneTimeWithTax: 0, note: "Tax note." },
        annual: [{ code: "H.afs_itr", component: "H", label: "AFS and ITR", band: null, billing: "annual", unitPrice: 10000, quantity: 1, amount: 10000 }],
        annualTotal: 10000, oneTime: [], oneTimeTotal: 0, firstYearTotal: 34000, customQuote: [],
      },
    };
    const html = renderToStaticMarkup(createElement(ProposalView, { p: old }));
    for (const t of ["First year, all in", "₱34,000.00", "Once a year", "AFS and ITR", "Accepted online"]) expect(html).toContain(t);
  });
});
