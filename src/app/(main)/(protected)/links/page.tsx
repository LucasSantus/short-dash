import type { Metadata } from "next";
import { ContentLayout } from "../_components/content-layout";
import { LinksBreadcrumb } from "./_components/breadcrumb";
import { LinkList } from "./list";

export const metadata: Metadata = {
  title: "Links",
};

export default function Links() {
  return (
    <ContentLayout>
      <LinksBreadcrumb />

      <LinkList />
    </ContentLayout>
  );
}
