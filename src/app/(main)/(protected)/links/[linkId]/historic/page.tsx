import type { Metadata } from "next";
import { ContentLayout } from "../../../_components/content-layout";
import { HistoricBreadcrumb } from "./_components/breadcrumb";
import { HistoricList } from "./list";

export const metadata: Metadata = {
  title: "Historico",
};

interface HistoricProps {
  params: {
    linkId: string;
  };
}

export default function Historic({ params }: HistoricProps) {
  return (
    <ContentLayout>
      <HistoricBreadcrumb />

      <HistoricList linkId={params.linkId} />
    </ContentLayout>
  );
}
