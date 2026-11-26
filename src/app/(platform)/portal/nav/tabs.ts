import { RiBankCardLine, RiBarChartBoxLine, RiFileTextLine, RiFileTransferLine, RiHome5Line, RiQuestionAnswerLine, RiUploadCloud2Line } from "@remixicon/react";

export type Tab = { href: string; label: string; icon: typeof RiHome5Line; /** Other paths that belong to this tab. */ also?: readonly string[] };

/** Rework decision 18: Home · Upload · Billing · Returns · Reports. Documents opens from Upload; the old Payroll pages redirect to Reports. */
export const mainTabs: readonly Tab[] = [
  { href: "/portal", label: "Home", icon: RiHome5Line },
  { href: "/portal/upload", label: "Upload", icon: RiUploadCloud2Line, also: ["/portal/documents"] },
  { href: "/portal/billing", label: "Billing", icon: RiBankCardLine },
  { href: "/portal/returns", label: "Returns", icon: RiFileTextLine, also: ["/portal/remittances"] },
  { href: "/portal/reports", label: "Reports", icon: RiBarChartBoxLine },
];
export const requestsTab: Tab = { href: "/portal/requests", label: "Requests", icon: RiQuestionAnswerLine };
export const registrationTab: Tab = { href: "/portal/registration", label: "Registration", icon: RiFileTransferLine };
export const GRID_COLS: Record<number, string> = { 5: "grid-cols-5", 6: "grid-cols-6" };

const under = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

/** The tab a path belongs to (Home only on /portal itself). */
export function activeTab(path: string, tabs: readonly Tab[] = [...mainTabs, requestsTab, registrationTab]): string | null {
  for (const t of tabs) {
    if (t.href === "/portal" ? path === "/portal" : under(path, t.href) || (t.also ?? []).some((a) => under(path, a))) return t.href;
  }
  return null;
}
