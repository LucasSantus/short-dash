import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { HistoricBreadcrumb } from "./_components/breadcrumb";
import { HistoricList } from "./list";

export const metadata: Metadata = {
  title: "Histórico",
};

export default function Historic() {
  return (
    <ContentLayout>
      <HistoricBreadcrumb />

      <HistoricList />
    </ContentLayout>
  );
}
