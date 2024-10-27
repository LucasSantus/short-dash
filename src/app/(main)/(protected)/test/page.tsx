import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";

export const metadata: Metadata = {
  title: "Teste",
};

export default function Links() {
  return <ContentLayout title="Teste">Teste</ContentLayout>;
}
