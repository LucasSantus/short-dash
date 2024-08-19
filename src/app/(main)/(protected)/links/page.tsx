import { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { LinksBreadcrumb } from "./breadcrumb";
import { ListLinks } from "./list";

export const metadata: Metadata = {
  title: "Links",
};

export default async function Links() {
  return (
    <ContentLayout title="Links">
      <LinksBreadcrumb />

      <ListLinks />
    </ContentLayout>
  );
}
