"use client";

import { RiAlarmWarningLine, RiCalendarScheduleLine, RiGroupLine, RiInboxUnarchiveLine } from "@remixicon/react";
import { StatCards, type Stat } from "@/components/application/dashboard/stat-cards";

const icons = {
  clients: RiGroupLine,
  overdue: RiAlarmWarningLine,
  due: RiCalendarScheduleLine,
  missed: RiInboxUnarchiveLine,
};

export type DashboardStat = Omit<Stat, "icon"> & { icon: keyof typeof icons };

/** The Dashboard KPI row on BoardUI's Stat Cards. Icons resolve here, on the client side of the boundary. */
export function DashboardStats({ stats }: { stats: DashboardStat[] }) {
  return <StatCards stats={stats.map((s) => ({ ...s, icon: icons[s.icon] }))} />;
}
