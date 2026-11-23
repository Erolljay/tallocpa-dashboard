/**
 * ATC master for creditable expanded withholding tax (EWT), ported verbatim from
 * taxify.ph helpers/ewt-helpers.js `ATC_MASTER` (RR 11-2018 as amended, incl.
 * e-marketplace WI/WC820–830, joint ventures WI/WC770–790, Top-WA motor
 * vehicles/medicine/fuels WI/WC840–860, raw sugar WI/WC720, REIT WC690).
 * The single EWT table for 0619-E, 1601-EQ, QAP (and 2307 / SAWT): do not keep
 * another copy. Final withholding (royalties WI/WC250) and Sec. 109BB
 * government percentage tax (WB080) are NOT creditable EWT and are not here.
 * `payee` is the BIR "Allowed Payee Type".
 */
export interface AtcInfo {
  desc: string;
  /** Percent, e.g. 0.5, 2, 15. */
  rate: number;
  payee: "individual" | "non_individual";
}

export const ATC_MASTER: Readonly<Record<string, AtcInfo>> = {
  WI010: { desc: "Professional fees, <=3M", rate: 5, payee: "individual" },
  WI011: { desc: "Professional fees, >3M/VAT", rate: 10, payee: "individual" },
  WI020: { desc: "Prof. entertainers, <=3M", rate: 5, payee: "individual" },
  WI021: { desc: "Prof. entertainers, >3M/VAT", rate: 10, payee: "individual" },
  WI030: { desc: "Prof. athletes, <=3M", rate: 5, payee: "individual" },
  WI031: { desc: "Prof. athletes, >3M/VAT", rate: 10, payee: "individual" },
  WI040: { desc: "Directors/producers, <=3M", rate: 5, payee: "individual" },
  WI041: { desc: "Directors/producers, >3M/VAT", rate: 10, payee: "individual" },
  WI050: { desc: "Mgt/tech consultants, <=3M", rate: 5, payee: "individual" },
  WI051: { desc: "Mgt/tech consultants, >3M/VAT", rate: 10, payee: "individual" },
  WI060: { desc: "Bookkeeping agents, <=3M", rate: 5, payee: "individual" },
  WI061: { desc: "Bookkeeping agents, >3M/VAT", rate: 10, payee: "individual" },
  WI070: { desc: "Insurance agents, <=3M", rate: 5, payee: "individual" },
  WI071: { desc: "Insurance agents, >3M/VAT", rate: 10, payee: "individual" },
  WI080: { desc: "Talent fees - other, <=3M", rate: 5, payee: "individual" },
  WI081: { desc: "Talent fees - other, >3M/VAT", rate: 10, payee: "individual" },
  WI090: { desc: "Non-employee directors, <=3M", rate: 5, payee: "individual" },
  WI091: { desc: "Non-employee directors, >3M/VAT", rate: 10, payee: "individual" },
  WI100: { desc: "Rentals - property/personal", rate: 5, payee: "individual" },
  WI110: { desc: "Cinematographic film rentals", rate: 5, payee: "individual" },
  WI120: { desc: "Contractors", rate: 2, payee: "individual" },
  WI130: { desc: "Estate/trust distributions", rate: 15, payee: "individual" },
  WI139: { desc: "Brokers/RESPs, <=3M", rate: 5, payee: "individual" },
  WI140: { desc: "Brokers/RESPs, >3M/VAT", rate: 10, payee: "individual" },
  WI150: { desc: "Medical practitioners, >3M/VAT", rate: 10, payee: "individual" },
  WI151: { desc: "Medical practitioners, <=3M", rate: 5, payee: "individual" },
  WI152: { desc: "GPP partners, <=720K", rate: 10, payee: "individual" },
  WI153: { desc: "GPP partners, >720K", rate: 15, payee: "individual" },
  WI156: { desc: "Credit card company payments", rate: 0.5, payee: "individual" },
  WI157: { desc: "Govt/GOCC supplier - services", rate: 2, payee: "individual" },
  WI158: { desc: "Top WA supplier - goods", rate: 1, payee: "individual" },
  WI159: { desc: "Govt personnel overtime", rate: 15, payee: "individual" },
  WI160: { desc: "Top WA supplier - services", rate: 2, payee: "individual" },
  WI515: { desc: "Sales reps/MLM, <=3M", rate: 5, payee: "individual" },
  WI516: { desc: "Sales reps/MLM, >3M/VAT", rate: 10, payee: "individual" },
  WI530: { desc: "Embalmers by funeral parlors", rate: 1, payee: "individual" },
  WI535: { desc: "Pre-need co. to funeral parlors", rate: 1, payee: "individual" },
  WI540: { desc: "Tolling fees - refineries", rate: 5, payee: "individual" },
  WI610: { desc: "Agri products supplier, >300K", rate: 1, payee: "individual" },
  WI630: { desc: "Minerals/quarry (non-BSP)", rate: 5, payee: "individual" },
  WI632: { desc: "Minerals/quarry (BSP)", rate: 1, payee: "individual" },
  WI640: { desc: "Govt/GOCC supplier - goods", rate: 1, payee: "individual" },
  WI650: { desc: "MERALCO refund - active", rate: 15, payee: "individual" },
  WI651: { desc: "MERALCO refund - terminated", rate: 15, payee: "individual" },
  WI660: { desc: "Meter deposit int. - MERALCO res.", rate: 10, payee: "individual" },
  WI661: { desc: "Meter deposit int. - MERALCO non-res.", rate: 10, payee: "individual" },
  WI662: { desc: "Meter deposit int. - other DU res.", rate: 10, payee: "individual" },
  WI663: { desc: "Meter deposit int. - other DU non-res.", rate: 15, payee: "individual" },
  WI680: { desc: "Political/campaign payments", rate: 5, payee: "individual" },
  WI710: { desc: "Interest - other debt instruments", rate: 15, payee: "individual" },
  WI720: { desc: "Locally produced raw sugar", rate: 1, payee: "individual" },
  WI770: { desc: "Joint venture supplier - goods", rate: 1, payee: "individual" },
  WI780: { desc: "Joint venture supplier - services", rate: 2, payee: "individual" },
  WI820: { desc: "E-marketplace remittances", rate: 0.5, payee: "individual" },
  WI830: { desc: "Digital financial svc remittances", rate: 0.5, payee: "individual" },
  WI840: { desc: "Top WA - motor vehicles", rate: 0.5, payee: "individual" },
  WI850: { desc: "Top WA - medicine/pharma", rate: 0.5, payee: "individual" },
  WI860: { desc: "Top WA - fuels", rate: 0.5, payee: "individual" },
  WC010: { desc: "Professional fees, <=720K", rate: 10, payee: "non_individual" },
  WC011: { desc: "Professional fees, >720K", rate: 15, payee: "non_individual" },
  WC020: { desc: "Prof. entertainers, <=720K", rate: 10, payee: "non_individual" },
  WC021: { desc: "Prof. entertainers, >720K", rate: 15, payee: "non_individual" },
  WC030: { desc: "Prof. athletes, <=720K", rate: 10, payee: "non_individual" },
  WC031: { desc: "Prof. athletes, >720K", rate: 15, payee: "non_individual" },
  WC040: { desc: "Directors/producers, <=720K", rate: 10, payee: "non_individual" },
  WC041: { desc: "Directors/producers, >720K", rate: 15, payee: "non_individual" },
  WC050: { desc: "Mgt/tech consultants, <=720K", rate: 10, payee: "non_individual" },
  WC051: { desc: "Mgt/tech consultants, >720K", rate: 15, payee: "non_individual" },
  WC060: { desc: "Bookkeeping agents, <=720K", rate: 10, payee: "non_individual" },
  WC061: { desc: "Bookkeeping agents, >720K", rate: 15, payee: "non_individual" },
  WC070: { desc: "Insurance agents, <=720K", rate: 10, payee: "non_individual" },
  WC071: { desc: "Insurance agents, >720K", rate: 15, payee: "non_individual" },
  WC080: { desc: "Talent fees - other, <=720K", rate: 10, payee: "non_individual" },
  WC081: { desc: "Talent fees - other, >720K", rate: 15, payee: "non_individual" },
  WC100: { desc: "Rentals - property/personal", rate: 5, payee: "non_individual" },
  WC110: { desc: "Cinematographic film rentals", rate: 5, payee: "non_individual" },
  WC120: { desc: "Contractors", rate: 2, payee: "non_individual" },
  WC139: { desc: "Brokers/RESPs, <=720K", rate: 10, payee: "non_individual" },
  WC140: { desc: "Brokers/RESPs, >720K", rate: 15, payee: "non_individual" },
  WC150: { desc: "Medical practitioners, >720K", rate: 15, payee: "non_individual" },
  WC151: { desc: "Medical practitioners, <=720K", rate: 10, payee: "non_individual" },
  WC156: { desc: "Credit card company payments", rate: 0.5, payee: "non_individual" },
  WC157: { desc: "Govt/GOCC supplier - services", rate: 2, payee: "non_individual" },
  WC158: { desc: "Top WA supplier - goods", rate: 1, payee: "non_individual" },
  WC160: { desc: "Top WA supplier - services", rate: 2, payee: "non_individual" },
  WC515: { desc: "Sales reps/MLM, <=720K", rate: 10, payee: "non_individual" },
  WC516: { desc: "Sales reps/MLM, >720K", rate: 15, payee: "non_individual" },
  WC535: { desc: "Pre-need co. to funeral parlors", rate: 1, payee: "non_individual" },
  WC540: { desc: "Tolling fees - refineries", rate: 5, payee: "non_individual" },
  WC610: { desc: "Agri products supplier, >300K", rate: 1, payee: "non_individual" },
  WC630: { desc: "Minerals/quarry (non-BSP)", rate: 5, payee: "non_individual" },
  WC632: { desc: "Minerals/quarry (BSP)", rate: 1, payee: "non_individual" },
  WC640: { desc: "Govt/GOCC supplier - goods", rate: 1, payee: "non_individual" },
  WC650: { desc: "MERALCO refund - active", rate: 15, payee: "non_individual" },
  WC651: { desc: "MERALCO refund - terminated", rate: 15, payee: "non_individual" },
  WC660: { desc: "Meter deposit int. - MERALCO res.", rate: 10, payee: "non_individual" },
  WC661: { desc: "Meter deposit int. - MERALCO non-res.", rate: 10, payee: "non_individual" },
  WC662: { desc: "Meter deposit int. - other DU res.", rate: 10, payee: "non_individual" },
  WC663: { desc: "Meter deposit int. - other DU non-res.", rate: 15, payee: "non_individual" },
  WC680: { desc: "Political/campaign payments", rate: 5, payee: "non_individual" },
  WC690: { desc: "REIT income payments", rate: 1, payee: "non_individual" },
  WC710: { desc: "Interest - other debt instruments", rate: 15, payee: "non_individual" },
  WC720: { desc: "Locally produced raw sugar", rate: 1, payee: "non_individual" },
  WC770: { desc: "Joint venture supplier - goods", rate: 1, payee: "non_individual" },
  WC780: { desc: "Joint venture supplier - services", rate: 2, payee: "non_individual" },
  WC790: { desc: "JV/consortium net income share", rate: 15, payee: "non_individual" },
  WC820: { desc: "E-marketplace remittances", rate: 0.5, payee: "non_individual" },
  WC830: { desc: "Digital financial svc remittances", rate: 0.5, payee: "non_individual" },
  WC840: { desc: "Top WA - motor vehicles", rate: 0.5, payee: "non_individual" },
  WC850: { desc: "Top WA - medicine/pharma", rate: 0.5, payee: "non_individual" },
  WC860: { desc: "Top WA - fuels", rate: 0.5, payee: "non_individual" },
};

/** "wc 158 " → "WC158"; null for blanks. */
export function normalizeAtc(v: string | null | undefined): string | null {
  const s = (v ?? "").toUpperCase().replace(/[\s-]/g, "");
  return s === "" ? null : s;
}

/** The ATC's master entry, or null if the code is not a creditable EWT ATC we know. */
export function lookupAtc(code: string | null | undefined): (AtcInfo & { atc: string }) | null {
  const atc = normalizeAtc(code);
  if (!atc || !Object.hasOwn(ATC_MASTER, atc)) return null;
  return { atc, ...ATC_MASTER[atc] };
}
