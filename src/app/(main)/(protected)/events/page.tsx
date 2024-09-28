import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { EventList } from "./list";

export const metadata: Metadata = {
  title: "Eventos",
};

export default function Events() {
  return (
    <ContentLayout title="Eventos">
      <EventList />
    </ContentLayout>
  );
}
