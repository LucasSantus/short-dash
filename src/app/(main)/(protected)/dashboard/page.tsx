import { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { DashboardBreadcrumb } from "./breadcrumb";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardBreadcrumb />
      Dashboard
    </ContentLayout>
  );
}
