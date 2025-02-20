import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { LinkList } from "./list";

export const metadata: Metadata = {
  title: "Links",
};

export default function Links() {
  return (
    <ContentLayout title="Links">
      <LinkList />
    </ContentLayout>
  );
}
