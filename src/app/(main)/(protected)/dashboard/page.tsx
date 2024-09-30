import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { DashboardGrid } from "./grid";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardGrid />
    </ContentLayout>
  );
}
