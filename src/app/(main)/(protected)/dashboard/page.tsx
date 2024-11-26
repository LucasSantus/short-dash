import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { DashboardFiltered } from "./_components/dashboard-filtered";
import { DashboardGrid } from "./grid";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <ContentLayout title="Dashboard" options={<DashboardFiltered type="calendar" />}>
      <DashboardGrid />
    </ContentLayout>
  );
}
