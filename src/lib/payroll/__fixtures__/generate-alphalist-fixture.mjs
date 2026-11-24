// Regenerates alphalist-2025.dat with taxify's own exportAlphalistDat (read-only clone of the Owner's taxify.ph).
// Usage: node src/lib/payroll/__fixtures__/generate-alphalist-fixture.mjs [path to taxify.ph] > src/lib/payroll/__fixtures__/alphalist-2025.dat
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
const T = (process.argv[2] || '/home/user/erolljay/taxify.ph') + '/';
let captured = null;
const ctx = { console, Blob: class { constructor(parts){ captured = parts.join(''); } }, URL: { createObjectURL(){return 'x'}, revokeObjectURL(){} },
  document: { createElement(){ return { click(){} }; } }, window: {} };
vm.createContext(ctx);
for (const f of ['shared/tax-rates.js','helpers/payroll-helpers.js','reports/alphalist-report.js']) vm.runInContext(fs.readFileSync(T+f,'utf8'), ctx, {filename:f});
vm.runInContext(`_taxRatesData = ${fs.readFileSync(T+'tax-rates-data.json','utf8')};`, ctx);
const input = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'alphalist-input.json'),'utf8'));
ctx.input = input;
vm.runInContext(`
var year = input.year; var nmwe=[], mwe=[];
for (const emp of input.employees) {
  const months = emp.months; // array of 12 bucket objects keyed by PH_CAT ids
  const monthly = computeEmployee1601C(months, emp.taxStatus, year);
  const sum = (k) => monthly.reduce((a, m) => a + (m[k] || 0), 0);
  const catTotal = (cat) => months.reduce((a, b) => a + (b[cat] || 0), 0);
  const grossComp = sum('line14'); if (!grossComp) continue;
  const taxableComp = sum('line22');
  const row = { tin: emp.tin, lastName: emp.lastName, firstName: emp.firstName, middleName: emp.middleName,
    name: [emp.lastName, emp.firstName, emp.middleName].filter(Boolean).join(', '),
    nationality: emp.nationality, employmentStatus: emp.employmentStatus, dateHired: emp.dateHired, dateSeparated: emp.dateSeparated,
    reasonSeparation: emp.reasonSeparation, substitutedFiling: emp.substitutedFiling,
    thirteenth: catTotal(PH_CAT.THIRTEENTH), deMinimis: catTotal(PH_CAT.DE_MINIMIS),
    sssEe: catTotal(PH_CAT.SSS_EE), phicEe: catTotal(PH_CAT.PHIC_EE), hdmfEe: catTotal(PH_CAT.HDMF_EE),
    grossComp, nonTaxable: sum('line21'), taxableComp, taxDue: computeAnnualTax(taxableComp, year), taxWithheld: sum('line25') };
  if (emp.taxStatus === 'MWE') mwe.push(row); else nmwe.push(row);
}
nmwe.sort((a, b) => a.name.localeCompare(b.name)); mwe.sort((a, b) => a.name.localeCompare(b.name));
exportAlphalistDat(nmwe, mwe, input.setup, year);
`, ctx);
process.stdout.write(captured);
