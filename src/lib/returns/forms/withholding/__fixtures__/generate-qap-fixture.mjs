// Regenerates qap-q1-2026.DAT by running taxify.ph reports/qap-report.js exportQAPDat (the reference
// implementation) on the same payees as withholding.test.ts. Usage:
//   node generate-qap-fixture.mjs <path to taxify.ph>/reports/qap-report.js | node -e "process.stdout.write(JSON.parse(require(\"fs\").readFileSync(0,\"utf8\")))" > qap-q1-2026.DAT
import fs from "node:fs";
const src = fs.readFileSync(process.argv[2], "utf8");
let captured = null;
const ctx = {
  Blob: class { constructor(parts) { captured = parts.join(""); } },
  URL: { createObjectURL: () => "x", revokeObjectURL: () => {} },
  document: { createElement: () => ({ click() {} }), getElementById: () => null },
  confirm: () => true,
  monthName: (m) => ["January","February","March","April","May","June","July","August","September","October","November","December"][m],
};
const fn = new Function(...Object.keys(ctx), src + "\n;return { exportQAPDat, setMap: (m) => { _qapSuppMap = m; } };");
const api = fn(...Object.values(ctx));
api.setMap({
  acme: { companyName: "ACME Services Corp", tin: "111-222-333", branchCode: "0000" },
  beta: { companyName: "Beta Lessor Co.", tin: "777-888-999", branchCode: "0001" },
  juan: { lastName: "DELA CRUZ", firstName: "JUAN", tin: "444-555-666" },
});
const m = (a, b, c) => [a, b, c].map(([base, ewt]) => ({ base, ewt }));
const rows = [
  { suppKey: "acme", atc: "WC100", rate: 5, base: 30000, ewt: 1500, months: m([0,0],[30000,1500],[0,0]) },
  { suppKey: "acme", atc: "WC158", rate: 1, base: 150000, ewt: 1500, months: m([100000,1000],[50000,500],[0,0]) },
  { suppKey: "beta", atc: "WC100", rate: 5, base: 10000, ewt: 500, months: m([0,0],[0,0],[10000,500]) },
  { suppKey: "juan", atc: "WI010", rate: 5, base: 20000, ewt: 1000, months: m([0,0],[0,0],[20000,1000]) },
];
api.exportQAPDat(rows, { tin: "123-456-789", rdoCode: "074", companyName: "Tallo Test Trading, Inc." }, new Date(2026, 2, 31), "1601EQ");
process.stdout.write(JSON.stringify(captured));
