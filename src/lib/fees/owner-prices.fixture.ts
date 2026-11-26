/**
 * TEST FIXTURE: the prices the Owner approved on 26 Nov 2026, as seeded into the
 * draft "2027 schedule (Owner's prices, 26 Nov 2026)" by migration
 * 20261214000002_fee_quote_monthly.sql. The app reads prices from the database
 * only; tests use this copy to check the quotes the Owner asked for and that the
 * seed matches it.
 */
import type { ScheduleSettings } from "./types";

export const OWNER_PRICES: Readonly<Record<string, number>> = {
  "A.individual": 1000,
  "A.corporate": 1500,
  "A.non_stock": 1500,
  "B.individual": 500,
  "B.non_individual": 1000,
  "C.rental": 300,
  "C.regular": 500,
  "D.1-9": 300,
  "D.10-29": 600,
  "D.30-49": 1000,
  "E.1-9": 300,
  "E.10-29": 600,
  "E.30-49": 1000,
  "F.0-50": 1000,
  "F.51-150": 1500,
  "F.151-300": 2500,
  "F.complexity": 500,
  "F.per_branch": 500,
  // Annual jobs (ITR with AFS preparation: flat by taxpayer type)
  "H.itr_afs_individual": 5000,
  "H.itr_afs_partnership": 7500,
  "H.itr_afs_corporation": 10000,
  "H.1604c": 1500,
  "H.1604e": 1500,
  "H.sawt": 500,
  "H.inventory_list": 1000,
  // Audit of financial statements, by taxpayer type and annual gross sales (over ₱100M: on request)
  "H.audit_proprietor_0-3m": 8000, "H.audit_proprietor_3m-10m": 12000, "H.audit_proprietor_10m-20m": 16000, "H.audit_proprietor_20m-50m": 24000, "H.audit_proprietor_50m-100m": 28000,
  "H.audit_partnership_0-3m": 12000, "H.audit_partnership_3m-10m": 16000, "H.audit_partnership_10m-20m": 24000, "H.audit_partnership_20m-50m": 32000, "H.audit_partnership_50m-100m": 40000,
  "H.audit_corporation_0-3m": 16000, "H.audit_corporation_3m-10m": 24000, "H.audit_corporation_10m-20m": 32000, "H.audit_corporation_20m-50m": 48000, "H.audit_corporation_50m-100m": 56000,
  // Ad hoc jobs
  "I.orus": 1500,
  "I.business_permit": 3500,
  "I.sec": 2000,
  "I.closure": 20000,
  "I.registration_individual": 8000,
  "I.registration_non_individual": 12500,
  "I.sss_registration": 1500,
  "I.philhealth_registration": 1500,
  "I.pagibig_registration": 1500,
};

export const OWNER_SETTINGS: ScheduleSettings = {
  pricesIncludeTax: true,
  quoteValidDays: 30,
  minimumMonthlyRetainer: null,
  lateSurchargeAmount: null,
  lateSurchargeAuto: false,
  monthlyCap: 6000,
  catchUpFactor: 0.5,
};
